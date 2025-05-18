// todo.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Einzigartiger Schlüssel pro Benutzer
    const user = localStorage.getItem('loggedInUser') || 'user';
    const storageKey = `tasks_${user}`;

    // Lade gespeicherte Aufgaben
    let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    renderTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false
        };
        tasks.push(newTask);
        saveAndRender();
        taskInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = Number(e.target.dataset.id);
            tasks = tasks.filter(t => t.id !== taskId);
            saveAndRender();
        }

        if (e.target.classList.contains('task-checkbox')) {
            const taskId = Number(e.target.dataset.id);
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.done = e.target.checked;
                saveAndRender();
            }
        }
    });

    function saveAndRender() {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';

            li.innerHTML = `
        <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.done ? 'checked' : ''}>
        <span class="task-text ${task.done ? 'done' : ''}">${task.text}</span>
        <button class="delete-btn" data-id="${task.id}">✖</button>
      `;
            taskList.appendChild(li);
        });
    }
});
