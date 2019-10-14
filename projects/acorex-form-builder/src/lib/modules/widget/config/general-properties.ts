import { AXFTextEditorComponent } from '../../property-editor/editors/text/text.editor';
import { AXFWidgetProperty } from '../services/widget.service';
import { AXFBoxStyleEditorComponent } from '../../property-editor/editors/style/box-style/box-style.editor';
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';

export const AXF_TEXT_PROPERTY: AXFWidgetProperty = {
    name: "text",
    category: "General",
    defaultValue: "Text Value",
    title: "Text",
    editor: AXFTextEditorComponent
}

export const AXF_NAME_PROPERTY: AXFWidgetProperty = {
    name: "NAME",
    category: "General",
    defaultValue: "",
    title: "Name",
    editor: AXFTextEditorComponent
}


export const AXF_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "color",
    category: "Style",
    defaultValue: "#000",
    title: "Color",
    editor: AXFTextEditorComponent
}

export const AXF_BG_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "bgColor",
    category: "Style",
    defaultValue: "#fff",
    title: "Background Color",
    editor: AXFTextEditorComponent
}

export const AXF_BOX_STYLE_PROPERTY: AXFWidgetProperty = {
    name: "boxStyle",
    category: "Style",
    defaultValue: new AXFBoxStyleValue(),
    title: "Box Style",
    editor: AXFBoxStyleEditorComponent
}

export const AXF_LABEL_PROPERTY: AXFWidgetProperty = {
    name: "label",
    category: "General",
    defaultValue: "",
    title: "Label",
    editor: AXFTextEditorComponent
}

export const AXF_STYLE_GENERAL_PROPERTIES: AXFWidgetProperty[] = [
    AXF_COLOR_PROPERTY,
    AXF_BG_COLOR_PROPERTY,
    AXF_BOX_STYLE_PROPERTY
]