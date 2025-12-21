import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { BankAccountService } from '../../../../services/common/bank-account.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { ReloadService } from '../../../../services/core/reload.service';
import { BankAccount } from '../../../../interfaces/common/bank-account.interface';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})
export class AddBankAccountComponent implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  disable = false;

  // Store Data
  isLoading: boolean = false;
  id?: string;
  bankAccount?: BankAccount;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
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
      this.getBankAccountById();
    }
  }

  /**
   * INIT FORM
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      accountName: [null, [Validators.required]],
      accountNumber: [null, [Validators.required]],
      bankName: [null, [Validators.required]],
      branchName: [null],
      accountType: ['current', [Validators.required]],
      initialBalance: [0, [Validators.min(0)]],
      status: ['active', [Validators.required]],
      notes: [null],
    });
  }

  /**
   * HTTP REQ HANDLE
   */
  private getBankAccountById() {
    this.isLoading = true;
    this.subDataOne = this.bankAccountService.getBankAccountById(this.id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.bankAccount = res.data;
            this.setFormValue();
          } else {
            this.uiService.message('Bank account not found', 'warn');
            this.router.navigate(['/pos/accounts/bank-account-list']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading bank account:', err);
          this.uiService.message('Failed to load bank account', 'warn');
        }
      });
  }

  private setFormValue() {
    if (this.bankAccount) {
      this.dataForm.patchValue({
        accountName: this.bankAccount.accountName || null,
        accountNumber: this.bankAccount.accountNumber || null,
        bankName: this.bankAccount.bankName || null,
        branchName: this.bankAccount.branchName || null,
        accountType: this.bankAccount.accountType || 'current',
        initialBalance: this.bankAccount.initialBalance || 0,
        status: this.bankAccount.status || 'active',
        notes: this.bankAccount.notes || null,
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
    
    // Prepare bank account data
    const bankAccountData: BankAccount = {
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      branchName: formData.branchName || null,
      accountType: formData.accountType,
      initialBalance: formData.initialBalance || 0,
      status: formData.status,
      notes: formData.notes || null,
    };

    if (this.id) {
      this.updateBankAccount(bankAccountData);
    } else {
      this.addBankAccount(bankAccountData);
    }
  }

  /**
   * ADD BANK ACCOUNT
   */
  private addBankAccount(data: BankAccount) {
    this.disable = true;
    this.subDataTwo = this.bankAccountService.addBankAccount(data)
      .subscribe({
        next: (res) => {
          this.disable = false;
          if (res.success) {
            this.uiService.message('Bank account added successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/accounts/bank-account-list']);
          } else {
            this.uiService.message(res.message || 'Failed to add bank account', 'warn');
          }
        },
        error: (err) => {
          this.disable = false;
          console.error('Error adding bank account:', err);
          this.uiService.message('Failed to add bank account', 'warn');
        }
      });
  }

  /**
   * UPDATE BANK ACCOUNT
   */
  private updateBankAccount(data: Partial<BankAccount>) {
    this.disable = true;
    this.subDataTwo = this.bankAccountService.updateBankAccountById(this.id, data)
      .subscribe({
        next: (res) => {
          this.disable = false;
          if (res.success) {
            this.uiService.message('Bank account updated successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/accounts/bank-account-list']);
          } else {
            this.uiService.message(res.message || 'Failed to update bank account', 'warn');
          }
        },
        error: (err) => {
          this.disable = false;
          console.error('Error updating bank account:', err);
          this.uiService.message('Failed to update bank account', 'warn');
        }
      });
  }

  ngOnDestroy(): void {
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


