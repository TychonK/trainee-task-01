import { storage } from "./index.js";

// funtion to display data stored in the storage
export function displayNotes(){
	let notesObj;
	let notesString = storage;
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = notesString;
	}
	
	let html = '';
	
    notesObj.forEach(function (note, index) {
        
        if (!note.archived) {
            html += `
				<div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style="width: 18rem;">
					<div class="card-body">
						<h6>${note.time}</h6>
						<p class="card-text">${note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                        ${note.dates ? `<p class="card-subtitle mb-2 text-warning">DATE: ${note.dates}</p>` : ''}
                        <p class="card-text text-info">Category: ${note.category}</p>
                        <button id="${index}" onclick=openModal(this.id) class="btn btn-info">Edit</button>
                        <button id="${index}" onclick=archiveNote(this.id) class="btn btn-success">Archive</button>
                        <button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">Delete</button>
					</div>
				</div>
			`;
        } else {
            return
        }
	});
	
    let noteEle = document.getElementById('notes');
    
    const allActive = storage.filter(note => !note.archived)
	
	if(allActive.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Nothing to display</h3>';
	}
	
}

//function to display archivede notes
export function displayArchived() {
    let notesObj;
    let notesString = storage;

    if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = notesString;
	}
	
	let html = '';
	
    notesObj.forEach(function (note, index) {  
        if (note.archived) {
            html += `
				<div class="card mx-4 my-2 bg-secondary text-white thatsMyNote" style="width: 18rem;">
					<div class="card-body">
						<h6>${note.time}</h6>
						<p class="card-text">${note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                        ${note.dates ? `<p class="card-subtitle mb-2 text-warning">DATE: ${note.dates}</p>` : ''}
                        <p class="card-text text-info">Category: ${note.category}</p>
                        <button id="${index}" onclick=unarchiveNote(this.id) class="btn btn-success">Unarchive</button>
					</div>
				</div>
			`;
        } else {
            return
        }
    });
    let noteEle = document.getElementById('notes');
	
	const allArchived = storage.filter(note => note.archived)
	
	if(allArchived.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Nothing to display</h3>';
	}
}

//function to display table
export function displayTable() {
    const data = getTableData()
    let html = `
                    <tr>
                        <th scope="row">Task</th>
                        <td>${data.taskActive}</td>
                        <td>${data.taskArchived}</td>
                    </tr>
                    <tr>
                        <th scope="row">Idea</th>
                        <td>${data.ideaActive}</td>
                        <td>${data.ideaArchived}</td>
                    </tr>
                    <tr>
                        <th scope="row">Random thought</th>
                        <td>${data.thoughtActive}</td>
                        <td>${data.thoughtArchived}</td>
                    </tr>
                `

    const tableBody = document.querySelector('#table-body')
    tableBody.innerHTML = html
}

//function to get table data
function getTableData() {
    const dataObj = {
            taskActive: 0,
            taskArchived: 0,
            ideaActive: 0,
            ideaArchived: 0,
            thoughtActive: 0,
            thoughtArchived: 0
        }
    
    const tasks = storage.filter(note => note.category === 'task')
    const ideas = storage.filter(note => note.category === 'idea')
    const thoughts = storage.filter(note => note.category === 'random thought')

    tasks.forEach(task => {
        if (task.archived) {
            dataObj.taskArchived++
        } else {
            dataObj.taskActive++
        }
    })
    ideas.forEach(idea => {
        if (idea.archived) {
            dataObj.ideaArchived++
        } else {
            dataObj.ideaActive++
        }
    })
    thoughts.forEach(thought => {
        if (thought.archived) {
            dataObj.thoughtArchived++
        } else {
            dataObj.thoughtActive++
        }
    })

    return dataObj
}
