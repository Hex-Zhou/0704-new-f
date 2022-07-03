import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EnumValueToEnumKeyPipe } from './enum-value-to-enum-key.pipe'
import { EnumToArrayPipe } from './enum-to-array.pipe'
import { ImgFullPipePipe } from './img-full-pipe.pipe'
import { SafeHtmlPipe } from './safe-html.pipe'
import { SafeStylePipe } from './safe-style.pipe'
import { SafeUrlPipe } from './safe-url.pipe'

@NgModule({
    declarations: [
        EnumToArrayPipe,
        EnumValueToEnumKeyPipe,
        ImgFullPipePipe,
        SafeHtmlPipe,
        SafeStylePipe,
        SafeUrlPipe,
    ],
    imports: [CommonModule],
    exports: [
        EnumToArrayPipe,
        EnumValueToEnumKeyPipe,
        ImgFullPipePipe,
        SafeHtmlPipe,
        SafeStylePipe,
        SafeUrlPipe,
    ],
})
export class PipeModule {}
