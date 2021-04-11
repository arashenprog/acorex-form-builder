export class AXFAnswerOption { 
    dataItems: AXFAnswerItemOption[]=[]; 
    textPlaceHolder:string;
    questionText:string;
    private _mode: 'single' | 'multiple' | 'text';
    public get mode(): 'single' | 'multiple' | 'text' {
        return this._mode;
    }
    public set mode(v: 'single' | 'multiple' | 'text') {
        if (v !== this._mode) {
            this._mode = v;
            if (v === 'text') {
                this.dataItems = null; 
            } else {
                this.dataItems = []; 
            } 
        }
    }

    constructor() {

    }


    clone(): AXFAnswerOption {
        const obj: any = {};
        obj.mode = this.mode; 
        if (this.mode === 'multiple') {
            obj.dataItems = JSON.parse(JSON.stringify(this.dataItems));
        }  
        return obj;
    }
}

export class AXFAnswerItemOption {
    text: string;
    id: number;
}
