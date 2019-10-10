import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFCardModule } from './card/card.module';
import { AXFWidgetRendererDirective } from './widget/widget-renderer.directive';

const modules = [ACFCardModule]

@NgModule({
    declarations: [AXFWidgetRendererDirective],
    imports: [CommonModule, ...modules],
    exports: [AXFWidgetRendererDirective,...modules],
    providers: [],
})
export class ACFComponentsModule { }