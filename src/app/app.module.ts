import { rootReducers } from './shared/ngrx/index'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpInterceptorService } from './shared/service/complex/http-interceptor.service'
import { LayoutModule } from './views/layout/layout.module'
// lib
import { NgxSpinnerModule } from 'ngx-spinner'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { EffectsClass } from '@shared/ngrx/effect'
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools'
//

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot(),
        LayoutModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(rootReducers),
        EffectsModule.forRoot([EffectsClass]),
        StoreDevtoolsModule.instrument({}),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
