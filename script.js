const inputAddTodo = document.querySelector('.input-add-todo');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todoList');
const errorMessage = document.querySelector('.error-message')

const todos = []; // Tableau pour stocker les objets tâches

// Fonction pour afficher la liste des tâches
const displayTodos = () => {

  todos.sort((a, b) => a.completed - b.completed);

  todoList.innerHTML = ''; // Réinitialiser la liste
  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    // Structure de la tâche avec checkbox, texte, et boutons d'actions
    li.innerHTML = `
        <div class="flex gap-2 mb-2">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="complete-checkbox">
            <div class="h-10 flex justify-between items-center pl-5 pr-1 bg-white w-[500px] border rounded-sm border-pink-300">
                <p class="${todo.completed ? 'completed' : ''}">${todo.text}</p>
                <div class=" flex gap-2">
                    <button class="size-8 text-sm bg-orange-300 flex justify-center items-center rounded-sm hover:opacity-70 active:opacity-100 edit-btn" title="Edit todo"><img class="size-5" src="Images/icons8-créer-un-nouveau-100.png" alt="edit button"></button>
                    <button class="size-8 bg-red-500 flex justify-center items-center rounded-sm hover:opacity-70 active:opacity-100 delete-btn" title="Delete todo"><img class="size-[14px]" src="Images/icons8-effacer-100.png" alt="delete button"></button>
                </div>
            </div>
        </div>
    `;

    // Marquer la tâche comme complétée/non complétée
    li.querySelector('.complete-checkbox').addEventListener('change', (e) => {
      todos[index].completed = e.target.checked;
      displayTodos(); // Mettre à jour la liste après modification
    });

    // Éditer une tâche
    li.querySelector('.edit-btn').addEventListener('click', () => {
      const newTodoText = prompt('Modify your task:', todo.text);
      if (newTodoText !== null && newTodoText.trim() !== '') {
        todos[index].text = newTodoText.trim();
        displayTodos(); // Mettre à jour la liste après modification
      }
    });

    // Supprimer une tâche
    li.querySelector('.delete-btn').addEventListener('click', () => {
      todos.splice(index, 1); // Supprimer la tâche du tableau
      displayTodos(); // Mettre à jour la liste après suppression
    });

    todoList.appendChild(li); // Ajouter l'élément à la liste
  });
};

// Ajouter une nouvelle tâche
addBtn.addEventListener('click', () => {
  const todoText = inputAddTodo.value.trim();
  if (todoText !== '' && todoText.length >= 3) {
    todos.push({ text: todoText, completed: false }); // Ajouter une nouvelle tâche sous forme d'objet
    inputAddTodo.value = ''; // Vider l'input
    errorMessage.innerText = '';
    displayTodos(); // Mettre à jour la liste après ajout
  } else {
    errorMessage.innerText = 'Todo needs to be 3 characters or more 😊'
    inputAddTodo.value = ''; 
  }
});