import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_TAG_PROPERTY, AXF_VALIDATION_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_INIT_EVENT, AXF_DISPLAY_NAME_PROPERTY, AXF_DATA_TYPE_PROPERTY } from '../../config/general-properties';
import { AXFTimeInputWidgetDesigner } from './designer/time-input-widget.designer';
import { AXFTimeInputWidgetPrint } from './print/time-input-widget.print';
import { AXFTimeInputWidgetView } from './view/time-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFTimeInputWidgetDesigner, AXFTimeInputWidgetView, AXFTimeInputWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTimeInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Time Input",
            hint: "Time input element",
            icon: "fas fa-clock",
            category: "Editors",
            visible: true,
            name: "time-input",
            designerClass: AXFTimeInputWidgetDesigner,
            printClass: AXFTimeInputWidgetPrint,
            viewClass: AXFTimeInputWidgetView,
            options: {
                dataType:'time'
            },
            properties: [
                AXF_VISIBLE_PROPERTY,
                AXF_VALIDATION_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_TAG_PROPERTY, 
                AXF_VALUE_CHANGE_EVENT,
                AXF_INIT_EVENT,
            ]
        })
    }
}