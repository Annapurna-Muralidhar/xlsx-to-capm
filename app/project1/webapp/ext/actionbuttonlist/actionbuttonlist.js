sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        importdatalist: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
