import { Component, OnInit } from '@angular/core';
import { Note } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [] // Storage for notes
  nextId: number = 0;
  isKeyboardControl: boolean = false;
  currentSelectedNoteId: number = 0;
  previousSelectedNoteId: number = 0;
  incrementOnKeyPress: number = 16;

  ngOnInit(): void {
    this.toggleKeyboardControl();
  }

  addNote() {
    this.notes.push({
      id: this.nextId,
    });

    this.selectNote(this.nextId);

    this.nextId++;
  }

  deleteNote(id: number) {
    const deleteIndex = this.notes.findIndex(x => x.id == id);

    if (deleteIndex != -1) {
      this.notes.splice(deleteIndex, 1);
    } else {
      console.log("There is a bug, index not found in list!", id);
    }
  }

  selectNote(id: number) {
    this.previousSelectedNoteId = this.currentSelectedNoteId;
    this.currentSelectedNoteId = id;
    const currentSelectedNoteElement: HTMLElement | null = document.getElementById(`note-id-${this.currentSelectedNoteId}`);
    const previousSelectedNoteElement: HTMLElement | null = document.getElementById(`note-id-${this.previousSelectedNoteId}`);

    if(currentSelectedNoteElement && previousSelectedNoteElement){
      previousSelectedNoteElement.style.zIndex = `${this.previousSelectedNoteId+1}`;
      currentSelectedNoteElement.style.zIndex = `${this.nextId+1}`;
    }
  }

  toggleKeyboardControl() {
    this.isKeyboardControl = !this.isKeyboardControl;

    const moveWithKeys = (e: any) => {
      e = e || window.event;
      e.preventDefault();
      const currentSelectedNoteElement: HTMLElement | null = document.getElementById(`note-id-${this.currentSelectedNoteId}`);

      if (currentSelectedNoteElement && currentSelectedNoteElement.offsetParent) {
        currentSelectedNoteElement.classList.add("smooth-movement");
        switch (e.key) {
          case "w":
            this.moveNoteUpOnKeyPress(currentSelectedNoteElement);
            break;
          case "s":
            this.moveNoteDownOnKeyPress(currentSelectedNoteElement);
            break;
          case "a":
            this.moveNoteLeftOnKeyPress(currentSelectedNoteElement);
            break;
          case "d":
            this.moveNoteRightOnKeyPress(currentSelectedNoteElement);
            break;
          case "ArrowUp":
            this.moveNoteUpOnKeyPress(currentSelectedNoteElement);
            break;
          case "ArrowDown":
            this.moveNoteDownOnKeyPress(currentSelectedNoteElement);
            break;
          case "ArrowLeft":
            this.moveNoteLeftOnKeyPress(currentSelectedNoteElement);
            break;
          case "ArrowRight":
            this.moveNoteRightOnKeyPress(currentSelectedNoteElement);
            break;
          case "Delete":
            this.deleteNote(this.currentSelectedNoteId);
        }
      }
    };

    if (this.isKeyboardControl) {
      window.onkeydown = moveWithKeys;
    } else {
      window.onkeydown = null;
    }
  }

  openInNew(url: string) {
    window.open(url, "_blank");
  }

  moveNoteRightOnKeyPress(noteElement: HTMLElement){
    const noteContainer = document.getElementById("notes-container-id");
    if(noteContainer &&
      noteElement.firstElementChild &&
      (noteContainer.getBoundingClientRect().right -
      noteElement.firstElementChild.getBoundingClientRect().right - 32 > 0)){
        noteElement.style.left = (noteElement.offsetLeft + this.incrementOnKeyPress) + "px";
    }
  }

  moveNoteLeftOnKeyPress(noteElement: HTMLElement){
    const noteContainer = document.getElementById("notes-container-id");
    if(noteContainer &&
      noteElement.firstElementChild &&
      (noteElement.firstElementChild.getBoundingClientRect().left -
      noteContainer.getBoundingClientRect().left - 32 > 0)){
        noteElement.style.left = (noteElement.offsetLeft - this.incrementOnKeyPress) + "px";
    }
  }

  moveNoteUpOnKeyPress(noteElement: HTMLElement){
    const noteContainer = document.getElementById("notes-container-id");
    if(noteContainer &&
      noteElement.firstElementChild &&
      (noteElement.firstElementChild.getBoundingClientRect().top -
      noteContainer.getBoundingClientRect().top - 32 > 0)){
        noteElement.style.top = (noteElement.offsetTop - this.incrementOnKeyPress) + "px";
    }
  }

  moveNoteDownOnKeyPress(noteElement: HTMLElement){
    const noteContainer = document.getElementById("notes-container-id");
    if(noteContainer &&
      noteElement.firstElementChild &&
      (noteContainer.getBoundingClientRect().bottom -
      noteElement.firstElementChild.getBoundingClientRect().bottom - 32 > 0)){
        noteElement.style.top = (noteElement.offsetTop + this.incrementOnKeyPress) + "px";
    }
  }
}
