import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PointService } from '../../../../services/common/point.service';
import { UiService } from '../../../../services/core/ui.service';
import { Point } from '../../../../interfaces/common/point.interface';

@Component({
  selector: 'app-point-settings',
  templateUrl: './point-settings.component.html',
  styleUrls: ['./point-settings.component.scss']
})
export class PointSettingsComponent implements OnInit, OnDestroy {
  pointSettingsForm: FormGroup;
  isLoading: boolean = false;
  pointData: Point = null;

  private subDataOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private pointService: PointService,
    private uiService: UiService
  ) {
    this.pointSettingsForm = this.fb.group({
      pointAmount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      pointValue: [1, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.loadPointSettings();
  }

  /**
   * LOAD POINT SETTINGS
   */
  private loadPointSettings() {
    this.isLoading = true;
    this.subDataOne = this.pointService.getPoint().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.pointData = res.data;
          this.pointSettingsForm.patchValue({
            pointAmount: res.data.pointAmount || 0,
            pointValue: res.data.pointValue || 1,
          });
        } else {
          // No point settings found, use defaults
          this.pointSettingsForm.patchValue({
            pointAmount: 0,
            pointValue: 1,
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading point settings:', err);
        this.uiService.message('Failed to load point settings', 'warn');
      }
    });
  }

  /**
   * SUBMIT FORM
   */
  onSubmit() {
    if (this.pointSettingsForm.invalid) {
      this.uiService.message('Please fill all required fields correctly', 'warn');
      return;
    }

    const formData = this.pointSettingsForm.value;
    
    this.isLoading = true;
    this.subDataOne = this.pointService.addPoint(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.message('Point settings saved successfully', 'success');
          this.loadPointSettings();
        } else {
          this.uiService.message(res.message || 'Failed to save point settings', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error saving point settings:', err);
        this.uiService.message('Failed to save point settings', 'warn');
      }
    });
  }

  /**
   * GET POINT CALCULATION EXAMPLE
   */
  getPointExample(): string {
    const pointAmount = this.pointSettingsForm.get('pointAmount')?.value || 0;
    const pointValue = this.pointSettingsForm.get('pointValue')?.value || 1;
    const exampleAmount = 1000;
    const pointsEarned = Math.floor((pointAmount * exampleAmount) / 100);
    const discountValue = pointsEarned * pointValue;
    
    return `For a purchase of ${exampleAmount} Tk, customer will earn ${pointsEarned} points (worth ${discountValue} Tk)`;
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}

