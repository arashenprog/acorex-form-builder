import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDropdownEditorComponent } from './dropdown.editor';

@NgModule({
    declarations: [AXFDropdownEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFDropdownEditorComponent],
    entryComponents: [AXFDropdownEditorComponent],
    providers: [],
})
export class AXFDropdownEditorModule {
    constructor(service: AXFEditorService) {
        service.register("DropdownEditor", AXFDropdownEditorComponent);
    }
}