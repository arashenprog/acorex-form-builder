export class AXFDataSourceValue {
    private _mode: "remote" | "manual";
    public get mode(): "remote" | "manual" {
        return this._mode;
    }
    public set mode(v: "remote" | "manual") {
        if (v != this._mode) {
            this._mode = v;
            if (v == "remote") {
                this.dataItems = null;
                this.dataSource = new AXFDataSourceRemoteValue();
            }
            else {
                this.dataItems = [];
                this.dataSource = null;
            }
            if (this.columns == null)
                this.columns = [];
            if (this.columns.length == 0) {
                if (v == "remote") {

                }
                else if (this.dataItems && this.dataItems.length > 0) {

                }
                else {
                    this.columns.push({
                        fieldName: "title",
                        fillByUser: false,
                        title: "Title",
                        type: "string",
                    })
                }
            }
        }
    }
    dataSource: AXFDataSourceRemoteValue;
    dataItems: any[];
    columns: AXFDataSourceColumnValue[] = [];

    constructor() {
        this.mode = "remote";
    }
}

export class AXFDataSourceRemoteValue {
    name: string;
    params: AXFDataSourceRemoteParamValue[] = []
}



export class AXFDataSourceRemoteParamValue {
    name: string;
    value: string;
}


export class AXFDataSourceColumnValue {
    fieldName: string = null;
    title: string;
    type: string;
    fillByUser: boolean = false;
    // constructor(json) {
    //     this.id = json.id;
    //     this.title = json.title;
    //     this.type = json.type;
    //     if (json.fillByUser)
    //         this.fillByUser = json.fillByUser;
    //     if (json.mode)
    //         this.mode = json.mode;
    //     if (json.subText)
    //         this.subText = json.subText;
    //     if (json.subItems && json.subItems.length > 0)
    //         this.subItems = json.subItems;
    //     if (json.fieldName)
    //         this.fieldName = json.fieldName;
    //     this.defaultValue = this.getDefaultValue(json.type);
    // }

    // getDefaultValue(type: string) {
    //     switch (type) {
    //         case "string":
    //             return "Item";
    //         case "number":
    //             return 1;
    //         case "date":
    //             return new Date().toISOString().split('T')[0];
    //         case "selectionList":
    //             return [];
    //         case "boolean":
    //             return false;
    //         case "image":
    //             return './assets/images/noimage.png';
    //         case "time":
    //             return new Date().toLocaleTimeString();
    //     }
    // }
} 