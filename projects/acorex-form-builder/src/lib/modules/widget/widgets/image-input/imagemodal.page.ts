import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events'; 
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    selector:'ax-signature',
    styleUrls: ['./imagemodal.page.scss'],
    templateUrl: './imagemodal.page.html'
    //,template:' <div class="signature"><signature-pad #sigpad1 [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad><div class="clear-box"><button class="btn btn-outline-danger" (click)="clearClick()"><i class="fa fa-trash"></i></button></div></div><ax-check-box *ngIf="confirmText!=null" [label]="confirmText"></ax-check-box>'
})

export class ImageModalPage extends AXBasePageComponent{
  
  constructor()
   {
     super();
  }

  @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();

    private _value: any;
    @Input()
    public get value(): any {
        return this._value;
    }
    public set value(v: any) {
        this._value = v;
        this.valueChange.emit(v);
    }
}