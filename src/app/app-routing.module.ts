import { AppResolver } from './app.resolver'
import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './views/layout/layout.component'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        resolve: [AppResolver],

        children: [
            {
                path: 'home',
                loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'auth',
                loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
            },
            {
                path: 'member',
                loadChildren: () =>
                    import('./views/member/member.module').then((m) => m.MemberModule),
            },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
        ],
    },

    { path: '**', redirectTo: '' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
