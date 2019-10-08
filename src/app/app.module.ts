import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ACoreXUIModule } from "acorex-ui";
import {
  ACoreXSPAModule,
  AXNavMenuService,
  AXHeaderBarMenuService
} from "acorex-spa";
import { NavMenuService } from "./shared/services/nav-menu.service";
import { StarterDashboardPage } from "./modules/starter/dashboard/pages/dashboard.page";
import { HeaderBarMenuService } from "./shared/services/header-bar-menu.service";
import { SharedModule } from "./shared/shared.module";
import { StarterDashboardModule } from "./modules/starter/dashboard/config/dashboard.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StarterDashboardModule,
    ACoreXUIModule,
    ACoreXSPAModule
  ],
  providers: [
    {
      provide: "startUpTab",
      useValue: {
        content: StarterDashboardPage,
        title: "داشبورد",
        closable: false
      }
    },
    {
      provide: AXNavMenuService,
      useClass: NavMenuService
    },
    {
      provide: AXHeaderBarMenuService,
      useClass: HeaderBarMenuService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
