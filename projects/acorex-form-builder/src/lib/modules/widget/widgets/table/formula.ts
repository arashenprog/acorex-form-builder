import { AXFWidgetView } from '../../config/widget';
import { AXFDataService } from '../../services/data.service';

export class AXFTableWidgetFormula {
    /**
     *
     */
    constructor(public ww: AXFWidgetView) {

    }
   

    setRequired(widget: string,value:boolean) {
        const service = (this.ww as any).dataService as AXFDataService;
        const w = service.getWidget(`${this.ww.getName()}.${widget}`);
        if(w)
        {
            if(value)
                w.setRequired(value);
            else
                w.validator=null;
        }  
    }
}