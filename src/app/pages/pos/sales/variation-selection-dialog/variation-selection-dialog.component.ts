import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product, VariationList } from '../../../../interfaces/common/product.interface';

export interface VariationSelectionData {
  product: Product;
}

@Component({
  selector: 'app-variation-selection-dialog',
  templateUrl: './variation-selection-dialog.component.html',
  styleUrls: ['./variation-selection-dialog.component.scss']
})
export class VariationSelectionDialogComponent implements OnInit {
  product: Product;
  selectedVariation: VariationList = null;
  variations: VariationList[] = [];

  constructor(
    public dialogRef: MatDialogRef<VariationSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VariationSelectionData
  ) {
    this.product = data.product;
    this.variations = this.product.variationList || [];
    // Select first variation as default
    if (this.variations.length > 0) {
      this.selectedVariation = this.variations[0];
    }
  }

  ngOnInit(): void {
  }

  onSelectVariation(variation: VariationList): void {
    this.selectedVariation = variation;
  }

  onConfirm(): void {
    if (this.selectedVariation) {
      this.dialogRef.close(this.selectedVariation);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  getVariationPrice(variation: VariationList): number {
    return variation.salePrice || variation.regularPrice || 0;
  }

  getVariationStock(variation: VariationList): number {
    return variation.quantity || 0;
  }
}

