import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentBreakdown } from '../../../../interfaces/common/sale.interface';
import { Select } from '../../../../interfaces/core/select';

@Component({
  selector: 'app-split-payment-dialog',
  templateUrl: './split-payment-dialog.component.html',
  styleUrls: ['./split-payment-dialog.component.scss']
})
export class SplitPaymentDialogComponent implements OnInit {
  paymentForm: FormGroup;
  payments: PaymentBreakdown[] = [];
  grandTotal: number;
  paymentTypes: Select[];
  totalPaid: number = 0;
  remaining: number = 0;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SplitPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.grandTotal = data.grandTotal || 0;
    this.paymentTypes = data.paymentTypes || [];
    this.payments = data.payments || [
      { method: 'cash', amount: 0 },
      { method: 'cash', amount: 0 }
    ];
  }

  ngOnInit(): void {
    this.calculateTotal();
  }

  addPaymentMethod() {
    if (this.payments.length < 3) {
      this.payments.push({ method: 'cash', amount: 0 });
    }
  }

  removePaymentMethod(index: number) {
    if (this.payments.length > 1) {
      this.payments.splice(index, 1);
      this.calculateTotal();
    }
  }

  onAmountChange() {
    this.calculateTotal();
  }

  onPaymentMethodChange(index: number) {
    // Reset amount when payment method changes to ensure clean state
    // Optionally, you can keep the amount if needed
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPaid = this.payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    this.remaining = Number((this.grandTotal - this.totalPaid).toFixed(2));
  }

  onConfirm() {
    // Validate that total paid matches grand total (with small tolerance for floating point)
    const tolerance = 0.01;
    if (Math.abs(this.totalPaid - this.grandTotal) > tolerance) {
      return; // Don't close if amounts don't match
    }
    
    // Filter out payments with zero amount
    const validPayments = this.payments.filter(p => (p.amount || 0) > 0);
    
    if (validPayments.length === 0) {
      return; // Don't close if no valid payments
    }
    
    this.dialogRef.close({ payments: validPayments });
  }

  onCancel() {
    this.dialogRef.close();
  }

  autoFillRemaining() {
    if (this.remaining > 0 && this.payments.length > 0) {
      // Find the first payment with amount > 0, or use the first one
      let targetPayment = this.payments.find(p => (p.amount || 0) > 0);
      if (!targetPayment) {
        targetPayment = this.payments[0];
      }
      // Add remaining amount to the target payment
      targetPayment.amount = Number((Number(targetPayment.amount || 0) + this.remaining).toFixed(2));
      this.calculateTotal();
    }
  }
}


