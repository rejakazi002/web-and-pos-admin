import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  @Output() close = new EventEmitter<void>();

  display: string = '0';
  previousValue: number = 0;
  operation: string = '';
  waitingForNewValue: boolean = false;

  onNumberClick(value: string): void {
    if (this.waitingForNewValue) {
      this.display = value;
      this.waitingForNewValue = false;
    } else {
      this.display = this.display === '0' ? value : this.display + value;
    }
  }

  onOperationClick(op: string): void {
    const currentValue = parseFloat(this.display);

    if (this.previousValue === 0) {
      this.previousValue = currentValue;
    } else if (this.operation) {
      const result = this.calculate();
      this.display = String(result);
      this.previousValue = result;
    }

    this.waitingForNewValue = true;
    this.operation = op;
  }

  onEqualsClick(): void {
    if (this.operation) {
      const result = this.calculate();
      this.display = String(result);
      this.previousValue = 0;
      this.operation = '';
      this.waitingForNewValue = true;
    }
  }

  onClearClick(): void {
    this.display = '0';
    this.previousValue = 0;
    this.operation = '';
    this.waitingForNewValue = false;
  }

  onClearEntryClick(): void {
    this.display = '0';
    this.waitingForNewValue = false;
  }

  onPercentageClick(): void {
    const currentValue = parseFloat(this.display);
    this.display = String(currentValue / 100);
    this.waitingForNewValue = true;
  }

  onDecimalClick(): void {
    if (this.waitingForNewValue) {
      this.display = '0.';
      this.waitingForNewValue = false;
    } else if (this.display.indexOf('.') === -1) {
      this.display += '.';
    }
  }

  private calculate(): number {
    const currentValue = parseFloat(this.display);

    switch (this.operation) {
      case '+':
        return this.previousValue + currentValue;
      case '-':
        return this.previousValue - currentValue;
      case '×':
        return this.previousValue * currentValue;
      case '÷':
        return this.previousValue / currentValue;
      default:
        return currentValue;
    }
  }

  closeCalculator(): void {
    this.close.emit();
  }
}

