export class UploadStructure{
    modeSize:string;
    isAspectRatio:boolean;
    srcData:string;
    width:string;
    height:string;
    orginalWidth:string;
    orginalHeight:string;

    constructor(json)
    {
        this.modeSize=json.modeSize;
        this.isAspectRatio=json.isAspectRatio;
        this.srcData=json.srcData;
        this.width=json.width;
        this.height=json.height;
        if(json.orginalWidth)
            this.orginalWidth=json.orginalWidth;
        else
            this.orginalWidth=json.width;
        if(json.orginalHeight)
            this.orginalHeight=json.orginalHeight;
        else
            this.orginalHeight=json.height;    
    }
}