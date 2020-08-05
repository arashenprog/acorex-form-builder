import { AXFWidgetView } from '../../config/widget';
import { AXFDataService } from '../../services/data.service';

export class AXFRepeaterlWidgetFormula {
    /**
     *
     */
    constructor(public ww: AXFWidgetView) {

    }

    join(widget: string, textField: string, condition?: string): string {
        debugger;
        const service = (this.ww as any).dataService as AXFDataService;
        const items: any[] = [];
        let i = 0;
        (this.ww as any).allItems().forEach(element => {
            const w = service.getWidget(`${this.ww.getName()}[${i}].${widget}`);
            if (!condition || w.value == condition) {
                items.push(w);
            }
            i++;
        });

        return items.map(c => c.dataContext[textField]).join(',');
    }
}