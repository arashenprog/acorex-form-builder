import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRowWidgetDesigner } from './designer/row-widget.designer';
import { AXFRowWidgetView } from './view/row-widget.view';
import { AXFRowWidgetPrint } from './print/row-widget.print';
import { AXFWidgetService } from '../widget.service';
import { ACFComponentsModule } from '../../components/components.module';

export const COMPONENTS = [AXFRowWidgetDesigner, AXFRowWidgetView, AXFRowWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule,ACFComponentsModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFRowWidgetModule {
    constructor(service:AXFWidgetService) {
        service.register({
            name: "row",
            designerClass: AXFRowWidgetDesigner,
            printClass: AXFRowWidgetPrint,
            viewClass: AXFRowWidgetView
        })
    }
}