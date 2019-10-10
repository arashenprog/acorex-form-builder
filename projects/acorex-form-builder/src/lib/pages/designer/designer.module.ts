import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFDesignerPage } from './designer.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFGenericWidgetsModule } from '../../widgets/widgets.module';

const pages = [ACFDesignerPage]

@NgModule({
    declarations: [...pages],
    imports: [CommonModule, ACoreXUIModule,AXFGenericWidgetsModule],
    exports: [...pages],
    providers: [],
    entryComponents: []
})
export class AXFDesignerModule { }