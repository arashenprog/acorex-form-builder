import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { ItemsStructureEditor } from './itemstructure.editor';

@Component({ 
    templateUrl: './items.editor.html',
    styleUrls: ['./items.editor.scss'],
})
export class AXFItemsEditorComponent extends AXFProperyEditor<ItemsStructureEditor> implements OnInit {

    innerValue: any[] = [];  
    contentViewItems: any[]= [{ value: "text", title: "Text" }, { value: "image", title: "Image" }]
    imagable:boolean=false;
    otherable:boolean=false;
    constructor() {
        super();
    }

    ngOnInit(): void {
       // this.value = this.value;
    } 


    contentViewChange(e)
    {
        this.value.ContenView=e;
        super.handleValueChange(this.value);
    }

    textItemChange(ind,e)
    { 
        this.value.Content[ind].text =  e;  
        super.handleValueChange(this.value);
    }

    uploadItemChange(ind,evt)
    { 
        this.value.Content[ind].image =  evt.data;  
        super.handleValueChange(this.value);
    }

    deleteClick(ind)
    {        
        this.value.Content.splice(ind,1); 
        super.handleValueChange(this.value);
    }

    upClick(ind,item)
    {  
        if(ind>0)
        {
            let temp=this.value.Content[ind-1];
            this.value.Content[ind-1]=item;
            this.value.Content[ind]=temp;  
            super.handleValueChange(this.value);
        } 
    }

    downClick(ind,item)
    {  
        if(ind<this.value.Content.length-1)
        {
            let temp=this.value.Content[ind+1];
            this.value.Content[ind+1]=item;
            this.value.Content[ind]=temp;  
            super.handleValueChange(this.value);
        } 
    }

    addItemClick()
    {
        let index=this.value.Content.length+1;
        this.value.Content.push({value:index,text:"Item"+index.toString()}); 
        super.handleValueChange(this.value);
    }

    showOtherChange(e)
    {
        this.value.ShowOther=e.target.checked;
    }
}
