import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { GridStructureEditor, ColumnStructureEditor } from './gridstructure.editor';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    templateUrl: './grid.editor.html',
    styleUrls: ['./grid.editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridEditorComponent extends AXFProperyEditor<GridStructureEditor> implements OnInit {

    //items:GridStructureEditor;
    innerValue: any[] = [];
    columnTypeItems: any[] = [{ value: "string", title: "String" }, { value: "number", title: "Number" },
    { value: "boolean", title: "Boolean" }, { value: "date", title: "Date" }, { value: "time", title: "Time" },
    { value: "image", title: "Image" }, { value: "selectionList", title: "Selection List" }]

    fillbyItems: any[] = [{ value: "manualList", title: "Manual List" }, { value: "databaseList", title: "Database List" }];
    dataSources: any[] = [{ id: "staffs", text: "Staffs" }]
   
    constructor(protected cdr: ChangeDetectorRef,private dataService: AXFDataService) {
        super();
    }

    ngOnInit(): void {
        //this.value = this.value; 
    }

    fillbyViewChange(e) {
        if (!e || !e.length)
            return;
        this.value.fillby = e;
        super.handleValueChange(this.value);
    }

    columnTypeChange(ind, e) {
        if (!e || !e.length)
            return;
        if (this.value.columns[ind].type[0] != e[0]) {
            this.value.columns[ind].mode = false;
            this.value.columns[ind].subText = "";
        }
        this.value.columns[ind].type = e;
        super.handleValueChange(this.value);
    }

    modeChange(ind, e) {
        this.value.columns[ind].mode = e.target.checked;
        super.handleValueChange(this.value);
    }
    subTextChange(ind, e) {
        this.value.columns[ind].subText = e;
        this.value.columns[ind].subItems=e==""?[]: e.split(',').map((m)=>{return {value:m}});
        super.handleValueChange(this.value);
    }

    deleteClick(ind) {
        this.value.columns.splice(ind, 1);
        super.handleValueChange(this.value);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.value.columns[ind - 1];
            this.value.columns[ind - 1] = item;
            this.value.columns[ind] = temp;
            super.handleValueChange(this.value);
        }
    }

    downClick(ind, item) {
        if (ind < this.value.columns.length - 1) {
            let temp = this.value.columns[ind + 1];
            this.value.columns[ind + 1] = item;
            this.value.columns[ind] = temp;
            super.handleValueChange(this.value);
        }
    }

    addItemClick() {
        let index = this.value.columns.length + 1;
        let newRow = new ColumnStructureEditor(index);
        this.value.columns.push(newRow);
        super.handleValueChange(this.value);
    }

    titleItemChange(ind, e) {
        this.value.columns[ind].title = e;
        super.handleValueChange(this.value);
    }

    checkChange(e) {

    }
}