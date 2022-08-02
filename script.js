
var List_items = JSON.parse(localStorage.getItem("todo_list")) || [];

window.onload = (event) => {
    AllEvents();

};

function AllEvents(){    
    
    listItems();

    document.getElementById("lbl123").addEventListener("click", e=>{RemoveTask(e)});
    document.getElementById("123").addEventListener("click", e=>{CheckComplete(e)});

    let toDoListArray = [];
    document.getElementById("button").addEventListener('click', el=>{  
        el.preventDefault();
        const Input = document.getElementById("todoInput");
        const ItemValue = Input.value.trim();
        if (ItemValue.length)
        {
            console.log("aqui");
            let itemId = String(Date.now());
            List_items.push({ value: ItemValue, Date_Now: itemId, done: false});
            localStorage.setItem("todo_list", JSON.stringify(List_items));
            
            addItem(itemId , ItemValue);
           document.getElementById("todoInput").value = '';
        }
    });


    function listItems() {
        for (var i = 0; i < List_items.length; i++) {
            addItem(List_items[i].Date_Now, List_items[i].value, List_items[i].done);
        }
      }

    function addItem(itemId, Item, Checked=false) {    
        const ul = document.getElementById('toDoList');
        const li = document.createElement('li')
        const btnCheck = document.createElement('input');
        const lbl = document.createElement('label');

        
        btnCheck.setAttribute("type","checkbox");
        btnCheck.setAttribute("id",itemId);

        if (Checked) { btnCheck.setAttribute("checked","true");}

        lbl.id = "lbl"+itemId;
        lbl.htmlFor = itemId;
        lbl.innerHTML = Item;
        li.setAttribute("data-id", "li"+itemId);

        btnCheck.addEventListener("click",e=>{CheckComplete(e)});
        lbl.addEventListener("click", e=>{RemoveTask(e)})
        
        
        li.appendChild(btnCheck);
        li.appendChild(lbl);
        ul.appendChild(li);
    }


    function RemoveTask(el){
        console.log("Removendo");
        let id = el.target.getAttribute('id');
        if (!id) return

        List_items.splice(id, 1);
        localStorage.setItem("todo_list", JSON.stringify(List_items));
        const ul = document.getElementById('toDoList'); 
        var li = document.querySelector('[data-id="li' + id.substring(3, id.length) + '"]');
        ul.removeChild(li);
    }

    function CheckComplete(el){
        console.log("checkbox");
        let id = el.target.getAttribute('id');
        if (!id) return
        List_items.find((o, i) => {
            if (o.Date_Now === id) {
                List_items[i].done = !List_items[i].done;
                return true; // stop searching
            }
        });

        localStorage.setItem("todo_list", JSON.stringify(List_items));

        document.querySelector('[data-id="li'+ id + '"]').style.opacity = el.target.checked ? 0.5 : 1 ;
        document.querySelector('[id="lbl'+ id + '"]').style.textDecoration = el.target.checked ? 'line-through' : 'none';
    }
};