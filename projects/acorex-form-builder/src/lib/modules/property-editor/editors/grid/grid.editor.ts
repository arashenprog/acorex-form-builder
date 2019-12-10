import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { GridStructureEditor, ColumnStructureEditor } from './gridstructure.editor'; 

@Component({ 
    templateUrl: './grid.editor.html',
    styleUrls: ['./grid.editor.scss'],
})
export class AXFGridEditorComponent extends AXFProperyEditor<GridStructureEditor> implements OnInit {

    //items:GridStructureEditor;
    innerValue: any[] = [];  
    columnTypeItems: any[]= [{ value: "string", title: "String" }, { value: "number", title: "Number" },
     { value: "boolean", title: "Boolean" },{ value: "date", title: "Date" },{ value: "time", title: "Time" },
     { value: "image", title: "Image" },{ value: "selectionList", title: "Selection List" }]
    
    fillbyItems: any[]= [{ value: "manualList", title: "Manual List" }, { value: "databaseList", title: "Database List" }];
    dataSources : any[]= [{ id: "staffs", text: "Staffs" }]
    constructor() {
        super();
    }

    ngOnInit(): void {
        //this.value = this.value; 
    } 

    fillbyViewChange(e)
    {
        if(!e || !e.length)
            return;
        this.value.fillby=e; 
        super.handleValueChange(this.value);   
    }

    columnTypeChange(ind,e)
    {
        if(!e || !e.length)
        return;
        this.value.columns[ind].type=e; 
        super.handleValueChange(this.value);   
    }
    
    deleteClick(ind)
    {        
        this.value.columns.splice(ind,1); 
        super.handleValueChange(this.value);
    }

    upClick(ind,item)
    {  
        if(ind>0)
        {
            let temp=this.value.columns[ind-1];
            this.value.columns[ind-1]=item;
            this.value.columns[ind]=temp;  
            super.handleValueChange(this.value);
        } 
    }

    downClick(ind,item)
    {  
        if(ind<this.value.columns.length-1)
        {
            let temp=this.value.columns[ind+1];
            this.value.columns[ind+1]=item;
            this.value.columns[ind]=temp;  
            super.handleValueChange(this.value);
        } 
    }

    addItemClick()
    {
        let index=this.value.columns.length+1;
        let newRow= new ColumnStructureEditor(index);
        this.value.columns.push(newRow); 
        super.handleValueChange(this.value);
    }

    titleItemChange(ind,e)
    {

    }

    checkChange(e)
    {

    }
}