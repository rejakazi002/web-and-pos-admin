import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaleService } from '../../../../services/common/sale.service';
import { ProductService } from '../../../../services/common/product.service';
import { Sale } from '../../../../interfaces/common/sale.interface';
import { Product } from '../../../../interfaces/common/product.interface';
import { UiService } from '../../../../services/core/ui.service';
import { UtilsService } from '../../../../services/core/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exchange-dialog',
  templateUrl: './exchange-dialog.component.html',
  styleUrls: ['./exchange-dialog.component.scss']
})
export class ExchangeDialogComponent implements OnInit {
  isLoading: boolean = false;
  searchQuery: string = '';
  searchResults: Sale[] = [];
  selectedSale: Sale = null;
  exchangeProducts: Product[] = [];
  allProducts: Product[] = [];
  private subDataOne: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ExchangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private saleService: SaleService,
    private productService: ProductService,
    private uiService: UiService,
    public utilsService: UtilsService
  ) {
    this.allProducts = data.allProducts || [];
  }

  ngOnInit(): void {
    // Component initialized
  }

  onSearchSale() {
    const query = this.searchQuery?.trim();
    
    if (!query || query.length < 1) {
      this.searchResults = [];
      return;
    }

    // Unsubscribe previous search if exists
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }

    this.isLoading = true;
    const filter: any = {
      filter: {
        $or: [
          { invoiceNo: { $regex: query, $options: 'i' } },
          { 'customer.phone': { $regex: query, $options: 'i' } },
          { 'customer.name': { $regex: query, $options: 'i' } }
        ],
        status: 'Sale'
      },
      pagination: { pageSize: 10, currentPage: 1 },
      select: {
        invoiceNo: 1,
        customer: 1,
        products: 1,
        soldDate: 1,
        soldDateString: 1,
        soldTime: 1,
        total: 1,
        subTotal: 1,
        discount: 1,
        vatAmount: 1,
        paymentType: 1,
        receivedFromCustomer: 1,
        _id: 1
      },
      sort: {createdAt: -1},
    };

    this.subDataOne = this.saleService.getAllSale(filter, null)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.searchResults = res.data || [];
          } else {
            this.searchResults = [];
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Exchange search error:', err);
          this.searchResults = [];
          this.uiService.message('Failed to search sales', 'warn');
        }
      });
  }

  selectSale(sale: Sale) {
    this.isLoading = true;
    this.searchResults = [];
    this.searchQuery = sale.invoiceNo;
    
    // Fetch full sale data with all product details
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    
    // Fetch full sale with all fields populated
    this.subDataOne = this.saleService.getSaleById(sale._id)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success && res.data) {
            this.selectedSale = res.data;
            // Load products from selected sale with full details
            if (this.selectedSale.products && this.selectedSale.products.length > 0) {
              // Reset exchange products
              this.exchangeProducts = [];
              // Map products with full details
              this.selectedSale.products.forEach(product => {
                // Product might be populated or just have _id reference
                // Try to get full product data
                let productData: any = product;
                
                // If product has nested product object (populated), use it
                if (product.product && typeof product.product === 'object') {
                  productData = { ...product.product, ...product };
                }
                
                // Try to find in allProducts cache
                const productId = productData._id || product._id || product.product?._id;
                if (productId) {
                  const cachedProduct = this.allProducts.find(p => p._id === productId);
                  if (cachedProduct) {
                    productData = { ...cachedProduct, ...product };
                  }
                }
                
                // Build complete product object with all necessary fields
                const exchangeProduct: Product = {
                  _id: productData._id || product._id,
                  name: productData.name || product.product?.name || '',
                  images: productData.images || product.product?.images || productData.image || [],
                  sku: productData.sku || product.product?.sku || '',
                  barcode: productData.barcode || product.product?.barcode || '',
                  salePrice: product.salePrice || productData.salePrice || product.product?.salePrice || 0,
                  purchasePrice: product.purchasePrice || productData.purchasePrice || product.product?.purchasePrice || 0,
                  quantity: productData.quantity || product.product?.quantity || 0,
                  soldQuantity: 1, // Start with 1 for exchange
                  maxReturnQuantity: product.soldQuantity || productData.soldQuantity || 1,
                  // Preserve original sale data
                  ...product
                };
                
                this.exchangeProducts.push(exchangeProduct);
              });
            }
          } else {
            this.uiService.message('Failed to load sale details', 'warn');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading sale details:', err);
          this.uiService.message('Failed to load sale details', 'warn');
        }
      });
  }

  addExchangeProduct(product: Product) {
    const existingIndex = this.exchangeProducts.findIndex(p => p._id === product._id);
    if (existingIndex >= 0) {
      if (this.exchangeProducts[existingIndex].soldQuantity < (this.exchangeProducts[existingIndex].maxReturnQuantity || 1)) {
        this.exchangeProducts[existingIndex].soldQuantity++;
      } else {
        this.uiService.message('Maximum quantity reached', 'warn');
      }
    } else {
      this.exchangeProducts.push({
        ...product,
        soldQuantity: 1,
        maxReturnQuantity: product.soldQuantity || 1
      });
    }
  }

  removeExchangeProduct(index: number) {
    this.exchangeProducts.splice(index, 1);
  }

  incrementQty(index: number) {
    if (this.exchangeProducts[index].soldQuantity < (this.exchangeProducts[index].maxReturnQuantity || 1)) {
      this.exchangeProducts[index].soldQuantity++;
    }
  }

  decrementQty(index: number) {
    if (this.exchangeProducts[index].soldQuantity > 1) {
      this.exchangeProducts[index].soldQuantity--;
    } else {
      this.removeExchangeProduct(index);
    }
  }

  onConfirm() {
    if (!this.selectedSale) {
      this.uiService.message('Please select a sale for exchange', 'warn');
      return;
    }

    if (this.exchangeProducts.length === 0) {
      this.uiService.message('Please select products to exchange', 'warn');
      return;
    }

    this.dialogRef.close({
      originalSaleId: this.selectedSale._id,
      exchangeProducts: this.exchangeProducts
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
}


