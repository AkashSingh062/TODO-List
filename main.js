const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
//MODES 
const getDark = () =>{
   document.body.classList.add('dark');
   document.querySelector('h1').classList.add('dark');
};
const getLight = () =>{
   document.body.classList.remove('dark');
   document.querySelector('h1').classList.remove('dark');
};
let dark = false;
const clicked = document.querySelector('.js-dark');
clicked.addEventListener('click', () => {
   if(!dark){
      getDark();
      dark = true;
   }else{
      getLight();
      dark = false;
   }
});
// ADDING TASK LOCALLY
function saveToLocal() {
   localStorage.setItem('todoList', JSON.stringify(todoList));
}

// SHOW TO-DO LIST
displayToDoList();

function displayToDoList() {
   let innerHtml = '';
   for (let i = 0; i < todoList.length; i++) {
      const todoObj = todoList[i];
      const { taskName, dueTime, dueDate } = todoObj;
      const innerText = `
      <p class="task-container list">
         <span class="span-1 span">${taskName}</span>
         <span class="span-2 span">${dueTime}</span>
         <span class="span-3 span">${dueDate}</span>
         <button class="js-btn btn-del" onclick="deleteTask(${i})">Delete</button>
      </p>`;
      innerHtml += innerText;
   }
   document.querySelector('.renderTask').innerHTML = innerHtml;
}

// DELETE A TASK
function deleteTask(index) {
   todoList.splice(index, 1); // Remove the task at the specified index
   saveToLocal(); // Save updated list to localStorage
   displayToDoList(); // Refresh the displayed list
}

// ADDING TASK TO TODO LIST
function addTask() {
   const taskName = document.querySelector('.js-name-input').value;
   if (taskName === '') {
      document.querySelector('.js-error-message').innerText = 'Please enter a task name.';
      return;
   }
   document.querySelector('.js-error-message').innerText = '';
   const dueTime = document.querySelector('.js-time-input').value;
   const dueDate = document.querySelector('.js-date-input').value;

   // Add the new task to the list
   todoList.push({ taskName, dueTime, dueDate });

   // Clear the input fields
   document.querySelector('.js-name-input').value = '';
   document.querySelector('.js-time-input').value = '';
   document.querySelector('.js-date-input').value = '';

   saveToLocal(); // Save updated list to localStorage
   displayToDoList(); // Refresh the displayed list
}
