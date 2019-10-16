import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY } from '../../config/general-properties';
import { AXFTextInputWidgetDesigner } from './designer/text-input-widget.designer';
import { AXFTextInputWidgetPrint } from './print/text-input-widget.print';
import { AXFTextInputWidgetView } from './view/text-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFTextInputWidgetDesigner, AXFTextInputWidgetView, AXFTextInputWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTextInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Text Input",
            hint: "Text input element",
            icon: "fas fa-i-cursor",
            category: "Editors",
            visible: true,
            name: "textbox",
            designerClass: AXFTextInputWidgetDesigner,
            printClass: AXFTextInputWidgetPrint,
            viewClass: AXFTextInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("1"),
                    padding: new AXFBoxStyleBoxSizeValue("2"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor:"transparent"
            },
            properties: [
                AXF_TEXT_PROPERTY,
                AXF_NAME_PROPERTY,
                ...AXF_STYLE_GENERAL_PROPERTIES
            ]
        })
    }
}