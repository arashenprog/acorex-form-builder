import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFTextEditorComponent } from '../editors/text/text.editor';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFEditorRendererDirective } from '../renderrer/editor-renderer.directive';

const WDIGET_EDITORS = [
    AXFTextEditorComponent,
]

@NgModule({
    declarations: [AXFEditorRendererDirective, ...WDIGET_EDITORS],
    imports: [CommonModule, ACoreXUIModule],
    exports: [AXFEditorRendererDirective, ...WDIGET_EDITORS],
    entryComponents: [WDIGET_EDITORS],
    providers: [],
})
export class AXFEditorsModule { }