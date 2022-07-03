import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'enumValueToEnumKey',
})
export class EnumValueToEnumKeyPipe implements PipeTransform {
    transform(enumValue: any, myEnum: any) {
        let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue)
        return keys.length > 0 ? keys[0] : null
    }
}
