import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFCardModule } from './card/card.module';

const modules = [ACFCardModule]

@NgModule({
    declarations: [],
    imports: [CommonModule, ...modules],
    exports: [...modules],
    providers: [],
})
export class ACFComponentsModule { }