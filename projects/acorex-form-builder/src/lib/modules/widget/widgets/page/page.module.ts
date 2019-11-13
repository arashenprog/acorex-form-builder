import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFPageWidgetDesigner } from './designer/page-widget.designer';
import { AXFPageWidgetPrint } from './print/page-widget.print';
import { AXFPageWidgetView } from './view/page-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';
import { AXF_BG_COLOR_PROPERTY, AXF_BOX_STYLE_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFPageWidgetDesigner,
    AXFPageWidgetView,
    AXFPageWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPagePageWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Page',
            hint: '',
            icon: '',
            category: 'Layout',
            visible: false,
            name: 'page',
            designerClass: AXFPageWidgetDesigner,
            printClass: AXFPageWidgetPrint,
            viewClass: AXFPageWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("0")
                },
                bgColor: "inherit"
            },
            toolbox: {
                visible: false
            },
            properties: [
                AXF_BG_COLOR_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
            ]
        })
    }
}

