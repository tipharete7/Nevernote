import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { TagService } from '../tags.service';
import { Tag } from '../../../model/tag.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component';
import { NewItemDialogComponent } from './../../../shared/new-item-dialog/new-item-dialog-component';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
  animations: [
    trigger('tagsAnim', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ transform: 'translateX(-30px)', opacity: '0' }),
        animate('750ms ease-in-out')
      ]),
      transition('* => void', [
        animate('400ms ease-in-out', style({ transform: 'translateX(-30px)', opacity: '0' }))
      ])
    ])
  ]
})
export class TagsListComponent implements OnInit {

  tags: Tag[] = [];
  selectedtag: Tag;
  tagName: string;
  newTagTitle: string;
  confirmUpdateMessage: string;
  confirmDeleteMessage: string;

  constructor(private router: Router, private tagService: TagService, public dialog: MatDialog,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.getTags();
    this.setNewTagDialogPlaceholder();
  }

  getTags() {
    this.tagService.getTags().subscribe(
      data => { this.tags = data },
      error => {
        console.error("An error has occured while getting list of tags", error);
      }
    );
  }

  setNewTagDialogPlaceholder() {
    this.translateService.get("APP.TAGS.NEW_TAG").subscribe(res => {
      this.newTagTitle = res;
    });
  }

  setUpdateTagPlaceholder(tagName: string) {
    this.translateService.get("APP.TAGS.CONFIRM_UPDATE_TAG", { tagName : tagName }).subscribe((res : string) => {
       this.confirmUpdateMessage = res;
    });
  }

  setDeleteTagPlaceholder(tagName: string) {
    this.translateService.get("APP.TAGS.CONFIRM_DELETE_TAG", { tagName : tagName }).subscribe((res: string) => {
        this.confirmDeleteMessage =  res;
    });
  }

  openNewTagDialog() {
    const dialogRef = this.dialog.open(NewItemDialogComponent, {
      width: '250px',
      data: { title: this.newTagTitle, itemName: this.tagName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagName = result;
        this.createNewTag();
      }
    });
  }

  createNewTag() {
    let tag = new Tag();
    tag.name = this.tagName;
    this.tagService.createTag(tag).subscribe(
      data => {
        this.tags.push(tag);
      },
      error => { console.error("An error occured while creating tag ", error); }
    );
  }


  deleteTag(tag: Tag) {
    this.setDeleteTagPlaceholder(tag.name);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '370',
      height: '130px',
      data: this.confirmDeleteMessage
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.deleteTag(tag.id).subscribe(
          data => {
            let indexOfTag = this.tags.indexOf(tag);
            this.tags.splice(indexOfTag, 1);
          },
          error => { console.error("An error has occurred while deleting the tag", error); }
        );
      }
    });
  }

  updateTag(tag: Tag) {
    this.setUpdateTagPlaceholder(tag.name);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '280px',
      height: '120px',
      data: this.confirmUpdateMessage
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.updateTag(tag).subscribe(
          data => {
          },
          error => {
            console.error("An error occurred while updating the tag", error);
          });
      }
    });
  }

  state = 'active';
}
