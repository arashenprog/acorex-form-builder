import { AXFWidgetProperty } from '../services/widget.service';
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';


export const AXF_VALUE_CHANGE_EVENT: AXFWidgetProperty = {
    name: "onValueChange",
    category: "Behavior",
    defaultValue: null,
    title: "Value Changed",
    editor: "EventEditor",
    order: 10,
    options: {
    }
}

export const AXF_INIT_EVENT: AXFWidgetProperty = {
    name: "onInit",
    category: "Behavior",
    defaultValue: null,
    title: "Init",
    editor: "EventEditor",
    options: {
    },
    order: 1,
}

export const AXF_CLICK_EVENT: AXFWidgetProperty = {
    name: "onClick",
    category: "Behavior",
    defaultValue: null,
    title: "Click",
    editor: "EventEditor",
    options: {
    },
    order: 9,
}



export const AXF_TEXT_PROPERTY: AXFWidgetProperty = {
    name: "text",
    category: "General",
    defaultValue: null,
    title: "Text",
    editor: "TextEditor",
    order: 21,
    options: {
        allowHtml: false
    },

}

export const AXF_VALUE_PROPERTY: AXFWidgetProperty = {
    name: "value",
    category: "General",
    defaultValue: null,
    title: "Value",
    editor: "TextEditor",
    order: 21,
    options: {
        allowHtml: false
    },
    visible: false

}

export const AXF_PLACEHOLDER_PROPERTY: AXFWidgetProperty = {
    name: "placeholder",
    category: "General",
    defaultValue: "Placeholder",
    title: "Placeholder",
    editor: "TextEditor",
    order: 22,
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
    order: 21,
    options: {
        allowHtml: true
    }
}

export const AXF_NAME_PROPERTY: AXFWidgetProperty = {
    name: "name",
    category: "Binding",
    defaultValue: "",
    title: "Name",
    order: 11,
    editor: "TextEditor"
}

export const AXF_VISIBLE_PROPERTY: AXFWidgetProperty = {
    name: "visible",
    category: "General",
    defaultValue: true,
    title: "Visible",
    order: 81,
    editor: "CheckboxEditor"
}

export const AXF_ENABLED_PROPERTY: AXFWidgetProperty = {
    name: "visible",
    category: "General",
    defaultValue: true,
    title: "Visible",
    order: 82,
    editor: "CheckboxEditor"
}
export const AXF_READONLY_PROPERTY: AXFWidgetProperty = {
    name: "visible",
    category: "General",
    defaultValue: false,
    title: "Visible",
    order: 83,
    editor: "CheckboxEditor"
}

export const AXF_CAPTION_PROPERTY: AXFWidgetProperty = {
    name: "caption",
    category: "General",
    defaultValue: "Panel",
    title: "Caption",
    editor: "TextEditor",
    order: 11,
    options: {
        allowHtml: false
    }
}


export const AXF_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "color",
    category: "Style",
    defaultValue: "inherit",
    title: "Color",
    order: 31,
    editor: "ColorEditor"
}

export const AXF_BG_COLOR_PROPERTY: AXFWidgetProperty = {
    name: "bgColor",
    category: "Style",
    defaultValue: "inherit",
    title: "Background Color",
    order: 32,
    editor: "ColorEditor"
}


export const AXF_TEXT_DIRECTION_PROPERTY: AXFWidgetProperty = {
    name: "textDirection",
    category: "Style",
    defaultValue: "inherit",
    title: "Text Direction",
    editor: "SelectionEditor",
    order: 33,
    options: {
        items: [{ value: "inherit", title: "Horizontal" }, { value: "tb", title: "Vertical" }],
        mode: "single",
        direction: "horizontal"
    }
}

export const AXF_TEXT_STYLE_PROPERTY: AXFWidgetProperty = {
    name: "textStyle",
    category: "Style",
    title: "Text Style",
    editor: "SelectionEditor",
    order: 34,
    options: {
        items: [{ value: "bold", title: "Bold" }, { value: "italic", title: "Italic" }, { value: "underline", title: "Underline" }],
        mode: "multiple",
        direction: "horizontal"
    }
}

export const AXF_TEXT_SIZE_PROPERTY: AXFWidgetProperty = {
    name: "fontSize",
    category: "Style",
    defaultValue: "inherit",
    title: "Font Size",
    editor: "DropdownEditor",
    order: 35,
    options: {
        items: [
            { value: "inherit", title: "inherit" },
            { value: "xx-small", title: "xx-small" },
            { value: "x-small", title: "x-small" },
            { value: "smaller", title: "smaller" },
            { value: "small", title: "small" },
            { value: "medium", title: "medium" },
            { value: "large", title: "large" },
            { value: "larger", title: "larger" },
            { value: "x-large", title: "x-large" },
            { value: "xx-large", title: "xx-large" },
        ],
    }
}



export const AXF_HORIZONTAL_ALIGNMENT_PROPERTY: AXFWidgetProperty = {
    name: "textAlign",
    category: "Style",
    defaultValue: "left",
    title: "Horizontal Alignment",
    editor: "SelectionEditor",
    order: 36,
    options: {
        items: [{ value: "left", title: "Left" }, { value: "center", title: "Center" }, { value: "right", title: "Right" }],
        mode: "single",
        direction: "horizontal"
    }
}

export const AXF_VERTICAL_ALIGNMENT_PROPERTY: AXFWidgetProperty = {
    name: "verticalAlign",
    category: "Style",
    defaultValue: "top",
    title: "Vertical Alignment",
    editor: "SelectionEditor",
    order: 37,
    options: {
        items: [{ value: "top", title: "Top" }, { value: "middle", title: "Middle" }, { value: "bottom", title: "Bottom" }],
        mode: "single",
        direction: "horizontal"
    }
}

export const AXF_BOX_STYLE_PROPERTY: AXFWidgetProperty = {
    name: "boxStyle",
    category: "Style",
    defaultValue: new AXFBoxStyleValue(),
    title: "Box Style",
    order: 39,
    editor: "BoxStyleEditor"
}


export const AXF_DS_LIST_PROPERTY: AXFWidgetProperty = {
    name: "dataSource",
    category: "Data",
    defaultValue: null,
    title: "Data Source",
    editor: "DataSourceEditor"
}
export const AXF_ITEM_DATASOURCE_PROPERTY: AXFWidgetProperty = {
    name: "dataSource",
    category: "Data",
    title: "Data Source",
    editor: "DataSourceEditor",
    defaultValue: {

        mode: "manual",
        dataSource: {},
        columns: [
            {
                fieldName: "value",
                title: "Value Field",
                type: "string",
                fillByUser: false,
            },
            {
                fieldName: "text",
                title: "Text Field",
                type: "string",
                fillByUser: false,
            },
            {
                fieldName: "image",
                title: "Image Field",
                type: "image",
                fillByUser: false,
            }
        ],
        dataItems: [
            {
                value: "1",
                text: "Item 1",
            },
            {
                value: "2",
                text: "Item 2",
            },
            {
                value: "3",
                text: "Item 3",
            }
        ]
    },
    options: {
        allowColumns: false
    }
}



export const AXF_LABEL_PROPERTY: AXFWidgetProperty = {
    name: "label",
    category: "General",
    defaultValue: "",
    order: 11,
    title: "Label",
    editor: "TextEditor"
}




export const AXF_STYLE_GENERAL_PROPERTIES: AXFWidgetProperty[] = [
    AXF_COLOR_PROPERTY,
    AXF_BG_COLOR_PROPERTY,
    AXF_TEXT_SIZE_PROPERTY,
    AXF_TEXT_STYLE_PROPERTY,

    AXF_BOX_STYLE_PROPERTY,
]