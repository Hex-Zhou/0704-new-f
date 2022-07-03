import { Pattern } from './../shared/enum/pattern.enum'
import { FormControl, ValidatorFn, Validators } from '@angular/forms'

const Validators_Account: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(12),
    Validators.pattern(Pattern.Account),
]
const Validators_Password: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(12),
    Validators.pattern(Pattern.Account),
]
const Validators_Tel: ValidatorFn[] = [
    Validators.required,
    Validators.pattern(Pattern.Phone),
    Validators.maxLength(10),
]
const Validators_Email: ValidatorFn[] = [Validators.required, Validators.pattern(Pattern.Email)]

export const FormControlSelector = {
    account: new FormControl('', Validators_Account),
    password: new FormControl('', Validators_Password),
    tel: new FormControl('', Validators_Tel),
    email: new FormControl('', Validators_Email),
}
