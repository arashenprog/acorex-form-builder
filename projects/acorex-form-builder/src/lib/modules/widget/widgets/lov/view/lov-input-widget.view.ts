import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
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
       this.cdr.markForCheck();
    }

    ngAfterViewInit() { 
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
        // if (this.dataSource.mode === 'remote') {
        //     if (this.dataSource.dataItems == null || this.dataSource.dataItems.length === 0) {
        //         this.dataSource.dataSource.params.forEach(p => {
        //             if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
        //                 const name = p.value.substring(1);
        //                 p.value = () => {
        //                     return '$' + this.resolveProperty(name);
        //                 };
        //             }
        //         });
        //         this.dataService.getList(
        //             this.dataSource.dataSource.name,
        //             this.dataSource.dataSource.params
        //         ).then(c => {
        //             this.dataSource.dataItems = c; 

        //             this.popupService.open(LovModalPage, {
        //                 title: 'Select Lov',
        //                 size: 'lg',
        //                 data: {
        //                     value: this.value,
        //                     columns:this.dataSource.columns,
        //                     dataItems:c
        //                 }
        //             }).closed(e=>{ 
        //                 //if(e.data && c!=e.data)
        //                 //{  
        //                 // } 
        //             }); 
        //         });
        //     } 
        // }
        // else
        // {
            this.popupService.open(LovModalPage, {
                title: 'Select Lov',
                size: 'lg',
                data: {
                    value: this.value,
                    infoSource:this.dataSource,
                    ww:this
                }
            }).closed(e=>{ 
                //if(e.data && c!=e.data)
                //{  
                // } 
            }); 
        // }

         
    }
}