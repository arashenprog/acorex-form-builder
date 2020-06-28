import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';
import { AXFFormatService } from '../../../services/format.service'; 

@Component({
    templateUrl: './image-widget.print.html' ,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFImageWidgetPrint extends AXFWidgetPrint {

    value: UploadStructure; 
    alt:string;
    boxStyle:any;
    constructor(private formatService: AXFFormatService) {
        super()
    }

    ngOnInit()
    {
        super.ngOnInit();
        if(this.value.srcData.match(/\[(.*?)\]/g))  
        {
            let imagurl=this.formatService.format(this.value.srcData, this);
            if(imagurl.includes("base64"))
                this.value.srcData=imagurl; 

        }    
    }
}
