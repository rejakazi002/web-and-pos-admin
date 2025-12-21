import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiService} from '../../../../services/core/ui.service';
import {BrandService} from '../../../../services/common/brand.service';
import {ReloadService} from '../../../../services/core/reload.service';
import {PageDataService} from '../../../../services/core/page-data.service';
import {Title} from '@angular/platform-browser';
import {adminBaseMixin} from '../../../../mixin/admin-base.mixin';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent extends adminBaseMixin(Component) implements OnInit, OnDestroy {

  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  id?: string;
  brand?: any;
  isLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly activatedRoute = inject(ActivatedRoute);
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
        this.getBrandById();
      }
    });
    this.subscriptions.push(subRoute);
  }

  private setPageData(): void {
    const pageTitle = this.id ? 'Edit Brand' : 'Add Brand';
    this.title.setTitle(pageTitle);
    this.pageDataService.setPageData({
      title: pageTitle,
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Repair', url: `/repair`},
        {name: 'Brand', url: `/repair/brand-list`},
        {name: pageTitle, url: ''},
      ]
    })
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.brand);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all the required fields', 'warn');
      return;
    }
    if (this.brand) {
      this.updateBrandById();
    } else {
      this.addBrand();
    }
  }

  private getBrandById() {
    const subscription = this.brandService.getBrandById(this.id)
      .subscribe({
        next: (res => {
          if (res.data) {
            this.brand = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
    this.subscriptions.push(subscription);
  }

  private addBrand() {
    const subscription = this.brandService.addBrandByShop(this.dataForm.value)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.formElement.resetForm();
            this.reloadService.needRefreshData$();
            this.router.navigate(['/repair/brand-list']).then();
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

  private updateBrandById() {
    const subscription = this.brandService.updateBrandById(this.brand._id, this.dataForm.value)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/repair/brand-list']).then();
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}

