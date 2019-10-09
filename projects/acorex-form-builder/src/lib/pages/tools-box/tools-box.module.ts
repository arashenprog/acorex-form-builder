import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACFToolsBoxPage } from './tools-box.page';
import { ACFComponentsModule } from '../../components/components.module';
import { AXBasePageComponent } from 'acorex-ui';

@NgModule({
    declarations: [ACFToolsBoxPage],
    imports: [CommonModule, ACFComponentsModule],
    exports: [ACFToolsBoxPage],
    providers: [],
    entryComponents: [ACFToolsBoxPage]
})
export class ACFToolsBoxModule  { }