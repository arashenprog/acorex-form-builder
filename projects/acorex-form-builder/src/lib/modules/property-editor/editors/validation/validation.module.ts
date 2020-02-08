import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFValidationEditorComponent } from './validation.editor';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AXFValidationEditorComponent],
    imports: [CommonModule, ACoreXUIModule, FormsModule],
    exports: [AXFValidationEditorComponent],
    entryComponents: [AXFValidationEditorComponent],
    providers: [],
})
export class AXFValidationEditorModule {
    constructor(service: AXFEditorService) {
        service.register("ValidationEditor", AXFValidationEditorComponent);
    }
}