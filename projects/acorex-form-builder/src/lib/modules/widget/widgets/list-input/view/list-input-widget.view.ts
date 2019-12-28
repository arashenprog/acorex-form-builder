import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { ContentItemsStructureEditor } from '../../../../property-editor/editors/items/itemstructure.editor';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceValue } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './list-input-widget.view.html',
    styleUrls: ['./list-input-widget.view.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    items: { content: any[], types: ContentItemsStructureEditor[] };
    mode: string;
    direction: string;
    alignCheck: string;
    showOther: boolean;
    viewType: boolean;
    dsMode: string[];
    dsName: AXFDataSourceValue;
    uid: string = "M" + Math.ceil(Math.random() * 10000);
    visible: boolean;
    keyField: string;
    textField: string;
    imageField: string

    constructor(private dataService: AXFDataService) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
    }

    ngAfterViewInit() {
        if (this.dsMode[0] == "ds" && this.dsName) {
            // this.dataService.getList(this.dsName.name, this.dsName.params).then(items => {
            //     this.items.content = items;
            // });
        }

        this.refresh(false);
    }

    refresh(clear: boolean = true) {
        if (this.dsMode[0] == 'ds' && this.dsName) {
            // this.dataService.getList(this.dsName.name, this.dsName.params).then(items => {
            //     this.items.content = items;
            //     if (clear) {
            //         if (this.mode == "single") {
            //             this.value = null;
            //         }
            //         else {
            //             this.value = [];
            //         }
            //     }
            //     super.refresh();
            // });
        }
    }

    getStyles(mode) {
        const styles = {
            'border-radius': mode.includes('single') ? 100 + "%" : 0
        };
        return styles;
    }

    onCheckValueChange(val, checked) {
        if (this.mode.includes("single")) {
            this.value = [val];
        }
        else {
            if (!this.value)
                this.value = [];

            if (!this.value.includes(val)) {
                this.value = [...this.value, ...[val]];
            } 
            else {
                this.value = this.value.filter(c => c != val);
            }
        }

    }
}
