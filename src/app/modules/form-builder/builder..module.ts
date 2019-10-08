import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { BuilderModule } from './builder/config/dashboard.module';

const modules = [BuilderModule];




@NgModule({
  declarations: [],
  imports: [...modules, CommonModule],
  exports: [...modules],
  providers: []
})


export class FromBuilderModule { }
