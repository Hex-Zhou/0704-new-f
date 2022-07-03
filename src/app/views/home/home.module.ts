import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PipeModule } from 'app/shared/pipe/pipe.module'
import { SwiperModule } from 'swiper/angular'
import { ComponentsModule } from './../../shared/components/components.module'
import { BillboardAreaComponent } from './billboard-area/billboard-area.component'
import { CardRowAreaComponent } from './card-row-area/card-row-area.component'
import { CardRowAreaResolver } from './card-row-area/card-row-area.resolver'
import { CarouselsAreaComponent } from './carousels-area/carousels-area.component'
import { CarouselsAreaResolver } from './carousels-area/carousels-area.resolver'
import { HomeComponent } from './home.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: { plan: CardRowAreaResolver, carousel: CarouselsAreaResolver },
    },
]
@NgModule({
    declarations: [
        HomeComponent,
        CarouselsAreaComponent,
        BillboardAreaComponent,
        CardRowAreaComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SwiperModule,
        PipeModule,
        ComponentsModule,
    ],
})
export class HomeModule {}
