import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';
import { AXFDataSourceValue, AXFDataSourceRemoteValue } from './data-source.class';
import { AXSelectionListComponent, AXSelectBoxComponent, AXPopupService } from 'acorex-ui';
import { AXIDataItemEditorComponent } from './items.component';
import { AXFDataColumnEditorComponent } from './columns.component';

@Component({
    templateUrl: `data-source.editor.html`,
    styleUrls: [`data-source.editor.scss`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDataSourceEditorComponent extends AXFProperyEditor<AXFDataSourceValue>  {

    @ViewChild('modeSelection') modeSelection: AXSelectionListComponent;
    @ViewChild('remoteSelection') remoteSelection: AXSelectBoxComponent;

    modeItems: any[] = [{ value: "remote", text: "Remote" }, { value: "manual", text: "Manual" }];
    remoteItems: any[] = [];

    constructor(protected cdr: ChangeDetectorRef,
        private dataService: AXFDataService,
        private popupService: AXPopupService) {
        super();
    }

    ngOnInit() {
        if (this.value == null)
            this.value = new AXFDataSourceValue();
    }

    ngAfterViewInit(): void {
        this.modeSelection.selectedValues = [this.value.mode];
        this.dataService.getDSList().then(items => {
            this.remoteItems = items;
            setTimeout(() => {
                if (this.remoteSelection && this.value.dataSource && this.value.dataSource.name) {
                 //   this.remoteSelection.selectedValues = this.value.dataSource.name
                }
            });
            this.cdr.markForCheck();
        });

    }

    handleRemoteChange(v: any[]) {
        if (v) {
            this.value.dataSource.name = v[0].value;
            if (v[0].params)
                this.value.dataSource.params = v[0].params.map(c => ({ name: c, value: null }));
            else
                this.value.dataSource.params = [];
            super.handleValueChange(this.value);
        }
    }

    handleParamChange(v: any) {
        super.handleValueChange(this.value);
    }

    handleModeChange(v: any[]) {
        this.value.mode = v[0].value;
        super.handleValueChange(this.value);
        this.cdr.markForCheck();
    }

    handleItemEditor() {
        this.popupService.open(AXIDataItemEditorComponent, {
            title: "Items Editor",
            size: this.value.columns.length > 3 ? "lg" : "md",
            data: {
                columns: this.value.columns,
                items: this.value.dataItems
            }
        }).closed(c => {
            debugger;
            this.value.columns = c.data.columns;
            this.value.dataItems = c.data.items;
            this.handleValueChange(this.value);
            this.cdr.markForCheck();
        })
    }

    handleColumnEditor()
    {
        this.popupService.open(AXFDataColumnEditorComponent, {
            title: "Columns Editor",
            size:  "lg",
            data: {
                columns: this.value.columns,
            }
        }).closed(c => {
            debugger;
            this.value.columns = c.data.columns;
            this.handleValueChange(this.value);
            this.cdr.markForCheck();
        })
    }

}
