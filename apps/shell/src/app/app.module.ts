import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NominationCreatePage3Component } from './nomination-create-page3/nomination-create-page3.component'
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, NominationCreatePage3Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
        {
          path: 'css-grid',
          loadChildren: () =>
            import('css-grid/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'custom-forms',
          loadChildren: () =>
            import('custom-forms/Module').then((m) => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
