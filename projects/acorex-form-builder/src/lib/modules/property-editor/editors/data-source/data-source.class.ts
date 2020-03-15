export class AXFDataSourceOption {
    dataSource: AXFDataSourceRemoteOption;
    dataItems: any[];
    columns: AXFDataSourceColumnOption[] = [];

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
            } else {
                this.dataItems = [];
                this.dataSource = null;
            }
            if (this.columns == null) {
                this.columns = [];
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
}


export class AXFDataSourceColumnOption {
    fieldName: string = null;
    title: string;
    type: string;
    fillByUser: boolean = false;
}
