import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    templateUrl: './load-template.page.html',
    styles: [`
        :host{
            padding: 20px;
        }
    `]
})
export class AXFLoadTemplatePage extends AXBasePageComponent {
    constructor() { 
        super()
    }

    ngOnInit(): void { }
}
