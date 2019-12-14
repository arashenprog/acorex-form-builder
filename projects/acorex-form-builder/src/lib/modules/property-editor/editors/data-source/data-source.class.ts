export class AXFDataSourceValue {
    name: string;
    params: AXFDataSourceParamValue[] = []

    constructor(name:string,params:AXFDataSourceParamValue[]=[])
    {
        this.name=name;
        this.params=params;
    }
}

export class AXFDataSourceParamValue {
    name: string;
    value:string;
}