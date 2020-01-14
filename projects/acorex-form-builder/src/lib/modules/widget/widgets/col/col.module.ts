import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFColWidgetDesigner } from './designer/col-widget.designer';
import { AXFColWidgetView } from './view/col-widget.view';
import { AXFColWidgetPrint } from './print/col-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFTextEditorComponent } from '../../../property-editor/editors/text/text.editor';
import { AXF_STYLE_GENERAL_PROPERTIES, AXF_BG_COLOR_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_HORIZONTAL_ALIGNMENT_PROPERTY, AXF_VERTICAL_ALIGNMENT_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFColWidgetDesigner, AXFColWidgetView, AXFColWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFColWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Column",
            hint: "Column container element",
            icon: "fas fa-columns",
            category: "Layout",
            visible: false,
            name: "col",
            designerClass: AXFColWidgetDesigner,
            printClass: AXFColWidgetPrint,
            container: true,
            draggable:false,
            viewClass: AXFColWidgetView,
            toolbox: {
                visible: false
            },
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("5"),
                    margin: new AXFBoxStyleBoxSizeValue("0")
                },
                verticalAlign: "middle"
            },
            properties: [
                {
                    name: "size",
                    category: "Style",
                    defaultValue: 1,
                    title: "Size",
                    editor: "TextEditor",
                    order: 0,
                },

                AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
                AXF_VERTICAL_ALIGNMENT_PROPERTY,
                ...AXF_STYLE_GENERAL_PROPERTIES
            ]
        })
    }
}