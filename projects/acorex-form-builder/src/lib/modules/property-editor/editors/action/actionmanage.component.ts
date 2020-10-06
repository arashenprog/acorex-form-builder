import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AXBasePageComponent, AXPopupService} from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events'; 
import { AXFRichTextComponent } from '../text/rich-text.component';
import { AXFActionOption } from './action.class';

@Component({
    templateUrl: './actionmanage.component.html', 
    styleUrls: ['./actionmanage.component.scss']  
})
export class AXIActionManageComponent extends AXBasePageComponent {
 
    public data: AXFActionOption[] = []; 

    constructor(private popupService: AXPopupService) {
        super();
    }

    ngOnInit()
    { 
    }

    onClosing(e: ClosingAction) {
        e.data = {
            actions: this.data 
        };
        e.resolve();
    }
 
    deleteClick(ind) {
        this.data.splice(ind, 1);
    }
 
    addItemClick() {
        if(!this.data)
            this.data=[];
        let index = this.data.length + 1;
        let newRow: AXFActionOption = {variable:"Var"+index.toString(),expression:""};
        this.data.push(newRow);
    }

    handleShowEditor(ind,dt) {
        this.popupService.open(AXFRichTextComponent, {
            title: "Rich Text",
            size: "md",
            data: {
                data: dt
            }
        }).closed(c => {
            this.data[ind].expression= c.data;
        })
    }
 
}