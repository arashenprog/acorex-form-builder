import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AXFValueWidgetView, AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { WidgetConfig } from '../../../services/widget.service';
import { AXFRepeaterlWidgetFormula } from '../formula';

@Component({
    // selector: "td",
    templateUrl: './repeater-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetPrint extends AXFWidgetPrint {
    dataSource: AXFDataSourceOption;
    showHeader: boolean;
    headerRows: WidgetConfig[];
    bodyRows: WidgetConfig[];
    rowTemplate: WidgetConfig;
    indexStart:string;
    @ViewChild("table", { static: true }) table: ElementRef<HTMLTableElement>;

    get formula() {
        return new AXFRepeaterlWidgetFormula(this);
    }

    constructor(protected cdr: ChangeDetectorRef,private hostElement: ElementRef) {
        super();
    }

    onRender() {
        
        if (this.showHeader) {
            this.headerRows = this.widgets.filter(c => c.options.isHeader === true);
        }
        this.rowTemplate = this.widgets.find(c => c.options.isHeader === false);
        this.bodyRows = this.allItems().filter(s=>s!=null).map(c => {
            const cloned = this.widgetService.clone(this.rowTemplate);
            cloned.dataContext = c;
            return cloned;
        }); 
        setTimeout(() => { 
            if (this.hostElement) { 
                this.applyStyle(<HTMLTableElement>this.hostElement.nativeElement.firstElementChild);
            }
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }, 100);
    }


    // onRender() {
    //     if (this.showHeader) {
    //         this.headerRows = this.widgets.filter(c => c.options.isHeader === true);
    //     }
    //     if (!this.readonly || this.bodyRows === undefined) {
    //         this.rowTemplate = this.widgets.find(c => c.options.isHeader === false);
    //         this.bodyRows = this.allItems().map(c => {
    //             const cloned = this.widgetService.clone(this.rowTemplate);
    //             cloned.dataContext = c;
    //             return cloned;
    //         });
    //     }
    //     setTimeout(() => {
    //         if (this.bodyRows.length === 0 && !this.readonly) {
    //             this.addItemClick();
    //         } else {
    //             this.cdr.detectChanges();
    //         }
    //     }, 100);
    // }



    ngOnInit() {
        console.log('repeater ngOnInit',this.config.options.name,this.visible);
        if (this.dataSource.mode === 'remote') { 
            if (this.showHeader)
                this.headerRows = this.widgets.filter(c => c.options.isHeader === true);

            this.dataSource.dataSource.params.forEach(p => {
                if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                    p.value = this.resolveProperty(p.value);
                }
            });
            this.dataService.getList(this.dataSource.dataSource.name, this.dataSource.dataSource.params).then(items => {
                if (items && items.length) {
                    this.dataSource.dataItems = items;
                    this.refresh();
                }
            });
        } else {
            this.refresh();
        }
        if(this["tag"])
        {
            this.hostElement.nativeElement.setAttribute("role",this["tag"]); 
        }
    }

    private allItems(): any[] {
        debugger
        console.log('repeater Value',this.config.options.name,this.value);
        const result = [];
        if(!this.value && this.dataService['dataModel'][this.getPath()])
           this.value=this.dataService['dataModel'][this.getPath()];

        if (Array.isArray(this.value)) {
            result.push(...this.value);
        }
        let fixedCols= this.dataSource.columns.filter(d=>d.fillByUser==false).map(d=>d.fieldName);
        if (Array.isArray(this.dataSource.dataItems)) {
            for (let i = 0; i < this.dataSource.dataItems.length; i++) {
                const item = this.dataSource.dataItems[i];
                if (result[i]) {
                    if(this.value[i].hasOwnProperty("btnDelete"))
                        result[i] =null;
                    else
                        Object.assign(result[i], fixedCols.reduce(function(o, k) { o[k] = item[k]; return o; }, {}));
                } else {
                    result[i] = item;
                }
            } 
        } 
        result.filter(s=>s!=null).forEach((f,i)=>f=Object.assign(f, this.setIndex(i)));
        return result;
    }

    trackbyFunc(index: number, item: WidgetConfig) {
        return index;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit(); 
        this.cdr.detectChanges();
    }

    setIndex(length)
    {
        let lLength=length+parseInt(this.indexStart)-1;
        let lIndex=String.fromCharCode((lLength%26)+97) ;
        if(Math.floor(lLength/26)>0)
        lIndex= String.fromCharCode(Math.floor(lLength/26)+96)+lIndex;
        let nIndex=length+parseInt(this.indexStart);
        return { NIndex:nIndex,LIndex:lIndex}
    }

}
