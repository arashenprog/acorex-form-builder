export class AXFDataSourceOption {
    dataSource: AXFDataSourceRemoteOption;
    dataItems: any[];
    columns: AXFDataSourceColumnOption[] = [];
    displayItems:any[];
    showDocument:boolean=false;

    private _mode: 'remote' | 'manual';
    public get mode(): 'remote' | 'manual' {
        return this._mode;
    }
    public set mode(v: 'remote' | 'manual') {
        if (v !== this._mode) {
            this._mode = v;
            if (v === 'remote') {
                this.dataItems = null;
                this.dataSource = new AXFDataSourceRemoteOption();
                this.displayItems=null;
            } else {
                this.dataItems = [];
                this.dataSource = null;
                this.displayItems= [];
            }
            if (this.columns == null) {
                this.columns = [];
            }
        }
    }

    private _displayMode: 'allItems' | 'onlySelected';
    public get displayMode(): 'allItems' | 'onlySelected' {
        return this._displayMode;
    }
    public set displayMode(v: 'allItems' | 'onlySelected') {
        if (v !== this._displayMode) {
            this._displayMode = v;
            if (v === 'allItems') {
                this.displayItems = null;  
            }
        }
    }


    constructor() {

    }


    clone(): AXFDataSourceOption {
        const obj: any = {};
        obj.mode = this.mode;
        obj.columns = JSON.parse(JSON.stringify(this.columns));
        if (this.mode === 'manual') {
            obj.dataItems = JSON.parse(JSON.stringify(this.dataItems));
        } else {
            obj.dataSource = JSON.parse(JSON.stringify(this.dataSource));
            obj.displayMode = this.displayMode;
            if(this.displayMode=='onlySelected')
                obj.displayItems = this.displayItems;
            else
                obj.displayItems =[];
            obj.showDocument=this.showDocument;
            //obj.dataItems = [];
        } 
        return obj;
    }
}

export class AXFDataSourceRemoteOption {
    name: string;
    params: AXFDataSourceRemoteParamOption[] = [];
}



export class AXFDataSourceRemoteParamOption {
    name: string;
    value: any;

    constructor(nam:string,val:any)
    {
        this.name=nam;
        this.value=val;
    }
}


export class AXFDataSourceColumnOption {
    fieldName: string = null;
    title: string;
    type: string;
    fillByUser: boolean = false;
    isDisplay:boolean=false;
    valueField:boolean=false;
    textField:boolean=false;
}
