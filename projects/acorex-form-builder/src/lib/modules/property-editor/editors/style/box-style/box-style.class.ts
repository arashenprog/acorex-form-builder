export class AXFBoxStyleValue {
    padding: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();
    border: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
    margin: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
}

export class AXFBoxStyleBoxSizeValue {
    left: number = 0;
    right: number = 0;
    top: number = 0;
    bottom: number = 0;
}