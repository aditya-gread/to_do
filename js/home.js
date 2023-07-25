let fil = false;    //makes filter state false

// shows all type of data when webpage opens 
showAllData();

// opens task form
function open_popup(){
    document.getElementById('task_form').reset();
    document.getElementById('add_task').style.display = "block";
    document.getElementById('update_task').style.display = "none";
    document.getElementById("item_form").style.display = "block";
}

// close task form
function close_popup(){
    document.getElementById("item_form").style.display = "none";
}

// opens filter
function open_filter(){
    document.getElementById("id_filter").style.display = "block";
    fil = true;
}

// closes filter
function close_filter(){
    document.getElementById("id_filter").style.display = "none";
    fil = false;

}

// decides the state of filter button
function openFilter() {
    if(fil) close_filter();
    else open_filter();
}

// validate if title is empty or not
function validate(title){
    if( title.trim() == ""){
        console.log(title);
        alert("Title can't be empty");
        return false;
    }
    return true;
}

// Add new task
function addItem(){
    if(!validate(document.forms["task"]["task_title"].value)){
        return;
    }
    var list = getData();
    if(list == null){
        list = [];
    }
    let item = [
        document.forms["task"]["task_title"].value,
        document.forms["task"]["task_description"].value,
        document.forms["task"]["task_date"].value, 
        document.getElementById('task_complete').checked,
    ]     
    close_popup();  
    list.push(item);
    putData(list);
    showAllData();
}

// get data from local storage
function getData(){
    let temp = localStorage.getItem('to_do_task');
    if(temp === undefined){
        putData([]); 
    }
    let list =  JSON.parse(temp);
    return list;
}

// delete data
function deleteData(index){
    let data = getData();
    data.splice(index,1);
    putData(data);
    showAllData();
}

// adds data to local store
function putData(list){
    localStorage.setItem("to_do_task", JSON.stringify(list));
}


// edit existing data
function editData(index){
    open_popup();
    document.getElementById('add_task').style.display = "none";
    document.getElementById('update_task').style.display = "block";
    let data = getData();
    
    document.forms["task"]["task_title"].value = data[index][0];
    document.forms["task"]["task_description"].value = data[index][1];
    document.forms["task"]["task_date"].value = data[index][2];
    document.getElementById('task_complete').checked = data[index][3];

    let update = function(event) {
        let temp = [
            document.forms["task"]["task_title"].value,
            document.forms["task"]["task_description"].value,
            document.forms["task"]["task_date"].value,
            document.getElementById('task_complete').checked,
        ];
        if(validate(temp[0])){
            data[index] = temp;
            putData(data);
            close_popup();
            showAllData();
        }else{
            editData(index);
        }
    }

    document.getElementById('update_task').addEventListener("click", update, {once : true});
    
}


// shows complete data
function showAllData(){
    const data = getData();
    showData(data);
    close_filter();
}

// get active task data
function getActiveData(){
    let data = getData();
    let active_data = data.filter(function (x){
        return x[3] != true;
    });
    showData(active_data);
    close_filter();
}

// get completed task data
function getCompletedData(){
    let data = getData();
    let active_data = data.filter(function (x){
        return x[3] == true;
    });
    showData(active_data);
    close_filter();
}

// show data 
function showData(data){
    if(data != null){
        let sno =1;
        let html ="";
        for(let ind in data){
            html = html + `<tr><td>${sno}</td> <td>${data[ind][0]}</td> <td style="text-align:left;">${data[ind][1]}</td> <td>${data[ind][2]}</td><td id="task_comp">${data[ind][3]?"Done":"Pending"}</td><td style="text-align: center;"><button style="background-color: blue; color: white;" type="button" onclick = "editData(${ind})">Edit</button> <button style="background-color: red; color: white;" type="button" onclick = "deleteData(${ind})">Delete</button></td></tr>`;
            sno++;
        }
        document.getElementById('root').innerHTML = html;
        }
}

// search function
function searchedData(){
    if(document.getElementById('search_bar').value == ""){
        alert("Search bar is empty");
    }else{
        let search = document.getElementById('search_bar').value.toLowerCase();
        let data = getData();
        let search_data = data.filter(function (x) {
            return x[0].toLowerCase() == search;
        });
        showData(search_data);
    }
}

// search on values on search bar
function searched(){
    let search = document.getElementById("search_bar");
    let data = getData();
    let filter_todo = data.filter( (x) =>{
        return x[0].toLowerCase().includes(search.value) || x[1].toLowerCase().includes(search.value);
    });
    showData(filter_todo);
}
