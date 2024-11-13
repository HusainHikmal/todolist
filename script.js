


function handleSubmit(event) {
  event.preventDefault();

  const newTodo = document.getElementById("new-todo").value.trim();

  // Jika input kosong, tampilkan alert dengan animasi
  if (!newTodo) {
    const alertBox = document.getElementById("alert");
    alertBox.classList.add("show-alert"); // Tambahkan kelas untuk memunculkan alert

    // Hapus kelas show-alert setelah animasi selesai
    setTimeout(() => {
      alertBox.classList.remove("show-alert");
    }, 3000); // Durasi 3 detik (sesuai animasi fadeInOut)

    return; // Hentikan proses jika input kosong
  }

  // Jika ada input, lanjutkan proses
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: newTodo,
    checked: false,
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  document.getElementById("new-todo").value = "";
  displayTodo();
}

function displayTodo() {
  let todos = JSON.parse(localStorage.getItem("todos"));

  let list = "";

  if (todos) {
    todos.forEach((item, idx) => {
      list =
        list +
        `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input class="form-check-input me-1" type="checkbox" ${
          item.checked ? "checked" : ""
        } id="${item.id}" onchange="handleCheckbox(${
          item.id
        }, this.checked)">
        <label class="form-check-label" for=${item.id}>${
          item.name
        }</label>
      </div>
      <button class="btn btn-danger" onclick = "deleteTodo(${+item.id})">Delete</button>
    </li>

  `;
    });
  }

  document.getElementById("list-todo").innerHTML = list;
}

function deleteTodo(id) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  displayTodo(); // Update the list after deletion
}

function handleCheckbox(id, isChecked) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, checked: isChecked } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodo();
}
