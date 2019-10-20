import Color, { Scheme, lighten, dye } from '@talesoft/color';

const { floor } = Math;

export const themeColorShades = [
    'darkest',
    'veryVeryDark',
    'veryDark',
    'darker',
    'dark',
    'normal',
    'light',
    'veryLight',
    'veryVeryLight',
    'lightest',
] as const;

export const themeColorNames = [
    'primary',
    'secondary',
    'tertiary',
    'quartenary',
    'gray',
    'info',
    'success',
    'warning',
    'danger',
    'dark',
    'light',
] as const;

export type ThemeValue = Color | string | number;
export type ThemeColorNames = typeof themeColorNames[number];
export type ThemeColorShades = typeof themeColorShades[number];
export type ThemeColorList = { [K in ThemeColorNames]: Scheme<ThemeColorShades> };
export type ThemeComponentList<TComponents extends {}> = { [K in keyof TComponents]: TComponents[K]; };
export type ThemeColorProps = {
    color: Color;
    backgroundColor: Color;
}
export type ThemeFontProps = {
    family: string;
    size: string;
    lineHeight: string;
}

export interface Theme<TComponents extends {} = {}> extends ThemeColorProps {
    colors: ThemeColorList;
    font: ThemeFontProps;
    components: ThemeComponentList<TComponents>;
}

export function shades(color: Color, step: number = .1) {
    const colorObj = color instanceof Color ? color : Color.parse(color);
    const half = floor(themeColorShades.length / 2);
    return colorObj.createScheme(themeColorShades, lighten, { start: half * -step, step });
}

export function colors(color: Color, backgroundColor: Color) {
    return { color, backgroundColor };
}

export function font(family: string, size: string, lineHeight: string) {
    return { family, size, lineHeight };
}

const defaultPrimaryColor = Color.alizarinCrimson;
const { primary, secondary, tertiary, quartenary } = defaultPrimaryColor.tetradicComplements;
export const defaultTheme: Theme = {
    colors: {
        primary: shades(primary),
        secondary: shades(secondary),
        tertiary: shades(tertiary),
        quartenary: shades(quartenary),
        gray: shades(Color.gray),
        info: shades(Color.cornflowerBlue),
        success: shades(Color.islamicGreen),
        warning: shades(Color.cyberYellow),
        danger: shades(Color.carmineRed),
        dark: shades(Color.darkGray),
        light: shades(Color.lightGray),
    },
    ...colors(dye`#efefef`, dye`#333`),
    font: font('Arial', '14px', '120%'),
    components: {},
}
