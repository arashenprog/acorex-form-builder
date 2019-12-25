import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';
import { ContentItemsStructureEditor } from '../../../../property-editor/editors/items/itemstructure.editor';
import { StringifyOptions } from 'querystring';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceValue } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './list-input-widget.designer.html',
    styleUrls: ['./list-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    items: { content: any[], types: ContentItemsStructureEditor[] };
    mode: string;
    direction: string;
    alignCheck: string;
    showOther: boolean;
    viewType: boolean;
    dsMode: string[];
    dsName: AXFDataSourceValue;
    keyField: string;
    textField: string;
    imageField: string; 

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        if(this.items.types[0].id!=this.textField)
            this.items.types[0].id=this.textField; 
        if (this.dsMode[0] == "ds" && this.dsName) { 
            this.dataService.getList(this.dsName.name, this.dsName.params).then(items => {
                this.items.content = items;
                
                this.cdr.markForCheck();
            });
        }
        else
            this.cdr.markForCheck();
    }

    handleValueChange(e) {  
    }


    getStyles(mode) {
        const styles = {
            'border-radius': mode == 'single' ? 100 + "%" : 0
        };
        return styles;
    }

}




