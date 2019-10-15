import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFBoxStyleEditorComponent } from './box-style.editor';
import { AXFEditorService } from '../../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';

@NgModule({
    declarations: [AXFBoxStyleEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFBoxStyleEditorComponent],
    entryComponents: [AXFBoxStyleEditorComponent],
    providers: [],
})
export class AXFBoxStyleEditorModule {
    constructor(service: AXFEditorService) {
        service.register("BoxStyleEditor", AXFBoxStyleEditorComponent);
    }
}