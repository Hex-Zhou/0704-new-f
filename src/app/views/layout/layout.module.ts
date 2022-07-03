import { PipeModule } from './../../shared/pipe/pipe.module'
import { ComponentsModule } from './../../shared/components/components.module'
import { LayoutComponent } from './layout.component'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AsideComponent } from './aside/aside.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { SmartBarComponent } from './smart-bar/smart-bar.component'
import { CookieBarComponent } from './cookie-bar/cookie-bar.component'
import { NgcCookieConsentModule } from 'ngx-cookieconsent'
import { cookieConfig } from '../../shared/config/NgcCookieConsent.config'
@NgModule({
    declarations: [
        LayoutComponent,
        AsideComponent,
        HeaderComponent,
        FooterComponent,
        ToolbarComponent,
        SmartBarComponent,
        CookieBarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ComponentsModule,
        PipeModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
    ],
})
export class LayoutModule {}
