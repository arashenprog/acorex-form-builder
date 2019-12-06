import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFDesignerPage } from '../pages/designer.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetModule } from '../../widget/config/widget.module';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { AXFViewerModule } from '../../viewer/config/viewer.module';
import { AXFLoadTemplatePage } from '../pages/template/load-template.page';
import { AXFSaveTemplatePage } from '../pages/template/save-template.page';

const pages = [ACFDesignerPage,AXFLoadTemplatePage,AXFSaveTemplatePage]

@NgModule({
    declarations: [...pages],
    imports: [CommonModule, ACoreXUIModule,AXFWidgetModule,DragDropModule,AXFViewerModule],
    exports: [...pages],
    providers: [],
    entryComponents: []
})
export class AXFDesignerModule { }