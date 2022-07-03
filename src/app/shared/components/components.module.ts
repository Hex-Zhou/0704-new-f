import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IkeaCardComponent } from './ikea-card/ikea-card.component'
import { IkeaCardModule } from './ikea-card/ikea-card.module'

@NgModule({
    declarations: [IkeaCardComponent],
    imports: [CommonModule, IkeaCardModule],
    exports: [IkeaCardComponent],
})
export class ComponentsModule {}
