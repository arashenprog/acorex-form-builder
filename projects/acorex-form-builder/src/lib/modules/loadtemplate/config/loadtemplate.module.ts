import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFLoadTemplatePage } from '../pages/loadtemplate.page';

const pages = [AXFLoadTemplatePage]

@NgModule({
    declarations: [...pages],
    imports: [CommonModule],
    exports: [...pages],
    entryComponents:[...pages],
    providers: [],
})
export class AXFLoadTemplateModule { }