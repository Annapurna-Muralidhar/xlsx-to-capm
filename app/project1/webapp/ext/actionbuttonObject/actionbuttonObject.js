sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        importdata: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
