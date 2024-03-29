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
    AXF_READONLY_PROPERTY,
    AXF_VALUE_CHANGE_EVENT,
    AXF_INIT_EVENT,
    AXF_FONT_PROPERTY,
    AXF_DISPLAY_NAME_PROPERTY,
    AXF_DATA_TYPE_PROPERTY,
    AXF_DEFAULT_TEXT_PROPERTY,
    AXF_COLOR_PROPERTY
} from '../../config/general-properties';
import { AXFTextInputWidgetDesigner } from './designer/text-input-widget.designer';
import { AXFTextInputWidgetPrint } from './print/text-input-widget.print';
import { AXFTextInputWidgetView } from './view/text-input-widget.view';

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
            title: 'Text Input',
            hint: 'Text input element',
            icon: 'fas fa-i-cursor',
            category: 'Editors',
            visible: true,
            name: 'textbox',
            designerClass: AXFTextInputWidgetDesigner,
            printClass: AXFTextInputWidgetPrint,
            viewClass: AXFTextInputWidgetView,
            options: { 
                dataType:'string'
            },
            properties: [
                AXF_PLACEHOLDER_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_VALIDATION_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_READONLY_PROPERTY,
                AXF_VALUE_CHANGE_EVENT,
                AXF_INIT_EVENT,
                AXF_FONT_PROPERTY, 
                AXF_COLOR_PROPERTY,
                AXF_DEFAULT_TEXT_PROPERTY,
                {
                    name: 'allowExtend',
                    category: 'General',
                    defaultValue: false,
                    title: 'Allow Extend',
                    order: 81,
                    editor: 'CheckboxEditor',
                    bindable: true
                }
            ]
        })
    }
}