import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { AXFTextEditorComponent } from './text.editor';
import { ACoreXUIModule } from 'acorex-ui';

@NgModule({
    declarations: [AXFTextEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFTextEditorComponent],
    entryComponents: [AXFTextEditorComponent],
    providers: [],
})
export class AXFTextEditorModule {
    constructor(service: AXFEditorService) {
        service.register("TextEditor", AXFTextEditorComponent);
    }
}