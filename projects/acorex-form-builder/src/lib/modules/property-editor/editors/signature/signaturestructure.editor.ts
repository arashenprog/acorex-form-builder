
export class SignatureStructureEditor
{
    SignatureType:string;
    StaffNumber:number;
    ShowType:string[];
    Items:SignatureStructureItem[];
} 


export class SignatureStructureItem
{
    Value:number;
    Text:string;
    Visible:boolean;
    Type:string;
} 