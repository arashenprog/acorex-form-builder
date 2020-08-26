import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFPageHeaderWidgetDesigner } from './designer/page-header-widget.designer';
import { AXFPageHeaderWidgetPrint } from './print/page-header-widget.print';
import { AXFPageHeaderWidgetView } from './view/page-header-widget.view';
import { AXF_NAME_PROPERTY, AXF_CAPTION_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_DISPLAY_NAME_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFPageHeaderWidgetDesigner,
    AXFPageHeaderWidgetView,
    AXFPageHeaderWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPageHeaderWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Page Header',
            hint: 'A Page Header',
            icon: 'fas fa-caret-square-up',
            category: 'Layout',
            visible: false,
            name: 'page-header',
            container:true,
            designerClass: AXFPageHeaderWidgetDesigner,
            printClass: AXFPageHeaderWidgetPrint,
            viewClass: AXFPageHeaderWidgetView,
            draggable:false,
            droppable:true,
            options: [],
            properties: [ 
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
            ]
        })
    }
}

