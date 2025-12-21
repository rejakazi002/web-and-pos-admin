import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {PcBuilder} from "../../../interfaces/common/pc-builder.interface";
import {Select} from "../../../interfaces/core/select";
import {DATA_STATUS, SEO_PAGE_TYPE, URL_TYPES} from "../../../core/utils/app-data";
import {Subscription} from "rxjs";
import {UiService} from "../../../services/core/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {PcBuilderService} from "../../../services/common/pc-builder.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../services/core/utils.service";
import {PageDataService} from "../../../services/core/page-data.service";
import {Title} from "@angular/platform-browser";
import {MatSelectChange} from "@angular/material/select";
import {ConfirmDialogComponent} from "../../../shared/components/ui/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-add-pc-builder',
  templateUrl: './add-pc-builder.component.html',
  styleUrl: './add-pc-builder.component.scss'
})
export class AddPcBuilderComponent implements OnInit, OnDestroy {

  // Decorator
  @ViewChild('formElement') formElement: NgForm;

  // Data Form
  dataForm?: FormGroup;

  // Store Data
  id: string;
  pcBuilder: PcBuilder;
  dataStatus: Select[] = DATA_STATUS;
  urlTypes: Select[] = URL_TYPES;
  pcBuilderType: Select[] = SEO_PAGE_TYPE;

  // Loading Control
  isLoading: boolean = false;

  // Image Control
  pickedImages: string[] = [];

  // Subscriptions
  private subscriptions: Subscription[] = [];

  // Inject
  private readonly uiService = inject(UiService);
  private readonly dialog = inject(MatDialog);
  private readonly pcBuilderService = inject(PcBuilderService);
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
        this.getPcBuilderById();
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
    this.title.setTitle('Add PcBuilder');
    this.pageDataService.setPageData({
      title: 'Add PcBuilder',
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Add PcBuilder', url: null},
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
      title: [null, Validators.required],
      images: [null],
      type: [null],
      isRequired: [false],
      autoSlug: [true],
      priority: [null],
      url: [null],
      status: [this.dataStatus[0].value],
    });
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


    if (!this.pcBuilder) {
      this.addPcBuilder(mData);
    } else {
      this.updatePcBuilderById(mData);
    }
  }

  onDiscard() {
    if (this.dataForm.dirty) {
      this.openConfirmDialog();
    } else {
      this.router.navigate(['/', 'pc-builder', 'all-pc-builder']).then();
    }
  }

  private setFormValue() {
    this.dataForm.patchValue(this.pcBuilder);

    if (this.pcBuilder.images) {
      this.pickedImages = this.pcBuilder.images;
    }
  }

  private patchDefaultValue() {
    this.dataForm.patchValue({status: 'publish'});
    this.pickedImages = [];
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
        this.router.navigate(['/pc-builder/all-pc-builder']).then();
      }
    });
    this.subscriptions.push(subDialogResult);
  }

  onPickedImage(event: any) {
    this.dataForm.patchValue({images: event});
  }

  /**
   * HTTP REQ HANDLE
   * getPcBuilderById()
   * getAllSubCategories()
   * addPcBuilder()
   * updatePcBuilderById()
   * getAllCategories()
   */
  private getPcBuilderById() {
    const subscription = this.pcBuilderService.getPcBuilderById(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.pcBuilder = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.subscriptions.push(subscription);
  }

  private addPcBuilder(data: any) {
    const subscription = this.pcBuilderService.addPcBuilder(data)
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

  private updatePcBuilderById(data: any) {
    const subscription = this.pcBuilderService.updatePcBuilderById(this.pcBuilder._id, data)
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
