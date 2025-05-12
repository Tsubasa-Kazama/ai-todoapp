document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, idx) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const span = document.createElement('span');
            span.className = 'todo-text' + (todo.completed ? ' completed' : '');
            span.textContent = todo.text;
            span.onclick = () => {
                todos[idx].completed = !todos[idx].completed;
                saveTodos();
                renderTodos();
            };

            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.innerHTML = '🗑️';
            delBtn.onclick = () => {
                todos.splice(idx, 1);
                saveTodos();
                renderTodos();
            };

            li.appendChild(span);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            input.value = '';
        }
    };

    renderTodos();

    // ダークテーマ切り替え
    const themeSwitch = document.getElementById('theme-switch');
    const themeLabel = document.getElementById('theme-label');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    function setTheme(dark) {
        document.body.classList.toggle('dark', dark);
        themeSwitch.checked = dark;
        themeLabel.textContent = dark ? '🌙' : '🌞';
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    // 初期テーマ設定
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDark);
    }

    themeSwitch.addEventListener('change', () => {
        setTheme(themeSwitch.checked);
    });
});
