import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from './../../models/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note: Note;

  @Output() noteUpdateEvent: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDeleteEvent: EventEmitter<Note> = new EventEmitter<Note>();

  constructor(public router: Router) {
    //this.note.content = this.note.content.innerHTML.substr(0,15);
  }

  updateNote(note : Note) {
    this.router.navigate(['/newNote', note.id]);
  }

  deleteNote() {
    this.noteDeleteEvent.emit(this.note);
  }
}
