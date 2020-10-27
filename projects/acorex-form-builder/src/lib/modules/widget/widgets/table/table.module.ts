import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFTableWidgetDesigner } from './designer/table-widget.designer';
import { AXFTableWidgetPrint } from './print/table-widget.print';
import { AXFTableWidgetView } from './view/table-widget.view';
import {  AXF_BG_COLOR_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_TABLE_LAYOUT_PROPERTY, AXF_MINWIDTH_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [
    AXFTableWidgetDesigner, 
    AXFTableWidgetView, 
    AXFTableWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTableWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Table',
            hint: 'Html Table',
            icon: 'fas fa-table',
            category: 'Layout',
            visible: true,
            name: 'table',
            designerClass: AXFTableWidgetDesigner,
            printClass: AXFTableWidgetPrint,
            viewClass: AXFTableWidgetView,
            container:true,
            droppable:false,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("0")
                },
                bgColor: "inherit"
            },
            properties: [
                AXF_BG_COLOR_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                AXF_TABLE_LAYOUT_PROPERTY,
                AXF_MINWIDTH_PROPERTY
            ],
        })
    }
}

