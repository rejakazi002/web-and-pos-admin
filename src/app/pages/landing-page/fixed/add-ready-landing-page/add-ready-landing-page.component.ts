import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Select} from "../../../../interfaces/core/select";
import {DATA_STATUS, ShowType, URL_TYPES} from "../../../../core/utils/app-data";
import {Product} from "../../../../interfaces/common/product.interface";
import {Subscription} from "rxjs";
import {UiService} from "../../../../services/core/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../../services/core/utils.service";
import {PageDataService} from "../../../../services/core/page-data.service";
import {Title} from "@angular/platform-browser";
import {
  LandingPagePreviewDialogComponent
} from "../../../../shared/dialog-view/landing-page-preview-dialog/landing-page-preview-dialog.component";
import {ConfirmDialogComponent} from "../../../../shared/components/ui/confirm-dialog/confirm-dialog.component";
import {MyGalleryComponent} from "../../../my-gallery/my-gallery.component";
import { ReadyLandingPage } from "../../../../interfaces/common/ready-landing-page.interface";
import {ReadyLandingPageService } from "../../../../services/common/ready-landing-page.service";
@Component({
  selector: 'app-add-ready-landing-page',
  templateUrl: './add-ready-landing-page.component.html',
  styleUrl: './add-ready-landing-page.component.scss'
})
export class AddReadyLandingPageComponent implements OnInit, OnDestroy {

  // Decorator
  @ViewChild('formElement') formElement: NgForm;

  // Data Form
  dataForm?: FormGroup;

  // Store Data
  id: string;
  landingPage: ReadyLandingPage;
  dataStatus: Select[] = DATA_STATUS;
  urlTypes: Select[] = URL_TYPES;
  autoSlug: boolean = true;
  allTableData: Product[] = [];
  // Loading Control
  isLoading: boolean = false;
  specificationDataArray?: FormArray;
  whyBestDataArray?: FormArray;
  faqDataArray?: FormArray;
  reviewsDataArray?: FormArray;
  productDetailsDataArray?: FormArray;

  // Image Control
  pickedImages: string[] = [];
  certificateImage: string[] = [];
  whyBestImage: string[] = [];
  specificationImage: string[] = [];

  // Subscriptions
  private subscriptions: Subscription[] = []


  // Inject
  private readonly uiService = inject(UiService);
  private readonly dialog = inject(MatDialog);
  private readonly readyLandingPagService = inject(ReadyLandingPageService);
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
        this.getOfferPageById();
      }
    });
    this.subscriptions.push(subParamMap);

    // Auto Slug
    this.autoGenerateSlug();
    this.setPageData();
  }


  /**
   * Page Data
   * setPageData()
   */
  private setPageData(): void {
    this.title.setTitle('Add OfferPage');
    this.pageDataService.setPageData({
      title: 'Add OfferPage',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Add OfferPage', url: 'https://www.youtube.com/embed/HqWxM-PrTzg?si=6NayN2bUBnjT1YTe'},
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
      title: [null],
      whyBestTitle: [null],
      whyBestImage: [null],
      specificationImage: [null],
      certificateImage: [null],
      productHeaderTitle: [null],
      textColor: [null],
      backgroundColor: [null],
      slideText: [null],
      endDate: [null],
      desc: [null],
      slug: [null],
      videoUrl: [null],
      reviewScreenShoot: [null],
      images: [null],
      reviewTitle: [null],
      offerText: [null],
      faqTitle: [null],
      paymentTitle: [null],
      name: [null],
      image: [null],
      whyBuyDescription: [null],
      whyBestDescription: [null],
      productDetailsTitle: [null],
      whyBuy: [null],
      priority: [null],
      product: [[]],
      description: [null],
      specifications: this.fb?.array([]),
      whyBest: this.fb?.array([]),
      faqList: this.fb?.array([]),
      reviews: this.fb?.array([]),
      productDetails: this.fb?.array([]),
      type: [null],
      status: ['publish'],
    });
    this.specificationDataArray = this.dataForm.get('specifications') as FormArray;
    this.whyBestDataArray = this.dataForm.get('whyBest') as FormArray;
    this.faqDataArray = this.dataForm.get('faqList') as FormArray;
    this.reviewsDataArray = this.dataForm.get('reviews') as FormArray;
    this.productDetailsDataArray = this.dataForm.get('productDetails') as FormArray;
  }


  onSubmit() {
    // if (!this.dataForm.value.images || !this.dataForm.value.images.length) {
    //   this.uiService.message('Image is required, Please select image', 'warn');
    //   this.dataForm.markAllAsTouched();
    //   return;
    // }

    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all the required fields', 'warn');
      return;
    }


    let mData = {
      ...this.dataForm.value,
    };

    if (this.dataForm.value.urlType === 'internal') {
      mData = {
        ...mData,
        // ...{
        //   url: this.utilsService.extractPath(this.dataForm.value.url),
        // }
      }
    }

    if (!this.landingPage) {
      this.addOfferPage(mData);
    } else {
      this.updateOfferPageById(mData);
    }
  }

  onDiscard() {
    if (this.dataForm.dirty) {
      this.openConfirmDialog();
    } else {
      this.router.navigate(['/landing-page/all-ready-landing-page']).then();
    }
  }

  onPreview() {
    // Prepare the data for preview
    const previewData = {
      ...this.dataForm.value,
      allTableData: this.allTableData,
      images: this.pickedImages,
      certificateImage: this.certificateImage,
      specificationImage: this.specificationImage
    };

    // Open the preview dialog
    const dialogRef = this.dialog.open(LandingPagePreviewDialogComponent, {
      width: '98vw',
      maxWidth: '1400px',
      height: '95vh',
      maxHeight: '95vh',
      panelClass: 'landing-page-preview-dialog',
      data: previewData,
      disableClose: false,
      autoFocus: false,
      restoreFocus: true,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close if needed
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.landingPage);

    if (this.landingPage.images) {
      this.pickedImages = this.landingPage.images;
    }

    if (this.landingPage && this.landingPage.whyBestImage) {
      this.whyBestImage = this.landingPage.whyBestImage;
    }

    if (this.landingPage && this.landingPage.specificationImage) {
      this.specificationImage = this.landingPage.specificationImage;
    }

    if (this.landingPage && this.landingPage.reviewScreenShoot) {
      this.certificateImage = this.landingPage.reviewScreenShoot;
    }

    if (this.landingPage.product) {
      if (Array.isArray(this.landingPage.product)) {
        this.allTableData = [...this.landingPage.product];
      } else {
        this.allTableData = [this.landingPage.product];
      }
      this.dataForm.patchValue({ product: [...this.allTableData] });
    }

    // Form Array Specifications
    if (this.landingPage.specifications && this.landingPage.specifications.length) {
      this.landingPage.specifications.map((m) => {
        const f = this.fb.group({
          title: [m.title],
          value: [m.value],
        });
        (this.dataForm?.get('specifications') as FormArray).push(f);
      });
    }

    // Form Array Specifications
    if (this.landingPage.whyBest && this.landingPage.whyBest.length) {
      this.landingPage.whyBest.map((m) => {
        const f = this.fb.group({
          title: [m.title],
        });
        (this.dataForm?.get('whyBest') as FormArray).push(f);
      });
    }

// Form Array Specifications
    if (this.landingPage.faqList && this.landingPage.faqList.length) {
      this.landingPage.faqList.map((m) => {
        const f = this.fb.group({
          question: [m.question],
          answer: [m.answer],
        });
        (this.dataForm?.get('faqList') as FormArray).push(f);
      });
    }

    // Form Array Specifications
    if (this.landingPage.reviews && this.landingPage.reviews.length) {
      this.landingPage.reviews.map((m) => {
        const f = this.fb.group({
          name: [m.name],
          rating: [m.rating],
          review: [m.review],
          image: [m.image],
        });
        (this.dataForm?.get('reviews') as FormArray).push(f);
      });
    }

    // Form Array Specifications
    if (this.landingPage.productDetails && this.landingPage.productDetails.length) {
      this.landingPage.productDetails.map((m) => {
        const f = this.fb.group({
          name: [m.name],
          image: [m.image],
        });
        (this.dataForm?.get('productDetails') as FormArray).push(f);
      });
    }

  }

  private patchDefaultValue() {
    this.dataForm.patchValue({status: 'publish'});
    this.pickedImages = [];
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
        this.router.navigate(['/landing-page/all-ready-landing-page']).then();
      }
    });
    this.subscriptions.push(subDialogResult);
  }

  onPickedImage(event: any,type:any) {
    if(type === 'image'){
      this.dataForm.patchValue({images: event});
    }else if(type === 'specificationImage'){
      this.dataForm.patchValue({specificationImage: event});
    }else if(type === 'reviewScreenShoot'){
      this.dataForm.patchValue({reviewScreenShoot: event});
    }
  }

  onPickedReview(images: any[], index: number): void {
    const control = (this.dataForm.get('reviews') as FormArray).at(index);
    control.get('image')?.setValue(images[0]);
  }

  onPickedProductDetails(images: any[], index: number): void {
    const control = (this.dataForm.get('productDetails') as FormArray).at(index);
    control.get('image')?.setValue(images[0]);
  }

  /**
   * HTTP REQ HANDLE
   * getOfferPageById()
   * addOfferPage()
   * updateOfferPageById()
   */
  private getOfferPageById() {
    const subscription = this.readyLandingPagService.getReadyLandingPageById(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.landingPage = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.subscriptions.push(subscription);
  }

  private addOfferPage(data: any) {
    const subscription = this.readyLandingPagService.addReadyLandingPage(data)
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

  private updateOfferPageById(data: any) {
    const subscription = this.readyLandingPagService.updateReadyLandingPageById(this.landingPage._id, data)
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
   * LOGICAL PART
   * onProductSelect()
   * deleteProducts()
   */

  onProductSelect(event: Product) {
    const exists = this.allTableData.find(p => (p as any)?._id === (event as any)?._id);
    if (!exists) {
      this.allTableData.push(event);
    }
    this.dataForm.patchValue({ product: [...this.allTableData] });
  }

  deleteProduct(index: number) {
    this.allTableData.splice(index, 1);
    this.dataForm.patchValue({ product: this.allTableData.length ? [...this.allTableData] : [] });
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

  onAddNewShopObject(formControl: string) {
    const f = this.fb.group({
      title: [null],
      // value: [null, Validators.required]
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  onAddNewObject(formControl: string) {
    const f = this.fb.group({
      title: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  onAddNewFaq(formControl: string) {
    const f = this.fb.group({
      question: [null],
      answer: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }
  onAddReview(formControl: string) {
    const f = this.fb.group({
      name: [null],
      rating: [null],
      review: [null],
      image: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  onAddProductInfo(formControl: string) {
    const f = this.fb.group({
      name: [null],
      image: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'specifications': {
        formDataArray = this.specificationDataArray;
        break;
      }
      case 'whyBest': {
        formDataArray = this.whyBestDataArray;
        break;
      }
      case 'faqList': {
        formDataArray = this.faqDataArray;
        break;
      } case 'reviews': {
        formDataArray = this.reviewsDataArray;
        break;
      }case 'productDetails': {
        formDataArray = this.productDetailsDataArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }


  resetDate() {
    this.dataForm.get('endDate')?.setValue(null);
    this.dataForm.get('endDate')?.markAsUntouched();
  }

  public openQuizGalleryDialog(index: number) {
    const dialogRef = this.dialog.open(MyGalleryComponent, {
      data: {type: 'multiple', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.reviewsDataArray.at(index).patchValue({image: dialogResult.data[0].url})
        }
      }
    });
  }

  /**
   * ON Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }


  // protected readonly bannerType = BANNER_TYPE;
  protected readonly showType = ShowType;
}
