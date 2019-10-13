import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AXPopupService, AXBasePageComponent } from 'acorex-ui';

@Component({
    selector: 'acf-designer',
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFDesignerPage extends AXBasePageComponent {
    constructor(private popup: AXPopupService) { super() }


    enableDesigner: boolean = true;

    ngOnInit(): void { }

    onCreateElementClick() {
        //this.popup.open(ACFToolsBoxPage, { title: "Add Component", size: "md" })
        //this.enableDesigner = false;

    }
}
