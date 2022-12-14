import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { type } from 'os';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFValueWidgetView, AXFWidgetDesigner } from '../../../config/widget';
import { AXFUrlResolverService } from '../../../services/url-resolver.service';
import { LovModalPage } from '../lovmodal.page';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './lov-input-widget.view.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFLovInputWidgetView extends AXFValueWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption; 
    mode:string;
    constructor(protected cdr: ChangeDetectorRef, private ref: ElementRef,
        private resolverService: AXFUrlResolverService,
        private popupService: AXPopupService) {
        super(cdr);
        // this.valueChange.subscribe(() => {
        //     this.selectedItems = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [];
        //     this.cdr.markForCheck();
        // });
    }

    onRender(): void {
        // if (this.el)
        //     this.applyStyle(this.el.nativeElement);   
       this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
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
     

    showPopup()
    {   
        this.popupService.open(LovModalPage, {
            title: 'Select Lov',
            size: 'lg',
            data: {
                // value: this.value,
                // infoSource:this.dataSource,
                ww:this
            }
        }).closed(e=>{  
            if(e.data)
            {  
                this.value=e.data;
                this.cdr.markForCheck();
            } 
        }); 
    }

    showText(val)
    {
        if(!val)
            return ""; 
           
        let colBase= this.dataSource.columns.find(w=>w.isDisplay);
        if(!colBase)
            colBase=this.dataSource.columns[0];

        if(Array.isArray(val)) 
            return val.map(c => c[colBase.fieldName]).join(', '); 
        else 
            return val[colBase.fieldName];  
    }
}