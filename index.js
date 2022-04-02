const addBtn = document.getElementById('addBtn');

const storage = [
    {
        text: 'Lorem ipsum',
        time: '2022-2-3 | 16:21'
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-3 | 12:33'
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-2 | 11:33'
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-1 | 13:53',
        dates: '2022-02-05 | 12:00'
    }
]

displayNotes();

// below event listener will add user input into the storage
addBtn.addEventListener('click', function(){
	
	let notesObj;
    const addNote = document.getElementById('addNote');
    const addDate = document.getElementById('input-date');
    const addTime = document.getElementById('input-time')
	let notesString = storage;
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = notesString;
	}
	
	//Add date
	let now = new Date();
	let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} | ${now.getHours()}:${now.getMinutes()}`;
	
    let appointment;
    if (addDate.value.length === 0 && addTime.value.length === 0) {
        appointment = null
    } else if (addDate.value.length === 0 || addTime.value.length === 0) {
        alert('Please enter both - date and time')
        return
    } else {
        appointment = `${addDate.value} | ${addTime.value}`
    }
	//pushing into storage
	let tempObj = { text: addNote.value, time: dateTime, dates: appointment };
	
    storage.push(tempObj);
	
	addNote.value = '';
	
	displayNotes();
});


// funtion to display data stored in the storage
function displayNotes(){
	let notesObj;
	let notesString = storage;
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = notesString;
	}
	
	let html = '';
	
	notesObj.forEach(function(note, index){
		html += `
				<div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style="width: 18rem;">
					<div class="card-body">
						<h6>${note.time}</h6>
						<p class="card-text">${note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                        ${note.dates ? `<p class="card-subtitle mb-2 text-muted">DATE: ${note.dates}</p>` : ''}
                        <button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">Delete</button>
                        <button id="${index}" onclick=openModal(this.id) class="btn btn-info">Edit</button>
					</div>
				</div>
			`;
	});
	
	let noteEle = document.getElementById('notes');
	
	if(notesObj.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Nothing to display</h3>';
	}
	
}


//function to delete a note
function deleteNote(index){
	storage.splice(index, 1)
	
	displayNotes();
}

//function to open edit modal
function openModal(id) {
    const modal = document.getElementById('modal')
    const date = document.getElementById('modal-input-date')
    const time = document.getElementById('modal-input-time')
    const text = document.getElementById('modal-input-text')

    const saveBtn = `<button id="${id}" onclick="saveChangedNote(this.id)" type="button" class="btn btn-primary" id="saveChangedBtn">Save changes</button>`
    document.querySelector('.modal-footer').insertAdjacentHTML('beforeend', saveBtn);


    modal.style.display = 'block' 
    text.value = storage[id].text
    if (!storage[id].dates) {
        return
    }
    date.value = storage[id].dates.slice(0, 10)
    time.value = storage[id].dates.slice(-5)
}

//function to save the edit in the note
function saveChangedNote(id) {
    const date = document.getElementById('modal-input-date')
    const time = document.getElementById('modal-input-time')
    const text = document.getElementById('modal-input-text')

    storage[id].text = text.value
    storage[id].dates = `${date.value} | ${time.value}`

    closeModal()
    displayNotes()
}

//function to close modal
function closeModal() {
    const date = document.getElementById('modal-input-date')
    const time = document.getElementById('modal-input-time')
    const text = document.getElementById('modal-input-text')
    const modal = document.getElementById('modal')

    document.querySelector('.modal-footer').innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeModal()">Close</button>`

    text.value = ''
    date.value = ''
    time.value = ''
    modal.style.display = 'none'    
}