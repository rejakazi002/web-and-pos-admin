import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {adminBaseMixin} from "../../../mixin/admin-base.mixin";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Expense} from "../../../interfaces/common/expense.interface";
import {DATA_STATUS} from "../../../core/utils/app-data";
import {Select} from "../../../interfaces/core/select";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UiService} from "../../../services/core/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {PageDataService} from "../../../services/core/page-data.service";
import {Title} from "@angular/platform-browser";
import {ConfirmDialogComponent} from "../../../shared/components/ui/confirm-dialog/confirm-dialog.component";
import {FilterData} from "../../../interfaces/gallery/filter-data";
import {ExpenseCategoryService} from "../../../services/common/expense-category.service";
import {ExpenseService} from "../../../services/common/expense.service";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent extends adminBaseMixin(Component) implements OnInit, OnDestroy {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  autoSlug: boolean = true;

  // Loading Control
  isLoading: boolean = false;

  // Store Data
  id?: string;
  expense?: Expense;
  categories: any[];
  dataStatus: Select[] = DATA_STATUS;

  // Image Control
  pickedImages: string[] = [];
  // Subscriptions
  private subscriptions: Subscription[] = [];

  // Inject
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly uiService = inject(UiService);
  private readonly dialog = inject(MatDialog);
  private readonly categoryService = inject(ExpenseCategoryService);
  private readonly expenseService = inject(ExpenseService);
  private readonly pageDataService = inject(PageDataService);
  private readonly title = inject(Title);


  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    const subRouteParam = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getExpenseById();
      }
    });
    this.subscriptions.push(subRouteParam);

    // Auto Slug
    // this.autoGenerateSlug();
    this.setPageData();

    //  Base Data
    this.getAllCategories();
  }


  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Add Expense');
    this.pageDataService.setPageData({
      title: 'Add Expense',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Add Expense', url: null},
      ]
    })
  }


  private getAllCategories() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: { name: 1 }
    }
    const subscription = this.categoryService.getAllCategories(filterData, null)
      .subscribe({
        next: (res => {
          this.categories = res.data;

        }),
        error: (error => {
          console.log(error);
        })
      });
    this.subscriptions.push(subscription)
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   * onDiscard()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      images: [null],
      amount: [null],
      description: [null],
      category: [null],
      date: [null],
      status: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(
      {
        ...this.expense,
        ...{
          category: this.expense.category._id,
        }
      }
    );
    if (this.expense.images) {
      this.pickedImages = this.expense.images;
    }
  }
  onPickedImage(event: any) {
    this.dataForm.patchValue({images: event});
  }

  onSubmit() {

    if (this.dataForm.invalid) {
      this.uiService.message('Please filed all the required field', 'warn');
      return;
    }
    const mData = {
      ...this.dataForm.value,
      ...{
        category: {
          _id: this.dataForm.value.category,
          name: this.categories.find(f => f._id === this.dataForm.value.category).name,
          slug: this.categories.find(f => f._id === this.dataForm.value.category).slug,
        }
      }
    }

    if (!this.expense) {
      this.addExpense(mData);
    } else {
      this.updateExpenseById(mData);
    }
  }

  onDiscard() {
    if (this.dataForm.dirty) {
      this.openConfirmDialog();
    } else {
      this.router.navigate(['/', 'expense', 'all-expense']).then()
    }
  }

  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   */
  public openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Discard',
        message: 'Are you sure you want discard?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.router.navigate(['/expense']).then();
      }
    });

  }

  /**
   * HTTP REQ HANDLE
   * getCategoryById()
   * addCategory()
   * updateCategoryById()
   */

  private getExpenseById() {
    const subscription = this.expenseService.getExpenseById(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.expense = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.subscriptions.push(subscription)
  }

  private addExpense(data: any) {
    const subscription = this.expenseService
      .addExpense(data)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.formElement.resetForm();
          } else {
            this.uiService.message(res.message, 'warn');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.subscriptions.push(subscription)
  }

  private updateExpenseById(data: any) {
    const subscription = this.expenseService
      .updateExpenseById(this.expense._id, data)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
          } else {
            this.uiService.message(res.message, 'warn');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.subscriptions.push(subscription)
  }


  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    let subAutoSlug: any;
    if (this.autoSlug === true) {
      subAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
          // debounceTime(200),
          // distinctUntilChanged()
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
          });
        });
      this.subscriptions.push(subAutoSlug);
    } else {
      if (!subAutoSlug) {
        return;
      }
      this.subscriptions.push(subAutoSlug);
    }
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }

}
