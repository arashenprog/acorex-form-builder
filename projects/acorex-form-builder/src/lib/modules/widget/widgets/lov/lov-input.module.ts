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
    AXF_DATA_TYPE_PROPERTY,
    AXF_DS_LIST_PROPERTY
} from '../../config/general-properties';
import { AXFLovInputWidgetDesigner } from './designer/lov-input-widget.designer';
import { AXFLovInputWidgetPrint } from './print/lov-input-widget.print';
import { AXFLovInputWidgetView } from './view/lov-input-widget.view';
import { LovModalPage } from './lovmodal.page';
import { AXFDataSourceOption } from '../../../property-editor/editors/data-source/data-source.class';
import { ScrollingModule} from '@angular/cdk/scrolling';

export const COMPONENTS = [AXFLovInputWidgetDesigner, AXFLovInputWidgetPrint, AXFLovInputWidgetView,LovModalPage];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule,ScrollingModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFLovInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Lov',
            hint: 'lov element',
            icon: 'fas fa-caret-square-down',
            category: 'Editors',
            visible: true,
            name: 'lov',
            designerClass: AXFLovInputWidgetDesigner,
            printClass: AXFLovInputWidgetPrint,
            viewClass: AXFLovInputWidgetView,
            options: {
                mode: 'single',
                dataType:'object' ,
                dataSource:{
                    mode: 'manual',
                    columns:[{ fieldName: 'column1', title: 'Column 1', fillByUser: false, type: 'string',isDisplay:true }]
                }
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
                AXF_DS_LIST_PROPERTY,
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
