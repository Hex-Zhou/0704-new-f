import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IkeaCardContentComponent } from './ikea-card-content/ikea-card-content.component'
import { IkeaCardFooterComponent } from './ikea-card-footer/ikea-card-footer.component'
import { IkeaCardHeaderComponent } from './ikea-card-header/ikea-card-header.component'

@NgModule({
    declarations: [IkeaCardHeaderComponent, IkeaCardFooterComponent, IkeaCardContentComponent],
    imports: [CommonModule],
    exports: [IkeaCardHeaderComponent, IkeaCardFooterComponent, IkeaCardContentComponent],
})
export class IkeaCardModule {}
