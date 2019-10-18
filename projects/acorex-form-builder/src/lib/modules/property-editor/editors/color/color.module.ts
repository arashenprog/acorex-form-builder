import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFColorEditorComponent } from './color.editor';

@NgModule({
    declarations: [AXFColorEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFColorEditorComponent],
    entryComponents: [AXFColorEditorComponent],
    providers: [],
})
export class AXFColorEditorModule {
    constructor(service: AXFEditorService) {
        service.register("ColorEditor", AXFColorEditorComponent);
    }
}