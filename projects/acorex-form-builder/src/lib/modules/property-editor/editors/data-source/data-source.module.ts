import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDataSourceEditorComponent } from './data-source.editor';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AXFDataSourceEditorComponent],
    imports: [CommonModule,ACoreXUIModule,FormsModule],
    exports: [AXFDataSourceEditorComponent],
    entryComponents: [AXFDataSourceEditorComponent],
    providers: [],
})
export class AXFDataSourceEditorModule {
    constructor(service: AXFEditorService) {
        service.register("DataSourceEditor", AXFDataSourceEditorComponent);
    }
}