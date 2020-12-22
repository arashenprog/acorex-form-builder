import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_DATA_TYPE_PROPERTY, AXF_TAG_PROPERTY } from '../../config/general-properties';

import { AXFFileUploadWidgetDesigner } from './designer/file-upload-widget.designer';
import { AXFFileUploadWidgetPrint } from './print/file-upload-widget.print';
import { AXFFileUploadWidgetView } from './view/file-upload-widget.view';
//import { ImageModalPage } from './imagemodal.page';
import { AngularImageViewerModule } from '@hreimer/angular-image-viewer';
//, ImageModalPage
export const COMPONENTS = [AXFFileUploadWidgetDesigner, AXFFileUploadWidgetPrint, AXFFileUploadWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule, AngularImageViewerModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFFileUploadWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'File Upload',
            hint: 'File upload element',
            icon: 'far fa-file',
            category: 'Editors',
            visible: true,
            name: 'file-upload',
            designerClass: AXFFileUploadWidgetDesigner,
            printClass: AXFFileUploadWidgetPrint,
            viewClass: AXFFileUploadWidgetView,
            options: { 
                dataType: 'object'
            },
            properties: [
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DATA_TYPE_PROPERTY,
                AXF_TAG_PROPERTY
            ]
        })
    }
}