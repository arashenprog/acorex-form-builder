import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';

@Component({
  selector: 'ax-expandtext',
  templateUrl: './expandtext.page.html'
})

export class ExpandTextPage extends AXBasePageComponent {

  constructor() {
    super();
  } 

  
  @Input()
  public value: string;
   
  @Input()
  public readonly:boolean;

  // back()
  // {
  //   this.close(null);
  // }

  saveChanges() {
    this.close(this.value)
}
}