import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'acf-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class ACFCardComponent {

    @Input()
    text: string;

    @Input()
    icon: string;

}
