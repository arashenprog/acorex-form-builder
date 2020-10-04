import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import {
    AXF_NAME_PROPERTY,
    AXF_VALUE_CHANGE_EVENT,
    AXF_INIT_EVENT,
    AXF_ITEM_DATASOURCE_PROPERTY,
    AXF_VISIBLE_PROPERTY,
    AXF_DATA_BOUND_EVENT,
    AXF_VALIDATION_PROPERTY,
    AXF_TAG_PROPERTY,
    AXF_DISPLAY_NAME_PROPERTY,
    AXF_DATA_TYPE_PROPERTY
} from '../../config/general-properties';
import { AXFDropdownInputWidgetDesigner } from './designer/dropdown-input-widget.designer';
import { AXFDropdownInputWidgetPrint } from './print/dropdown-input-widget.print';
import { AXFDropdownInputWidgetView } from './view/dropdown-input-widget.view';

export const COMPONENTS = [AXFDropdownInputWidgetDesigner, AXFDropdownInputWidgetPrint, AXFDropdownInputWidgetView];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFDropdownInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Dropdown',
            hint: 'Dropdown element',
            icon: 'fas fa-caret-square-down',
            category: 'Editors',
            visible: true,
            name: 'dropdown',
            designerClass: AXFDropdownInputWidgetDesigner,
            printClass: AXFDropdownInputWidgetPrint,
            viewClass: AXFDropdownInputWidgetView,
            options: {
                mode: 'single',
                dataType:'object'
            },
            properties: [
                {
                    name: 'mode',
                    category: 'General',
                    title: 'Mode',
                    editor: 'SelectionEditor',
                    options: {
                        items: [{ value: 'single', title: 'Single' }, { value: 'multiple', title: 'Multiple' }],
                        mode: 'single',
                        direction: 'horizontal'
                    }
                },
                {
                    name: 'allowSearch',
                    category: 'General',
                    defaultValue: false,
                    title: 'Allow Search',
                    editor: 'CheckboxEditor',
                    options: { label: 'Allow Search' }
                },
                AXF_ITEM_DATASOURCE_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_INIT_EVENT,
                AXF_VALUE_CHANGE_EVENT,
                AXF_DATA_BOUND_EVENT,
                AXF_VALIDATION_PROPERTY,
                AXF_TAG_PROPERTY,
                {
                    name: 'textAlign',
                    category: 'Style',
                    defaultValue: 'left',
                    title: 'Print Horizontal Alignment',
                    editor: 'SelectionEditor',
                    order: 36,
                    options: {
                        items: [{ value: 'left', title: 'Left' }, { value: 'center', title: 'Center' }, { value: 'right', title: 'Right' }],
                        mode: 'single',
                        direction: 'horizontal'
                    }
                }
            ]
        });
    }
}
