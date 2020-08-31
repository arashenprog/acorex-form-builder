import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_TAG_PROPERTY, AXF_DISPLAY_NAME_PROPERTY, AXF_DATA_TYPE_PROPERTY } from '../../config/general-properties';

import { AXFImageWidgetDesigner } from './designer/image-widget.designer';
import { AXFImageWidgetPrint } from './print/image-widget.print';
import { AXFImageWidgetView } from './view/image-widget.view';
import { UploadStructure } from '../../../property-editor/editors/upload/upload.structure';

export const COMPONENTS = [AXFImageWidgetDesigner, AXFImageWidgetPrint, AXFImageWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFImageWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Image Box",
            hint: "Image box element",
            icon: "far fa-image",
            category: "Editors",
            visible: true,
            name: "image",
            designerClass: AXFImageWidgetDesigner,
            printClass: AXFImageWidgetPrint,
            viewClass: AXFImageWidgetView,
            options: {
                value: new UploadStructure({
                    height: 100,
                    width: 100,
                    modeSize: "auto",
                    isAspectRatio: false,
                    sourceMethod:"url"
                })

            },
            properties: [
                {
                    name: "alt",
                    category: "General",
                    defaultValue: "",
                    title: "Alt",
                    editor: "TextEditor"
                },
                {
                    name: "value",
                    category: "General",
                    defaultValue: "",
                    title: "",
                    editor: "UploadEditor"
                },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_TAG_PROPERTY,
            ]
        })
    }
}