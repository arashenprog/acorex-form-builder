import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_TEXT_STYLE_PROPERTY, AXF_TAG_PROPERTY, AXF_VALIDATION_PROPERTY, AXF_DISPLAY_NAME_PROPERTY, AXF_DATA_TYPE_PROPERTY, AXF_SET_CURRENT_TIME_PROPERTY, AXF_INIT_EVENT, AXF_VALUE_CHANGE_EVENT, AXF_DATA_BOUND_EVENT } from '../../config/general-properties';
import { AXFDateInputWidgetDesigner } from './designer/date-input-widget.designer';
import { AXFDateInputWidgetPrint } from './print/date-input-widget.print';
import { AXFDateInputWidgetView } from './view/date-input-widget.view';
import { FormsModule } from '@angular/forms';

export const COMPONENTS = [AXFDateInputWidgetDesigner, AXFDateInputWidgetView, AXFDateInputWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule, FormsModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFDateInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Date Picker',
            hint: 'Date picker element',
            icon: 'fas fa-calendar-alt',
            category: 'Editors',
            visible: true,
            name: 'date-input',
            designerClass: AXFDateInputWidgetDesigner,
            printClass: AXFDateInputWidgetPrint,
            viewClass: AXFDateInputWidgetView,
            options: {
                dataType: 'date'
            },
            properties: [
                AXF_VISIBLE_PROPERTY,
                AXF_TEXT_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_VALIDATION_PROPERTY,
                {
                    name: 'calendarType',
                    category: 'General',
                    defaultValue: 'gregorian',
                    title: 'Calendar Type',
                    editor: 'DropdownEditor',
                    order: 35,
                    options: {
                        items: [
                            { value: 'gregorian', title: 'Gregorian' },
                            { value: 'jalali', title: 'Hijri' },
                        ],
                    }
                },
                AXF_SET_CURRENT_TIME_PROPERTY,
                {
                    name: 'displayFormat',
                    category: 'General',
                    defaultValue: 'DD/MM/YYYY',
                    title: 'Display Format',
                    editor: 'DropdownEditor',
                    order: 36,
                    options: {
                        items: [
                            { value: 'DD/MM/YYYY', title: 'DD/MM/YYYY' },
                            { value: 'DD-MM-YYYY', title: 'DD-MM-YYYY' },
                            { value: 'MM/DD/YYYY', title: 'MM/DD/YYYY' },
                            { value: 'MM-DD-YYYY', title: 'MM-DD-YYYY' },
                            { value: 'YYYY/MM/DD', title: 'YYYY/MM/DD' },
                            { value: 'YYYY-MM-DD', title: 'YYYY-MM-DD' },
                        ],
                    }
                },
                AXF_INIT_EVENT,
                AXF_VALUE_CHANGE_EVENT,
                AXF_DATA_BOUND_EVENT,
            ]
        })
    }
}