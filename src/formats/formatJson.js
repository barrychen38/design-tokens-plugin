import { tokensPage } from "../settings";
import getColorFills from "../getSketchData/getColorFills";
import getTypography from "../getSketchData/getTypographyFonts";
// import getSvgPaths from "../getSketchData/getSvgPaths";
import getUtils from "../getSketchData/getUtils";

const sketchDomSelected = require("sketch/dom").getSelectedDocument();
const [tokenPage] = sketchDomSelected.pages.filter(page => page.name.includes(tokensPage));

const fromPairs = (pairs, dest = {}) => {
  pairs.forEach(([key, value]) => {
    dest[key] = value;
  });
  return dest;
};

const jsonData = {};

export const color = () => {
  if (tokenPage) {
    const arrayToObject = array =>
      array.reduce(
        (obj, item) => ({
          ...obj,
          [`color-${item.name}`]: {
            // hex: item.color.slice(0, -2),
            value: item.color.slice(0, -2),
            // rgba: item.rgba,
            type: "color"
          }
        }),
        {}
      );
    // Gives the name of the category
    jsonData.color = arrayToObject(getColorFills);
  }

  const rawData = fromPairs(Object.entries(jsonData.color));
  const colorData = JSON.stringify({ props: rawData, global: { category: 'colors' } }, null, 4);
  return colorData;
};

export const typography = () => {
  if (tokenPage) {
    const arrayToObject = array =>
      array.reduce(
        (obj, item) => ({
          ...obj,
          [item.name]: {
            value: [ item.fontSize, item.lineHeight ],
            // "font-family": { value: item.fontFamily },
            // "font-size": { value: item.fontSize },
            // weight: { value: item.fontWeight },
            // "letter-spacing": { value: item.letterSpacing },
            // "line-height": { value: item.lineHeight },
            type: 'font',
          }
        }),
        {}
      );
    // Gives the name of the category
    jsonData.typography = arrayToObject(getTypography);
    const rawData = fromPairs(Object.entries(jsonData.typography));
    const typographyData = JSON.stringify({ props: rawData, global: { category: 'typography' } }, null, 4);
    return typographyData;
  }
};

// export const icons = () => {
//   if (tokenPage) {
//     const arrayToObject = array =>
//       array.reduce(
//         (obj, item) => ({
//           ...obj,
//           [item.name]: {
//             value: item.svgCodeSting,
//             type: "icon"
//           }
//         }),
//         {}
//       );
//     // Gives the name of the category
//     jsonData.svg = arrayToObject(getSvgPaths);
//     const rawData = fromPairs(Object.entries(jsonData.svg));
//     const iconsData = JSON.stringify({ icon: rawData }, null, 4);
//     return iconsData;
//   }
// };

const getV = (v) => {
  if (v !== undefined && v !== null) {
    return v
  }
  return undefined
}
export const utils = () => {
  const arrayToObject = array =>
    array.reduce(
      (obj, item) => {
        const space = getV(item.height)
        const radius = getV(item.radius)
        const shadow = getV(item.shadowItem)
        const border = getV(item.border)
        const prop = {
          [item.name]: {
            value: space || radius || shadow || border || undefined,
            // space: item.height ? item.height : undefined,
            // radius: item.radius ? item.radius[0] : undefined,
            // shadows: item.shadowItem ? [item.shadowItem] : undefined,
            // border: item.border ? [item.border] : undefined,
            /*
                      "shadow": (item.shadow ? {
                          color: (item.shadowColor ? item.shadowColor : undefined),
                          x: (item.shadowX ? item.shadowX : undefined),
                          y: (item.shadowY ? item.shadowY : undefined),
                          blur: (item.shadowBlur ? item.shadowBlur : undefined),
                          spread: (item.shadowSpread ? item.shadowSpread : undefined),
                      }: undefined),
                      */
          },
        }
        let type = null
        if (space) {
          type = 'space'
        }
        if (radius) {
          type = 'radius'
        }
        if (border) {
          type = 'border'
        }
        if (shadow) {
          type = 'shadow'
        }
        prop[item.name].type = type
        return { ...obj, ...prop }
      },
      {}
    );
  // Gives the name of the category

  jsonData.utils = arrayToObject(getUtils);
  const rawData = fromPairs(Object.entries(jsonData.utils));
  const utilsData = JSON.stringify({ props: rawData, global: { category: 'utils' } }, null, 4);
  return utilsData;
};
