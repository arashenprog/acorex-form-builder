import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { AXFTextEditorComponent } from './text.editor';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFRichTextComponent } from './rich-text.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AXFTextEditorComponent, AXFRichTextComponent],
    imports: [CommonModule, ACoreXUIModule,FormsModule, AngularEditorModule],
    exports: [AXFTextEditorComponent],
    entryComponents: [AXFTextEditorComponent],
    providers: [],
})
export class AXFTextEditorModule {
    constructor(service: AXFEditorService) {
        service.register("TextEditor", AXFTextEditorComponent);
    }
}