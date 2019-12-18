import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { ItemsStructureEditor, ContentItemsStructureEditor } from './itemstructure.editor';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { AXFDataService } from '../../../widget/services/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { isArray } from 'util';
import { GridStructureEditor } from '../grid/gridstructure.editor';
import { AXPopupService } from 'acorex-ui';
import { AXFItemComponent } from './items.component';

@Component({
    templateUrl: './items.editor.html',
    styleUrls: ['./items.editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFItemsEditorComponent extends AXFProperyEditor<ItemsStructureEditor> implements OnInit {

    innerValue: any[] = [];

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
                this.value.types = Object.assign([], value.columns);
                this.manageContent();
                this.cdr.markForCheck();
            }
        }
    }


    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService, private popupService: AXPopupService) {
        super();
    }

    ngOnInit(): void {
    }

    itemManage() {
        this.popupService.open(AXFItemComponent, {
            title: "Item Management",
            size: this.value.types.length > 3 ? "lg" : "md",
            data: {
                item: { types: this.value.types.filter(f => !f.fillByUser), content: this.value.content }
            }
        }).closed(c => {
            this.value.content = c.data;
            this.handleValueChange(this.value);
            this.cdr.markForCheck();
        })
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
        if (this.value.content && this.value.content.length > 0) {
            //add new columns
            this.value.types.filter(f => !f.fillByUser).forEach((e) => {
                if (!this.value.content[0][e.id]) {
                    this.value.content = this.value.content.map((m) => { return { ...m, [e.id]: e.defaultValue } })
                }
            });
            //remove data related to deleted columns
            let params= Object.getOwnPropertyNames(this.value.content[0]);
            let existedid= this.value.types.map((m)=>{return m.id});
            let deletedTypes= params.filter(f=> f!="id" && !existedid.includes(f)) ;
            deletedTypes.forEach(t=>{
                this.value.content.forEach(f => {
                    delete f[t];
                })

            })
        }
    }
}
