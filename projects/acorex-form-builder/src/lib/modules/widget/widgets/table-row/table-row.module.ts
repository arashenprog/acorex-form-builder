import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFTableRowWidgetDesigner } from './designer/table-row-widget.designer';
import { AXFTableRowWidgetPrint } from './print/table-row-widget.print';
import { AXFTableRowWidgetView } from './view/table-row-widget.view';
import { AXF_BG_COLOR_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_NAME_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFTableRowWidgetDesigner,
    AXFTableRowWidgetView,
    AXFTableRowWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTableRowWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Table Row',
            hint: 'Table Row',
            icon: "fas fa-align-justify",
            category: 'Layout',
            visible: false,
            droppable:false,
            draggable:false,
            name: 'table-row',
            designerClass: AXFTableRowWidgetDesigner,
            printClass: AXFTableRowWidgetPrint,
            viewClass: AXFTableRowWidgetView,
            container: true,
            properties: [
                AXF_BG_COLOR_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                {
                    category: "Style",
                    editor: "TextEditor",
                    name: "height",
                    title: "Height",
                    order: 1,
                },
                {
                    name: "isHeader",
                    category: "General",
                    defaultValue: false,
                    title: "Header",
                    order: 0,
                    editor: "CheckboxEditor"
                }
            ]
        })
    }
}

