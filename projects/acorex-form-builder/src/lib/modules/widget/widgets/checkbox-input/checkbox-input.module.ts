import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_COLOR_PROPERTY, AXF_TEXT_SIZE_PROPERTY, AXF_TEXT_STYLE_PROPERTY } from '../../config/general-properties';

import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';
import { AXFCheckboxInputWidgetDesigner } from './designer/checkbox-input-widget.designer';
import { AXFCheckboxInputWidgetPrint } from './print/checkbox-input-widget.print';
import { AXFCheckboxInputWidgetView } from './view/checkbox-input-widget.view';

export const COMPONENTS = [AXFCheckboxInputWidgetDesigner, AXFCheckboxInputWidgetPrint, AXFCheckboxInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFCheckboxInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Checkbox Input",
            hint: "Checkbox input element",
            icon: "far fa-check-square",
            category: "Editors",
            visible: true,
            name: "checkbox",
            designerClass: AXFCheckboxInputWidgetDesigner,
            printClass: AXFCheckboxInputWidgetPrint,
            viewClass: AXFCheckboxInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("0","20","0","20"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                label:"Checkbox"
            },
            properties: [
                AXF_LABEL_PROPERTY,
                AXF_COLOR_PROPERTY,
                AXF_TEXT_SIZE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                //AXF_NAME_PROPERTY,
            ]
        })
    }
}