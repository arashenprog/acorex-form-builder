import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_DATA_TYPE_PROPERTY, AXF_TAG_PROPERTY } from '../../config/general-properties';

import { AXFVideoInputWidgetDesigner } from './designer/video-input-widget.designer';
import { AXFVideoInputWidgetPrint } from './print/video-input-widget.print';
import { AXFVideoInputWidgetView } from './view/video-input-widget.view'; 
import { AngularImageViewerModule } from '@hreimer/angular-image-viewer';

export const COMPONENTS = [AXFVideoInputWidgetDesigner, AXFVideoInputWidgetPrint, AXFVideoInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule, AngularImageViewerModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFVideoInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Video Uploader',
            hint: 'Upload video from device or camera',
            icon: 'fas fa-video',
            category: 'Editors',
            visible: true,
            name: 'video-input',
            designerClass: AXFVideoInputWidgetDesigner,
            printClass: AXFVideoInputWidgetPrint,
            viewClass: AXFVideoInputWidgetView,
            options: {
                height: 200,
                width: 200,
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