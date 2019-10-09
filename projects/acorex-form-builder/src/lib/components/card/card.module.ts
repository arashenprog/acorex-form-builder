import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFCardComponent } from './card.component';

const components = [ACFCardComponent]

@NgModule({
    declarations: [...components],
    imports: [CommonModule],
    exports: [...components],
    providers: [],
})
export class ACFCardModule { }