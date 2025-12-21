import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { SupplierService } from '../../../../services/common/supplier.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { Supplier } from '../../../../interfaces/common/supplier.interface';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  disable = false;

  // Store Data
  isLoading: boolean = false;
  id?: string;
  supplier?: Supplier;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    // Get ID from route
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initDataForm();
    
    if (this.id) {
      this.getSupplierById();
    }
  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null],
      email: [null, [Validators.email]],
      address: [null],
      city: [null],
      country: [null],
      alternatePhone: [null],
      contactPerson: [null],
      taxId: [null],
      notes: [null],
      description: [null],
    });
  }

  /**
   * HTTP REQ HANDLE
   */
  private getSupplierById() {
    this.isLoading = true;
    this.subDataOne = this.supplierService.getSupplierById(this.id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.supplier = res.data;
            this.setFormValue();
          } else {
            this.uiService.message('Supplier not found', 'warn');
            this.router.navigate(['/pos/supplier/supplier-list']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading supplier:', err);
          this.uiService.message('Failed to load supplier', 'warn');
        }
      });
  }

  private setFormValue() {
    if (this.supplier) {
      this.dataForm.patchValue({
        name: this.supplier.name || null,
        phone: this.supplier.phone || null,
        email: this.supplier.email || null,
        address: this.supplier.address || null,
        city: this.supplier.city || null,
        country: this.supplier.country || null,
        alternatePhone: this.supplier.alternatePhone || null,
        contactPerson: this.supplier.contactPerson || null,
        taxId: this.supplier.taxId || null,
        notes: this.supplier.notes || null,
        description: this.supplier.description || null,
      });
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all required fields', 'warn');
      this.dataForm.markAllAsTouched();
      return;
    }

    const formData = this.dataForm.value;
    
    // Prepare supplier data
    const supplierData: Supplier = {
      name: formData.name,
      phone: formData.phone || null,
      email: formData.email || null,
      address: formData.address || null,
      city: formData.city || null,
      country: formData.country || null,
      alternatePhone: formData.alternatePhone || null,
      contactPerson: formData.contactPerson || null,
      taxId: formData.taxId || null,
      notes: formData.notes || null,
      description: formData.description || null,
    };

    if (this.id) {
      this.updateSupplierById(supplierData);
    } else {
      this.addSupplier(supplierData);
    }
  }

  private addSupplier(data: Supplier) {
    this.isLoading = true;
    this.subDataTwo = this.supplierService.addSupplier(data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message(res.message || 'Supplier added successfully', 'success');
            this.reloadService.needRefreshCustomer$();
            this.router.navigate(['/pos/supplier/supplier-list']);
          } else {
            this.uiService.message(res.message || 'Failed to add supplier', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error adding supplier:', err);
          this.uiService.message('Failed to add supplier', 'warn');
        }
      });
  }

  private updateSupplierById(data: Supplier) {
    this.isLoading = true;
    this.subDataTwo = this.supplierService.updateSupplierById(this.id, data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message(res.message || 'Supplier updated successfully', 'success');
            this.reloadService.needRefreshCustomer$();
            this.router.navigate(['/pos/supplier/supplier-list']);
          } else {
            this.uiService.message(res.message || 'Failed to update supplier', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error updating supplier:', err);
          this.uiService.message('Failed to update supplier', 'warn');
        }
      });
  }

  onCancel() {
    this.router.navigate(['/pos/supplier/supplier-list']);
  }

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}

