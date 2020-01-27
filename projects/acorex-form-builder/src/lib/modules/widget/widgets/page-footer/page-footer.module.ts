import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFPageFooterWidgetDesigner } from './designer/page-footer-widget.designer';
import { AXFPageFooterWidgetPrint } from './print/page-footer-widget.print';
import { AXFPageFooterWidgetView } from './view/page-footer-widget.view';
import { AXF_NAME_PROPERTY, AXF_CAPTION_PROPERTY, AXF_VISIBLE_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFPageFooterWidgetDesigner,
    AXFPageFooterWidgetView,
    AXFPageFooterWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPageFooterWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Page Footer',
            hint: 'A Page Footer',
            icon: 'fas fa-caret-square-up',
            category: 'Layout',
            visible: false,
            name: 'page-footer',
            container:true,
            designerClass: AXFPageFooterWidgetDesigner,
            printClass: AXFPageFooterWidgetPrint,
            viewClass: AXFPageFooterWidgetView,
            draggable:false,
            droppable:true,
            options: [],
            properties: [ 
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY
            ]
        })
    }
}

