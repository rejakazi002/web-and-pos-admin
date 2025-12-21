import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-title-change',
  templateUrl: './title-change.component.html',
  styleUrls: ['./title-change.component.scss']
})
export class TitleChangeComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Image Picker
  pickedImage = null;
  pickedMobileImage = null;
  pickedBannerImage = null;
  // Image Control
  pickedImages: any[]= [];
  pickedIcon: string[] = [];


  // Store Data
  id?: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TitleChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initDataForm();

  }
  private initDataForm() {
    this.dataForm = this.fb.group({
      title: [null],
      titleImg: [null],

    });
  }

  onSubmit() {

    this.dialogRef.close( this.dataForm.value)
  }

  /**
   * ON CLOSE DIALOG
   */
  onClose() {
    this.dialogRef.close()
  }




  removeImg(type: 'image' | 'mobileImage'){

    if (type === 'mobileImage') {
      this.dataForm.patchValue({mobileImage: null});
      this.pickedMobileImage = null;
    } else {
      this.dataForm.patchValue({image: null});
      this.pickedImage = null;

    }

  }

  onPickedImage(event: any) {
    this.dataForm.patchValue({titleImg: event[0]});
  }

}
