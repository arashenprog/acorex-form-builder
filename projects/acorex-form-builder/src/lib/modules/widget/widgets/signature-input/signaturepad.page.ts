import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';

@Component({
    selector:'ax-signature',
    styleUrls: ['./signaturepad.page.scss'],
    template:' <div class="signature"><signature-pad #sigpad1 [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad><div class="clear-box"><button class="btn btn-outline-danger" (click)="clearClick()"><i class="fa fa-trash"></i></button></div></div>'
})

export class SignaturePadPage{

  @ViewChild('sigpad1') signaturePad: SignaturePad;

  signaturePadOptions: Object = { 
    'canvasHeight': 100
  };

  constructor() {
  }

  @Output()
    valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _value: string;
    @Input()
    public get value(): string {
        return this._value;
    }
    public set value(v: string) {
        this._value = v;
        this.valueChange.emit(v);
    }

  ngAfterViewInit() {
    if(this.value)
        this.signaturePad.fromDataURL(this.value);
    else
        this.signaturePad.clear(); 
  }

  drawComplete() { 
    this.value=this.signaturePad.toDataURL();
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearClick()
  {
    this.signaturePad.clear();
  }

  onClosing(e: ClosingAction) {
    e.data = this.value;
    e.resolve();
}
}