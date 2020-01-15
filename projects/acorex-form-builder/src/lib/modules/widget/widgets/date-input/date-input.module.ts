import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY,  AXF_VISIBLE_PROPERTY, AXF_TEXT_STYLE_PROPERTY } from '../../config/general-properties';
import { AXFDateInputWidgetDesigner } from './designer/date-input-widget.designer';
import { AXFDateInputWidgetPrint } from './print/date-input-widget.print';
import { AXFDateInputWidgetView } from './view/date-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFDateInputWidgetDesigner, AXFDateInputWidgetView, AXFDateInputWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [], 
})
export class AXFDateInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Date Input",
            hint: "Date input element",
            icon: "fas fa-calendar-alt",
            category: "Editors",
            visible: true,
            name: "date-input",
            designerClass: AXFDateInputWidgetDesigner,
            printClass: AXFDateInputWidgetPrint,
            viewClass: AXFDateInputWidgetView,
            options: {
            },
            properties: [  
                AXF_VISIBLE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
            ]
        })
    }
}