import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayCloseService } from '../../../../services/common/day-close.service';
import { DayClose } from '../../../../interfaces/common/day-close.interface';
import { UiService } from '../../../../services/core/ui.service';

@Component({
  selector: 'app-day-close',
  templateUrl: './day-close.component.html',
  styleUrls: ['./day-close.component.scss']
})
export class DayCloseComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  dayClose: DayClose;
  selectedDate: Date = new Date();
  isClosing: boolean = false;
  closeNotes: string = '';

  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private dayCloseService: DayCloseService,
    private uiService: UiService,
  ) {}

  ngOnInit(): void {
    this.loadDayClose();
  }

  loadDayClose() {
    this.isLoading = true;
    const dateStr = this.selectedDate.toISOString().split('T')[0];
    this.subDataOne = this.dayCloseService.getOrCreateDayClose(dateStr)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.dayClose = res.data;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error loading day close:', err);
        }
      });
  }

  onDateChange() {
    this.loadDayClose();
  }

  closeDay() {
    if (this.dayClose.status === 'closed') {
      this.uiService.message('Day is already closed', 'warn');
      return;
    }

    this.isClosing = true;
    const dateStr = this.selectedDate.toISOString().split('T')[0];
    this.subDataTwo = this.dayCloseService.closeDay(dateStr, this.closeNotes)
      .subscribe({
        next: (res) => {
          this.isClosing = false;
          if (res.success) {
            this.uiService.message('Day closed successfully', 'success');
            this.loadDayClose();
          }
        },
        error: (err) => {
          this.isClosing = false;
          console.error('Error closing day:', err);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subDataOne) this.subDataOne.unsubscribe();
    if (this.subDataTwo) this.subDataTwo.unsubscribe();
  }
}


