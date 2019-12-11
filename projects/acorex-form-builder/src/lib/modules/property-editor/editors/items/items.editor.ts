import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { ItemsStructureEditor } from './itemstructure.editor'; 
import { AXFDataService } from '../../../widget/services/data.service';

@Component({ 
    templateUrl: './items.editor.html',
    styleUrls: ['./items.editor.scss'],
})
export class AXFItemsEditorComponent extends AXFProperyEditor<ItemsStructureEditor> implements OnInit {

    items:ItemsStructureEditor;
    innerValue: any[] = [];  
    contentViewItems: any[]= [{ value: "text", title: "Text" }, { value: "image", title: "Image" }, { value: "both", title: "Both" }]
    imagable:boolean=false;
    otherable:boolean=false;
    flgChange:boolean=false;
   

    constructor(protected cdr: ChangeDetectorRef,private dataService: AXFDataService) {
        super();
    }

    ngOnInit(): void {
        this.items = this.value; 
    } 


    contentViewChange(e)
    {
        if(!e || !e.length)
            return;
        if (JSON.stringify(e)!=JSON.stringify(this.items.ContentView)) {
            this.items.ContentView=e;  
            if((e[0]=="image" || e[0]=="both") && this.items.Content.length>0 && 
                this.items.Content[0].image==undefined) 
                this.items.Content= this.items.Content.map(obj=> ({ ...obj, image: './assets/images/noimage.png'}));
            super.handleValueChange(this.items);
        }
    }

    textItemChange(ind,e)
    { 
        this.items.Content[ind].text =  e;  
        super.handleValueChange(this.items);
    }

    uploadItemChange(ind,evt)
    { 
        this.items.Content[ind].image =  evt.data;  
        super.handleValueChange(this.items);
    }

    deleteClick(ind)
    {        
        this.items.Content.splice(ind,1); 
        super.handleValueChange(this.items);
    }

    upClick(ind,item)
    {  
        if(ind>0)
        {
            let temp=this.items.Content[ind-1];
            this.items.Content[ind-1]=item;
            this.items.Content[ind]=temp;  
            super.handleValueChange(this.items);
        } 
    }

    downClick(ind,item)
    {  
        if(ind<this.items.Content.length-1)
        {
            let temp=this.items.Content[ind+1];
            this.items.Content[ind+1]=item;
            this.items.Content[ind]=temp;  
            super.handleValueChange(this.items);
        } 
    }

    addItemClick()
    {
        let index=this.items.Content.length+1;
        this.items.Content.push({value:index,text:"Item"+index.toString()}); 
        super.handleValueChange(this.items);
    }

    showOtherChange(e)
    {
        this.items.ShowOther=e.target.checked;
    }
}
