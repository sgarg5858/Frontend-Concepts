import { Component } from '@angular/core';

@Component({
  selector: 'angular-concepts-nx-dependency-injection-mfe-entry',
  template: `<div class="remote-entry">
    <h2>dependency-injection-mfe's Remote Entry Component</h2>
    <angular-concepts-nx-light-weight-widget>
    </angular-concepts-nx-light-weight-widget>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {}
