import { WallpaperService } from './services/wallpaper.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'dissapear', [
        transition(':leave', [
          style({opacity: '1'}),
          animate('0.3s', style({opacity: '0'}))
        ])
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  notes: Note[] = [] // Storage for notes
  nextId: number = 0;
  isKeyboardControl: boolean = false;
  currentSelectedNoteId: number = 0;
  previousSelectedNoteId: number = 0;
  incrementOnKeyPress: number = 16;
  isTypingInNote: boolean = false;

  constructor(private wallpaperService: WallpaperService){}

  ngOnInit(): void {
    this.toggleKeyboardControl();

    this.wallpaperService.changeWallpaper();
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

    if (currentSelectedNoteElement && previousSelectedNoteElement) {
      previousSelectedNoteElement.style.zIndex = `${this.previousSelectedNoteId + 1}`;
      currentSelectedNoteElement.style.zIndex = `${this.nextId + 1}`;
    }
  }

  toggleKeyboardControl() {
    this.isKeyboardControl = !this.isKeyboardControl;
    const noteContainer: HTMLElement | null = document.getElementById("notes-container-id");

    const moveWithKeys = (e: any) => {
      e = e || window.event;
      const currentSelectedNoteElement: HTMLElement | null = document.getElementById(`note-id-${this.currentSelectedNoteId}`);

      if (!this.isTypingInNote) {
        if (currentSelectedNoteElement && noteContainer) {
          currentSelectedNoteElement.classList.add("smooth-movement");
          switch (e.key) {
            case "w":
              this.moveNoteUpOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "s":
              this.moveNoteDownOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "a":
              this.moveNoteLeftOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "d":
              this.moveNoteRightOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "ArrowUp":
              this.moveNoteUpOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "ArrowDown":
              this.moveNoteDownOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "ArrowLeft":
              this.moveNoteLeftOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "ArrowRight":
              this.moveNoteRightOnKeyPress(currentSelectedNoteElement, noteContainer);
              break;
            case "Delete":
              this.deleteNote(this.currentSelectedNoteId);
          }
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

  moveNoteRightOnKeyPress(noteElement: HTMLElement, noteContainer: HTMLElement) {
    if (noteContainer &&
      noteElement.firstElementChild &&
      (noteContainer.getBoundingClientRect().right -
        noteElement.firstElementChild.getBoundingClientRect().right - 32 > 0)) {
      noteElement.style.left = (noteElement.offsetLeft + this.incrementOnKeyPress) + "px";
    }
  }

  moveNoteLeftOnKeyPress(noteElement: HTMLElement, noteContainer: HTMLElement) {
    if (noteContainer &&
      noteElement.firstElementChild &&
      (noteElement.firstElementChild.getBoundingClientRect().left -
        noteContainer.getBoundingClientRect().left - 32 > 0)) {
      noteElement.style.left = (noteElement.offsetLeft - this.incrementOnKeyPress) + "px";
    }
  }

  moveNoteUpOnKeyPress(noteElement: HTMLElement, noteContainer: HTMLElement) {
    if (noteContainer &&
      noteElement.firstElementChild &&
      (noteElement.firstElementChild.getBoundingClientRect().top -
        noteContainer.getBoundingClientRect().top - 32 > 0)) {
      noteElement.style.top = (noteElement.offsetTop - this.incrementOnKeyPress) + "px";
    }
  }

  moveNoteDownOnKeyPress(noteElement: HTMLElement, noteContainer: HTMLElement) {
    if (noteContainer &&
      noteElement.firstElementChild &&
      (noteContainer.getBoundingClientRect().bottom -
        noteElement.firstElementChild.getBoundingClientRect().bottom - 32 > 0)) {
      noteElement.style.top = (noteElement.offsetTop + this.incrementOnKeyPress) + "px";
    }
  }

  changeWallpaper(){
    this.wallpaperService.changeWallpaper();
  }
}
