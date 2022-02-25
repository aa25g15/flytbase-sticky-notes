import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() noteId: number = 0;

  noteForm: FormGroup = new FormGroup({
    textBody: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      const dragButton: HTMLElement | null = document.getElementById(`note-drag-button-${this.noteId}`);
      const noteElement: HTMLElement | null = document.getElementById(`note-id-${this.noteId}`);

      if (dragButton && noteElement) {
        console.log("Drag started", dragButton);
        this.dragElement(dragButton, noteElement);
      } else {
        console.log("Elements undefined!", dragButton, noteElement);
      }
    }, 1000);
  }

  dragElement(triggerElement: HTMLElement, targetElement: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    triggerElement.onmousedown = dragMouseDown;
  
    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      targetElement.style.top = (targetElement.offsetTop - pos2) + "px";
      targetElement.style.left = (targetElement.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

}
