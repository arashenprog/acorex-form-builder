import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFActionEditorComponent } from './formula.editor';
import { AXFFormulaManageComponent } from './formula-manage.component';
import { AXFExpressionEditorComponent } from './expression-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
    declarations: [AXFActionEditorComponent, AXFFormulaManageComponent, AXFExpressionEditorComponent],
    imports: [CommonModule, ACoreXUIModule, AceEditorModule],
    exports: [AXFActionEditorComponent],
    entryComponents: [AXFActionEditorComponent, AXFFormulaManageComponent, AXFExpressionEditorComponent],
    providers: [],
})
export class AXFActionEditorModule {
    constructor(service: AXFEditorService) {
        service.register('FormulaEditor', AXFActionEditorComponent);
    }
}
