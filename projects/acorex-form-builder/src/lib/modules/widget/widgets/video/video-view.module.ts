import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_TAG_PROPERTY, AXF_DISPLAY_NAME_PROPERTY, AXF_DATA_TYPE_PROPERTY } from '../../config/general-properties';

import { AXFVideoWidgetDesigner } from './designer/video-widget.designer';
import { AXFVideoWidgetPrint } from './print/video-widget.print';
import { AXFVideoWidgetView } from './view/video-widget.view';
import { UploadStructure } from '../../../property-editor/editors/upload/upload.structure';

export const COMPONENTS = [AXFVideoWidgetDesigner, AXFVideoWidgetPrint, AXFVideoWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFVideoWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Video Box',
            hint: 'Video box element',
            icon: 'fas fa-video',
            category: 'Editors',
            visible: true,
            name: 'video',
            designerClass: AXFVideoWidgetDesigner,
            printClass: AXFVideoWidgetPrint,
            viewClass: AXFVideoWidgetView,
            options: {
                value: new UploadStructure({
                    height: 100,
                    width: 200,
                    modeSize: 'auto',
                    isAspectRatio: false,
                    sourceMethod: 'url'
                })
            },
            properties: [
                {
                    name: 'value',
                    category: 'General',
                    defaultValue: '',
                    title: '',
                    editor: 'UploadEditor',
                    options:{
                        mode:'video'
                    }
                },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_TAG_PROPERTY,
            ]
        })
    }
}