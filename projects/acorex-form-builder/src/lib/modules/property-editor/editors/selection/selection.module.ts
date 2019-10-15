import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFSelectionEditorComponent } from './selection.editor';

@NgModule({
    declarations: [AXFSelectionEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFSelectionEditorComponent],
    entryComponents: [AXFSelectionEditorComponent],
    providers: [],
})
export class AXFSelectionEditorModule {
    constructor(service: AXFEditorService) {
        service.register("SelectionEditor", AXFSelectionEditorComponent);
    }
}