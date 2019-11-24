import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { AXFTextEditorComponent } from './text.editor';
import { ACoreXUIModule } from 'acorex-ui';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AXFRichTextComponent } from './rich-text.component';

@NgModule({
    declarations: [AXFTextEditorComponent,AXFRichTextComponent],
    imports: [CommonModule,ACoreXUIModule,CKEditorModule],
    exports: [AXFTextEditorComponent],
    entryComponents: [AXFTextEditorComponent],
    providers: [],
})
export class AXFTextEditorModule {
    constructor(service: AXFEditorService) {
        service.register("TextEditor", AXFTextEditorComponent);
    }
}