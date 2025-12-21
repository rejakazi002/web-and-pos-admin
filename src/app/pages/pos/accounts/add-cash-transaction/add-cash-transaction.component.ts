import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UiService } from '../../../../services/core/ui.service';
import { CashTransactionService } from '../../../../services/common/cash-transaction.service';
import { BankAccountService } from '../../../../services/common/bank-account.service';
import { IncomeCategoryService } from '../../../../services/common/income-category.service';
import { FormsModule } from '@angular/forms';
import { ReloadService } from '../../../../services/core/reload.service';
import { CashTransaction } from '../../../../interfaces/common/cash-transaction.interface';
import { BankAccount } from '../../../../interfaces/common/bank-account.interface';

@Component({
  selector: 'app-add-cash-transaction',
  templateUrl: './add-cash-transaction.component.html',
  styleUrls: ['./add-cash-transaction.component.scss']
})
export class AddCashTransactionComponent implements OnInit, OnDestroy {
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  disable = false;
  isLoading: boolean = false;
  id?: string;
  transaction?: CashTransaction;
  bankAccounts: BankAccount[] = [];
  incomeCategories: any[] = [];

  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private cashTransactionService: CashTransactionService,
    private bankAccountService: BankAccountService,
    private incomeCategoryService: IncomeCategoryService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reloadService: ReloadService,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initDataForm();
    this.loadBankAccounts();
    this.loadIncomeCategories();
    
    if (this.id) {
      this.getTransactionById();
    }
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      transactionDate: [new Date(), [Validators.required]],
      type: ['cash_in', [Validators.required]],
      categoryId: [null],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: [null],
      reference: [null],
      paymentMethod: ['cash', [Validators.required]],
      bankAccountId: [null],
    });
  }

  private loadBankAccounts() {
    this.bankAccountService.getAllBankAccounts({ filter: { status: 'active' }, pagination: null, sort: null, select: null })
      .subscribe(res => {
        if (res.success) {
          this.bankAccounts = res.data?.data || [];
        }
      });
  }

  private loadIncomeCategories() {
    this.incomeCategoryService.getAllCategories({ filter: null, pagination: null, sort: null, select: null })
      .subscribe(res => {
        if (res.success) {
          this.incomeCategories = res.data || [];
        }
      });
  }

  private getTransactionById() {
    this.isLoading = true;
    this.subDataOne = this.cashTransactionService.getCashTransactionById(this.id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.transaction = res.data;
            this.setFormValue();
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading transaction:', err);
        }
      });
  }

  private setFormValue() {
    if (this.transaction) {
      this.dataForm.patchValue({
        transactionDate: new Date(this.transaction.transactionDate),
        type: this.transaction.type,
        categoryId: this.transaction.category?._id || null,
        amount: this.transaction.amount,
        description: this.transaction.description || null,
        reference: this.transaction.reference || null,
        paymentMethod: this.transaction.paymentMethod || 'cash',
        bankAccountId: this.transaction.bankAccount?._id || null,
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
    const transactionData: any = {
      transactionDate: new Date(formData.transactionDate).toISOString(),
      type: formData.type,
      categoryId: formData.categoryId || null,
      amount: formData.amount,
      description: formData.description || null,
      reference: formData.reference || null,
      paymentMethod: formData.paymentMethod,
      bankAccountId: formData.paymentMethod === 'bank' ? formData.bankAccountId : null,
    };

    if (this.id) {
      this.updateTransaction(transactionData);
    } else {
      this.addTransaction(transactionData);
    }
  }

  private addTransaction(data: any) {
    this.disable = true;
    this.subDataTwo = this.cashTransactionService.addCashTransaction(data)
      .subscribe({
        next: (res) => {
          this.disable = false;
          if (res.success) {
            this.uiService.message('Transaction added successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/accounts/cash-transaction-list']);
          }
        },
        error: (err) => {
          this.disable = false;
          console.error('Error adding transaction:', err);
        }
      });
  }

  private updateTransaction(data: any) {
    this.disable = true;
    this.subDataTwo = this.cashTransactionService.updateCashTransactionById(this.id, data)
      .subscribe({
        next: (res) => {
          this.disable = false;
          if (res.success) {
            this.uiService.message('Transaction updated successfully', 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/pos/accounts/cash-transaction-list']);
          }
        },
        error: (err) => {
          this.disable = false;
          console.error('Error updating transaction:', err);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subDataOne) this.subDataOne.unsubscribe();
    if (this.subDataTwo) this.subDataTwo.unsubscribe();
    if (this.subReload) this.subReload.unsubscribe();
  }
}

