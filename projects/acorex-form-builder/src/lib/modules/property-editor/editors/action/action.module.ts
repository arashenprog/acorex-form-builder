import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFActionEditorComponent } from './action.editor';
import { AXIActionManageComponent } from './actionmanage.component';

@NgModule({
    declarations: [AXFActionEditorComponent,AXIActionManageComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFActionEditorComponent],
    entryComponents: [AXFActionEditorComponent,AXIActionManageComponent],
    providers: [],
})
export class AXFActionEditorModule {
    constructor(service: AXFEditorService) { 
        service.register("ActionEditor", AXFActionEditorComponent);
    }
}