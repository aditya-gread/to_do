showAllData();

function open_popup(){
    document.getElementById("item_form").style.display = "block";
}

function close_popup(){
    document.getElementById('task_form').reset();
    document.getElementById("item_form").style.display = "none";
}

function open_filter(){
    document.getElementById("id_filter").style.display = "block";
}

function close_filter(){
    document.getElementById("id_filter").style.display = "none";
}
function validate(){
    let title = document.forms["task"]["task_title"].value;
    if( title.trim() == ""){
        alert("Title can't be empty");
        return false;
    }
    return true;
}

// Add new task
function addItem(){
    open_popup();
    document.getElementById('add_task').style.display = "block";
    document.getElementById('update_task').style.display = "none";
    if(!validate()){
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
    console.log(document.getElementById('task_complete').value);
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
    document.forms["task"]["task_date"] = data[index][2];
    document.getElementById('task_complete').checked = data[index][3];

    document.getElementById('update_task').addEventListener("click", function(event){
        console.log(event)
        data[index] = [];
        let temp = [
            document.forms["task"]["task_title"].value,
            document.forms["task"]["task_description"].value,
            document.forms["task"]["task_date"].value,
            document.getElementById('task_complete').checked,
        ];
        if(!validate()){
            return;
        }
        data[index] = temp;
        putData(data);
        close_popup();
        showAllData();
    });
}

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
            html = html + `<tr><td>${sno}</td> <td>${data[ind][0]}</td> <td style="text-align:left;">${data[ind][1]}</td> <td>${data[ind][2]}</td><td>${data[ind][3]}</td><td style="text-align: center;"><button style="background-color: blue;" type="button" onclick = "editData(${ind})">Edit</button> <button style="background-color: red;" type="button" onclick = "deleteData(${ind})">Delete</button></td></tr>`;
            sno++;
        }
        document.getElementById('root').innerHTML = html;
        }
}

function searchedData(){
    if(document.getElementById('search_bar').value == ""){
        alert("Search bar is empty");
        return;
    }else{
        let search = document.getElementById('search_bar').value;
        let data = getData();
        let search_data = data.filter(function (x) {
            return x[0] == search;
        });
        showData(search_data);
    }
}
