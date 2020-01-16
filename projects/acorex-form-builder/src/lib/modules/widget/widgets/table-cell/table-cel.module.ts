import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFTableCellWidgetDesigner } from './designer/table-cell-widget.designer';
import { AXFTableCellWidgetPrint } from './print/table-cell-widget.print';
import { AXFTableCellWidgetView } from './view/table-cell-widget.view';
import { AXF_STYLE_GENERAL_PROPERTIES, AXF_BG_COLOR_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_VERTICAL_ALIGNMENT_PROPERTY, AXF_HORIZONTAL_ALIGNMENT_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [
    AXFTableCellWidgetDesigner,
    AXFTableCellWidgetView,
    AXFTableCellWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTableCellWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Table Cell',
            hint: 'Table Cell',
            icon: "fas fa-columns",
            category: 'Layout',
            visible: false,
            name: 'table-cell',
            designerClass: AXFTableCellWidgetDesigner,
            printClass: AXFTableCellWidgetPrint,
            viewClass: AXFTableCellWidgetView,
            container: true,
            draggable:false,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("1"),
                    padding: new AXFBoxStyleBoxSizeValue("5"),
                    margin: new AXFBoxStyleBoxSizeValue("0")
                },
                verticalAlign:"middle"
            },
            properties: [
                AXF_BG_COLOR_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
                AXF_VERTICAL_ALIGNMENT_PROPERTY,
                {
                    category: "Style",
                    editor: "TextEditor",
                    name: "width",
                    title: "Width",
                    order: 0,
                },
                {
                    category: "Style",
                    editor: "TextEditor",
                    name: "colspan",
                    title: "Colspan",
                    defaultValue: "1",
                    order: 1,
                },
                {
                    category: "Style",
                    editor: "TextEditor",
                    name: "rowspan",
                    title: "Rowspan",
                    defaultValue: "1",
                    order: 1,
                }
            ]
        })
    }
}

