import { map } from "lodash";
import { tokensPage, colorGroupName, colorLayerName } from "../settings";
const sketchDomSelected = require("sketch/dom").getSelectedDocument();
const [tokenPage] = sketchDomSelected.pages.filter(page => page.name.includes(tokensPage));

let getColorFills;

if (tokenPage) {
  const [{ layers }] = tokenPage.layers;
  const colorGroups = layers.filter(layer => layer.name.includes(colorGroupName));
  const groupLayers = map(colorGroups, "layers")
    .flat()
    .filter(item => item.name.includes(colorLayerName));
  getColorFills = groupLayers.map(({ name, sharedStyleId }) => {
    return {
      name: name.split("/")[1],
      color: sketchDomSelected.getSharedLayerStyleWithID(sharedStyleId).style.fills.map(fill => fill.color)[0],
      sharedStyle: sketchDomSelected.getSharedLayerStyleWithID(sharedStyleId),
      tokenType: "color"
    };
  });
}
export default getColorFills;
