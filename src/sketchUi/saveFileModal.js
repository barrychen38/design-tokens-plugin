import { saveContentToFile } from "../saveContentToFile";
import { exportFormats } from '../settings'
import UI from "sketch/ui";

const save = async (directoryPath, theme) => {
  const writeFile = await saveContentToFile(directoryPath, theme).catch(err => console.log("Error saving to file", err));

  if (writeFile === "success") {
    UI.alert("Export complete. 👍🏻", "Tokens were successfully exported.");
  } else {
    UI.alert("Export failed! 🛑", "Something went wrong.");
  }
};

export const saveFileModal = theme => {
  const savePanel = NSSavePanel.savePanel();
  savePanel.setShowsTagField(false)
  savePanel.setNameFieldLabel('Json file:')
  savePanel.setNameFieldStringValue('Just ignore this');
  savePanel.setPrompt("Save Tokens");
  const resultSaveDialog = savePanel.runModal();

  if (resultSaveDialog == NSFileHandlingPanelOKButton) {
    const directoryPath = savePanel
      .URL()
      .path()
      .replace(exportFormats[0], ""); // remove file to get only directory
    try {
      save(directoryPath, theme);
    } catch (err) {
      UI.alert(`Something went wrong - ${err}.`);
    }
  }
};
