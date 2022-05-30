let btnAddTask = document.querySelector('.form button')
let taskName = document.querySelector('#content')

let tasks= getTaskFromLocalStorage()
    renderTasks(tasks)

//Function nút Add
btnAddTask.addEventListener('click', function () {
    if (!taskName.value) {
        alert('Bạn vui lòng nhập nội dung')
    }
    let taskId = this.getAttribute("id")
    let tasks = getTaskFromLocalStorage()
    let task = {name: taskName.value}
    if(taskId ===0 || taskId && taskName.value){
        tasks[taskId] = task
        this.removeAttribute("id")
    } else {
        if(!taskName.value){
            return false
        }
        tasks.push(task)
    }
    taskName.value = ''
    localStorage.setItem("tasks",JSON.stringify(tasks))
    renderTasks(tasks)
})
// Render mảng
function renderTasks(tasks = []) {
    let content = '<ul>'
    tasks.forEach((task, index) => {
        content += `<li>                
                    <div class="task-name">${task.name}</div>
                    <button onclick="editTask(${index})">Sửa</button>
                    <button onclick="deleteTask(${index})">Xoá</button> 
                    </li>`
    })
    content += '</ul>'
    document.querySelector('#result').innerHTML = content
}
//Lấy dữ liệu từ LocalStorage
function getTaskFromLocalStorage(){
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
}
//Nút Edit
function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if(tasks.length>0) {
        taskName.value = tasks[id].name
        btnAddTask.setAttribute("id",id)
    }
}
//Nút Xoá
function deleteTask(id) {
    let mangDelete = getTaskFromLocalStorage()
    if (confirm("Bạn có muốn xoá") === true){
        mangDelete.splice(id,1)
    }
    localStorage.setItem("tasks", JSON.stringify(mangDelete))
    renderTasks(getTaskFromLocalStorage())
}