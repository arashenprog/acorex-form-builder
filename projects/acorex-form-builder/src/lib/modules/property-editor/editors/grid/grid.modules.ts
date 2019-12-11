import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFGridEditorComponent } from './grid.editor';
import { AXFColumnGridComponent } from './column-grid.component';


@NgModule({
    declarations: [AXFGridEditorComponent,AXFColumnGridComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFGridEditorComponent],
    entryComponents: [AXFGridEditorComponent],
    providers: [],
})
export class AXFGridEditorModule {
    constructor(service: AXFEditorService) { 
        service.register("GridEditor", AXFGridEditorComponent);
    }
}