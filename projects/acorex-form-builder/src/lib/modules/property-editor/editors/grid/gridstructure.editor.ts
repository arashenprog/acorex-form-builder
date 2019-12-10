export class GridStructureEditor
{ 
    fillby:string[];
    dsName:string[];
    columns:ColumnStructureEditor[];
    rowCount:number 
}

export class ColumnStructureEditor
{ 
    type:string[];
    id:string;
    title:string;
    fillByUser:boolean;
    groupName:string;  
    constructor(id:number) { 
        this.id="Field"+id.toString();
        this.title="Field"+id.toString();
        this.type=["string"];
        this.fillByUser=false;
        this.groupName=null;
    }
}