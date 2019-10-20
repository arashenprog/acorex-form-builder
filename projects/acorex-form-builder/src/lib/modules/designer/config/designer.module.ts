import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFDesignerPage } from '../pages/designer.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetModule } from '../../widget/config/widget.module';
import {DragDropModule} from '@angular/cdk/drag-drop'

const pages = [ACFDesignerPage]

@NgModule({
    declarations: [...pages],
    imports: [CommonModule, ACoreXUIModule,AXFWidgetModule,DragDropModule],
    exports: [...pages],
    providers: [],
    entryComponents: []
})
export class AXFDesignerModule { }