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

  addNote(){
    this.notes.push({
      id: this.nextId,
    });
    this.nextId++;
  }
}
