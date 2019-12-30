import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_TEXT_SIZE_PROPERTY, AXF_TEXT_STYLE_PROPERTY, AXF_HORIZONTAL_ALIGNMENT_PROPERTY, AXF_COLOR_PROPERTY, AXF_BG_COLOR_PROPERTY } from '../../config/general-properties';
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
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("1"),
                    padding: new AXFBoxStyleBoxSizeValue("2"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor: "#FFFFFF" 
            },
            properties: [  
                AXF_COLOR_PROPERTY,
                AXF_BG_COLOR_PROPERTY,
                AXF_TEXT_SIZE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_HORIZONTAL_ALIGNMENT_PROPERTY, 
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
            ]
        })
    }
}