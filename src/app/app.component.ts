import { Component } from '@angular/core';
import { Note } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes: Note[] = [] // Storage for notes
  nextId: number = 0;
  isKeyboardControl: boolean = true;
  currentSelectedNoteId: number = 0;

  addNote(){
    this.notes.push({
      id: this.nextId,
    });

    this.currentSelectedNoteId = this.nextId;

    this.nextId++;
  }

  deleteNote(id: number){
    const deleteIndex = this.notes.findIndex(x => x.id == id);
    
    if(deleteIndex != -1){
      this.notes.splice(deleteIndex, 1);
    } else {
      console.log("There is a bug, index not found in list!", id);
    }
  }

  selectNote(id: number){
    this.currentSelectedNoteId = id;
  }

  toggleKeyboardControl(){
    this.isKeyboardControl = !this.isKeyboardControl;
    const currentNoteElement: HTMLElement | null = document.getElementById(`note-id-${this.currentSelectedNoteId}`);

    if(currentNoteElement){
      currentNoteElement.onkeydown = function(e){
        e = e || window.event;
        e.preventDefault();
        
      };
    } else {
      console.log("There is a problem, could not find current note element.");
    }
  }
}
