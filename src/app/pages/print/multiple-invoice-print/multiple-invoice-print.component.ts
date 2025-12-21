import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../services/common/order.service";

@Component({
  selector: 'app-multiple-invoice-print',
  templateUrl: './multiple-invoice-print.component.html',
  styleUrl: './multiple-invoice-print.component.scss'
})
export class MultipleInvoicePrintComponent implements OnInit {
  private router = inject(Router);
  private orderService = inject(OrderService);

  invoices: any[] = [];
  isLoading = true;
  isDisableInvoicePriceSection = false; // Toggle if you want
  selectedInvoice: string;

  ngOnInit(): void {
    const nav = history.state as { ids?: string[],selectedInvoice?: string };
    const ids = nav?.ids ?? [];
     this.selectedInvoice = nav?.selectedInvoice ?? 'invoice1';

    if (this.selectedInvoice === 'invoice1') {
      this.orderService.generateInvoices(ids).subscribe({
        next: (res) => {
          this.invoices = res?.data ?? [];
          this.isLoading = false;

          // If you want auto print after all data is rendered:
          setTimeout(() => window.print(), 200);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }else {
      this.router.navigate(['/']);
    }


  }

  getTotaQuantity(items: any[] = []) {
    return items.reduce((sum, it) => sum + (it?.quantity ?? 0), 0);
  }

  printAll() {
    window.print();
  }



}
