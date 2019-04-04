import { Component, Input, Output, EventEmitter } from '@angular/core';
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


  updateNote() {
    this.noteUpdateEvent.emit(this.note);
  }

  deleteNote() {
    this.noteDeleteEvent.emit(this.note);
  }
}
