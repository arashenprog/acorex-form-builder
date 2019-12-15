import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFItemsEditorComponent } from './items.editor';
import { AXFItemComponent } from './items.component';

@NgModule({
    declarations: [AXFItemsEditorComponent,AXFItemComponent],
    imports: [CommonModule,ACoreXUIModule],
    exports: [AXFItemsEditorComponent],
    entryComponents: [AXFItemsEditorComponent],
    providers: [],
})
export class AXFItemsEditorModule {
    constructor(service: AXFEditorService) { 
        service.register("ItemsEditor", AXFItemsEditorComponent);
    }
}