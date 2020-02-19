import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXPopupService } from 'acorex-ui';
import { SignaturePadPage } from '../../signature-input/signaturepad.page';

@Component({
    templateUrl: './grid-input-widget.view.html',
    styleUrls: ['./grid-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value: any[] = [];
    dataSource: AXFDataSourceOption;
    allowAddDelete: boolean;

    constructor(private cdr: ChangeDetectorRef, private popupService: AXPopupService) {
        super()
    }

    onRender(): void {
        if (this.value && this.value.length > 0)
            return;
        if (this.dataSource.mode == "remote") {
            this.dataSource.dataSource.params.forEach(p => {
                if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                    p.value = this.resolveProperty(p.value);
                }
            });
            this.dataService.getList(this.dataSource.dataSource.name, this.dataSource.dataSource.params).then(items => {
                if (items && items.length) {
                    this.value = items;
                    this.cdr.markForCheck();
                }
            });
        }
        else {
            this.value = this.dataSource.dataItems;
            this.cdr.markForCheck();
        }

    }

    addRowClick() {
        let param: any = { id: new Date().getTime() };
        this.dataSource.columns.forEach(f => {
            if (!f.fillByUser) {
                switch (f.type) {
                    case "string":
                        param[f.fieldName] = "";
                        break;
                    case "number":
                        param[f.fieldName] = 0;
                        break;
                    case "boolean":
                        param[f.fieldName] = false;
                        break;
                    case "date":
                        param[f.fieldName] = Date();
                        break;
                    case "time":
                        param[f.fieldName] = "00:00";
                        break;                      
                    default:
                        break;
                }

            }
        })
        this.value.push(param);
    }

    deleteClick(i) {
        this.value.splice(i, 1);
    }

    setSignatureClick(i) {
        this.popupService.open(SignaturePadPage, {
            title: 'Signature',
            size: 'md',
            data: {
                data: this.value
            }
        }).closed(c => {
            this.value = c.data;
            this.cdr.markForCheck();
        });
    }
}
