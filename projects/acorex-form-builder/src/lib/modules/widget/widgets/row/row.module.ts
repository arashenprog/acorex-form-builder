import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRowWidgetDesigner } from './designer/row-widget.designer';
import { AXFRowWidgetView } from './view/row-widget.view';
import { AXFRowWidgetPrint } from './print/row-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';

export const COMPONENTS = [AXFRowWidgetDesigner, AXFRowWidgetView, AXFRowWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule,ACoreXUIModule,AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFRowWidgetModule {
    constructor(service:AXFWidgetService) {
        service.register({
            title:"Row",
            hint:"Row container element",
            icon:"fas fa-align-justify",
            name: "row",
            category:"Layout",
            visible:true,
            designerClass: AXFRowWidgetDesigner,
            printClass: AXFRowWidgetPrint,
            viewClass: AXFRowWidgetView,
            properties:[],
        })
    }
}