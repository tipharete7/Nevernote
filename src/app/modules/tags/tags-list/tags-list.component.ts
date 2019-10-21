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
  }

  getTags() {
    this.tagService.getTags().subscribe(
      data => { this.tags = data },
      err => {
        console.error("An error has occured while getting list of tags");
      }
    );
  }

  setNewTagDialogPlaceholder() {
    this.translateService.get("APP.TAGS.NEW_TAG").subscribe(res => {
      this.newTagTitle = res;
    });
  }

  setUpdateTagPlaceholder() {
    this.translateService.get("APP.TAGS.CONFIRM_UPDATE_TAG").subscribe((res : string) => {
       this.confirmUpdateMessage = res;
    });
  }

  setDeleteTagPlaceholder() {
    this.translateService.get("APP.TAGS.CONFIRM_DELETE_TAG").subscribe((res: string) => {
        this.confirmDeleteMessage =  res;
    });
  }

  openNewTagDialog() {
    this.setNewTagDialogPlaceholder();

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
      err => { console.error("An error occured while creating tag "); }
    );
  }


  deleteTag(tag: Tag) {
    this.setDeleteTagPlaceholder();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '150px',
      data: this.confirmDeleteMessage
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.deleteTag(tag.id).subscribe(
          data => {
            let indexOfTag = this.tags.indexOf(tag);
            this.tags.splice(indexOfTag, 1);
          },
          err => { console.error("An error has occurred while deleting the tag"); }
        );
      }
    });
  }

  updateTag(tag: Tag) {
    this.setUpdateTagPlaceholder();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '150px',
      data: this.confirmUpdateMessage
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.updateTag(tag).subscribe(
          data => {
            console.log(JSON.stringify(data));
          },
          err => {
            console.error("An error occurred while updating the tag");
          });
      }
    });
  }

  state = 'active';
}
