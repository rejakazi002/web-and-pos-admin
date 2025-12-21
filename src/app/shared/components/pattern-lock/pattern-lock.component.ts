import { Component, EventEmitter, Inject, Input, Output, Optional, OnInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pattern-lock',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './pattern-lock.component.html',
  styleUrls: ['./pattern-lock.component.scss']
})
export class PatternLockComponent implements OnInit {
  @Input() pattern: string = '';
  @Output() patternChange = new EventEmitter<string>();
  @Output() save = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  @ViewChild('patternGrid', { static: false }) patternGrid?: ElementRef;

  selectedPattern: number[] = [];
  isDrawing: boolean = false;
  gridSize = 3;
  dots: number[] = Array.from({ length: this.gridSize * this.gridSize }, (_, i) => i);
  currentHoverDot: number | null = null;
  lastProcessedDot: number | null = null;

  constructor(
    @Optional() public dialogRef?: MatDialogRef<PatternLockComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: { pattern?: string },
    private cdr?: ChangeDetectorRef
  ) {
    if (this.data?.pattern) {
      this.pattern = this.data.pattern;
    }
  }

  ngOnInit() {
    if (this.pattern) {
      this.selectedPattern = this.pattern.split(',').map(Number);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  onGlobalEnd(event: Event) {
    if (this.isDrawing) {
      this.onPatternEnd();
    }
  }

  getDotPosition(index: number): { row: number; col: number } {
    return {
      row: Math.floor(index / this.gridSize),
      col: index % this.gridSize
    };
  }

  isDotSelected(index: number): boolean {
    return this.selectedPattern.includes(index);
  }

  isDotActive(index: number): boolean {
    return this.selectedPattern.length > 0 && 
           this.selectedPattern[this.selectedPattern.length - 1] === index;
  }

  addDotToPattern(index: number) {
    // Prevent adding same dot immediately after
    if (this.lastProcessedDot === index) {
      return;
    }

    // If already selected and it's not the last one, allow going back
    if (this.selectedPattern.includes(index)) {
      const position = this.selectedPattern.indexOf(index);
      if (position < this.selectedPattern.length - 1) {
        this.selectedPattern = this.selectedPattern.slice(0, position + 1);
        this.lastProcessedDot = index;
        this.updatePattern();
        if (this.cdr) this.cdr.detectChanges();
      }
      return;
    }

    // First dot - always add
    if (this.selectedPattern.length === 0) {
      this.selectedPattern.push(index);
      this.lastProcessedDot = index;
      this.updatePattern();
      if (this.cdr) this.cdr.detectChanges();
      return;
    }

    const lastDot = this.selectedPattern[this.selectedPattern.length - 1];
    
    // Always allow connecting - Android pattern lock allows any connection
    // Add middle dots if needed (for L-shaped patterns)
    const middleDots = this.getMiddleDots(lastDot, index);
    if (middleDots.length > 0) {
      middleDots.forEach(middleDot => {
        if (!this.selectedPattern.includes(middleDot)) {
          this.selectedPattern.push(middleDot);
          this.lastProcessedDot = middleDot;
        }
      });
    }
    
    this.selectedPattern.push(index);
    this.lastProcessedDot = index;
    this.updatePattern();
    if (this.cdr) this.cdr.detectChanges();
  }

  onDotMouseDown(index: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDrawing = true;
    this.selectedPattern = [];
    this.lastProcessedDot = null;
    this.addDotToPattern(index);
  }

  onDotMouseEnter(index: number, event: MouseEvent) {
    if (this.isDrawing) {
      event.preventDefault();
      this.currentHoverDot = index;
      this.addDotToPattern(index);
    }
  }

  onDotMouseLeave(index: number) {
    // Keep hover for smooth drawing
  }

  onDotTouchStart(index: number, event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDrawing = true;
    this.selectedPattern = [];
    this.lastProcessedDot = null;
    this.addDotToPattern(index);
  }

  onDotTouchMove(event: TouchEvent) {
    if (!this.isDrawing || !this.patternGrid) return;
    
    event.preventDefault();
    const rect = this.patternGrid.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Find which dot is being touched
    const dotSize = rect.width / this.gridSize;
    const col = Math.floor(x / dotSize);
    const row = Math.floor(y / dotSize);
    
    if (col >= 0 && col < this.gridSize && row >= 0 && row < this.gridSize) {
      const index = row * this.gridSize + col;
      if (index !== this.lastProcessedDot) {
        this.addDotToPattern(index);
      }
    }
  }

  onPatternEnd() {
    this.isDrawing = false;
    this.currentHoverDot = null;
    this.lastProcessedDot = null;
    if (this.cdr) this.cdr.detectChanges();
  }

  getMiddleDots(dot1: number, dot2: number): number[] {
    const pos1 = this.getDotPosition(dot1);
    const pos2 = this.getDotPosition(dot2);
    
    const rowDiff = pos2.row - pos1.row;
    const colDiff = pos2.col - pos1.col;
    
    // If moving 2 steps in same row or column, there's a middle dot
    if (Math.abs(rowDiff) === 2 && colDiff === 0) {
      // Vertical line
      const middleRow = pos1.row + (rowDiff / 2);
      return [middleRow * this.gridSize + pos1.col];
    } else if (Math.abs(colDiff) === 2 && rowDiff === 0) {
      // Horizontal line
      const middleCol = pos1.col + (colDiff / 2);
      return [pos1.row * this.gridSize + middleCol];
    } else if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
      // Diagonal line
      const middleRow = pos1.row + (rowDiff / 2);
      const middleCol = pos1.col + (colDiff / 2);
      return [middleRow * this.gridSize + middleCol];
    }
    
    return [];
  }

  getLinePath(): string {
    if (this.selectedPattern.length < 2) return '';
    
    const path = this.selectedPattern.map((index, i) => {
      const pos = this.getDotPosition(index);
      const x = (pos.col * 33.33) + 16.67;
      const y = (pos.row * 33.33) + 16.67;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    // Add line to current hover dot if drawing
    if (this.isDrawing && this.currentHoverDot !== null && !this.selectedPattern.includes(this.currentHoverDot)) {
      const pos = this.getDotPosition(this.currentHoverDot);
      const x = (pos.col * 33.33) + 16.67;
      const y = (pos.row * 33.33) + 16.67;
      return path + ` L ${x} ${y}`;
    }
    
    return path;
  }

  clearPattern() {
    this.selectedPattern = [];
    this.isDrawing = false;
    this.currentHoverDot = null;
    this.lastProcessedDot = null;
    this.updatePattern();
    if (this.cdr) this.cdr.detectChanges();
  }

  updatePattern() {
    this.pattern = this.selectedPattern.join(',');
    this.patternChange.emit(this.pattern);
  }

  onSave() {
    if (this.selectedPattern.length >= 4) {
      this.save.emit(this.pattern);
      if (this.dialogRef) {
        this.dialogRef.close(this.pattern);
      }
    } else {
      alert('Please draw a pattern with at least 4 dots');
    }
  }

  onClose() {
    this.close.emit();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
