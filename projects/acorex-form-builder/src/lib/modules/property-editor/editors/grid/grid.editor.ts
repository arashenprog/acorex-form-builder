import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { GridStructureEditor, ColumnStructureEditor } from './gridstructure.editor';
import { AXFColumnGridComponent } from './column-grid.component';
import { AXPopupService } from 'acorex-ui';

@Component({
    templateUrl: './grid.editor.html',
    styleUrls: ['./grid.editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
            this.value.columns=c.data;
            this.handleValueChange(this.value);
        })
    }

}