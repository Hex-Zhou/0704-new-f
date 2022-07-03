import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { NgxSpinnerModule } from 'ngx-spinner'
import { AuthFormGroupComponent } from './auth-form-gruop.component'
import { AuthComponent } from './auth.component'
import { ForgetComponent } from './forget/forget.component'
import { LogInComponent } from './log-in/log-in.component'
import { LogOutComponent } from './log-out/log-out.component'
import { RegisterComponent } from './register/register.component'
import { RegisterResolver } from './register/register.resolver'

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
            { path: 'login', component: LogInComponent },
            { path: 'logout', component: LogOutComponent },
            { path: 'forget', component: ForgetComponent },
            {
                path: 'register',
                component: RegisterComponent,
                resolve: { data: RegisterResolver },
            },
        ],
    },
]
@NgModule({
    declarations: [
        AuthComponent,
        LogInComponent,
        LogOutComponent,
        RegisterComponent,
        ForgetComponent,
    ],
    imports: [
        AuthFormGroupComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgxSpinnerModule,
    ],
    providers: [RegisterResolver],
})
export class AuthModule {}
