import { FormControlSelector } from './../../../common/form-validators'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { errorsDescription, isInValidControl, markAsTouched } from 'app/common/common'
import { sw_fire } from 'app/common/sweetAlert2'
import { AuthService } from 'app/shared/service/complex/auth.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
interface LoginForm {
    account: FormControl<string | null>
    password: FormControl<string | null>
}
const dummy_person = {
    account: '123456',
    password: '123456',
}
@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit, OnDestroy {
    form!: FormGroup<LoginForm>
    fb = new FormBuilder()
    //
    auth = inject(AuthService)
    router = inject(Router)
    spinnerService = inject(NgxSpinnerService)
    //
    subscription!: Subscription
    submitSubject = new Subject() // submit button click debounceTime

    constructor() {}
    ngOnInit(): void {
        this.initForm()
        this.initSubscription()
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
    initForm() {
        this.form = this.fb.group({
            account: FormControlSelector.account,
            password: FormControlSelector.password,
        })
        this.form.patchValue(dummy_person)
    }
    // Whenever click submit button.
    submitClick() {
        this.submitSubject.next('按下提交按鈕了，這段可以隨便打')
    }
    initSubscription() {
        // get this shit , unsubscribe it when destroy.
        // prevent users clicks button too many times.
        this.subscription = this.submitSubject.pipe(debounceTime(250)).subscribe((r) => {
            this.spinnerService.show()
            if (this.form.valid) {
                const val = this.form.value
                this.auth.loginAuth$(val.account!, val.password!).subscribe({
                    next: () => {
                        this.spinnerService.hide()
                        sw_fire('成功登入', undefined, 'success').then(() => {
                            this.router.navigateByUrl('/home')
                        })
                    },
                    error: (res) => {
                        this.spinnerService.hide()
                        console.log(res.error.message)
                    },
                })
            } else {
                // Make all controls to be touched and invalid controls will be red.
                this.markAsTouched(this.form)
            }
        })
    }

    isInValidControl(ctrl: AbstractControl) {
        return isInValidControl(ctrl)
    }
    errorsDescription(ctrl: AbstractControl): string {
        return errorsDescription(ctrl)
    }
    markAsTouched(formGroup: FormGroup): void {
        return markAsTouched(formGroup)
    }
}
