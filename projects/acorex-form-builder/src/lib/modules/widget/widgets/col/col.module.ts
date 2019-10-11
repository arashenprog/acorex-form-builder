import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFColWidgetDesigner } from './designer/col-widget.designer';
import { AXFColWidgetView } from './view/col-widget.view';
import { AXFColWidgetPrint } from './print/col-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';

export const COMPONENTS = [AXFColWidgetDesigner, AXFColWidgetView, AXFColWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFColWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Column",
            hint: "Column container element",
            icon: "fas fa-columns",
            category: "Layout",
            visible: false,
            name: "col",
            designerClass: AXFColWidgetDesigner,
            printClass: AXFColWidgetView,
            viewClass: AXFColWidgetPrint,
            properties: [
                {
                    name: "size",
                    category: "General",
                    defaultValue: 1,
                    title: "Size",
                }
            ]
        })
    }
}