import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <ax-theme-wrapper>
      <router-outlet></router-outlet>
    </ax-theme-wrapper>
  `
})
export class AppComponent {}
