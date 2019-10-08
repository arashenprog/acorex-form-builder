import { NgModule } from '@angular/core';
import { AXFDesignerModule } from '../pages/designer/designer.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const modules = [
  RouterModule,
  FormsModule,

  AXFDesignerModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [...modules],

})
export class ACoreXFormBuilderModule { }
