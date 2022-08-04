var List_items = JSON.parse(localStorage.getItem("todo_list")) || [];

window.onload = (event) => {
    AllEvents();
};

function AllEvents(){    
    
    listItems();

    document.getElementById("form_Submit").addEventListener('click', el=>{  
        el.preventDefault();
        const Input = document.getElementById("form_Input");
        const ItemValue = Input.value.trim();
        if (ItemValue.length)
        {
            let itemId = String(Date.now());
            List_items.push({ value: ItemValue, Date_Now: itemId, done: false});
            localStorage.setItem("todo_list", JSON.stringify(List_items));
            
            addItem(itemId , ItemValue, false);
           document.getElementById("form_Input").value = '';
        }
    });

    function listItems() {
        const ul = document.getElementById('toDoList');
        ul.innerHTML = "";
        for (var i = 0; i < List_items.length; i++) {
            addItem(List_items[i].Date_Now, List_items[i].value, List_items[i].done, List_items[i].important);
        }
    }

    function addItem(itemId, Item, Done=false, Important=false) {    
        const ul = document.getElementById('toDoList');
        const li = document.createElement('li')
        const btnCheck = document.createElement('input');
        const lbl = document.createElement('label');
        const divcontainer = document.createElement('div');
        const check_star = document.createElement('input');
        const divcontainer_linemove = document.createElement('div');
        const moveup = document.createElement('i');
        const movedown = document.createElement('i');
        
        btnCheck.setAttribute("type","checkbox");
        btnCheck.setAttribute("class","line_checkbox");
        btnCheck.setAttribute("id",itemId);

        if (Done) { 
            btnCheck.setAttribute("checked","true");
            li.style.opacity = 0.5;
            lbl.style.textDecoration = 'line-through';
        }

        lbl.id = "lbl"+itemId;
        lbl.htmlFor = "line_checkbox"+itemId;
        lbl.setAttribute("class", "line_label");
        lbl.innerHTML = Item;

        divcontainer.setAttribute("id", "Container_line");
        divcontainer.htmlFor = "line_checkbox"+itemId;
        divcontainer_linemove.setAttribute("id", "Container_line_move");

        check_star.setAttribute("type","checkbox");
        check_star.setAttribute("id","line_radio_star");
        check_star.setAttribute("data-id", itemId);
        
        if (Important) { check_star.setAttribute("checked","true"); }


        moveup.setAttribute("class", "fa fa-arrow-up");
        moveup.setAttribute("id", "arrow_up");
        moveup.setAttribute("data-id", itemId);
        movedown.setAttribute("class", "fa fa-arrow-down");
        movedown.setAttribute("id", "arrow_down");
        movedown.setAttribute("data-id", itemId);

        li.setAttribute("data-id", "li"+itemId);

        moveup.addEventListener("click",e=>{Move_line_Up(e)});
        movedown.addEventListener("click",e=>{Move_line_Down(e)});
        check_star.addEventListener("click",e=>{Mark_as_Important(e)});
        btnCheck.addEventListener("click",e=>{CheckComplete(e)});
        lbl.addEventListener("click", e=>{RemoveTask(e)})
        

        divcontainer_linemove.appendChild(moveup);
        divcontainer_linemove.appendChild(movedown);
        divcontainer.appendChild(check_star);
        divcontainer.appendChild(divcontainer_linemove);
        li.appendChild(btnCheck);
        li.appendChild(divcontainer);
        li.appendChild(lbl);
        ul.appendChild(li);
    }


    function RemoveTask(el){
        let id = el.target.getAttribute('id');
        if (!id) return

        List_items.splice(id, 1);
        localStorage.setItem("todo_list", JSON.stringify(List_items));
        const ul = document.getElementById('toDoList'); 
        var li = document.querySelector('[data-id="li' + id.substring(3, id.length) + '"]');
        ul.removeChild(li);
    }

    function CheckComplete(el){
        let id = el.target.getAttribute('id');
        if (!id) return
        List_items.find((o, i) => {
            if (o.Date_Now === id) {
                List_items[i].done = !List_items[i].done;
                return true; 
            }
        });

        localStorage.setItem("todo_list", JSON.stringify(List_items));

        document.querySelector('[data-id="li'+ id + '"]').style.opacity = el.target.checked ? 0.5 : 1 ;
        document.querySelector('[id="lbl'+ id + '"]').style.textDecoration = el.target.checked ? 'line-through' : 'none';
    }


    function Mark_as_Important(el){
        let id = el.target.getAttribute('data-id');
        if (!id) return
        List_items.find((o, i) => {
            if (o.Date_Now === id) {
                List_items[i].important = !List_items[i].important;
                return true; 
            }
        });

        localStorage.setItem("todo_list", JSON.stringify(List_items));
    }

    function Move_line_Up(el){
        let id = el.target.getAttribute('data-id');
        if (!id) return
        var index = List_items.findIndex(p=> p.Date_Now == id);
        if (index > 0){
            let arr_temp = [];
            for (var i = 0; i < List_items.length; i++) {
                if (i==(index-1))
                    arr_temp.push(List_items[i+1]);
                else if (i==index)
                    arr_temp.push(List_items[i-1]);
                else
                    arr_temp.push(List_items[i]);
            }

            List_items = arr_temp.concat();
            localStorage.setItem("todo_list", JSON.stringify(List_items));
            listItems();
        }                
    }

    function Move_line_Down(el){
        let id = el.target.getAttribute('data-id');
        if (!id) return
        var index = List_items.findIndex(p=> p.Date_Now == id);
        if (index < List_items.length-1){
            let arr_temp = [];
            for (var i = 0; i < List_items.length; i++) {
                if (i==(index+1))
                    arr_temp.push(List_items[i-1]);
                else if (i==index)
                    arr_temp.push(List_items[i+1]);
                else
                    arr_temp.push(List_items[i]);
            }

            List_items = arr_temp.concat();
            localStorage.setItem("todo_list", JSON.stringify(List_items));
            listItems();
        }                
    }
    return {listItems};
};

function Filter(filter){
    let done = document.getElementsByName("done");
    let important = document.getElementsByName("important");
    let todo = document.getElementsByName("todo");
    let all = document.getElementsByName("all");    
    const obj = new AllEvents;    
    
    List_items = JSON.parse(localStorage.getItem("todo_list")); 
    if (filter != "all"){
        all[0].checked = false;
        if (filter == "todo") done[0].checked = false;

        if (done[0].checked){
            todo[0].checked = false;
            if (important[0].checked)
                arr_tmp = List_items.filter(r=>(r.done == true & r.important == true));
            else
                arr_tmp = List_items.filter(r=>(r.done == true));
        }
        else if (todo[0].checked){
            if (important[0].checked)
                arr_tmp = List_items.filter(r=>(r.done == false & r.important == true));
            else
                arr_tmp = List_items.filter(r=>(r.done == false));
        }
        else if (important[0].checked)
            arr_tmp = List_items.filter(r=>(r.important == true));

        if(done[0].checked || todo[0].checked || important[0].checked)
            List_items = arr_tmp.concat();
    }
    else{
        done[0].checked = false;
        important[0].checked = false;
        todo[0].checked = false;
    }  
    obj.listItems();
};

