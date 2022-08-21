import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorService } from '../../services/editor.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFDataSourceEditorComponent } from './data-source.editor';
import { FormsModule } from '@angular/forms';
import { AXIDataItemEditorComponent } from './items.component';
import { AXFDataColumnEditorComponent } from './columns.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AXIDataDisplayEditorComponent } from './display.component';

@NgModule({
    declarations: [AXFDataSourceEditorComponent, AXFDataColumnEditorComponent, AXIDataItemEditorComponent,AXIDataDisplayEditorComponent],
    imports: [CommonModule, ACoreXUIModule, FormsModule,SignaturePadModule],
    exports: [AXFDataSourceEditorComponent],
    entryComponents: [AXFDataSourceEditorComponent, AXFDataColumnEditorComponent, AXIDataItemEditorComponent,AXIDataDisplayEditorComponent],
    providers: [],
})
export class AXFDataSourceEditorModule {
    constructor(service: AXFEditorService) {
        service.register("DataSourceEditor", AXFDataSourceEditorComponent);
    }
}