const list = document.getElementById("ft_list");

// Load TODOs on page start
window.onload = () => {
  const saved = getCookie();
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(text => addTodo(text, false)); // false = don't re-save
  }
};

// Add new TODO
function newTodo() {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    addTodo(text.trim(), true);
  }
}

// Add TODO element into list
function addTodo(text, save) {
  const todo = document.createElement("div");
  todo.textContent = text;

  // Click to remove
  todo.onclick = () => {
    if (confirm("Do you want to remove this TO DO?")) {
      list.removeChild(todo);
      saveTodos();
    }
  };

  // Put new TODO at the top
  list.insertBefore(todo, list.firstChild);

  if (save) saveTodos();
}

// Save all TODOs into cookie
function saveTodos() {
  const todos = [];
  list.querySelectorAll("div").forEach(div => todos.push(div.textContent));
  setCookie(JSON.stringify(todos));
}

// ---- Simple Cookie Helpers ----

// Save cookie (name is always "todos")
function setCookie(value) {
  document.cookie = "todos=" + value;
}

// Get cookie (always return "todos" value)
function getCookie() {
  const cookies = document.cookie.split("; ");

//   cookie -> list ['todos=["abcd","abc"]']
  for (let c of cookies) {
    console.log(c)
    // console.log(JSON.parse(c))
    if (c.startsWith("todos=")) {
      return decodeURIComponent(c.substring("todos=".length));
    }
  }
  return null;
}
