import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFCheckboxEditorComponent } from './checkbox.editor';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AXFCheckboxEditorComponent],
    imports: [CommonModule,ACoreXUIModule,FormsModule],
    exports: [AXFCheckboxEditorComponent],
    entryComponents: [AXFCheckboxEditorComponent],
    providers: [],
})
export class AXFCheckboxEditorModule {
    constructor(service: AXFEditorService) {
        service.register("CheckboxEditor", AXFCheckboxEditorComponent);
    }
}