import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView, AXFWidget } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { WidgetConfig } from '../../../services/widget.service';
import { AXFRepeaterlWidgetFormula } from '../formula';
import { AXFTableRowWidgetView } from '../../table-row/view/table-row-widget.view';
import { strictEqual } from 'assert';

@Component({
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.view.html',
    styleUrls: ['./repeater-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetView extends AXFValueWidgetView {
    @ViewChild('table', { static: true }) table: ElementRef<HTMLTableElement>;
    dataSource: AXFDataSourceOption;
    showHeader: boolean;
    headerRows: WidgetConfig[];
    bodyRows: WidgetConfig[];
    rowTemplate: WidgetConfig;
    allowAdd: boolean;
    //isResponsive:boolean;

    get formula() {
        return new AXFRepeaterlWidgetFormula(this);
    }

    constructor(private hostElement: ElementRef<HTMLDivElement>,
        protected cdr: ChangeDetectorRef) {
        super(cdr);
        this.valueChange.subscribe(() => {
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }
 
    onRender() {  
             
        if (this.showHeader) {
            this.headerRows = this.widgets.filter(c => c.options.isHeader === true);
        }
        if (!this.readonly || this.bodyRows === undefined) {
            this.rowTemplate = this.widgets.find(c => c.options.isHeader === false);
            this.bodyRows = this.allItems().map(c => {
                const cloned = this.widgetService.clone(this.rowTemplate);
                cloned.dataContext = c; 
                return cloned;
            });
        }
        setTimeout(() => { 
            if (this.bodyRows.length === 0 && !this.readonly) {
                this.addNew();
            } else {
                this.cdr.detectChanges();
            }
            if (this.hostElement) { 
                this.applyStyle(<HTMLTableElement>this.hostElement.nativeElement.firstElementChild);

                // if(this.isResponsive &&  !(this.hostElement.nativeElement.firstElementChild.classList.contains("reponsive")))
                //     this.hostElement.nativeElement.firstElementChild.classList.add("reponsive");
            }  
        }, 100);
        
    }

    addItemClick() {
        this.addNew();
    }


    addNew() {
        if (this.rowTemplate && this.dataSource.mode == 'manual' && !this.readonly) {
            let cln=this.widgetService.clone(this.rowTemplate); 
            cln.dataContext= this.setIndex(this.bodyRows.length);
            // if(this.isResponsive)
            // {
            //     cln.options.widgets.forEach(lmn => {
            //         debugger
            //         lmn.options.data_header="dfsdf";
            //     }); 
            // }
            this.bodyRows.push(cln);
        }
        this.cdr.detectChanges();
    }

    setIndex(length)
    {
        let lIndex=String.fromCharCode((length%26)+97) ;
        if(Math.floor(length/26)>0)
            lIndex= String.fromCharCode(Math.floor(length/26)+96)+lIndex;
        let nIndex=length+1;
        return { NIndex:nIndex,LIndex:lIndex}
    }

    ngOnInit() {

        if (this.dataSource.mode === 'remote') {
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
        
    }

    private allItems(): any[] {
        const result = [];
        if (!this.value && this.dataService['dataModel'][this.getPath()])
            this.value = this.dataService['dataModel'][this.getPath()];

        if (Array.isArray(this.value)) {
            result.push(...this.value);
        }
        let fixedCols = this.dataSource.columns.filter(d => d.fillByUser == false).map(d => d.fieldName);
        if (Array.isArray(this.dataSource.dataItems)) {
            for (let i = 0; i < this.dataSource.dataItems.length; i++) {
                const item = this.dataSource.dataItems[i]; 
                if (result[i]) {
                    Object.assign(result[i], fixedCols.reduce(function (o, k) { o[k] = item[k]; return o; }, {}));
                } else {
                    result[i] = item;
                }   
            }
        }
        result.forEach((f,i)=>f=Object.assign(f, this.setIndex(i)));
        return result;
    }

    trackbyFunc(index: number, item: WidgetConfig) {
        return index;
    }


    remove(index: number) {
        this.bodyRows.splice(index, 1);
        this.refresh();
    }

    deleteRow(widget: AXFWidget) { 
        if (widget && widget.parent) {
            let parent = widget.parent
            while (parent != null) {
                if (parent instanceof AXFTableRowWidgetView) {
                    break;
                }
                parent = parent.parent;
            }
            if (parent)
                this.bodyRows = this.bodyRows.filter(c => c.options.uid != parent.uid);
        }
    }
}
