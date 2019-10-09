import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AXPopupService, AXBasePageComponent } from 'acorex-ui';
import { ACFToolsBoxPage } from '../tools-box/tools-box.page';

@Component({
    selector: 'acf-designer',
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss']
})
export class ACFDesignerPage extends AXBasePageComponent {
    constructor(private popup: AXPopupService) { super() }


    enableDesigner: boolean = true;

    ngOnInit(): void { }

    onCreateFormClick() {
        this.popup.open(ACFToolsBoxPage, { title: "Add Component", size: "md" })
        this.enableDesigner = false;

    }
}
