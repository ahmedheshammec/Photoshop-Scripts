// Check if there are any documents open
if (app.documents.length > 0) {
    // Function to convert selected layers to Smart Objects
    function convertToSmartObject() {
        try {
            var doc = app.activeDocument;
            var selectedLayers = getSelectedLayersIdx();
            
            if (selectedLayers.length > 0) {
                // Loop through selected layers
                for (var i = 0; i < selectedLayers.length; i++) {
                    selectLayerByIndex(selectedLayers[i]);
                    // Convert current layer to Smart Object
                    app.executeAction(stringIDToTypeID("newPlacedLayer"), undefined, DialogModes.NO);
                }
                
                // Reselect original layers
                for (var i = 0; i < selectedLayers.length; i++) {
                    makeActiveByIndex(selectedLayers[i], (i == 0));
                }
                
                alert("Selected layers have been converted to Smart Objects!");
            } else {
                alert("Please select at least one layer first!");
            }
        } catch (e) {
            alert("Error: " + e.message);
        }
    }
    
    // Helper function to get indices of selected layers
    function getSelectedLayersIdx() {
        var selectedLayers = new Array;
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desc = executeActionGet(ref);
        if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
            desc = desc.getList(stringIDToTypeID("targetLayers"));
            for (var i = 0; i < desc.count; i++) {
                selectedLayers.push(desc.getReference(i).getIndex());
            }
        }
        return selectedLayers;
    }
    
    // Helper function to select layer by index
    function selectLayerByIndex(index) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), index + 1);
        desc.putReference(charIDToTypeID("null"), ref);
        desc.putBoolean(charIDToTypeID("MkVs"), false);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    }
    
    // Helper function to make layer active by index
    function makeActiveByIndex(index, first) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), index + 1);
        desc.putReference(charIDToTypeID("null"), ref);
        if (!first) desc.putEnumerated(stringIDToTypeID("selectionModifier"), 
            stringIDToTypeID("selectionModifierType"), 
            stringIDToTypeID("addToSelection"));
        desc.putBoolean(charIDToTypeID("MkVs"), false);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    }
    
    // Run the function
    convertToSmartObject();
} else {
    alert("Please open a document first!");
}