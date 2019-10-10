import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFColWidgetDesigner } from './designer/col-widget.designer';
import { AXFColWidgetView } from './view/col-widget.view';
import { AXFColWidgetPrint } from './print/col-widget.print';
import { AXFWidgetService } from '../widget.service';
import { ACFComponentsModule } from '../../components/components.module';

export const COMPONENTS = [AXFColWidgetDesigner, AXFColWidgetView, AXFColWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule,ACFComponentsModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFColWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title:"Column",
            hint:"Column container element",
            icon:"fas fa-columns",
            name: "col",
            designerClass: AXFColWidgetDesigner,
            printClass: AXFColWidgetView,
            viewClass: AXFColWidgetPrint
        })
    }
}