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
import { AXFLinkInputWidgetDesigner } from './designer/link-input-widget.designer';
import { AXFLinkInputWidgetPrint } from './print/link-input-widget.print';
import { AXFLinkInputWidgetView } from './view/link-input-widget.view';

export const COMPONENTS = [AXFLinkInputWidgetDesigner, AXFLinkInputWidgetView, AXFLinkInputWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFLinkInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Link Input',
            hint: 'Link input element',
            icon: 'fas fa-link',
            category: 'Editors',
            visible: true,
            name: 'link',
            designerClass: AXFLinkInputWidgetDesigner,
            printClass: AXFLinkInputWidgetPrint,
            viewClass: AXFLinkInputWidgetView,
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
                {
                    name: 'color',
                    category: 'Style',
                    defaultValue: '#007bff',
                    title: 'Color',
                    order: 31,
                    editor: 'ColorEditor'
                },
                AXF_DEFAULT_TEXT_PROPERTY
            ]
        })
    }
}