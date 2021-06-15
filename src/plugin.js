import sketchDom from "sketch/dom";
import UI from "sketch/ui";
import { sketchExportModal } from "./sketchUi/sketchExportModal";
import { saveFileModal } from "./sketchUi/saveFileModal";

const designSystemExport = () => {
  // Check here if even one file is found and something can be exported
  const desingTokensPage = sketchDom.getSelectedDocument().pages.filter(page => page.name === "design-tokens");
  if (desingTokensPage) {
    const userExportOptions = sketchExportModal();
    saveFileModal(userExportOptions.theme);
  } else {
    UI.alert("Error 🛑", 'No tokens page found!\r\nMake sure that page name is "design-tokens"!');
  }
};

export default designSystemExport;
