import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFUploadEditorComponent } from './upload.editor';

@NgModule({
    declarations: [AXFUploadEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFUploadEditorComponent],
    entryComponents: [AXFUploadEditorComponent],
    providers: [],
})
export class AXFUploadEditorModule {
    constructor(service: AXFEditorService) {
        service.register("UploadEditor", AXFUploadEditorComponent);
    }
}