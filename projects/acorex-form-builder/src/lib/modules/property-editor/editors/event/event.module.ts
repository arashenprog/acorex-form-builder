import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFEventEditorComponent } from './event.editor';

@NgModule({
    declarations: [AXFEventEditorComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFEventEditorComponent],
    entryComponents: [AXFEventEditorComponent],
    providers: [],
})
export class AXFEventEditorModule {
    constructor(service: AXFEditorService) { 
        service.register("EventEditor", AXFEventEditorComponent);
    }
}