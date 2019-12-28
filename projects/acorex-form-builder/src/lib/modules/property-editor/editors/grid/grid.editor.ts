import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFColumnGridComponent } from './column-grid.component';
import { AXPopupService } from 'acorex-ui';
import { isArray } from 'util';
import { ContentItemsStructureEditor } from '../items/itemstructure.editor';
import { GridStructureEditor } from './gridstructure.editor';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    templateUrl: './grid.editor.html',
    styleUrls: ['./grid.editor.scss']
})
export class AXFGridEditorComponent extends AXFProperyEditor<GridStructureEditor> implements OnInit {

    innerValue: any[] = [];
    columnTypeItems: any[] = [
        { value: "string", title: "String" },
        { value: "number", title: "Number" },
        { value: "boolean", title: "Boolean" },
        { value: "date", title: "Date" },
        { value: "time", title: "Time" },
        { value: "image", title: "Image" },
        { value: "selectionList", title: "Selection List" }
    ]

    fillbyItems: any[] = [
        { value: "manualList", title: "Manual List" },
        { value: "databaseList", title: "Database List" }
    ];


    constructor(private popupService: AXPopupService, private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super();
    }

    private _dsMode: string;
    get dsMode(): string {
        return this._dsMode;
    }
    set dsMode(value: string) {
        if (isArray(value)) {
            if (this._dsMode && this._dsMode[0] != value[0])
                this.changeDsMode(value);
            this._dsMode = value;
        }
    }

    private _dsName: string;
    get dsName(): any {
        return this._dsName;
    }
    set dsName(value: any) {
        if (value && value.name && this._dsName != value.name) {
            this.dataService.getList(value.name, value.params).then(items => {
                let obj = items[0];
                let clmns = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
                        clmns.push(new ContentItemsStructureEditor({ id: key, title: key, fieldName: key, type: typeof obj[key] }))
                    }
                }
                this.value.columns = clmns;
                this.cdr.markForCheck();
                this.handleValueChange(this.value);
            });
            this._dsName = value.name;
        }
    }



    changeDsMode(newVal) {
        if (newVal[0] == "ds") {
            this.value.columns = [new ContentItemsStructureEditor({ id: "text", title: "Text", type: "string", fieldName: "text" })];
        }
        else if (newVal[0] == "manual") {
            this.value.columns = [new ContentItemsStructureEditor({ id: "Field1", title: "Field1", type: "string" })];
        }
    }

    ngOnInit(): void {
    }


    columnManage() {
        this.popupService.open(AXFColumnGridComponent, {
            title: "Column Management",
            size: "lg",
            data: {
                columns: this.value.columns,
                dsMode: this.dsMode
            }
        }).closed(c => {
            this.value.columns = c.data;
            this.handleValueChange(this.value);
            this.cdr.markForCheck();
        })
    }

}