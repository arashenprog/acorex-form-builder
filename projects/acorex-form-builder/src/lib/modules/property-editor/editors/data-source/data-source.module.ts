import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDataSourceEditorComponent } from './data-source.editor';
import { FormsModule } from '@angular/forms';
import { AXIDataItemEditorComponent } from './items.component';
import { AXFDataColumnEditorComponent } from './columns.component';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
    declarations: [AXFDataSourceEditorComponent, AXFDataColumnEditorComponent, AXIDataItemEditorComponent],
    imports: [CommonModule, ACoreXUIModule, FormsModule,SignaturePadModule],
    exports: [AXFDataSourceEditorComponent],
    entryComponents: [AXFDataSourceEditorComponent, AXFDataColumnEditorComponent, AXIDataItemEditorComponent],
    providers: [],
})
export class AXFDataSourceEditorModule {
    constructor(service: AXFEditorService) {
        service.register("DataSourceEditor", AXFDataSourceEditorComponent);
    }
}