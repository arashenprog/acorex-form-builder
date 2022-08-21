import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';
import { AXFDataSourceOption, AXFDataSourceRemoteOption, AXFDataSourceColumnOption } from './data-source.class';
import { AXSelectionListComponent, AXSelectBoxComponent, AXPopupService } from 'acorex-ui';
import { AXIDataItemEditorComponent } from './items.component';
import { AXFDataColumnEditorComponent } from './columns.component';
import { AXIDataDisplayEditorComponent } from './display.component';

@Component({
    templateUrl: `data-source.editor.html`,
    styleUrls: [`data-source.editor.scss`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDataSourceEditorComponent extends AXFProperyEditor<AXFDataSourceOption>  {

    @ViewChild('modeSelection') modeSelection: AXSelectionListComponent;
    @ViewChild('remoteSelection') remoteSelection: AXSelectBoxComponent;
    @ViewChild('displaySelection') displaySelection: AXSelectBoxComponent;

    modeItems: any[] = [{ value: 'manual', text: 'Manual' }, { value: 'remote', text: 'Remote' }];
    remoteItems: any[] = [];
    allowColumns: boolean = true;
    displayList: any[] = [{ value: 'allItems', text: 'All Items' }, { value: 'onlySelected', text: 'Only Selected' }];

    constructor(
        protected cdr: ChangeDetectorRef,
        private dataService: AXFDataService,
        private popupService: AXPopupService,
    ) {
        super(cdr);
    }

    ngOnInit() {
        this.valueChange.subscribe(c => {
            this.cdr.markForCheck();
        });
        if (this.value == null) {
            this.value = new AXFDataSourceOption();
            this.value.mode = 'manual';
            this.initColumns();
        } else {
            const v: AXFDataSourceOption = new AXFDataSourceOption();
            if(!this.value.displayMode)
            {
                this.value.displayMode='allItems';
                this.value.displayItems=[];
            } 
            Object.assign(v, this.value);
            this.value = v;
        }
    }


    ngAfterViewInit(): void {
        this.modeSelection.selectedValues = [this.value.mode];
        this.dataService.getDSList().then(items => {
            this.remoteItems = items;
            setTimeout(() => {
                if (this.remoteSelection && this.value.dataSource && this.value.dataSource.name) {
                    this.remoteSelection.selectedValues = this.value.dataSource.name
                }
            });
            this.cdr.markForCheck();
        });
        this.initiated = true;
    }

    handleRemoteChange(v: any[]) {
        if (v && (this.value.dataSource == null || this.value.dataSource.name != v[0].value)) {
            this.value.dataItems = [];
            this.value.dataSource.name = v[0].value;
            if (v[0].params) {
                this.value.dataSource.params = v[0].params.map(c => ({ name: c, value: null }));
            } else {
                this.value.dataSource.params = [];
            }
            //
            this.dataService.getList(this.value.dataSource.name, this.value.dataSource.params).then(items => {
                if (items && items.length) {
                    this.value.dataItems = items;
                    if (this.allowColumns) {
                        const obj = items[0];
                        const cols: AXFDataSourceColumnOption[] = [];
                        for (const key in obj) {
                            if (obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
                                cols.push({
                                    fieldName: key,
                                    fillByUser: false,
                                    title: key,
                                    type: typeof obj[key],
                                    isDisplay:false,
                                    textField:false,
                                    valueField:false
                                });
                            }
                        }
                        this.value.columns = cols;
                    }
                    this.value.displayItems = items.map(d=> d[this.value.columns[0].fieldName]); 
                    super.handleValueChange(this.value);
                    this.cdr.detectChanges();
                } else {
                    this.initColumns();
                }
            });
            //
            super.handleValueChange(this.value);
            this.cdr.detectChanges();
        }
    }

    handleParamChange(v: any) {
        super.handleValueChange(this.value);
    }

    handleModeChange(v: any[]) {
        if (v && v[0].value !== this.value.mode) {
            this.value.mode = v[0].value;
            if (this.value.mode === 'manual') {
                this.initColumns();
                this.value.dataItems = [];
                this.value.displayItems=[];
            }
            if (this.value.mode === 'remote') {
                this.value.displayMode='allItems';
                this.value.displayItems=[];
            }
            super.handleValueChange(this.value);
            this.cdr.markForCheck();
        }
    }

    handleItemEditor() {
        this.popupService.open(AXIDataItemEditorComponent, {
            title: 'Items Editor',
            size: this.value.columns.length > 3 ? 'lg' : 'md',
            data: {
                columns: this.value.columns,
                items: this.value.dataItems
            }
        }).closed(c => {
            this.value.columns = c.data.columns;
            this.value.dataItems = c.data.items;
            this.handleValueChange(this.value);
            this.cdr.markForCheck(); 
        });
    }

    handleDisplayItemEditor()
    {
        if(!this.value.columns || !this.value.dataItems || this.value.columns.length==0 || this.value.dataItems.length==0)
        return;
        this.popupService.open(AXIDataDisplayEditorComponent, {
            title: 'Display Editor',
            size: this.value.columns.length > 3 ? 'lg' : 'md',
            data: {
                columns: this.value.columns,
                items: this.value.dataItems,
                displayItems:this.value.displayItems
            }
        }).closed(c => {
            this.value.columns = c.data.columns;
            this.value.dataItems = c.data.items;
            this.value.displayItems= c.data.displayItems;
            this.handleValueChange(this.value);
            this.cdr.markForCheck();
        });
        
    }

    handleColumnEditor() {
        this.popupService.open(AXFDataColumnEditorComponent, {
            title: 'Columns Editor',
            size: 'lg',
            data: {
                columns: this.value.columns,
                allowColumns: this.allowColumns
            }
        }).closed(c => {
            this.value.columns = c.data.columns;
            this.handleValueChange(this.value);
            this.cdr.markForCheck();
        });
    }

    private initColumns() {
        if (this.allowColumns) {
            this.value.columns = [];
            this.value.columns.push({ fieldName: 'column1', title: 'Column 1', fillByUser: false, type: 'string',isDisplay:true ,textField:false,valueField:false});
            this.value.columns.push({ fieldName: 'column2', title: 'Column 2', fillByUser: false, type: 'string',isDisplay:false,textField:false,valueField:false });
            this.value.columns.push({ fieldName: 'column3', title: 'Column 3', fillByUser: false, type: 'string' ,isDisplay:false,textField:false,valueField:false});
        }
    }


    handleDisplayChange(v: any){
        if (v && v.length>0 && v[0].value !== this.value.displayMode) {
            this.value.displayMode = v[0].value;
            if (this.value.displayMode === 'allItems') {
                this.value.displayItems=[];
            }
            else
            {
                this.value.displayItems=this.value.dataItems.map(d=> d[this.value.columns[0].fieldName]);
            } 
            super.handleValueChange(this.value);
            this.cdr.markForCheck();
        }
    }

    showDocumentChange(v: any)
    {
        if(v!=undefined)
        {
            if(v)
            {
                if(this.value.dataItems.length>0 && this.value.dataItems[0].hasOwnProperty("fileID") && !this.value.columns.some(d=>d.fieldName=="fileID"))
                    this.value.columns.push({ fieldName: 'fileID', title: 'fileID', fillByUser: false, type: 'string',isDisplay:false ,textField:false,valueField:false});
            }
            else
            {
                if(this.value.dataItems.length>0 && this.value.columns.some(d=>d.fieldName=="fileID"))
                    this.value.columns=this.value.columns.filter(d=>d.fieldName!="fileID");
            }
            super.handleValueChange(this.value);
            this.cdr.markForCheck();
        }
    }

}
