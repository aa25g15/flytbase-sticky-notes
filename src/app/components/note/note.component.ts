import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() noteId: number = 0;
  @Input() currentSelectedNoteId: number = 0;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() isTyping: EventEmitter<boolean> = new EventEmitter<boolean>();

  noteForm: FormGroup = new FormGroup({
    textBody: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      const dragButton: HTMLElement | null = document.getElementById(`note-drag-button-${this.noteId}`);
      const noteElement: HTMLElement | null = document.getElementById(`note-id-${this.noteId}`);
      const noteContainer: HTMLElement | null = document.getElementById("notes-container-id");

      if (dragButton && noteElement && noteContainer) {
        console.log("Drag started", dragButton);
        this.dragElement(dragButton, noteElement, noteContainer);
      } else {
        console.log("Elements undefined!", dragButton, noteElement);
      }
    }, 100);
  }

  dragElement(triggerElement: HTMLElement, targetElement: HTMLElement, containerElement: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    triggerElement.onmousedown = dragMouseDown;

    // function checkNoteMovementBounds(value: number, dir: "vertical" | "horizontal") {
    //   if (containerElement && targetElement.firstElementChild) {
    //     const containerElementRect = containerElement.getBoundingClientRect();
    //     const targetElementChildRect = targetElement.firstElementChild.getBoundingClientRect();
    //     if (dir === "vertical") {
    //       if(value > 0){
    //         // Upward movement
    //         return targetElementChildRect.top - containerElementRect.top - 32 > 0;
    //       } else {
    //         // Downward movement
    //         return containerElementRect.bottom - targetElementChildRect.bottom - 32 > 0;
    //       }
    //     } else {
    //       if(value > 0){
    //         // Left movement
    //         return targetElementChildRect.left - containerElementRect.left - 32 > 0;
    //       } else {
    //         // Right movement
    //         return containerElementRect.right - targetElementChildRect.right - 32 > 0;
    //       }
    //     }
    //   }
    //   return false;
    // }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();

      targetElement.classList.remove("smooth-movement");

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
      // if (checkNoteMovementBounds(pos2, "vertical")) {
      //   targetElement.style.top = (targetElement.offsetTop - pos2) + "px";
      // }
      // if(checkNoteMovementBounds(pos2, "horizontal")){
      //   targetElement.style.left = (targetElement.offsetLeft - pos1) + "px";
      // }

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

  triggerDelete() {
    this.delete.emit(this.noteId);
  }

  isTypingEmitEvent(toEmit: boolean) {
    this.isTyping.emit(toEmit);
  }
}
