import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import {AXFSignatureEditorComponent } from './signature.editor';

@NgModule({
    declarations: [AXFSignatureEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFSignatureEditorComponent],
    entryComponents: [AXFSignatureEditorComponent],
    providers: [],
})
export class AXFSignatureEditorModule {
    constructor(service: AXFEditorService) { 
        service.register("SignatureEditor", AXFSignatureEditorComponent);
    }
}