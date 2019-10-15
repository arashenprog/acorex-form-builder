import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorRendererDirective } from '../renderrer/editor-renderer.directive';
import { AXFEditorService } from '../services/editor.service';
import { AXFTextEditorModule } from '../editors/text/text.module';
import { AXFBoxStyleEditorModule } from '../editors/style/box-style/box-style.module';

const WDIGET_MODULES = [
    AXFBoxStyleEditorModule,
    AXFTextEditorModule
]

@NgModule({
    declarations: [AXFEditorRendererDirective],
    imports: [CommonModule,...WDIGET_MODULES],
    exports: [AXFEditorRendererDirective],
    providers: [AXFEditorService],
})
export class AXFEditorsModule { }