function addTask() {
    const input = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const item = document.createElement("li");
    item.textContent = task;

    taskList.appendChild(item);

    input.value = "";
}
