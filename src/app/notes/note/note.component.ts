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
  @Output() noteDeleteEvent: EventEmitter<Note> = new EventEmitter<Note>();

  constructor(public router: Router) {
  }

  updateNote(note : Note) {
    this.router.navigate(['/newNote', note.id]);
  }

  deleteNote() {
    this.noteDeleteEvent.emit(this.note);
  }
}
