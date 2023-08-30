window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from Local Storage on page load
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const task = input.value.trim();
        
        if (!task) {
            alert("Please fill out the task");
        } else {
            createTaskElement(task);
            input.value = '';

            // Update tasks in Local Storage
            updateLocalStorage();
        }
    });

    function createTaskElement(taskText) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        // Add event listeners for Edit and Delete buttons
        task_edit_el.addEventListener('click', () => {
            toggleEdit(task_input_el, task_edit_el);
            updateLocalStorage();
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            updateLocalStorage();
        });
    }

    function toggleEdit(inputElement, editButton) {
        if (editButton.innerText.toLowerCase() === "edit") {
            editButton.innerText = "Save";
            inputElement.removeAttribute("readonly");
            inputElement.focus();
        } else {
            editButton.innerText = "Edit";
            inputElement.setAttribute("readonly", "readonly");
        }
    }

    function updateLocalStorage() {
        const tasks = Array.from(list_el.querySelectorAll('.text')).map(input => input.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
