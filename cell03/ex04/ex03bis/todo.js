$(document).ready(function () {
    const list = $("#some_list");

    //  Load TODOs from cookie on page load
    const saved = getCookie();
    if (saved) {
      saved.forEach(text => addTodo(text, false, false));
    }

    //  New todo button
    $("#newTodoBtn").click(function () {
      const text = prompt("Enter a new TO DO:");
      if (text && text.trim() !== "") {
        addTodo(text.trim(), true, true);
      }
    });

    // Add TODO
    function addTodo(text, save, putOnTop) {
      const todo = $("<div>").text(text);

      // Click to remove
      todo.click(function () {
        if (confirm("Do you want to remove this TODO?")) {
          $(this).remove();
          saveTodos();
        }
      });

      if (putOnTop) {
        list.prepend(todo);   // new item at top
      } else {
        list.append(todo);    // loaded items at bottom
      }

      if (save) saveTodos();
    }

    // Save all TODOs to cookie
    function saveTodos() {
      const todos = [];
      list.children("div").each(function () {
        todos.push($(this).text());
      });
      // make string from list
      setCookie(JSON.stringify(todos));
    }

    // Set cookie (always "todos")
    function setCookie(value) {
      document.cookie = "todos=" + value;
    }


    function getCookie() {
      const cookie = document.cookie;
    // cookie = 'todos=["abcd","abc"]'

      if (cookie.startsWith("todos=")) {
        return JSON.parse(cookie.substring(6));
      }
      return null;
    }
  });