import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY,AXF_DS_LIST_PROPERTY, AXF_VISIBLE_PROPERTY } from '../../config/general-properties';
import { AXFGridInputWidgetDesigner } from './designer/grid-input-widget.designer';
import { AXFGridInputWidgetPrint } from './print/grid-input-widget.print';
import { AXFGridInputWidgetView } from './view/grid-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFGridInputWidgetDesigner, AXFGridInputWidgetPrint, AXFGridInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFGridInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Data Table",
            hint: "Grid table element",
            icon: "fas fa-table",
            category: "Editors",
            visible: true,
            name: "grid",
            designerClass: AXFGridInputWidgetDesigner,
            printClass: AXFGridInputWidgetPrint,
            viewClass: AXFGridInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor: "#FFFFFF",
              

            },
            properties: [
                AXF_DS_LIST_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
            ]
        })
    }
}