import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Select} from "../../../interfaces/core/select";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UtilsService} from "../../../services/core/utils.service";
import {UiService} from "../../../services/core/ui.service";
import {DiscountTypeEnum} from "../../../enum/product.enum";
import {Product} from "../../../interfaces/common/product.interface";
import {PromoOffer} from "../../../interfaces/common/promo-offer.interface";
import {DATA_STATUS, OFFER_TYPES, PROMO_OFFER_TYPES} from "../../../core/utils/app-data";
import {PromoOfferService} from "../../../services/common/promo-offer.service";
import {ProductListComponent} from "../../../shared/dialog-view/product-list/product-list.component";
import {TitleChangeComponent} from "../title-change/title-change.component";

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrl: './add-campaign.component.scss'
})
export class AddCampaignComponent implements OnInit, OnDestroy {

  // Ngx Quill
  modules: any = null;
  // Image Picker
  pickedImage = null;
  pickedMobileImage = null;
  pickedBannerImage = null;
  // Static Data
  productStatus: Select[] = DATA_STATUS;
  // Selected Data
  selectedIds: string[] = [];
  unselectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

// Image Control
  pickedImages: any[]= [];
  pickedIcon: string[] = [];


  today = new Date();
  minEndDate = this.today;


  // Store Data
  id?: string;
  viewOnly?: boolean;
  promoOffer?: PromoOffer;
  selectedProducts: Product[] = [];
  offerTypes =  PROMO_OFFER_TYPES;
  // Store Data
  autoSlug: boolean = true;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subRouteTwo: Subscription;
  private subAutoSlug: Subscription;

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private uiService: UiService,
    private promoOfferService: PromoOfferService,

  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();


    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getPromoOfferById();
      }
      // GET PAGE FROM QUERY PARAM
      this.subRouteTwo = this.activatedRoute.queryParams.subscribe(qParam => {
        if (qParam && qParam['productDialog']) {
          this.openProductListDialog()
        }
        this.viewOnly = qParam && qParam['viewOnly'] && qParam['viewOnly'] === 'yes';
      });
    });


    // whenever any date/time changes, recompute merged Date
    this.dataForm.get('startDate')?.valueChanges.subscribe(() => this.mergeStart());
    this.dataForm.get('startTime')?.valueChanges.subscribe(() => this.mergeStart());
    this.dataForm.get('endDate')?.valueChanges.subscribe(() => this.mergeEnd());
    this.dataForm.get('endTime')?.valueChanges.subscribe(() => this.mergeEnd());

    // Auto Slug
    this.autoGenerateSlug();
  }

  // private mergeStart(): void {
  //   const d: Date | null = this.dataForm.value.startDate as Date | null;
  //   const t: string = this.dataForm.value.startTime || '';
  //   const merged = this.mergeDateAndTime(d, t);
  //   this.dataForm.patchValue({ startDateTime: merged }, { emitEvent: false });
  //
  //   // endDate-এর মিন আপডেট: কমপক্ষে startDate
  //   if (d) this.minEndDate = d;
  //
  //   // যদি end আগে পড়ে যায়, auto-fix (চাইলে রিমুভ করতে পারো)
  //   const endMerged = this.mergeDateAndTime(this.dataForm.value.endDate as Date | null, this.dataForm.value.endTime || '');
  //   if (merged && endMerged && endMerged < merged) {
  //     this.dataForm.patchValue({
  //       endDate: d,
  //       endTime: t,
  //       endDateTime: merged
  //     }, { emitEvent: false });
  //   }
  // }
  //
  // private mergeEnd(): void {
  //   const d: Date | null = this.dataForm.value.endDate as Date | null;
  //   const t: string = this.dataForm.value.endTime || '';
  //   const merged = this.mergeDateAndTime(d, t);
  //   this.dataForm.patchValue({ endDateTime: merged }, { emitEvent: false });
  // }
  //
  // private mergeDateAndTime(date: Date | null, time: string): Date | null {
  //   if (!date || !time) return null;
  //   const [hh, mm] = time.split(':').map(v => parseInt(v, 10));
  //   if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  //   const out = new Date(date);
  //   out.setHours(hh, mm, 0, 0);
  //   return out;
  // }
  //
  // private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  //   const s: Date | null = group.get('startDateTime')?.value || null;
  //   const e: Date | null = group.get('endDateTime')?.value || null;
  //   if (s && e && e < s) {
  //     return { invalidRange: true };
  //   }
  //   return null;
  // }

  // timepicker ইভেন্ট থেকে আসা স্ট্রিং সেট + merge
  onStartTimeSet(val: string) {
    this.dataForm.get('startTime')?.setValue(val);
    this.mergeStart();
  }
  onEndTimeSet(val: string) {
    this.dataForm.get('endTime')?.setValue(val);
    this.mergeEnd();
  }

  private mergeStart(): void {
    const d: Date | null = this.dataForm.value.startDate as Date | null;
    const t: string = (this.dataForm.value.startTime || '').trim();
    const merged = this.mergeDateAndTime(d, t);
    this.dataForm.patchValue({ startDateTime: merged }, { emitEvent: false });
  }

  private mergeEnd(): void {
    const d: Date | null = this.dataForm.value.endDate as Date | null;
    const t: string = (this.dataForm.value.endTime || '').trim();
    const merged = this.mergeDateAndTime(d, t);
    this.dataForm.patchValue({ endDateTime: merged }, { emitEvent: false });
  }

  // "HH:mm" বা "h:mm AM/PM" – দুইটাই handle
  private mergeDateAndTime(date: Date | null, time: string): Date | null {
    if (!date || !time) return null;

    let hh = 0, mm = 0;

    // handle "12:34 PM" / "1:05 am"
    const ampmMatch = time.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
    if (ampmMatch) {
      hh = parseInt(ampmMatch[1], 10);
      mm = parseInt(ampmMatch[2], 10);
      const mer = ampmMatch[3].toUpperCase(); // AM/PM

      if (mer === 'AM') {
        if (hh === 12) hh = 0; // 12 AM -> 00
      } else {
        if (hh !== 12) hh += 12; // 1..11 PM -> 13..23
      }
    } else {
      // handle "HH:mm" (24h)
      const hm = time.split(':');
      if (hm.length < 2) return null;
      hh = parseInt(hm[0], 10);
      mm = parseInt(hm[1], 10);
      if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    }

    const out = new Date(date);
    out.setHours(hh, mm, 0, 0);
    return out;
  }

  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const s = group.get('startDateTime')?.value as Date | null;
    const e = group.get('endDateTime')?.value as Date | null;
    if (s && e && e < s) return { invalidRange: true };
    return null;
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setDataForm()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      title: [null, Validators.required],
      status: [this.productStatus[0].value, Validators.required],
      slug: [null],
      description: [null],
      bannerImage: [null],
      mobileImage: [null],

      // raw controls shown in UI
      startDate: [null, Validators.required],
      startTime: ['', Validators.required], // e.g. "14:30"
      endDate:   [null, Validators.required],
      endTime:   ['', Validators.required],


      // merged controls (optional: keep hidden or just use getters)
      startDateTime: [null, Validators.required],
      endDateTime:   [null, Validators.required],


      serial: [null],
      offerType: [this.offerTypes[0].value],
    },{ validators: this.dateRangeValidator.bind(this) });
  }

  private setDataForm() {

    if (!this.promoOffer) return;

    // ISO → Date
    const s = this.promoOffer.startDateTime ? new Date(this.promoOffer.startDateTime) : null;
    const e = this.promoOffer.endDateTime   ? new Date(this.promoOffer.endDateTime)   : null;


    if (this.promoOffer) {
      this.dataForm.patchValue(this.promoOffer);

      // Form patch (শুধু যেগুলো আছে সেগুলো দাও)
      this.dataForm.patchValue({
        // UI controls
        startDate:    s ? this.toLocalDateOnly(s) : null,
        startTime:    s ? this.formatTime12(s)    : '',   // formatTime24(s) ব্যবহার করলে 24h
        endDate:      e ? this.toLocalDateOnly(e) : null,
        endTime:      e ? this.formatTime12(e)    : '',
        // merged controls (API-তে পাঠাবে)
        startDateTime: s ?? null,
        endDateTime:   e ?? null,
      });


      this.selectedProducts = this.promoOffer.products.map(m => {
        return {
          ...m.product as Product,
          ...{
            offerDiscountAmount: m.offerDiscountAmount ? m.offerDiscountAmount : (m.product as Product).discountAmount ?? 0,
            offerDiscountType: m.offerDiscountType ? m.offerDiscountType : (m.product as Product).discountType,
            resetDiscount: m.resetDiscount,
            isShowInHome: m.isShowInHome,
            title: m.title,
            titleImg: m.titleImg,
          }
        } as Product
      });


      if (this.promoOffer.bannerImage) {
        this.pickedImages = [this.promoOffer.bannerImage];
      }

      if (this.promoOffer.mobileImage) {
        this.pickedMobileImage = this.promoOffer.mobileImage
      }
    }
  }

  /** শুধুই লোকাল ডেট অংশ; UI datepicker-এর জন্য */
  private toLocalDateOnly(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /** 12h ফরম্যাট => "h:mm AM/PM" (ngx-material-timepicker [format]="12" হলে) */
  private formatTime12(d: Date): string {
    let hh = d.getHours();
    const mm = d.getMinutes();
    const mer = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12;
    if (hh === 0) hh = 12;
    const mmStr = mm < 10 ? `0${mm}` : `${mm}`;
    return `${hh}:${mmStr} ${mer}`;
  }

  /** চাইলে 24h ফরম্যাট (input type="time" ইউজ করলে) */
// private formatTime24(d: Date): string {
//   const hh = d.getHours().toString().padStart(2, '0');
//   const mm = d.getMinutes().toString().padStart(2, '0');
//   return `${hh}:${mm}`;
// }


  onSubmit() {
    console.log("this.dataForm.value",this.dataForm.value)
    console.log("this.dataForm.invalid",this.dataForm.invalid)

    // সাবমিটের আগে শেষ একবার merge চালাই—সেফটি
    this.mergeStart();
    this.mergeEnd();


    if (this.dataForm.invalid) {
      this.uiService.message('Please complete all the required field','warn');
      this.dataForm.markAllAsTouched();
      return;
    }

    // if (!this.selectedProducts.length) {
    //   this.uiService.warn('Please select product')
    //   return;
    // }

    const mData = {
      ...this.dataForm.value,
      ...{
        startDateTime: (this.dataForm.value.startDateTime as Date)?.toISOString(),
        endDateTime:   (this.dataForm.value.endDateTime as Date)?.toISOString(),
        productCount: this.selectedProducts.length,
        products: this.selectedProducts.map(m => {
          return {
            product: m._id,
            offerDiscountType: m.offerDiscountType ? Number(m.offerDiscountType) : null,
            offerDiscountAmount: m.offerDiscountAmount ? Number(m.offerDiscountAmount) : null,
            resetDiscount: m.resetDiscount,
            isShowInHome: m.isShowInHome,
            title: m.title,
            titleImg: m.titleImg,
          }
        })
      }
    }

    if (this.id) {
      this.updatePromoOfferById(mData)
    } else {

      this.addPromoOffer(mData);
    }

  }


  /**
   * ACTION
   * removeProduct()
   */
  removeProduct(i: number) {
    this.selectedProducts.splice(i, 1);
    this.dataForm.patchValue({products: this.selectedProducts.map(m => m._id)})
  }

  /**
   * HTTP REQ HANDLE
   * addPromoOffer()
   * getPromoOfferById()
   * updatePromoOfferById()
   */
  private addPromoOffer(data: any) {

    this.subDataOne = this.promoOfferService.addPromoOffer(data)
      .subscribe(res => {

        if (res.success) {
          this.uiService.message(res.message,'success');
          this.resetValue();

        } else {
          this.uiService.message(res.message,'warn');
        }
      }, error => {

        console.log(error)
      })
  }

  private getPromoOfferById() {

    this.subRouteTwo = this.promoOfferService.getPromoOfferById(this.id,null)
      .subscribe(res => {

        if (res.success) {
          this.promoOffer = res.data;

          this.setDataForm();
        }
      }, error => {

        console.log(error)
      })
  }

  private updatePromoOfferById(data: any) {

    this.subDataThree = this.promoOfferService.updatePromoOfferById(this.promoOffer._id, data)
      .subscribe(res => {

        if (res.success) {
          this.uiService.message(res.message,'success');
        } else {
          this.uiService.message(res.message,'warn');
        }
      }, error => {

        console.log(error);
      });
  }

  /**
   * RESET VALUE
   */
  private resetValue() {
    this.formElement.resetForm();
    this.pickedImage = null;
    this.pickedMobileImage = null;
    this.selectedProducts = [];
    this.dataForm.patchValue({status: 'publish'});
    this.pickedImages = [];
  }


  /**
   * OPEN COMPONENT DIALOG
   * openGalleryDialog()
   * openProductListDialog()
   */


  public openTitleAddDialog() {

    const dialogRef = this.dialog.open(TitleChangeComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log('dialogResult', dialogResult);

        const selectedIdsSet = new Set(this.selectedIds);

        // Use reduce to update titles in selectedProducts in one pass
        this.selectedProducts.forEach(product => {


          if (selectedIdsSet.has(product._id)) {
            product.title = dialogResult.title;
            product.titleImg = dialogResult.titleImg;
          }
        });


      }
    });
  }

  public openProductListDialog() {
    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
    const dialogRef = this.dialog.open(ProductListComponent, {
      data: {ids: this.selectedProducts && this.selectedProducts.length ? this.selectedProducts.map(m => m._id) : null},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log("dialogResult.data",dialogResult.data)
        if (dialogResult.data) {

          let selectedProducts: Product[];
          if (this.selectedProducts.length && dialogResult.data.unselectedIds) {
            selectedProducts = this.selectedProducts.filter((item) => {
              return dialogResult.data.unselectedIds.indexOf(item._id) === -1;
            });
          } else {
            selectedProducts = this.selectedProducts;
          }

          if (dialogResult.data.selected) {
            const mProducts = dialogResult.data.selected.map(m => {
              return {
                ...m,
                ...{
                  selectedQty: 1,
                  offerDiscountAmount: m.discountAmount??0,
                  offerDiscountType: m.discountType,
                  resetDiscount: true,
                  isShowInHome: true,
                  select: false,
                  title: null,
                  titleImg: null,
                }
              }
            });
            this.selectedProducts = this.utilsService.mergeArrayUnique(selectedProducts, mProducts);

          } else {
            this.selectedProducts = this.utilsService.mergeArrayUnique(selectedProducts, []);
          }



          // this.dataForm.patchValue({products: this.selectedProducts.map(m => m._id)});

        }
      }
    });
  }



  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.selectedProducts.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.selectedProducts.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.selectedProducts.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
        this.unselectedIds.push(m);
      });
    }
  }


  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      // if (this.data.type === 'single' && this.selectedIds.length === 1) {
      //   this.uiService.warn('Please select a single product');
      //   return;
      // }
      //
      // if (this.data.type === 'multiple' && this.selectedIds.length === this.data.count) {
      //   this.uiService.warn(`You can select only ${ this.data.count} products.`);
      //   return;
      // }

      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex((f) => f === id);
      this.selectedIds.splice(i, 1);
      this.unselectedIds.push(id);
    }
  }


  /**
   * CALCULATIONS
   */
  getSalePrice(product: Product): any {
    if (product?.isVariation) {

      return Math.floor(product?.variationList[0]?.regularPrice - Number(product.offerDiscountAmount));
    } else if (!product?.isVariation) {
      return Math.floor(product?.regularPrice - Number(product.offerDiscountAmount));
    } else {
      return Math.floor(product?.salePrice);
    }
  }


  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.subAutoSlug = this.dataForm.get('title').valueChanges
        .pipe(
          // debounceTime(200),
          // distinctUntilChanged()
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
          });
        });
    } else {
      if (!this.subAutoSlug) {
        return;
      }
      this.subAutoSlug?.unsubscribe();
    }
  }
  removeImg(type: 'image' | 'mobileImage'){

    if (type === 'mobileImage') {
      this.dataForm.patchValue({mobileImage: null});
      this.pickedMobileImage = null;
    } else {
      this.dataForm.patchValue({image: null});
      this.pickedImage = null;

    }

  }


  onPickedImage(event: any) {
    this.dataForm.patchValue({bannerImage: event[0]});
  }
  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }

    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
    if (this.subAutoSlug) {
      this.subAutoSlug.unsubscribe();
    }
  }



}
