import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {UiService} from '../../../../services/core/ui.service';
import {ModelService} from '../../../../services/common/model.service';
import {BrandService} from '../../../../services/common/brand.service';
import {ReloadService} from '../../../../services/core/reload.service';
import {PageDataService} from '../../../../services/core/page-data.service';
import {Title} from '@angular/platform-browser';
import {adminBaseMixin} from '../../../../mixin/admin-base.mixin';
import {FilterData} from '../../../../interfaces/gallery/filter-data';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent extends adminBaseMixin(Component) implements OnInit, OnDestroy {

  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  id?: string;
  model?: any;

  // Dropdown data
  brands: any[] = [];
  filterBrandData: any[] = [];
  brandSearchControl = new FormControl('');

  private subscriptions: Subscription[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly modelService = inject(ModelService);
  private readonly brandService = inject(BrandService);
  private readonly router = inject(Router);
  private readonly reloadService = inject(ReloadService);
  private readonly pageDataService = inject(PageDataService);
  private readonly title = inject(Title);

  ngOnInit(): void {
    this.initDataForm();
    this.setPageData();

    const subRoute = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getModelById();
      }
    });
    this.subscriptions.push(subRoute);

    // Reload subscriptions
    const subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllBrand();
    });
    this.subscriptions.push(subReload);

    this.getAllBrand();
    this.setupBrandSearch();
  }

  private setupBrandSearch() {
    const subSearch = this.brandSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        this.getAllBrand(searchTerm || '');
      });
    this.subscriptions.push(subSearch);
  }

  private setPageData(): void {
    const pageTitle = this.id ? 'Edit Model' : 'Add Model';
    this.title.setTitle(pageTitle);
    this.pageDataService.setPageData({
      title: pageTitle,
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Repair', url: `/repair`},
        {name: 'Model', url: `/repair/model-list`},
        {name: pageTitle, url: ''},
      ]
    })
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.model);

    if (this.model?.brand) {
      this.dataForm.patchValue({
        brand: this.model.brand._id || this.model.brand
      });
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all the required fields', 'warn');
      return;
    }
    if (this.model) {
      this.updateModelById();
    } else {
      this.addModel();
    }
  }

  private getModelById() {
    const subscription = this.modelService.getModelById(this.id)
      .subscribe({
        next: (res => {
          if (res.data) {
            this.model = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
    this.subscriptions.push(subscription);
  }

  private addModel() {
    let mData = {...this.dataForm.value};

    // Set brand object
    if (this.dataForm.value.brand) {
      const selectedBrand = this.brands.find((f) => f._id === this.dataForm.value.brand);
      if (selectedBrand) {
        mData = {
          ...mData,
          brand: {
            _id: selectedBrand._id,
            name: selectedBrand.name,
          }
        };
      }
    }

    const subscription = this.modelService.addModelByShop(mData)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.formElement.resetForm();
            this.reloadService.needRefreshData$();
            this.router.navigate(['/repair/model-list']).then();
          } else {
            this.uiService.message(res.message, 'warn');
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
    this.subscriptions.push(subscription);
  }

  private updateModelById() {
    let mData = {...this.dataForm.value};

    // Set brand object
    if (this.dataForm.value.brand) {
      const selectedBrand = this.brands.find((f) => f._id === this.dataForm.value.brand);
      if (selectedBrand) {
        mData = {
          ...mData,
          brand: {
            _id: selectedBrand._id,
            name: selectedBrand.name,
          }
        };
      }
    }

    const subscription = this.modelService.updateModelById(this.model._id, mData)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/repair/model-list']).then();
          } else {
            this.uiService.message(res.message, 'warn');
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
    this.subscriptions.push(subscription);
  }

  private getAllBrand(searchQuery?: string) {
    const mSelect = {
      name: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    const searchTerm = searchQuery || this.brandSearchControl.value || '';

    // Use getAllBrands1 which uses get-all endpoint (doesn't require shop parameter)
    const subscription = this.brandService.getAllBrands1(filter, searchTerm || null)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.brands = res.data || [];
            this.filterBrandData = [...this.brands];
          } else {
            console.log('Brand loading failed:', res);
          }
        },
        error: (err) => {
          console.log('Brand loading error:', err);
          // Try fallback to getAllBrands if getAllBrands1 fails
          this.brandService.getAllBrands(filter, searchTerm || null)
            .subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.brands = res.data || [];
                  this.filterBrandData = [...this.brands];
                }
              },
              error: (err2) => {
                console.log('Fallback brand loading error:', err2);
              }
            });
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}

