document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Load saved todos
    const loadSettings = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToList(todo.text, todo.completed));
    };

    // Save todos to local storage
    const saveTodos = () => {
        const todos = Array.from(todoList.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('strikethrough')
        }));
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Add todo to list
    const addTodoToList = (text, completed = false) => {
        const li = document.createElement('li');
        if (completed) li.classList.add('strikethrough');
        
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        const strikeButton = document.createElement('i');
        strikeButton.className = 'fa-solid fa-check strike-button';
        strikeButton.title = 'Complete';
        strikeButton.addEventListener('click', () => {
            li.classList.toggle('strikethrough');
            saveTodos();
        });
        li.appendChild(strikeButton);

        const deleteButton = document.createElement('i');
        deleteButton.className = 'fa-solid fa-trash';
        deleteButton.title = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    };

    // Add new todo
    addTodoButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodoToList(todoText);
            todoInput.value = '';
            saveTodos();
        }
    });

    // Initial setup
    loadSettings();
});
