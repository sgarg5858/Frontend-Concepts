import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'content-projection',
          loadChildren: () =>
            import('content-projection/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'ng-template',
          loadChildren: () =>
            import('ng-template/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'structural-directives',
          loadChildren: () =>
            import('structural-directives/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'attribute-directives',
          loadChildren: () =>
            import('attribute-directives/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
