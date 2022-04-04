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

        const dateType = /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;

        const isMatch = [...note.text.matchAll(dateType)]
        const foundDates = isMatch.map(match => {
            return match[0]
        })

        let dates = '';

        if (foundDates.length > 0) {
            foundDates.forEach(date => {
                dates += date + ' | '
            })
        }

        if (!note.archived) {
            html += `
				<div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style="width: 18rem;">
					<div class="card-body">
						<h6>${note.time}</h6>
						<p class="card-text">${note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                        ${note.dates ? `<p class="card-subtitle mb-2 text-warning">DATE: ${note.dates}</p>` : ''}
                        ${dates.length > 0 ? `<p class="card-subtitle mb-2 text-danger">DATES: ${dates}<p/>` : ''}
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

    let html = '';

    data.forEach(category => {

        const key = Object.keys(category)

        html += `
                    <tr>
                        <th scope="row">${key}</th>
                        <td>${category[key].active}</td>
                        <td>${category[key].archived}</td>
                    </tr>
                `;
    })

    const tableBody = document.querySelector('#table-body')
    tableBody.innerHTML = html
}

//function to get table data
function getTableData() {
    const allCategories = storage.map(note => {
        return note.category
    })

    const uniqueCategories = Array.from(new Set(allCategories))

    const filteredCategories = uniqueCategories.map(uniqueCategory => {
        const obj = {
            [uniqueCategory]: {
                active: storage.filter(note => note.category === uniqueCategory && note.archived === false).length,
                archived: storage.filter(note => note.category === uniqueCategory && note.archived === true).length
            }
        }
        return obj
    })

    return filteredCategories
}
