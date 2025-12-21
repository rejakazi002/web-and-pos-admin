import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-new-release-dialog',
  templateUrl: './new-release-dialog.component.html',
  styleUrl: './new-release-dialog.component.scss'
})
export class NewReleaseDialogComponent {
  protected readonly environment = environment;
  
  constructor(
    public dialogRef: MatDialogRef<NewReleaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  closeModal(): void {
    this.dialogRef.close(true);
  }

  viewMore(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/new-release-report']);
  }
}
