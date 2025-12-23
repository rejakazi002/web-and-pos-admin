import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Service} from "../../../interfaces/common/service.interface";
import {Select} from "../../../interfaces/core/select";
import {DATA_STATUS, SEO_PAGE_TYPE, URL_TYPES} from "../../../core/utils/app-data";
import {Subscription} from "rxjs";
import {UiService} from "../../../services/core/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {ServiceService} from "../../../services/common/service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../services/core/utils.service";
import {PageDataService} from "../../../services/core/page-data.service";
import {Title} from "@angular/platform-browser";
import {MatSelectChange} from "@angular/material/select";
import {ConfirmDialogComponent} from "../../../shared/components/ui/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent implements OnInit, OnDestroy {

  // Decorator
  @ViewChild('formElement') formElement: NgForm;

  // Data Form
  dataForm?: FormGroup;

  // Store Data
  id: string;
  service: Service;
  dataStatus: Select[] = DATA_STATUS;
  urlTypes: Select[] = URL_TYPES;
  serviceType: Select[] = SEO_PAGE_TYPE;

  // Loading Control
  isLoading: boolean = false;

  // Image Control
  pickedImages: string[] = [];

  // Form Array Controls
  servicesDataArray: FormArray;
  authorizedServiceCentersDataArray: FormArray;
  locationsDataArray: FormArray;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  // Inject
  private readonly uiService = inject(UiService);
  private readonly dialog = inject(MatDialog);
  private readonly serviceService = inject(ServiceService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly utilsService = inject(UtilsService);
  private readonly pageDataService = inject(PageDataService);
  private readonly title = inject(Title);


  ngOnInit(): void {
    this.initDataForm();
    // ParamMap Subscription
    const subParamMap = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getServiceById();
      }
    });
    this.subscriptions.push(subParamMap);

    // Base Data
    this.setPageData();
  }


  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Add Service');
    this.pageDataService.setPageData({
      title: 'Add Service',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Add Service', url: null},
      ]
    })
  }

  /**
   * FORM METHODS
   * initDataForm()
   * onSubmit()
   * onDiscard()
   * setFormValue()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      seoTitle: [null],
      images: [null, Validators.required],
      type: [null],
      seoKeyword: [null],
      seoDescription: [null],
      status: ['publish'],
      services: this.fb.array([]),
      authorizedServiceCenters: this.fb.array([]),
      locations: this.fb.array([]),
      whyBuyDescription: [null],
    });
    this.servicesDataArray = this.dataForm.get('services') as FormArray;
    this.authorizedServiceCentersDataArray = this.dataForm.get('authorizedServiceCenters') as FormArray;
    this.locationsDataArray = this.dataForm.get('locations') as FormArray;
  }

  onSubmit() {
    if (!this.dataForm.value.images || !this.dataForm.value.images.length) {
      this.uiService.message('Image is required, Please select image', 'warn');
      this.dataForm.markAllAsTouched();
      return;
    }

    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all the required fields', 'warn');
      return;
    }


    let mData = {
      ...this.dataForm.value,
    };


    if (!this.service) {
      this.addService(mData);
    } else {
      this.updateServiceById(mData);
    }
  }

  onDiscard() {
    if (this.dataForm.dirty) {
      this.openConfirmDialog();
    } else {
      this.router.navigate(['/', 'seo-page', 'all-seo-page']).then();
    }
  }

  private setFormValue() {
    this.dataForm.patchValue(this.service);

    if (this.service.images) {
      this.pickedImages = this.service.images;
    }

    // Form Array Services
    if (this.service.services && this.service.services.length) {
      this.service.services.map((m) => {
        const f = this.fb.group({
          title: [m.title],
          description: [m.description],
          image: [m.image],
        });
        (this.dataForm?.get('services') as FormArray).push(f);
      });
    }

    // Form Array Authorized Service Centers
    if (this.service.authorizedServiceCenters && this.service.authorizedServiceCenters.length) {
      this.service.authorizedServiceCenters.map((m) => {
        const f = this.fb.group({
          title: [m.title],
          image: [m.image],
        });
        (this.dataForm?.get('authorizedServiceCenters') as FormArray).push(f);
      });
    }

    // Form Array Locations
    if (this.service.locations && this.service.locations.length) {
      this.service.locations.map((m) => {
        const f = this.fb.group({
          title: [m.title],
          address: [m.address],
          phone: [m.phone],
          mapLink: [m.mapLink],
          writeOffDay: [m.writeOffDay],
          image: [m.image],
        });
        (this.dataForm?.get('locations') as FormArray).push(f);
      });
    }
  }

  private patchDefaultValue() {
    this.dataForm.patchValue({status: 'publish'});
    this.pickedImages = [];
    // Clear form arrays
    while (this.servicesDataArray.length !== 0) {
      this.servicesDataArray.removeAt(0);
    }
    while (this.authorizedServiceCentersDataArray.length !== 0) {
      this.authorizedServiceCentersDataArray.removeAt(0);
    }
    while (this.locationsDataArray.length !== 0) {
      this.locationsDataArray.removeAt(0);
    }
  }

  /**
   * SELECTION CHANGE
   * onUrlTypeChange()
   */
  onUrlTypeChange(event: MatSelectChange) {
    if (!event.value) {
      this.dataForm.get('url').setValue(null);
    }
  }


  /**
   * COMPONENT DIALOG
   * openConfirmDialog()
   * onPickedImage()
   */
  public openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Discard',
        message: 'Are you sure you want to discard?'
      }
    });
    const subDialogResult = dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.router.navigate(['/seo-page/all-seo-page']).then();
      }
    });
    this.subscriptions.push(subDialogResult);
  }

  onPickedImage(event: any) {
    this.dataForm.patchValue({images: event});
  }

  onPickedLocation(images: any[], index: number): void {
    const control = (this.dataForm.get('locations') as FormArray).at(index);
    control.get('image')?.setValue(images[0]);
  }

  onPickedService(images: any[], index: number): void {
    const control = (this.dataForm.get('services') as FormArray).at(index);
    control.get('image')?.setValue(images[0]);
  }

  onPickedAuthorizedServiceCenter(images: any[], index: number): void {
    const control = (this.dataForm.get('authorizedServiceCenters') as FormArray).at(index);
    control.get('image')?.setValue(images[0]);
  }

  /**
   * FORM ARRAY METHODS
   * onAddNewService()
   * onAddNewAuthorizedServiceCenter()
   * onAddNewLocation()
   * removeFormArrayField()
   */
  onAddNewService(formControl: string) {
    const f = this.fb.group({
      title: [null],
      description: [null],
      image: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  onAddNewAuthorizedServiceCenter(formControl: string) {
    const f = this.fb.group({
      title: ['Authorized Service Center'],
      image: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  onAddNewLocation(formControl: string) {
    const f = this.fb.group({
      title: [null],
      address: [null],
      phone: [null],
      mapLink: [null],
      writeOffDay: [null],
      image: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'services': {
        formDataArray = this.servicesDataArray;
        break;
      }
      case 'authorizedServiceCenters': {
        formDataArray = this.authorizedServiceCentersDataArray;
        break;
      }
      case 'locations': {
        formDataArray = this.locationsDataArray;
        break;
      }
      default: {
        formDataArray = this.dataForm?.get(formControl) as FormArray;
        break;
      }
    }
    formDataArray.removeAt(index);
  }

  /**
   * HTTP REQ HANDLE
   * getServiceById()
   * getAllSubCategories()
   * addService()
   * updateServiceById()
   * getAllCategories()
   */
  private getServiceById() {
    const subscription = this.serviceService.getServiceById(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.service = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.subscriptions.push(subscription);
  }

  private addService(data: any) {
    const subscription = this.serviceService.addService(data)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.formElement.resetForm();
            this.patchDefaultValue();
          } else {
            this.uiService.message(res.message, 'warn');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.subscriptions.push(subscription);
  }

  private updateServiceById(data: any) {
    const subscription = this.serviceService.updateServiceById(this.service._id, data)
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
    this.subscriptions.push(subscription);
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }

}
