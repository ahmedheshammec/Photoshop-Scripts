// This Script Lists All Layer Names and then Asks the User where He Wants to Save the TXT file. 
function getAllLayerNames(doc, layerNames) {
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        if (layer.typename === "ArtLayer") {
            layerNames.push(layer.name);
        } else if (layer.typename === "LayerSet") {
            layerNames.push(layer.name);
            getAllLayerNames(layer, layerNames); // Recursively get layers inside groups
        }
    }
}

if (app.documents.length > 0) {
    var doc = app.activeDocument;
    var layerNames = [];

    getAllLayerNames(doc, layerNames);

    if (layerNames.length > 0) {
        var saveFile = File.saveDialog("Save layer names as...", "Text file:*.txt");
        if (saveFile) {
            saveFile.encoding = "UTF8";
            saveFile.open('w');
            saveFile.writeln(layerNames.join('\n'));
            saveFile.close();
            alert("Layer names saved successfully!");
        } else {
            alert("Save cancelled.");
        }
    } else {
        alert("No layers found in the document.");
    }
} else {
    alert("No document is open.");
}