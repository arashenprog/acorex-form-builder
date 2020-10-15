import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_DATA_TYPE_PROPERTY, AXF_TAG_PROPERTY } from '../../config/general-properties';

import { AXFImageInputWidgetDesigner } from './designer/image-input-widget.designer';
import { AXFImageInputWidgetPrint } from './print/image-input-widget.print';
import { AXFImageInputWidgetView } from './view/image-input-widget.view';
import { ImageModalPage } from './imagemodal.page';
import { AngularImageViewerModule } from '@hreimer/angular-image-viewer';

export const COMPONENTS = [AXFImageInputWidgetDesigner, AXFImageInputWidgetPrint, AXFImageInputWidgetView, ImageModalPage]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule, AngularImageViewerModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFImageInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Image Input',
            hint: 'Image input element',
            icon: 'far fa-image',
            category: 'Editors',
            visible: true,
            name: 'image-input',
            designerClass: AXFImageInputWidgetDesigner,
            printClass: AXFImageInputWidgetPrint,
            viewClass: AXFImageInputWidgetView,
            options: {
                height: 250,
                width: 250,
                dataType: 'object'
            },
            properties: [
                {
                    name: 'width',
                    category: 'General',
                    defaultValue: '',
                    title: 'Width(px)',
                    editor: 'TextEditor'
                },
                {
                    name: 'height',
                    category: 'General',
                    defaultValue: '',
                    title: 'Height(px)',
                    editor: 'TextEditor'
                },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_TAG_PROPERTY
            ]
        })
    }
}