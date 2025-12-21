import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../../services/common/setting.service';
import { UiService } from '../../../../services/core/ui.service';

@Component({
  selector: 'app-tax-vat-settings',
  templateUrl: './tax-vat-settings.component.html',
  styleUrls: ['./tax-vat-settings.component.scss']
})
export class TaxVatSettingsComponent implements OnInit {
  taxVatForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private settingService: SettingService,
    private uiService: UiService
  ) {
    this.taxVatForm = this.fb.group({
      vatPercentage: [0, [Validators.min(0), Validators.max(100)]],
      taxPercentage: [0, [Validators.min(0), Validators.max(100)]],
      isAutoCalculateVat: [false],
      isAutoCalculateTax: [false],
      showVat: [true],
      showTax: [true],
      showServiceCharge: [true],
      showAit: [true]
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    this.isLoading = true;
    this.settingService.getSetting('posSettings').subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data?.posSettings) {
          const settings = res.data.posSettings;
          this.taxVatForm.patchValue({
            vatPercentage: settings.vatPercentage || 0,
            taxPercentage: settings.taxPercentage || 0,
            isAutoCalculateVat: settings.isAutoCalculateVat || false,
            isAutoCalculateTax: settings.isAutoCalculateTax || false,
            showVat: settings.showVat !== undefined ? settings.showVat : true,
            showTax: settings.showTax !== undefined ? settings.showTax : true,
            showServiceCharge: settings.showServiceCharge !== undefined ? settings.showServiceCharge : true,
            showAit: settings.showAit !== undefined ? settings.showAit : true
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error loading settings:', err);
        this.uiService.message('Failed to load settings', 'warn');
      }
    });
  }

  onSubmit() {
    if (this.taxVatForm.invalid) {
      this.uiService.message('Please fill all fields correctly', 'warn');
      return;
    }

    this.isLoading = true;
    const formData = {
      posSettings: {
        vatPercentage: this.taxVatForm.value.vatPercentage || 0,
        taxPercentage: this.taxVatForm.value.taxPercentage || 0,
        isAutoCalculateVat: this.taxVatForm.value.isAutoCalculateVat || false,
        isAutoCalculateTax: this.taxVatForm.value.isAutoCalculateTax || false,
        showVat: this.taxVatForm.value.showVat !== undefined ? this.taxVatForm.value.showVat : true,
        showTax: this.taxVatForm.value.showTax !== undefined ? this.taxVatForm.value.showTax : true,
        showServiceCharge: this.taxVatForm.value.showServiceCharge !== undefined ? this.taxVatForm.value.showServiceCharge : true,
        showAit: this.taxVatForm.value.showAit !== undefined ? this.taxVatForm.value.showAit : true
      }
    };

    this.settingService.addSetting(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.message('Settings saved successfully', 'success');
        } else {
          this.uiService.message(res.message || 'Failed to save settings', 'warn');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error saving settings:', err);
        this.uiService.message('Failed to save settings', 'warn');
      }
    });
  }
}

