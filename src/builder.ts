import { Theme, ThemeColorNames, shades } from "./themes";
import Color from "@talesoft/color";

export class ThemeBuilder<TComponents extends {} = {}> {
    private theme: Theme<TComponents>;

    constructor(baseTheme: Theme<TComponents>) {
        this.theme = baseTheme;
    }

    public color(name: ThemeColorNames, color: Color) {
        this.theme = {
            ...this.theme,
            colors: {
                ...this.theme.colors,
                [name]: shades(color),
            },
        };
        return this;
    }

    public colors(colors: { [K in ThemeColorNames]?: Color; }) {
        this.theme = {
            ...this.theme,
            colors: {
                ...this.theme.colors,
                ...(Object.entries(colors).reduce((result, [name, color]) => {
                    result[name] = shades(color as Color);
                    return result;
                }, {} as any)),
            },
        };
        return this;
    }

    public primaryColor(color: Color) {
        return this.color('primary', color);
    }

    public secondaryColor(color: Color) {
        return this.color('secondary', color);
    }

    public tertiaryColor(color: Color) {
        return this.color('tertiary', color);
    }

    public quartenaryColor(color: Color) {
        return this.color('quartenary', color);
    }

    public infoColor(color: Color) {
        return this.color('info', color);
    }

    public successColor(color: Color) {
        return this.color('success', color);
    }

    public warningColor(color: Color) {
        return this.color('warning', color);
    }

    public dangerColor(color: Color) {
        return this.color('danger', color);
    }

    public grayColor(color: Color) {
        return this.color('gray', color);
    }

    public darkColor(color: Color) {
        return this.color('dark', color);
    }

    public lightColor(color: Color) {
        return this.color('light', color);
    }

    public complement() {
        return this.colors(this.theme.colors.primary.normal.complements);
    }

    public complementAnalogous() {
        return this.colors(this.theme.colors.primary.normal.analogousComplements);
    }

    public complementSplit() {
        return this.colors(this.theme.colors.primary.normal.splitComplements);
    }

    public complementTriadic() {
        return this.colors(this.theme.colors.primary.normal.triadicComplements);
    }

    public complementSquare() {
        return this.colors(this.theme.colors.primary.normal.squareComplements);
    }

    public complementTetradic() {
        return this.colors(this.theme.colors.primary.normal.tetradicComplements);
    }

    public font(family: string, size: string = '14px', lineHeight: string = '120%') {
        this.theme = {
            ...this.theme,
            font: {
                ...this.theme.font,
                family,
                size,
                lineHeight
            },
        };
        return this;
    }
}