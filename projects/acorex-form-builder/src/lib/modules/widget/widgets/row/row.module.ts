import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRowWidgetDesigner } from './designer/row-widget.designer';
import { AXFRowWidgetView } from './view/row-widget.view';
import { AXFRowWidgetPrint } from './print/row-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_BG_COLOR_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_VISIBLE_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFRowWidgetDesigner, AXFRowWidgetView, AXFRowWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFRowWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Row",
            hint: "Row container element",
            icon: "fas fa-align-justify",
            name: "row",
            category: "Layout",
            visible: true,
            designerClass: AXFRowWidgetDesigner,
            printClass: AXFRowWidgetPrint,
            viewClass: AXFRowWidgetView,
            toolbox: {
                visible: false
            },
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
            ],
        })
    }
}