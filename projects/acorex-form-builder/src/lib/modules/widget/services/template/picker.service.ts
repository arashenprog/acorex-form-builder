import { Injectable } from '@angular/core';
import { PromisResult, AXPopupService } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../widget.service';
import { AXFWidgetPickerComponent } from '../../shared/widget-picker/widget-picker.component';

@Injectable({ providedIn: "root" })
export class AXFWidgetPickerService {


    constructor(private popup: AXPopupService, private widgetService: AXFWidgetService) {

    }

    showPicker(): PromisResult<WidgetConfig[]> {
        return new PromisResult((resolve) => {
            this.popup.open(AXFWidgetPickerComponent, {
                title: "Add Element",
                size: "md",
                data: {
                    list: this.widgetService.getList()
                }
            }).closed((c) => {
                if (c && c.data) {
                    if (c.data.name == "page")
                        resolve(c.data.options.widgets);
                    else
                        resolve(c.data);
                }
                else {
                    resolve(null);
                }
            })
        })
    }
}
