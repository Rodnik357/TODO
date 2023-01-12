const expandAddNewTask = (event)=>{
    event.target.classList.toggle("hide");
    event.target.nextElementSibling.classList.toggle("hide");
};

const addNewTask = async (event) => {
    
    if (event.type === "click") {
    event.target.parentElement.previousElementSibling.classList.toggle("hide");
    event.target.parentElement.classList.toggle("hide");
    return 0;
    }
    event.preventDefault();

    let name = document.getElementById("taskName").value;
    let description = document.getElementById("taskDescription").value; 

    const zahtjev = await fetch("http://127.0.0.1:3000/", {
        method:"POST", 
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({name: name, description: description}),
    });
    const data = await zahtjev.json();
    
    showTasks(data.data);

    event.target.reset();
    event.target.classList.toggle("hide");
    event.target.previousElementSibling.classList.toggle("hide");
};

const showTasks = (tasks)=>{
    const myTasks = document.getElementById("myTasks")

    let newHTML = "<ul>";
    tasks.forEach((task)=>{
        newHTML+= `<li><b>${task.name}</b> - <i>${task.description}</i></li>`;
    });

    newHTML += "</ul>";

    myTasks.innerHTML = newHTML;
};

const init = async() =>{ 
    const response = await fetch("http://127.0.0.1:3000/");
    const data = await response.json();

    showTasks(data.data);
};