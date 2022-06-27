import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFDropdownInputWidgetPrint extends AXFWidgetPrint {

    dataSource: AXFDataSourceOption;
    text: string;
    textAlign: string;
    mode = 'single';
    constructor(private cdr: ChangeDetectorRef, private el: ElementRef<HTMLDivElement>) {
        super();
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
            //this.binding(); 
        }
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = [this['dataContext'][this['name']]];
        }
        this.cdr.detectChanges(); 
    }

    showItems()
    {
        if (this.value) {
            if (Array.isArray(this.value)) {
                return this.value.map(c => c[this.dataSource.columns[1]['fieldName']]).join(', ');
            }
            else {
                return this.value[this.dataSource.columns[1]['fieldName']];
            } 
        } 
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.binding();
        if (this.value == undefined && this.dataSource.dataItems && this.dataSource.mode === 'manual') {
            let defaultVals = this.dataSource.dataItems.filter(s => s.DefaultValue == true).map((s) => { return s.value });
            if (defaultVals.length > 0) {
                this.value = defaultVals;
                this.cdr.detectChanges();
            }
        }
        if (this.dataSource.mode === 'remote' &&  !this.dataSource.dataItems) {
            this.dataSource.dataSource.params.forEach(p => {
                if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                    const name = p.value.substring(1);
                    p.value = () => {
                        return '$' + this.resolveProperty(name);
                    };
                }
            });
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                if(Number.isInteger(this.value))
                    this.value= this.dataSource.dataItems.filter(w=>w[this.dataSource.columns[0].fieldName]==this.value);
                this.cdr.detectChanges();
            });
        }
    }

    prepareText(val) {
        if (val) {
            if (Array.isArray(val)) {
                this.text = val.map(c => c[this.dataSource.columns[1]['fieldName']]).join(', ');
            }
            else {
                this.text = val[this.dataSource.columns[1]['fieldName']];
            }
            this.cdr.detectChanges();
        }
    }

    binding() {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            if (this.dataSource.mode == 'remote') {
                this.dataSource.dataSource.params.forEach(p => {
                    if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                        const name = p.value.substring(1);
                        p.value = () => {
                            return '$' + this.resolveProperty(name);
                        };
                    }
                });

                this.dataService.getList(
                    this.dataSource.dataSource.name,
                    this.dataSource.dataSource.params
                ).then(c => {
                    this.dataSource.dataItems = c;
                    let val = this['dataContext'][this['name']];
                    if (typeof this['dataContext'][this['name']] == 'object')
                        val = this['dataContext'][this['name']][this.dataSource.columns[0]['fieldName']];
                    this.value = this.dataSource.dataItems.filter(w => w[this.dataSource.columns[0]['fieldName']] == val);
                     this.prepareText(this.value);
                });
            }
            else {
                this.value = this.dataSource.dataItems.filter(w => w[this.dataSource.columns[0]['fieldName']] == this['dataContext'][this['name']]);
                this.prepareText(this.value);
            }
        }
        else
         this.prepareText(this.value); 
    }
}
