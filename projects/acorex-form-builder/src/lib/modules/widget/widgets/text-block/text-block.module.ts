import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFTextBlockWidgetDesigner } from './designer/text-block-widget.designer';
import { AXFTextBlockWidgetView } from './view/text-block-widget.view';
import { AXFTextBlockWidgetPrint } from './print/text-block-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';

export const COMPONENTS = [AXFTextBlockWidgetDesigner, AXFTextBlockWidgetView, AXFTextBlockWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule,ACoreXUIModule,AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTextBlockWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title:"Text Block",
            hint:"Text content element",
            icon:"fas fa-font",
            category:"Editors",
            visible:true,
            name: "text",
            designerClass: AXFTextBlockWidgetDesigner,
            printClass: AXFTextBlockWidgetView,
            viewClass: AXFTextBlockWidgetPrint,
            properties: [
                {
                    name: "text",
                    category: "General",
                    defaultValue: "Text Block Value",
                    title: "Text",
                }
            ]
        })
    }
}