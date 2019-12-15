import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFColumnGridComponent } from './column-grid.component';
import { AXPopupService } from 'acorex-ui';
import { isArray } from 'util';
import { ContentItemsStructureEditor } from '../items/itemstructure.editor';
import { GridStructureEditor } from './gridstructure.editor';

@Component({
    templateUrl: './grid.editor.html',
    styleUrls: ['./grid.editor.scss']
})
export class AXFGridEditorComponent extends AXFProperyEditor<GridStructureEditor> implements OnInit {

    innerValue: any[] = [];
    columnTypeItems: any[] = [{ value: "string", title: "String" }, { value: "number", title: "Number" },
    { value: "boolean", title: "Boolean" }, { value: "date", title: "Date" }, { value: "time", title: "Time" },
    { value: "image", title: "Image" }, { value: "selectionList", title: "Selection List" }]

    fillbyItems: any[] = [{ value: "manualList", title: "Manual List" }, { value: "databaseList", title: "Database List" }];
    dataSources: any[] = [{ id: "staffs", text: "Staffs" }]
    constructor(private popupService: AXPopupService) {
        super();
    }

    private dsModeStr: string;
    get dsMode(): string {
        return this.dsModeStr;
    }
    set dsMode(value: string) {
        if (isArray(value)) {
            if (this.dsModeStr && this.dsModeStr[0] != value[0])
                this.changeDsMode(value);
            this.dsModeStr = value;
        }
    }

    changeDsMode(newVal) {
        if (newVal[0] == "ds") {
            this.value.columns = [new ContentItemsStructureEditor({ id: "text", title: "Text", type: "string", isDs: true })];
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
                columns: this.value.columns
            }
        }).closed(c => {
            this.value.columns = c.data;
            this.handleValueChange(this.value);
        })
    }

}