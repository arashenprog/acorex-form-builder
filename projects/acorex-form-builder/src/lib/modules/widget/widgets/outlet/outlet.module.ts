import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFOutletWidgetDesigner } from './designer/outlet-widget.designer';
import { AXFOutletWidgetPrint } from './print/outlet-widget.print';
import { AXFOutletWidgetView } from './view/outlet-widget.view';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_DISPLAY_NAME_PROPERTY, AXF_DATA_TYPE_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFOutletWidgetDesigner,
    AXFOutletWidgetView,
    AXFOutletWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPageOutletWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Saved Widget',
            hint: 'Load template from gallery',
            icon: 'fas fa-database',
            category: 'Gallery',
            visible: false,
            name: 'outlet',
            designerClass: AXFOutletWidgetDesigner,
            printClass: AXFOutletWidgetPrint,
            viewClass: AXFOutletWidgetView,
            properties: [
                {
                    editor: 'TextEditor',
                    category: 'Data',
                    name: 'widgetId',
                    title: '',
                    visible: false
                },
                {
                    editor: 'TextEditor',
                    category: 'Data',
                    name: 'title',
                    title: '',
                    visible: false
                },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
            ]
        })
    }
}

