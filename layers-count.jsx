// Count selected layers in Photoshop
function getSelectedLayersCount() {
    var count = 0;
    var ref = new ActionReference();
    ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("targetLayers"));
    ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    try {
        var targetLayers = executeActionGet(ref).getList(stringIDToTypeID("targetLayers"));
        count = targetLayers.count;
    } catch (e) {
        // If no multiple selection, count is 1
        count = 1;
    }
    alert("Selected layers: " + count);
}

getSelectedLayersCount();