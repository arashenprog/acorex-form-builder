import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFValidationEditorComponent } from './validation.editor';

@NgModule({
    declarations: [AXFValidationEditorComponent],
    imports: [CommonModule, ACoreXUIModule],
    exports: [AXFValidationEditorComponent],
    entryComponents: [AXFValidationEditorComponent],
    providers: [],
})
export class AXFValidationEditorModule {
    constructor(service: AXFEditorService) {
        service.register("ValidationEditor", AXFValidationEditorComponent);
    }
}