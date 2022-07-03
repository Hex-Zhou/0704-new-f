import { Component, inject, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { errorsDescription, isInValidControl, markAsTouched } from 'app/common/common'
import { sw_fire } from 'app/common/sweetAlert2'
import { Member } from 'app/shared/interface/member.interface'
import { NgxSpinnerService } from 'ngx-spinner'
import { debounceTime, Subject, Subscription } from 'rxjs'
import { FormControlSelector } from './../../../common/form-validators'
import { CompanyType } from './../../../shared/interface/company_type.interface'
import { MemberService } from './../../../shared/service/API/member.service'
const dummy_person = {
    company_type: 0,
    cell_phone: '0912708771',
    account: 'imgay69',
    password: '123456',
    real_name: '周燙豪',
    name: '周周',
    company: '黃金傳說',
    email: 'imgay@nmsl.com',
    gender: 'MALE',
    checkPassword: '123456',
}
interface registerForm {
    company_type: FormControl<number | null>
    cell_phone: FormControl<string | null>
    account: FormControl<string | null>
    password: FormControl<string | null>
    checkPassword: FormControl<string | null>
    real_name: FormControl<string | null>
    name: FormControl<string | null>
    company: FormControl<string | null>
    email: FormControl<string | null>
    gender: FormControl<string | null>
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    // form
    form!: FormGroup<registerForm>
    fb = new FormBuilder()
    // inject
    memberService = inject(MemberService)
    router = inject(Router)
    spinnerService = inject(NgxSpinnerService)

    // rxjs
    subscription!: Subscription
    submitSubject = new Subject() // submit button click debounceTime
    // input
    company_type!: CompanyType[]
    //
    constructor() {
        inject(ActivatedRoute).data.subscribe((e) => {
            this.company_type = e['data'].data
        })
    }
    ngOnInit(): void {
        this.initForm()
        this.initSubscription()
        //
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
            checkPassword: FormControlSelector.password,
            cell_phone: FormControlSelector.tel,
            email: FormControlSelector.email,
            company: '',
            real_name: ['', [Validators.required]],
            name: ['', [Validators.required]],
            company_type: [0, [Validators.required]],
            gender: 'MALE',
        })
        this.form.patchValue(dummy_person)
    }
    submitClick() {
        this.submitSubject.next('按下提交按鈕了，這段可以隨便打')
    }
    initSubscription() {
        // get this shit , unsubscribe it when destroy.
        // prevent users clicks button too many times.

        this.subscription = this.submitSubject.pipe(debounceTime(250)).subscribe((r) => {
            if (this.form.valid) {
                this.spinnerService.show()
                const val = this.form.value as Partial<Member>
                this.memberService.create(val).subscribe({
                    next: () => {
                        this.spinnerService.hide()
                        sw_fire('註冊成功', undefined, 'success').then(() => {
                            this.router.navigateByUrl('/auth/login')
                        })
                    },
                    error: (res) => {
                        this.spinnerService.hide()
                        sw_fire(res.error.message, undefined, 'error')
                    },
                })
            } else {
                // Make all controls to be touched and invalid controls will be red.
                this.markAsTouched(this.form)
                sw_fire('欄位填寫錯誤', undefined, 'question')
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
