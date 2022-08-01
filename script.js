window.onload = (event) => {
    AllEvents();
};
function AllEvents(){    
    document.getElementById("button").addEventListener('click', el=>{  
        el.preventDefault();
        const Input = document.getElementById("todoInput");
        
        let itemId = String(Date.now());
        addItem(itemId , Input.value);
        document.getElementById("todoInput").value = ''
    });

    function addItem(itemId, Item) {    
        const ul = document.getElementById('toDoList');
        const li = document.createElement('li')
        li.setAttribute("data-id", itemId);
        li.innerText = Item;
        ul.appendChild(li);
    }

    document.getElementById("toDoList").addEventListener('click', el=>{
        let id = el.target.getAttribute('data-id')
        if (!id) return
        const ul = document.getElementById('toDoList'); 
        var li = document.querySelector('[data-id="' + id + '"]');
        ul.removeChild(li);
        
    }); 
};
