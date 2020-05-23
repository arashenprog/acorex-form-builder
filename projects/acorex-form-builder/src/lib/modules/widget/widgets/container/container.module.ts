import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFContainerWidgetDesigner } from './designer/container-widget.designer';
import { AXFContainerWidgetPrint } from './print/container-widget.print';
import { AXFContainerWidgetView } from './view/container-widget.view';
import { AXF_NAME_PROPERTY, AXF_CAPTION_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_BOX_STYLE_PROPERTY } from '../../config/general-properties';
import { AXF_TAG_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [
    AXFContainerWidgetDesigner,
    AXFContainerWidgetView,
    AXFContainerWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFContainerWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Container',
            hint: 'A collapsible container',
            icon: 'fas fa-caret-square-up',
            category: 'Layout',
            visible: true,
            name: 'container',
            container:true,
            designerClass: AXFContainerWidgetDesigner,
            printClass: AXFContainerWidgetPrint,
            viewClass: AXFContainerWidgetView,
            options: {boxStyle: {
                border: new AXFBoxStyleBoxSizeValue('1'),
                padding: new AXFBoxStyleBoxSizeValue('5'),
                margin: new AXFBoxStyleBoxSizeValue('5', '0', '5', '0')
            }},
            properties: [
                // AXF_CAPTION_PROPERTY,
                // {
                //     category: "General",
                //     name: "allowCollapse",
                //     title: "Collapsable",
                //     defaultValue: true,
                //     editor: "CheckboxEditor"
                // },
                // {
                //     category: "General",
                //     name: "collapsed",
                //     title: "Collapsed",
                //     defaultValue: false,
                //     editor: "CheckboxEditor"
                // },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
            ]
        })
    }
}

