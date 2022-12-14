import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ACoreXUIModule } from "acorex-ui";
import { SharedModule } from "./shared/shared.module";
import { BuilderModule } from './modules/form-builder/builder/config/dashboard.module';
import { MasterLayout } from './shared/layouts/master.layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [AppComponent, MasterLayout],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    BuilderModule,
    ACoreXUIModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
