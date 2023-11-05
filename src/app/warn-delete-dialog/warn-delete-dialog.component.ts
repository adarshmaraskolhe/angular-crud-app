import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warn-delete-dialog',
  templateUrl: './warn-delete-dialog.component.html',
  styleUrls: ['./warn-delete-dialog.component.scss']
})
export class WarnDeleteDialogComponent {

  constructor(public _dialogRef: MatDialogRef<WarnDeleteDialogComponent>) {}

  deleteRecord(){
    this._dialogRef.close(true)
  }

}
