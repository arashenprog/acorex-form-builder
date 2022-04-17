import { AXFWidgetView } from '../../config/widget';
import { AXFDataService } from '../../services/data.service';

export class AXFRepeaterlWidgetFormula {
    /**
     *
     */
    constructor(public ww: AXFWidgetView) {

    }

    join(widget: string, textField: string, condition?: string): string {
        const service = (this.ww as any).dataService as AXFDataService;
        const items: any[] = [];
        let i = 0;
        (this.ww as any).allItems().forEach(element => {
            const w = service.getWidget(`${this.ww.getName()}[${i}].${widget}`);
            if (w) {
                if (!condition || w.value == condition) {
                    if(w.dataContext[textField] && w.dataContext[textField]!="")
                        items.push(w.dataContext[textField]);
                    else
                        items.push(element[textField]);
                }
            }
            else {
                if (element[widget] == condition)
                    items.push(element[textField]);
            }
            i++;
        });

        return items.join(',');//.map(c => c.dataContext[textField])
    }

    sum(widget: string): number {
        const service = (this.ww as any).dataService as AXFDataService;
        const items: any[] = [];
        let i = 0;
        let sum = 0;
        (this.ww as any).bodyRows.forEach(element => {
            const w = service.getWidget(`${this.ww.getName()}[${i}].${widget}`);
            sum += (w.value == undefined ? 0 : parseFloat(w.value))
            i++;
        });
        return sum;
    }

    addNewRow(obj)
    {
        let view= (this.ww as any);
        if (view.rowTemplate) {
            let cloned=view.widgetService.clone(view.rowTemplate);
            cloned.dataContext = obj;
            view.bodyRows.push(cloned);
            view.cdr.detectChanges();
        }
    }

    deleteRow(selUid)
    {
        let view= (this.ww as any);        
        let delindex= view.bodyRows.findIndex(e=>e.options.uid==selUid) 
        view.bodyRows.splice(delindex, 1);
        if(view.value)
        { 
            let mapValues= view.value.map((d,i)=> { return { deleted: d!=null && d.hasOwnProperty("btnDelete"),i:i} });
            let beforeDel= mapValues.filter(w => w.deleted==true && w.i<=delindex).length;
            if(beforeDel>0)
            {
                let i=0
                while(mapValues[delindex+beforeDel+i] && mapValues[delindex+beforeDel+i].deleted )
                {
                    i++;
                }
                if(delindex+beforeDel+i>view.value.length+1) 
                view.value= view.value.concat(new Array(delindex+beforeDel+i-(view.value.length+1)).fill(null)); 
        
                view.value[delindex+beforeDel+i]={btnDelete:null}; 
            } 
        } 
        view.cdr.detectChanges();
      
    }

    setData(arr:any[])
    {
        let view= (this.ww as any);
        if (view.rowTemplate) { 
            view.bodyRows = arr.map(c => {
                const cloned = view.widgetService.clone(view.rowTemplate);
                cloned.dataContext = c;
                return cloned;
            }); 
            view.value=arr;
            view.cdr.detectChanges();
        }
    }

    setRequired(widget: string,value:boolean) {
        const service = (this.ww as any).dataService as AXFDataService;
        const items: any[] = [];
        let i = 0; 
        (this.ww as any).bodyRows.forEach(element => {
            const w = service.getWidget(`${this.ww.getName()}[${i}].${widget}`);
            if(w)
            {
                if(value)
                    w.setRequired(value);
                else
                    w.validator=null;
            }  
        }); 
    }
}