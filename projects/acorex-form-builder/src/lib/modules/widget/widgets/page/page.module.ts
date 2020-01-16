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
            icon: 'fas fa-file',
            category: 'Layout',
            visible: false,
            container: true,
            draggable:false,
            name: 'page',
            designerClass: AXFPageWidgetDesigner,
            printClass: AXFPageWidgetPrint,
            viewClass: AXFPageWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("10"),
                    margin: new AXFBoxStyleBoxSizeValue("0")
                },
                bgColor: "inherit"
            },
            properties: [
                {
                    name: "pageDirection",
                    category: "Style",
                    defaultValue: "ltr",
                    title: "Page Direction",
                    editor: "SelectionEditor",
                    order: 0,
                    options: {
                        items: [{ value: "ltr", title: "Left-To-Right" }, { value: "rtl", title: "Right-To-Left" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                AXF_BG_COLOR_PROPERTY,
                {
                    name: "themeColor",
                    category: "Style",
                    defaultValue: "#673AB7",
                    title: "Theme Color",
                    editor: "ColorEditor",
                    order: 33,
                },
                AXF_BOX_STYLE_PROPERTY,
            ]
        })
    }
}

