import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_PLACEHOLDER_PROPERTY, AXF_COLOR_PROPERTY, AXF_BG_COLOR_PROPERTY, AXF_TEXT_SIZE_PROPERTY, AXF_TEXT_STYLE_PROPERTY, AXF_HORIZONTAL_ALIGNMENT_PROPERTY } from '../../config/general-properties';
import { AXFTextAreaWidgetDesigner } from './designer/text-area-widget.designer';
import { AXFTextAreaWidgetPrint } from './print/text-area-widget.print';
import { AXFTextAreaWidgetView } from './view/text-area-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFTextAreaWidgetDesigner, AXFTextAreaWidgetView, AXFTextAreaWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTextAreaWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Text Area",
            hint: "Text area element",
            icon: "fas fa-i-cursor",
            category: "Editors",
            visible: true,
            name: "textbox",
            designerClass: AXFTextAreaWidgetDesigner,
            printClass: AXFTextAreaWidgetPrint,
            viewClass: AXFTextAreaWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("1"),
                    padding: new AXFBoxStyleBoxSizeValue("2"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor: "#FFFFFF"
            },
            properties: [
                AXF_TEXT_PROPERTY,
                AXF_PLACEHOLDER_PROPERTY, 
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