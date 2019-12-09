import { AXFWidgetProperty } from '../services/widget.service';
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';


export const AXF_VALUE_CHANGE_EVENT: AXFWidgetProperty = {
    name: "onValueChange",
    category: "Behavior",
    defaultValue: null,
    title: "Value Changed",
    editor: "EventEditor",
    options: {
    }
}

export const AXF_CLICK_EVENT: AXFWidgetProperty = {
    name: "onClick",
    category: "Behavior",
    defaultValue: null,
    title: "Click",
    editor: "EventEditor",
    options: {
    }
}


export const AXF_TEXT_PROPERTY: AXFWidgetProperty = {
    name: "text",
    category: "General",
    defaultValue: null,
    title: "Text",
    editor: "TextEditor",
    options: {
        allowHtml: false
    }
} 

export const AXF_RICH_TEXT_PROPERTY: AXFWidgetProperty = {
    name: "text",
    category: "General",
    defaultValue: null,
    title: "Text",
    editor: "TextEditor",
    options: {
        allowHtml: true
    }
} 

export const AXF_NAME_PROPERTY: AXFWidgetProperty = {
    name: "name",
    category: "Data",
    defaultValue: "",
    title: "Name",
    editor: "TextEditor"
}

export const AXF_CAPTION_PROPERTY: AXFWidgetProperty = {
    name: "caption",
    category: "General",
    defaultValue: "Panel",
    title: "Caption",
    editor: "TextEditor",
    options: {
        allowHtml: false
    }
}


export const AXF_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "color",
    category: "Style",
    defaultValue: "#000000",
    title: "Color",
    editor: "ColorEditor"
}

export const AXF_BG_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "bgColor",
    category: "Style",
    defaultValue: "#ffffff",
    title: "Background Color",
    editor: "ColorEditor"
}


export const AXF_TEXT_DIRECTION_PROPERTY: AXFWidgetProperty = {
    name: "textDirection",
    category: "Style",
    defaultValue: ["inherit"],
    title: "Text Direction",
    editor: "SelectionEditor",
    options: {
        items: [{ value: "inherit", title: "Horizontal" }, { value: "tb", title: "Vertical" }],
        mode: "single",
        direction: "horizontal"
    }
}

export const AXF_TEXT_STYLE_PROPERTY: AXFWidgetProperty = {
    name: "textStyle",
    category: "Style",
    defaultValue: [],
    title: "Text Style",
    editor: "SelectionEditor",
    options: {
        items: [{ value: "bold", title: "Bold" }, { value: "italic", title: "Italic" }, { value: "underline", title: "Underline" }],
        mode: "multiple",
        direction: "horizontal"
    }
}

export const AXF_TEXT_SIZE_PROPERTY: AXFWidgetProperty = {
    name: "fontSize",
    category: "Style",
    defaultValue:"inherit",
    title: "Font Size",
    editor: "DropdownEditor",
    options: {
        items: [
            {value:"inherit",title:"inherit"},
            {value:"xx-small",title:"xx-small"},
            {value:"x-small",title:"x-small"},
            {value:"smaller",title:"smaller"},
            {value:"small",title:"small"},
            {value:"medium",title:"medium"},
            {value:"large",title:"large"},
            {value:"larger",title:"larger"},
            {value:"x-large",title:"x-large"},
            {value:"xx-large",title:"xx-large"},
        ],
    }
}



export const AXF_HORIZONTAL_ALIGNMENT_PROPERTY: AXFWidgetProperty = {
    name: "textAlign",
    category: "Style",
    defaultValue: ["left"],
    title: "Horizontal Alignment",
    editor: "SelectionEditor",
    options: {
        items: [{ value: "left", title: "Left" }, { value: "center", title: "Center" }, { value: "right", title: "Right" }],
        mode: "single",
        direction: "horizontal"
    }
}

export const AXF_VERTICAL_ALIGNMENT_PROPERTY: AXFWidgetProperty = {
    name: "verticalAlign",
    category: "Style",
    defaultValue: ["top"],
    title: "Vertical Alignment",
    editor: "SelectionEditor",
    options: {
        items: [{ value: "top", title: "Top" }, { value: "middle", title: "Middle" }, { value: "bottom", title: "Bottom" }],
        mode: "single",
        direction: "horizontal"
    }
}

export const AXF_DS_PROPERTY: AXFWidgetProperty = {
    name: "ds-name",
    category: "Data",
    defaultValue: null,
    title: "List",
    editor: "DropdownEditor",
    options: {
        dataSource:"ds-list"
    }
}






export const AXF_BOX_STYLE_PROPERTY: AXFWidgetProperty = {
    name: "boxStyle",
    category: "Style",
    defaultValue: new AXFBoxStyleValue(),
    title: "Box Style",
    editor: "BoxStyleEditor"
}

export const AXF_LABEL_PROPERTY: AXFWidgetProperty = {
    name: "label",
    category: "General",
    defaultValue: "",
    title: "Label",
    editor: "TextEditor"
}




export const AXF_STYLE_GENERAL_PROPERTIES: AXFWidgetProperty[] = [
    AXF_COLOR_PROPERTY,
    AXF_BG_COLOR_PROPERTY,
    AXF_TEXT_SIZE_PROPERTY,
    AXF_TEXT_STYLE_PROPERTY,
    AXF_TEXT_DIRECTION_PROPERTY,
    AXF_HORIZONTAL_ALIGNMENT_PROPERTY,
    AXF_VERTICAL_ALIGNMENT_PROPERTY,
    AXF_BOX_STYLE_PROPERTY,
]