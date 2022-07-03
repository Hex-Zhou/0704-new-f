import { Pattern } from './../shared/enum/pattern.enum'
import { AbstractControl, FormGroup } from '@angular/forms'

export function isInValidControl(ctrl: AbstractControl) {
    return ctrl.touched && ctrl.errors
}
export function markAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((e) => {
        formGroup.get(e)?.markAsTouched()
    })
}
export function errorsDescription(ctrl: AbstractControl): string {
    let result = ''
    if (!ctrl.errors) {
        return ''
    }
    Object.entries(ctrl.errors!).forEach((e) => {
        switch (e[0]) {
            case 'required':
                result = '必填'
                break
            case 'max':
                result = `最大值為${e[1].max}`
                break
            case 'min':
                result = `最小值為${e[1].min}`
                break
            case 'maxlength':
                result = `最多${e[1].requiredLength}個字`
                break
            case 'minlength':
                result = `最少${e[1].requiredLength}個字`
                break
            case 'pattern':
                switch (e[1].requiredPattern) {
                    case Pattern.Email:
                        result = 'Email格式不符'
                        break
                    case Pattern.Account:
                        result = '僅能包含英文、數字、底線'
                        break
                    case Pattern.Phone:
                        result = '手機號碼格式不符'
                        break
                    default:
                        result = '格式不符'
                }
                break
            default:
                result = ''
        }
    })
    return result
}
