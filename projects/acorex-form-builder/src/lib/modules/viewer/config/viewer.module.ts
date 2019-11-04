import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFViewerPage } from '../pages/viewer.page';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetModule } from '../../widget/config/widget.module';
import { ACFViewerFrameComponent } from '../components/frame.component';

const pages = [ACFViewerPage,ACFViewerFrameComponent]

@NgModule({
    declarations: [...pages],
    imports: [CommonModule, ACoreXUIModule,AXFWidgetModule],
    exports: [...pages],
    providers: [],
    entryComponents: []
})
export class AXFViewerModule { }