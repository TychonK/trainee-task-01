import { displayNotes, displayArchived, displayTable } from "./display.js";
import { deleteNote, openModal, saveChangedNote, closeModal, archiveNote, unarchiveNote } from "./notes.js";

export const storage = [
    {
        text: 'Lorem 06/01/2022 to 06/02/2022 ipsum',
        time: '2022-2-3 | 16:21',
        category: 'task',
        archived: false
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-3 | 12:33',
        category: 'idea',
        archived: false
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-2 | 11:33',
        category: 'random thought',
        archived: false
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-1 | 13:53',
        category: 'idea',
        dates: '2022-02-05 | 12:00',
        archived: false
    },
    {
        text: 'Lorem ipsum',
        time: '2022-2-10 | 10:00',
        category: 'task',
        dates: '2022-12-20 | 14:15',
        archived: true
    }
]

displayNotes();
displayTable();

// below event listener will add user input into the storage
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function(){
	
	let notesObj;
    const addNote = document.getElementById('addNote');
    const addDate = document.getElementById('input-date');
    const addTime = document.getElementById('input-time');
    const category = document.getElementById('selection')
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
	
    //manage dates
    let appointment;
    if (addDate.value.length === 0 && addTime.value.length === 0) {
        appointment = null
    } else if (addDate.value.length === 0 || addTime.value.length === 0) {
        alert('Please enter both - date and time')
        return
    } else {
        appointment = `${addDate.value} | ${addTime.value}`
    }

    //handle categories
    if (category.value == 'null') {
        alert('Please select the category')
        return
    }

	//pushing into storage
	let tempObj = { text: addNote.value, time: dateTime, category: category.value, dates: appointment };
	
    try {
        storage.push(tempObj);
    } catch (error) {
        alert(error)
    }
	
    addNote.value = '';
    category.value = 'null';
	
    displayNotes();
    displayTable();
});

// add event listener to the switch for showing the archived notes
const switchArchived = document.querySelector('#flexSwitchCheckDefault')

switchArchived.addEventListener('click', function (e) {
    e.target.classList.toggle("show-archived")

    const shouldShowArchived = [...e.target.classList].includes("show-archived")

    shouldShowArchived ? displayArchived() : displayNotes()
})

// make global functions scope
window.deleteNote = deleteNote

window.openModal = openModal

window.saveChangedNote = saveChangedNote

window.closeModal = closeModal

window.archiveNote = archiveNote

window.unarchiveNote = unarchiveNote
