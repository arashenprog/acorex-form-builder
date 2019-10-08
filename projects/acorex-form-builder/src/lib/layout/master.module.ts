import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFMasterLayoutComponent } from './master.layout';

const Modules = [AXFMasterLayoutComponent]

@NgModule({
    declarations: [...Modules],
    imports: [CommonModule],
    exports: [...Modules],
    providers: [],
})
export class AXFMasterLayoutModule { }