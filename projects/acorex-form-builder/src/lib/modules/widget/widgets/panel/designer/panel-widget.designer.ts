import { Component, OnInit } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.designer.html',
    styleUrls: ['./panel-widget.designer.scss']
})
export class AXFPanelWidgetDesigner extends AXFWidgetDesigner {

    caption:string;
    
    constructor(private picker:AXFWidgetPickerService) { 
         super();
    }


    addElement() {
        this.picker.showPicker().then(widgets => {
            if (widgets) {
                widgets.forEach(w => {
                    this.addChild(w);
                });
                
                this.refresh();
            }
        })
    }

    handleAction(action: string, e: MouseEvent) {
        e.stopPropagation();
        switch (action) {
            case "edit":
                this.edit();
                break;
            case "delete":
                this.delete();
                break;
            case "add":
                this.addElement();
                break;
        }
        return false;
    }
}

