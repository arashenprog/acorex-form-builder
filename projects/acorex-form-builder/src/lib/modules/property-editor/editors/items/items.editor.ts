import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { ItemsStructureEditor, ContentItemsStructureEditor } from './itemstructure.editor';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { AXFDataService } from '../../../widget/services/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { isArray } from 'util';
import { GridStructureEditor } from '../grid/gridstructure.editor';

@Component({
    templateUrl: './items.editor.html',
    styleUrls: ['./items.editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFItemsEditorComponent extends AXFProperyEditor<ItemsStructureEditor> implements OnInit {

    innerValue: any[] = [];
    contentViewItems: any[] = [{ value: "text", title: "Text" }, { value: "image", title: "Image" }, { value: "both", title: "Both" }]
    imagable: boolean = false;
    otherable: boolean = false;
    flgChange: boolean = false;
    private viewTypeStr: string;
    get viewType(): string {
        return this.viewTypeStr;
    }
    set viewType(value: string) {
        if (isArray(value) && this.viewTypeStr != value) {
            this.changeViewType(value);
            this.viewTypeStr = value;
            this.cdr.markForCheck();
        }
    }

    set columnInstance(value: GridStructureEditor) {
        if (value.columns && isArray(value.columns) && value.columns.length > 0) {
            if (JSON.stringify(value.columns) != JSON.stringify(this.value.types)) {
                this.value.types =Object.assign([],value.columns);
                this.manageContent();
                this.cdr.markForCheck();
            }
        }
    }


    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService) {
        super();
    }

    ngOnInit(): void {
    }

    itemChange(item: any, ind: number, e: any) {
        switch (item.type) {
            case "string":
            case "number":
            case "date":
            case "selectionList":
                this.value.content[ind][item.id] = e;
                break;
            case "boolean":
                this.value.content[ind][item.id] = e.target.checked;
                break;
            case "image":
                this.value.content[ind][item.id] = e.data;
                break;
            default:
                break;
        }

        super.handleValueChange(this.value);
    }

    deleteClick(ind) {
        this.value.content.splice(ind, 1);
        super.handleValueChange(this.value);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.value.content[ind - 1];
            this.value.content[ind - 1] = item;
            this.value.content[ind] = temp;
            super.handleValueChange(this.value);
        }
    }

    downClick(ind, item) {
        if (ind < this.value.content.length - 1) {
            let temp = this.value.content[ind + 1];
            this.value.content[ind + 1] = item;
            this.value.content[ind] = temp;
            super.handleValueChange(this.value);
        }
    }

    addItemClick() {
        if (!this.value.content)
            this.value.content = []; 
        let param: any =  { id: new Date().getTime() };
        this.value.types.forEach((e) => {
            param[e.id] = e.defaultValue;
        });
        this.value.content.push(param);
        super.handleValueChange(this.value);
    }

    changeViewType(newVal) {
        let newType: any;
        if (newVal[0] == "image" || newVal[0] == "both") {
            newType = new ContentItemsStructureEditor({ id: "image", title: "Image", type: "image" })
            if (newVal[0] == "image" && this.value.types.some(s => s.id == "text")) {
                this.value.types = this.value.types.filter(s => s.id != "text");
                if (this.value.content)
                    this.value.content.forEach(f => {
                        delete f["text"];
                    })
            }
            if (!this.value.types.some(s => s.id == "image")) {
                this.value.types.push(newType);
                if (this.value.content)
                    this.value.content = this.value.content.map((m) => { return { ...m, [newType.id]: newType.defaultValue } })
            }
        }
        if (newVal[0] == "string" || newVal[0] == "both") {
            newType = new ContentItemsStructureEditor({ id: "text", title: "Text", type: "string" })
            if (newVal[0] == "string" && this.value.types.some(s => s.id == "image")) {
                this.value.types = this.value.types.filter(s => s.id != "image");
                if (this.value.content)
                    this.value.content.forEach(f => {
                        delete f["image"];
                    })
            }
            if (!this.value.types.some(s => s.id == "text")) {

                this.value.types.push(newType);
                if (this.value.content)
                    this.value.content = this.value.content.map((m) => { return { ...m, [newType.id]: newType.defaultValue } })
            }
        }

    }

    manageContent() {
        if (this.value.content && this.value.content.length > 0)
            this.value.types.forEach((e) => {
                if (!this.value.content[0][e.id]) {
                    this.value.content = this.value.content.map((m) => { return { ...m, [e.id]: e.defaultValue } })
                }
            });
    }
}
