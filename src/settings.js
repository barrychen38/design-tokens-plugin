// Here are the name conventions for getting elements and layers from Sketch
export const mainSketchFile = "design-tokens";
export const tokensPage = "design-tokens";

// If the tokens is in layergroup
export const colorGroupName = "colors";
export const typographyGroupName = "typography";
// export const iconsGroupName = "icons";
export const utilsGroupName = "utils";

// Here is the naming conversion of the symbols on the sketch page
export const colorLayerName = "color/";
export const typographyLayerName = "font/";
// export const iconLayerName = "icon/";
export const utilsLayerName = "utils/";

// utils has many items
export const utilsSpacer = "space";
export const utilsRadius = "radius";
export const utilsShadow = "shadow";
export const utilsBorder = "border";
export const utilsAll = [utilsSpacer, utilsRadius, utilsShadow, utilsBorder];

export const exportFormats = [".json"];
export const componentsPage = "atoms-components";

// Here Specifies the exported folder name
// export const dirnames = ["color", "typography", "icons", "utils"];
export const dirnames = ["colors", "typography", "utils"];
export const themes = [ 'light', 'dark' ]
