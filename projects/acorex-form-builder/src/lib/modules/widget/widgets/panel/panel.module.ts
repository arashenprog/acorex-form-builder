import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFPanelWidgetDesigner } from './designer/panel-widget.designer';
import { AXFPanelWidgetPrint } from './print/panel-widget.print';
import { AXFPanelWidgetView } from './view/panel-widget.view';
import { AXF_NAME_PROPERTY, AXF_CAPTION_PROPERTY, AXF_VISIBLE_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFPanelWidgetDesigner,
    AXFPanelWidgetView,
    AXFPanelWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPanelWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Panel',
            hint: 'A collapsible panel',
            icon: 'fas fa-caret-square-up',
            category: 'Layout',
            visible: true,
            name: 'panel',
            designerClass: AXFPanelWidgetDesigner,
            printClass: AXFPanelWidgetPrint,
            viewClass: AXFPanelWidgetView,
            options: [],
            toolbox: {
                visible: false
            },
            properties: [
                AXF_CAPTION_PROPERTY,
                {
                    category: "General",
                    name: "allowCollapse",
                    title: "Collapsable",
                    defaultValue: true,
                    editor: "CheckboxEditor"
                },
                {
                    category: "General",
                    name: "collapsed",
                    title: "Collapsed",
                    defaultValue: false,
                    editor: "CheckboxEditor"
                },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY
            ]
        })
    }
}

