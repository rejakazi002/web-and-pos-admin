import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiService} from '../../../../services/core/ui.service';
import {ProblemService} from '../../../../services/common/problem.service';
import {ReloadService} from '../../../../services/core/reload.service';
import {PageDataService} from '../../../../services/core/page-data.service';
import {Title} from '@angular/platform-browser';
import {adminBaseMixin} from '../../../../mixin/admin-base.mixin';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.scss']
})
export class AddProblemComponent extends adminBaseMixin(Component) implements OnInit, OnDestroy {

  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  id?: string;
  problem?: any;

  private subscriptions: Subscription[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly uiService = inject(UiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly problemService = inject(ProblemService);
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
        this.getProblemById();
      }
    });
    this.subscriptions.push(subRoute);
  }

  private setPageData(): void {
    const pageTitle = this.id ? 'Edit Problem' : 'Add Problem';
    this.title.setTitle(pageTitle);
    this.pageDataService.setPageData({
      title: pageTitle,
      navArray: [
        {name: 'Dashboard', url: `/dashboard`},
        {name: 'Repair', url: `/repair`},
        {name: 'Problem', url: `/repair/problem-list`},
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
    this.dataForm.patchValue(this.problem);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.message('Please fill all the required fields', 'warn');
      return;
    }
    if (this.problem) {
      this.updateProblemById();
    } else {
      this.addProblem();
    }
  }

  private getProblemById() {
    const subscription = this.problemService.getProblemById(this.id)
      .subscribe({
        next: (res => {
          if (res.data) {
            this.problem = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          console.log(error);
        })
      });
    this.subscriptions.push(subscription);
  }

  private addProblem() {
    const subscription = this.problemService.addProblemByShop(this.dataForm.value)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.formElement.resetForm();
            this.reloadService.needRefreshData$();
            this.router.navigate(['/repair/problem-list']).then();
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

  private updateProblemById() {
    const subscription = this.problemService.updateProblemById(this.problem._id, this.dataForm.value)
      .subscribe({
        next: (res => {
          if (res.success) {
            this.uiService.message(res.message, 'success');
            this.reloadService.needRefreshData$();
            this.router.navigate(['/repair/problem-list']).then();
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

