"use strict";

let form = document.querySelector('form');
let input = document.querySelector('input');
let addNoteBtn = document.getElementById('addNoteBtn');
let editNoteBtn = document.getElementById('editNoteBtn');
let submit = document.querySelector('input[type="submit"]');
let notesList = document.getElementsByClassName('list-group');
let colorList = document.getElementsByTagName('select');
let selectedNote = 0;
let selectedColor = '#ffffff';
let editMode = false;

input.addEventListener('keyup', typingNote);
form.addEventListener('submit', runSubmit);
editNoteBtn.addEventListener('click', createNote);
colorList[0].addEventListener('change', setColor);

// validates there is a note to add.
function typingNote(e) {
  if (!editMode) {
    if (input.value.length) {
      addNoteBtn.classList.remove("disabled");
    }
    else {
      addNoteBtn.classList.add("disabled");
    }
  } else {
    if (input.value.length) {
      editNoteBtn.classList.remove("disabled");
    }
    else {
      editNoteBtn.classList.add("disabled");
    }
  }
}

// get note's data and requires a new note, then resets form.
function runSubmit(e) {
  e.preventDefault();
  if (input.value) {
    createNote();
    addNoteBtn.classList.add("disabled");
  }
}

// get data of selected note
function getNote(e) {
  e.preventDefault();
  let nodes = Array.from( notesList[0].children );

  editMode = true;
  selectedNote = nodes.indexOf(e.target);
  input.value = e.target.textContent;
  editNoteBtn.classList.remove("disabled");
}

// creates/edits a new/existing note
function createNote() {
  let newLiText = document.createTextNode(input.value);
  let newLi =  document.createElement('li');

  newLi.className = 'list-group-item';
  newLi.appendChild(newLiText);
  newLi.style.backgroundColor = selectedColor;
  newLi.addEventListener('click', getNote);
  newLi.addEventListener('dblclick', deleteNote);
  if (!editMode) {
    notesList[0].appendChild(newLi);
  }
  else {
    let nodes = Array.from( notesList[0].children );

    notesList[0].replaceChild(newLi, nodes[selectedNote]);
    editNoteBtn.classList.add("disabled");
  }
  editMode = false;
  input.value = '';
}

// delete selected note from UI
function deleteNote(e) {
  e.preventDefault();
  notesList[0].removeChild(e.target);
  selectedNote = 0;
  input.value = '';
  editMode = false;
}

// set color for new/edited note
function setColor(e) {
  selectedColor = e.target.options[e.target.selectedIndex].text;
}

