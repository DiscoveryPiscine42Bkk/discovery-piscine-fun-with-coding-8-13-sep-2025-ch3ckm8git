const list = document.getElementById("some_list");

// Load TODOs on page start
window.onload = () => {
    const saved = getCookie();
    if (saved) {
        // const todos = JSON.parse(saved);
        saved.forEach(text => addTodo(text, false, false)); // false = don't re-save
        // false = don't save again, false = append (old items stay in order)
    }
};

// Add new todo
function newTodo() {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        addTodo(text.trim(), true, true);
    }
}

// Add todo element into list
function addTodo(text, save, putOnTop) {
    const todo = document.createElement("div");
    todo.textContent = text;

    // Click to remove
    todo.onclick = () => {
        if (confirm("Do you want to remove this TO DO?")) {
            list.removeChild(todo);
            saveTodos();
        }
    };


    if (putOnTop) {
        // Put new TODO at the top insert before the first child
        list.insertBefore(todo, list.firstChild);
    } else {
        // when loaded no need to put on Top
        list.append(todo)
    }

    // if save is true ( when new Todo)
    if (save) saveTodos();
}

// Save all TODOs into cookie
function saveTodos() {
    const todos = [];
    list.querySelectorAll("div").forEach(div => todos.push(div.textContent));
    setCookie(JSON.stringify(todos)); // turn it into string so we can store cookie which not accept list
}

// Save cookie (name is always "todos")
function setCookie(value) {
    document.cookie = "todos=" + value;
}

// Get cookie (always return "todos" value)
function getCookie() {
    const cookie = document.cookie

    // cookie= 'todos=["abcd","abc"]'
    // console.log(JSON.parse(cookies[0].substring(6)))
    if (cookie.startsWith("todos=")) {
        // todos=  6 characters
        return (JSON.parse(cookie.substring(6)))
    }

    return null;
}
