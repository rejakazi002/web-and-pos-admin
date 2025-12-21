import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DateFilterState {
  startDate?: Date;
  endDate?: Date;
  startDateString?: string;
  endDateString?: string;
}

export interface FilterState {
  dateFilter?: DateFilterState;
  courierDateFilter?: DateFilterState;
  searchQuery?: string;
  selectedTab?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  private filterStateSubject = new BehaviorSubject<FilterState>({});
  public filterState$ = this.filterStateSubject.asObservable();

  constructor() {
    // Load from localStorage on service initialization
    this.loadFromStorage();
  }

  /**
   * Set filter state
   */
  setFilterState(key: string, value: any): void {
    const currentState = this.filterStateSubject.value;
    const newState = {
      ...currentState,
      [key]: value,
    };

    this.filterStateSubject.next(newState);
    this.saveToStorage(newState);
  }

  /**
   * Get specific filter state
   */
  getFilterState(key: string): any {
    return this.filterStateSubject.value[key];
  }

  /**
   * Get all filter state
   */
  getAllFilterState(): FilterState {
    return this.filterStateSubject.value;
  }

  /**
   * Clear specific filter
   */
  clearFilter(key: string): void {
    const currentState = this.filterStateSubject.value;
    const newState = { ...currentState };
    delete newState[key];

    this.filterStateSubject.next(newState);
    this.saveToStorage(newState);
  }

  /**
   * Clear all filters
   */
  clearAllFilters(): void {
    this.filterStateSubject.next({});
    this.saveToStorage({});
  }

  /**
   * Set date filter
   */
  setDateFilter(
    startDate: Date,
    endDate: Date,
    startDateString: string,
    endDateString: string
  ): void {
    const dateFilter: DateFilterState = {
      startDate,
      endDate,
      startDateString,
      endDateString,
    };
    this.setFilterState('dateFilter', dateFilter);
  }

  /**
   * Set courier date filter
   */
  setCourierDateFilter(
    startDate: Date,
    endDate: Date,
    startDateString: string,
    endDateString: string
  ): void {
    const courierDateFilter: DateFilterState = {
      startDate,
      endDate,
      startDateString,
      endDateString,
    };
    this.setFilterState('courierDateFilter', courierDateFilter);
  }

  /**
   * Get date filter
   */
  getDateFilter(): DateFilterState | undefined {
    return this.getFilterState('dateFilter');
  }

  /**
   * Get courier date filter
   */
  getCourierDateFilter(): DateFilterState | undefined {
    return this.getFilterState('courierDateFilter');
  }

  /**
   * Save to localStorage
   */
  private saveToStorage(state: FilterState): void {
    try {
      localStorage.setItem('orderFilterState', JSON.stringify(state));
    } catch (error) {
      console.warn('Could not save filter state to localStorage:', error);
    }
  }

  /**
   * Load from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('orderFilterState');
      if (stored) {
        const parsedState = JSON.parse(stored);
        // Convert date strings back to Date objects
        if (parsedState.dateFilter?.startDateString) {
          parsedState.dateFilter.startDate = new Date(
            parsedState.dateFilter.startDateString
          );
        }
        if (parsedState.dateFilter?.endDateString) {
          parsedState.dateFilter.endDate = new Date(
            parsedState.dateFilter.endDateString
          );
        }
        if (parsedState.courierDateFilter?.startDateString) {
          parsedState.courierDateFilter.startDate = new Date(
            parsedState.courierDateFilter.startDateString
          );
        }
        if (parsedState.courierDateFilter?.endDateString) {
          parsedState.courierDateFilter.endDate = new Date(
            parsedState.courierDateFilter.endDateString
          );
        }

        this.filterStateSubject.next(parsedState);
      }
    } catch (error) {
      console.warn('Could not load filter state from localStorage:', error);
    }
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    const state = this.filterStateSubject.value;
    return Object.keys(state).length > 0;
  }

  /**
   * Get active filter count
   */
  getActiveFilterCount(): number {
    const state = this.filterStateSubject.value;
    return Object.keys(state).length;
  }
}
