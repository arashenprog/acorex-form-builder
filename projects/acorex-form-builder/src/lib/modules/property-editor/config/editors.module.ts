import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFTextEditorComponent } from '../editors/text/text.editor';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFEditorRendererDirective } from '../renderrer/editor-renderer.directive';
import { AXFBoxStyleEditorComponent } from '../editors/style/box-style/box-style.editor';

const WDIGET_EDITORS = [
    AXFTextEditorComponent,
    AXFBoxStyleEditorComponent
]

@NgModule({
    declarations: [AXFEditorRendererDirective, ...WDIGET_EDITORS],
    imports: [CommonModule, ACoreXUIModule],
    exports: [AXFEditorRendererDirective, ...WDIGET_EDITORS],
    entryComponents: [WDIGET_EDITORS],
    providers: [],
})
export class AXFEditorsModule { }