import { AXFWidgetView } from '../../config/widget';
import { AXFDataService } from '../../services/data.service';

export class AXFRepeaterlWidgetFormula {
    /**
     *
     */
    constructor(public ww: AXFWidgetView) {

    }

    join(widget: string, textField: string, condition?: string): string {
        //debugger;
        const service = (this.ww as any).dataService as AXFDataService;
        const items: any[] = [];
        let i = 0;
        (this.ww as any).allItems().forEach(element => {
            const w = service.getWidget(`${this.ww.getName()}[${i}].${widget}`);
            if(w)
            {
                if (!condition || w.value == condition) {
                    items.push(w.dataContext[textField]);
                }
            }
            else
            {
                if(element[widget]== condition)
                items.push(element[textField]);
            } 
            i++;
        });

        return items.join(',');//.map(c => c.dataContext[textField])
    }

    sum(widget: string):number
    {
        debugger
        const service = (this.ww as any).dataService as AXFDataService;
        const items: any[] = [];
        let i = 0;
        let sum=0;
        (this.ww as any).bodyRows.forEach(element => {
            const w = service.getWidget(`${this.ww.getName()}[${i}].${widget}`);
            sum += (w.value==undefined?0:parseFloat(w.value))
            i++;
        });
return sum;
    }
}