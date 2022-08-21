import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'dialog-overview-example-dialog',
    styleUrls: [ './alert-dialog.component.css' ],
    template: `
    <mat-toolbar color="primary">
    <h1 mat-dialog-title>{{data.titleText}}</h1>
    </mat-toolbar>
    <br/>
    <div mat-dialog-content>
        
  
            
                <textarea class="mat-body" style="border-thickeness:0; border: transparent; " [ngStyle]="{'height': data.chosenHeight - 180 + 'px', 'max-height': data.chosenHeight - 180 + 'px', 'width':data.chosenWidth - 70 + 'px'}">{{data.messageText}}</textarea>
     

    </div>
    <div mat-dialog-actions  >
         <button mat-button color="primary" [mat-dialog-close]="ok" cdkFocusInitial>{{data.okText}}</button>
    </div>
    `
  })
  export class AlertDialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<AlertDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }