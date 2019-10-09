import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'acf-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class ACFCardComponent {

    @Input()
    name: string = ""

    @Input()
    icon: string = ""

}
