import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFAnswerEditorComponent } from './answer.editor';
import { FormsModule } from '@angular/forms'; 
import { AXIAnswerItemEditorComponent } from './answeritem.editor';

@NgModule({
    declarations: [AXFAnswerEditorComponent,AXIAnswerItemEditorComponent],
    imports: [CommonModule, ACoreXUIModule, FormsModule],
    exports: [AXFAnswerEditorComponent],
    entryComponents: [AXFAnswerEditorComponent,AXIAnswerItemEditorComponent ],
    providers: [],
})
export class AXFAnswerEditorModule {
    constructor(service: AXFEditorService) {
        service.register("AnswerEditor", AXFAnswerEditorComponent);
    }
}