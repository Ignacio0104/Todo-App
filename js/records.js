//Selectors
const todoListRecords = document.querySelector(".todo-list-records");

//Event listeners
todoListRecords.addEventListener("click",deleteRecord);

//Functions


function deleteRecord(event){


    const item = event.target; //item = where we clicked
    console.log(item.parentElement.innerText);
    if(item.classList[0]==="delete-btn")
    {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalRecord(todo);
        todo.addEventListener("transitionend", ()=>
        {
            todo.remove();
        })
    }
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
            todoListRecords.appendChild(todoDiv); 
        }
 
    })
}


function removeLocalRecord(todo)
{
    let records;
    if(localStorage.getItem("records")===null)
    {
        records=[];
    }else
    {
        records=JSON.parse(localStorage.getItem("records"));
    }

    const element=todo.children[0].innerText; //we access the div, then the child (li) and then position 0 of that array (first element)
    records.splice(records.indexOf(element),1);
    localStorage.setItem("records",JSON.stringify(records));
}