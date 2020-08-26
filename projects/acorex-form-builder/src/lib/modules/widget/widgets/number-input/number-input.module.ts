import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import {
    AXF_NAME_PROPERTY,
    AXF_PLACEHOLDER_PROPERTY,
    AXF_VISIBLE_PROPERTY,
    AXF_TEXT_STYLE_PROPERTY,
    AXF_VALIDATION_PROPERTY,
    AXF_TAG_PROPERTY,
    AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
    AXF_VALUE_CHANGE_EVENT,
    AXF_INIT_EVENT,
    AXF_DISPLAY_NAME_PROPERTY
} from '../../config/general-properties';
import { AXFNumberInputWidgetDesigner } from './designer/number-input-widget.designer';
import { AXFNumberInputWidgetPrint } from './print/number-input-widget.print';
import { AXFNumberInputWidgetView } from './view/number-input-widget.view';

export const COMPONENTS = [AXFNumberInputWidgetDesigner, AXFNumberInputWidgetView, AXFNumberInputWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFNumberInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Number Input',
            hint: 'Number input element',
            icon: 'fas fa-i-cursor',
            category: 'Editors',
            visible: true,
            name: 'numberbox',
            designerClass: AXFNumberInputWidgetDesigner,
            printClass: AXFNumberInputWidgetPrint,
            viewClass: AXFNumberInputWidgetView,
            options: {
            },
            properties: [
                AXF_PLACEHOLDER_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_VALIDATION_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
                AXF_VALUE_CHANGE_EVENT,
                AXF_INIT_EVENT,
            ]
        })
    }
}