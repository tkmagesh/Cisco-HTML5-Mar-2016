window.addEventListener("DOMContentLoaded", init);
		var txtTask, olTaskList;
		var maxTaskId = 0;
		var storage = window.localStorage;
		window.onstorage = loadTasksFromStorage;
		
		function init(){
			var btnAddTask = document.getElementById("btnAddTask");
			btnAddTask.addEventListener("click", onBtnAddTaskClick);

			var btnRemoveCompleted = document.getElementById("btnRemoveCompleted");
			btnRemoveCompleted.addEventListener("click", onBtnRemoveCompletedClick);

			txtTask = document.getElementById("txtTask");
			olTaskList = document.getElementById("olTaskList");

			loadTasksFromStorage();
		}

		function loadTasksFromStorage(){
			olTaskList.innerHTML = '';
			for(var i=0; i<storage.length; i++){
				var task = JSON.parse(storage.getItem(storage.key(i)));
				addTaskToList(task);
				maxTaskId = task.id > maxTaskId ? task.id : maxTaskId;
			}
		}

		function onBtnAddTaskClick(){
			var taskName = txtTask.value;
			var newTask = {
				id : ++maxTaskId,
				name : taskName,
				isCompleted : false
			};
			storage.setItem(newTask.id, JSON.stringify(newTask));
			addTaskToList(newTask);
		}
		function addTaskToList(task){
			var newTaskItem = document.createElement("li");
			newTaskItem.innerHTML = task.name;
			newTaskItem.setAttribute("task-id", task.id);
			if (task.isCompleted){
				newTaskItem.classList.add("completed");
			}
			newTaskItem.addEventListener("click", onTaskItemClick);
			olTaskList.appendChild(newTaskItem);
		}
		function onTaskItemClick(){
			var taskId = this.getAttribute("task-id");
			this.classList.toggle("completed");
			var task = JSON.parse(storage.getItem(taskId));
			task.isCompleted = this.classList.contains("completed");
			storage.setItem(task.id, JSON.stringify(task));
		}
		function onBtnRemoveCompletedClick(){
			for(var i=olTaskList.children.length-1; i>=0; i--){
				var taskItem = olTaskList.children[i];
				var taskId = taskItem.getAttribute("task-id");
				if (taskItem.classList.contains("completed")){
					taskItem.removeEventListener("click", onTaskItemClick);
					taskItem.remove();
					storage.removeItem(taskId);
				}
			}
		}