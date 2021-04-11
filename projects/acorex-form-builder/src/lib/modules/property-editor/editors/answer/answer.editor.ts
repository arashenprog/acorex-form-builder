import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFAnswerOption } from './answer.class';
import { AXSelectionListComponent, AXSelectBoxComponent, AXPopupService } from 'acorex-ui';
import { AXIAnswerItemEditorComponent } from './answeritem.editor';
//import { AXIAnswerItemEditorComponent } from './answeritem.editor'; 

@Component({
    templateUrl: `answer.editor.html`, 
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFAnswerEditorComponent extends AXFProperyEditor<AXFAnswerOption>  {

    @ViewChild('modeSelection') modeSelection: AXSelectionListComponent;

    modeItems: any[] = [ { value: 'text', text: 'Text' },{ value: 'single', text: 'Single' }, { value: 'multiple', text: 'Multiple' }];

    constructor(
        protected cdr: ChangeDetectorRef,
        private popupService: AXPopupService,
    ) {
        super(cdr);
        this.valueChange.subscribe(c => {
            this.cdr.markForCheck();
        });
    }

    ngOnInit() {
        
        if (this.value == null) {
            this.value = new AXFAnswerOption();
            this.value.mode = 'single';
            //this.initColumns();
        } else {
            const v: AXFAnswerOption = new AXFAnswerOption();
            Object.assign(v, this.value);
            this.value = v;
        }
    }

    handleModeChange(v: any[]) {
        if (v && v[0].value !== this.value.mode) {
            this.value.mode = v[0].value;
            if (this.value.mode === 'single') {
                this.value.dataItems = [];
            }
            else if(this.value.dataItems==null)
                this.value.dataItems = [];
            this.handleValueChange(this.value); 
        }
    }

    manageQuestion() {
        this.popupService.open(AXIAnswerItemEditorComponent, {
            title: 'Items Editor',
            size: 'md',
            data: {value: this.value}
        }).closed(c => { 
            this.value = c.data;
            this.handleValueChange(this.value);
            this.cdr.markForCheck(); 
        });
     } 

    


}
