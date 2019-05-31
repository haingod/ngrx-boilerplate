import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  message: string;
  title: string;
  onSubmit: any;
  isLoading$: any;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.message = data.message;
    this.onSubmit = data.onSubmit;
    this.isLoading$ = data.isLoading$;
  }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close(false);
  }
}
