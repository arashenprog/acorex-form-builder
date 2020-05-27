import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events'; 
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    selector:'ax-signature',
    styleUrls: ['./signaturepad.page.scss'],
    templateUrl: './signaturepad.page.html'
    //,template:' <div class="signature"><signature-pad #sigpad1 [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad><div class="clear-box"><button class="btn btn-outline-danger" (click)="clearClick()"><i class="fa fa-trash"></i></button></div></div><ax-check-box *ngIf="confirmText!=null" [label]="confirmText"></ax-check-box>'
})

export class SignaturePadPage extends AXBasePageComponent{

  @ViewChild('sigpad1') signaturePad: SignaturePad;

  confirmText:string;
  confirm:boolean=false;
  signaturePadOptions: Object = { 
    'canvasHeight': 300,
    'canvasWidth': 300
  };

  constructor()
   {
     super();
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
    this.value="";
    this.signaturePad.clear();
  }

  onClosing(e: ClosingAction) {
    if((this.confirmText!=null && this.confirmText!='' && this.confirm ) || (this.confirmText==null || this.confirmText==''))
      e.data = this.value;
    else
      e.data = "";
    e.resolve();
  }

  save()
  {
    if((this.confirmText!=null && this.confirmText!='' && this.confirm ) || (this.confirmText==null || this.confirmText==''))
    {  
      this.close(this.value);
      
    } 
  }

  back()
  {
    this.close("");
  }
}