import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFPageBreakWidgetDesigner } from './designer/page-break-widget.designer';
import { AXFPageBreakWidgetPrint } from './print/page-break-widget.print';
import { AXFPageBreakWidgetView } from './view/page-break-widget.view';

export const COMPONENTS = [AXFPageBreakWidgetDesigner, AXFPageBreakWidgetView, AXFPageBreakWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPageBreakWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Page Break",
            hint: "Break page in print mode",
            icon: "fas fa-file-pdf",
            category: "Layout",
            visible: true,
            name: "page-break",
            designerClass: AXFPageBreakWidgetDesigner,
            printClass: AXFPageBreakWidgetPrint,
            viewClass: AXFPageBreakWidgetView,
            properties: [
            ]
        })
    }
}