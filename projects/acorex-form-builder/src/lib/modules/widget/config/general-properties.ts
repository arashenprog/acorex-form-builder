import { AXFTextEditorComponent } from '../../property-editor/editors/text/text.editor';
import { AXFWidgetProperty } from '../services/widget.service';

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
    defaultValue: "#fff",
    title: "Color",
    editor: AXFTextEditorComponent
}

export const AXF_BG_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "bgColor",
    category: "Style",
    defaultValue: "#000",
    title: "Background Color",
    editor: AXFTextEditorComponent
}