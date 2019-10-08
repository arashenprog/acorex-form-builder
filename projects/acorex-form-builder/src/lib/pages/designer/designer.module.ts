import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFDesignerPage } from './designer.page';

const pages = [ACFDesignerPage]

@NgModule({
    declarations: [...pages],
    imports: [CommonModule],
    exports: [...pages],
    providers: [],
})
export class AXFDesignerModule { }