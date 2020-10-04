import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFCheckboxInputWidgetDesigner } from './designer/checkbox-input-widget.designer';
import { AXFCheckboxInputWidgetPrint } from './print/checkbox-input-widget.print';
import { AXFCheckboxInputWidgetView } from './view/checkbox-input-widget.view';
import { AXF_LABEL_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_NAME_PROPERTY, AXF_TAG_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_INIT_EVENT, AXF_READONLY_PROPERTY, AXF_HORIZONTAL_ALIGNMENT_PROPERTY, AXF_TEXT_STYLE_PROPERTY, AXF_COLOR_PROPERTY, AXF_BG_COLOR_PROPERTY, AXF_TEXT_SIZE_PROPERTY, AXF_DISPLAY_NAME_PROPERTY,AXF_DATA_TYPE_PROPERTY } from '../../config/general-properties';

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
            title: 'Checkbox',
            hint: 'Checkbox element',
            icon: 'far fa-check-square',
            category: 'Editors',
            visible: true,
            name: 'checkbox',
            designerClass: AXFCheckboxInputWidgetDesigner,
            printClass: AXFCheckboxInputWidgetPrint,
            viewClass: AXFCheckboxInputWidgetView,
            options: {
                label: 'Checkbox',
                dataType:'boolean'
            },
            properties: [
                AXF_LABEL_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_READONLY_PROPERTY,
                AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
                AXF_COLOR_PROPERTY,
                AXF_BG_COLOR_PROPERTY,
                AXF_TEXT_SIZE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_VALUE_CHANGE_EVENT,
                AXF_INIT_EVENT
            ]
        })
    }
}