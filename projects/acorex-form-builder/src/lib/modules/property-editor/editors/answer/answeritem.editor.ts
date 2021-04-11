import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AXBasePageComponent, AXUploadFileLoadEvent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFAnswerItemOption, AXFAnswerOption } from './answer.class';
import { AXSelectionListComponent } from 'acorex-ui';

@Component({
    templateUrl: './answeritem.editor.html',
    styleUrls: ['./answeritem.editor.scss'],
})
export class AXIAnswerItemEditorComponent extends AXBasePageComponent {

    @ViewChild('modeSelection') modeSelection: AXSelectionListComponent;

    modeItems: any[] = [ { value: 'text', text: 'Text' },{ value: 'single', text: 'Single' }, { value: 'multiple', text: 'Multiple' }];
    value:AXFAnswerOption;   

    constructor() {
        super();
    }

    ngOnInit()
    { 
    }

    onClosing(e: ClosingAction) {
        e.data = {
            value: this.value 
        };
        e.resolve();
    }
 
    handleModeChange(v: any[]) {
        if (v && v[0].value !== this.value.mode) {
            this.value.mode = v[0].value;
            if (this.value.mode === 'text') {
                this.value.dataItems = [];
            }
            else{
                if(this.value.dataItems==null)
                    this.value.dataItems = []; 
                let param: any = { id: new Date().getTime() ,text:"Sample"};
                this.value.dataItems.push(param);
            } 
        }
    }

    deleteClick(ind) {
        this.value.dataItems.splice(ind, 1);
    }

    upClick(ind, item) {
        if (ind > 0) {
            let temp = this.value.dataItems[ind - 1];
            this.value.dataItems[ind - 1] = item;
            this.value.dataItems[ind] = temp;
        }
    }

    downClick(ind, item) {
        if (ind < this.value.dataItems.length - 1) {
            let temp = this.value.dataItems[ind + 1];
            this.value.dataItems[ind + 1] = item;
            this.value.dataItems[ind] = temp;
        }
    }

    addItemClick() {
        if (!this.value.dataItems)
            this.value.dataItems = [];
        let param: any = { id: new Date().getTime() ,text:"Sample"};
        this.value.dataItems.push(param);
    }

    setCondition(ind)
    {

    }
}