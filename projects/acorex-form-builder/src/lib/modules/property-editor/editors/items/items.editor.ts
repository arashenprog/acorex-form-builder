import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
<<<<<<< HEAD
import { ItemsStructureEditor, ContentItemsStructureEditor } from './itemstructure.editor';
import { BrowserTransferStateModule } from '@angular/platform-browser';
=======
import { ItemsStructureEditor } from './itemstructure.editor'; 
import { AXFDataService } from '../../../widget/services/data.service';
>>>>>>> 9d146ed811848b4b6a02ed1d694453fd5aaadbc1

@Component({
    templateUrl: './items.editor.html',
    styleUrls: ['./items.editor.scss'],
})
export class AXFItemsEditorComponent extends AXFProperyEditor<ItemsStructureEditor> implements OnInit {

<<<<<<< HEAD
    items: ItemsStructureEditor;
    innerValue: any[] = [];
    // contentViewItems: any[] = [{ value: "text", title: "Text" }, { value: "image", title: "Image" }, { value: "both", title: "Both" }]
    // imagable: boolean = false;
    constructor() {
=======
    items:ItemsStructureEditor;
    innerValue: any[] = [];  
    contentViewItems: any[]= [{ value: "text", title: "Text" }, { value: "image", title: "Image" }, { value: "both", title: "Both" }]
    imagable:boolean=false;
    otherable:boolean=false;
    flgChange:boolean=false;
   

    constructor(protected cdr: ChangeDetectorRef,private dataService: AXFDataService) {
>>>>>>> 9d146ed811848b4b6a02ed1d694453fd5aaadbc1
        super();
    }

    ngOnInit(): void {
        this.items = this.value;
    }


    //contentViewChange(e)
    //{
    //if(!e || !e.length)
    // return;
    //if (JSON.stringify(e)!=JSON.stringify(this.items.ContentView)) {
    // this.items.ContentView=e;  
    //if((e[0]=="image" || e[0]=="both") && this.items.content.length>0 && 
    //  this.items.content[0].image==undefined) 
    // this.items.content= this.items.content.map(obj=> ({ ...obj, image: './assets/images/noimage.png'}));
    //super.handleValueChange(this.items);
    // }
    //}

    itemChange(item: any, ind: number, e: any) {
        switch (item.type) {
            case "string":
            case "number":
            case "date":
            case "selectionList":
                if (this.items.isDrop) {
                    this.items.content[ind].value = e;
                    this.items.content[ind].text = item.title;
                }
                else
                    this.items.content[ind][item.id] = e;
                break;
            case "boolean":
                if (this.items.isDrop) {
                    this.items.content[ind].value = item.id;
                    this.items.content[ind].text = item.title;
                }
                else
                    this.items.content[ind][item.id] = e.target.checked;
                break;
            case "image":
                    if (this.items.isDrop) {
                        this.items.content[ind].value = item.id;
                        this.items.content[ind].text = item.title;
                    }
                    else
                        this.items.content[ind][item.id] = e.data;
                break;
            default:
                break;
        }

        super.handleValueChange(this.items);
    }

    deleteClick(ind) {
        this.items.content.splice(ind, 1);
        super.handleValueChange(this.items);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.items.content[ind - 1];
            this.items.content[ind - 1] = item;
            this.items.content[ind] = temp;
            super.handleValueChange(this.items);
        }
    }

    downClick(ind, item) {
        if (ind < this.items.content.length - 1) {
            let temp = this.items.content[ind + 1];
            this.items.content[ind + 1] = item;
            this.items.content[ind] = temp;
            super.handleValueChange(this.items);
        }
    }

    addItemClick() { 
        let param:any={};
        this.items.types.forEach((e)=> {
            param[e.id]=e.defaultValue;
        });
        this.items.content.push(param); 
        super.handleValueChange(this.items);
    }

     
}
