import { displayNotes, displayTable, displayArchived } from "./display.js";
import { storage } from "./index.js";

// function to delete a note
export function deleteNote(index){
	storage.splice(index, 1)
	
    displayNotes();
    displayTable();
}

// function to open the edit modal
export function openModal(id) {
    const modal = document.getElementById('modal')
    const date = document.getElementById('modal-input-date')
    const time = document.getElementById('modal-input-time')
    const text = document.getElementById('modal-input-text')
    const category = document.getElementById('modal-selection')

    const saveBtn = `<button id="${id}" onclick="saveChangedNote(this.id)" type="button" class="btn btn-primary" id="saveChangedBtn">Save changes</button>`
    document.querySelector('.modal-footer').insertAdjacentHTML('beforeend', saveBtn);

    modal.style.display = 'block' 
    text.value = storage[id].text
    category.value = storage[id].category
    if (!storage[id].dates) {
        return
    }
    date.value = storage[id].dates.slice(0, 10)
    time.value = storage[id].dates.slice(-5)
}

// function to save the edit in the note
export function saveChangedNote(id) {
    const date = document.getElementById('modal-input-date')
    const time = document.getElementById('modal-input-time')
    const text = document.getElementById('modal-input-text')
    const category = document.getElementById('modal-selection')

    if (category.value == 'null') {
        alert('Select a proper category')
        return
    }
    storage[id].category = category.value  
    storage[id].text = text.value

    let appointment
    if (date.value.length === 0 && time.value.length === 0) {
        appointment = null
    } else if (date.value.length === 0 || time.value.length === 0) {
        alert('Please enter both - date and time')
        return
    } else {
        appointment = `${date.value} | ${time.value}`
    }
    storage[id].dates = appointment

    closeModal()
    displayNotes()
    displayTable()
}

// function to close modal
export function closeModal() {
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

// function to archive a note
export function archiveNote(id) {
    try {
        storage[id].archived = true
    } catch (error) {
        alert(error)
    }

    displayNotes();
    displayTable();
}

// funciton to unarchive a note
export function unarchiveNote(id) {
    try {
        storage[id].archived = false
    } catch (error) {
        alert(error)
    }

    displayArchived();
    displayTable();
}