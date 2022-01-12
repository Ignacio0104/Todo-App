//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//Event listeners
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);

//Functions

function addTodo(event)
{
    event.preventDefault(); //Prevents form to submitting and page to refreshing
    const todoDiv= document.createElement("div"); //Creating de DIV
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li"); //Creating the item
    if(todoInput.value!="")
    {
        console.log(todoInput.value);
        newTodo.innerText=todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); //We put the LI inside the DIV
    
        saveLocalTodos(todoInput.value);
    
        const completedButton = document.createElement("button");
        completedButton.innerHTML="<i class='fas fa-check'></i>" //We add the icon to the button
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML="<i class='fas fa-trash'></i>" //We add the icon to the button
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv); //Adding the created DIV to the todo List 
        todoInput.value=''; //Here we clean de input 
    }else
    {
        alert("Favor ingresar texto");
    }
    
}

function deleteCheck(event){
    const item = event.target; //item = where we clicked
    console.log(item.parentElement.innerText);
    if(item.classList[0]==="delete-btn")
    {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener("transitionend", ()=>
        {
            todo.remove();
        })
    }

    if(item.classList[0]==="complete-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        saveLocalRecord(item.parentElement.innerText);
        removeLocalTodo(todo);
        
    }
}

function filterTodo (event)
{
    const todos = todoList.childNodes;
    todos.forEach((todo)=>
    {
        switch(event.target.value)
        {
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display='flex';
                } else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display='flex';
                } else{
                    todo.style.display='none';
                }
                break;
        }
    })

    if(event.target.value === "finished")
    {
        getRecords();
    }
}


function saveLocalTodos (todo)
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function saveLocalRecord (record)
{
    let records;
    if(localStorage.getItem("records")===null)
    {
        records=[];
    }else
    {
        records=JSON.parse(localStorage.getItem("records"));
    }
    records.push(record);
    localStorage.setItem("records",JSON.stringify(records));
}

function getTodos()
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo)=>
    {
        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li"); 
        newTodo.innerText=todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); 
    
        const completedButton = document.createElement("button");
        completedButton.innerHTML="<i class='fas fa-check'></i>" 
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML="<i class='fas fa-trash'></i>" 
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv); 
    })
}

function getRecords()
{
    let records;
    if(localStorage.getItem("records")===null)
    {
        records=[];
    }else
    {
        records=JSON.parse(localStorage.getItem("records"));
    }
    records.forEach((record)=>
    {
        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li"); 
        if(record!=null)
        {
            newTodo.innerText=record;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo); 
        
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML="<i class='fas fa-trash'></i>" 
            deleteButton.classList.add("delete-btn");
            todoDiv.appendChild(deleteButton);
            todoList.appendChild(todoDiv); 
        }
 
    })
}


function removeLocalTodo(todo)
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    const element=todo.children[0].innerText; //we access the div, then the child (li) and then position 0 of that array (first element)
    todos.splice(todos.indexOf(element),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}