import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { CustomerService } from '../../../../services/common/customer.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { Customer } from '../../../../interfaces/common/customer.interface';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  disable = false;

  // Store Data
  isLoading: boolean = false;
  id?: string;
  customer?: Customer;

  // Customer Groups
  customerGroups = [
    { value: 'VIP', viewValue: 'VIP' },
    { value: 'General', viewValue: 'General' },
    { value: 'Wholesale', viewValue: 'Wholesale' }
  ];

  // Date
  maxDate = new Date();

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
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
      this.getCustomerById();
    }
  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.email]],
      address: [null],
      customerGroup: ['General'],
      walletBalance: [0],
      smsEnabled: [true],
      emailEnabled: [true],
      alternatePhone: [null],
      city: [null],
      country: [null],
      notes: [null],
      birthdate: [null],
    });
  }

  /**
   * HTTP REQ HANDLE
   */
  private getCustomerById() {
    this.isLoading = true;
    this.subDataOne = this.customerService.getCustomerById(this.id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.customer = res.data;
            this.setFormValue();
          } else {
            this.uiService.message('Customer not found', 'warn');
            this.router.navigate(['/pos/customer/customer-list']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading customer:', err);
          this.uiService.message('Failed to load customer', 'warn');
        }
      });
  }

  private setFormValue() {
    if (this.customer) {
      this.dataForm.patchValue({
        name: this.customer.name || null,
        phone: this.customer.phone || null,
        email: this.customer.email || null,
        address: this.customer.address || null,
        customerGroup: this.customer.customerGroup || 'General',
        walletBalance: this.customer.walletBalance || 0,
        smsEnabled: this.customer.smsEnabled !== undefined ? this.customer.smsEnabled : true,
        emailEnabled: this.customer.emailEnabled !== undefined ? this.customer.emailEnabled : true,
        alternatePhone: this.customer.alternatePhone || null,
        city: this.customer.city || null,
        country: this.customer.country || null,
        notes: this.customer.notes || null,
        birthdate: this.customer.birthdate || null,
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
    
    // Prepare customer data
    const customerData: Customer = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      address: formData.address || null,
      customerGroup: formData.customerGroup || 'General',
      walletBalance: formData.walletBalance || 0,
      smsEnabled: formData.smsEnabled !== undefined ? formData.smsEnabled : true,
      emailEnabled: formData.emailEnabled !== undefined ? formData.emailEnabled : true,
      alternatePhone: formData.alternatePhone || null,
      city: formData.city || null,
      country: formData.country || null,
      notes: formData.notes || null,
      birthdate: formData.birthdate || null,
    };

    if (this.id) {
      this.updateCustomerById(customerData);
    } else {
      this.addCustomer(customerData);
    }
  }

  private addCustomer(data: Customer) {
    this.isLoading = true;
    this.subDataTwo = this.customerService.addCustomer(data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message(res.message || 'Customer added successfully', 'success');
            this.reloadService.needRefreshCustomer$();
            this.router.navigate(['/pos/customer/customer-list']);
          } else {
            this.uiService.message(res.message || 'Failed to add customer', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error adding customer:', err);
          this.uiService.message('Failed to add customer', 'warn');
        }
      });
  }

  private updateCustomerById(data: Customer) {
    this.isLoading = true;
    this.subDataTwo = this.customerService.updateCustomerById(this.id, data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.uiService.message(res.message || 'Customer updated successfully', 'success');
            this.reloadService.needRefreshCustomer$();
            this.router.navigate(['/pos/customer/customer-list']);
          } else {
            this.uiService.message(res.message || 'Failed to update customer', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error updating customer:', err);
          this.uiService.message('Failed to update customer', 'warn');
        }
      });
  }

  onCancel() {
    this.router.navigate(['/pos/customer/customer-list']);
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

