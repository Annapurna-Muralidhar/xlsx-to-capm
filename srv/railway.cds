using { com.satinfotech.railwaytask as my } from '../db/schema';

service RailwayService {
  entity Railway as projection on my.Railway;
}
annotate RailwayService.Railway with  @odata.draft.enabled ;

annotate RailwayService.Railway with @(

     UI.LineItem           : [
        {
            Label: 'PNR Number',
            Value: pnr_no
        },
        {
            Label: 'Train number',
            Value: trn
        },
        {
            Label: 'From Address',
            Value: from_add
        },
        {
            Label: 'To Address',
            Value: to_add
        },
        {
            Label: 'Selected Berth',
            Value: berth_selected
        },
        {
            Label: 'Date of Journey',
            Value: doj
        },
        {
            Label: 'Selected Class',
            Value: class
        },
    ],
    UI.FieldGroup #railway: {
        $Type: 'UI.FieldGroupType',
        Data : [
         {
            Label: 'PNR Number',
            Value: pnr_no
        },
        {
            Label: 'Train number',
            Value: trn
        },
        {
            Label: 'From Address',
            Value: from_add
        },
        {
            Label: 'To Address',
            Value: to_add
        },
        {
            Label: 'Selected Berth',
            Value: berth_selected
        },
        {
            Label: 'Date of Journey',
            Value: doj
        },
        {
            Label: 'Selected Class',
            Value: class
        }
        ],
    },

    UI.Facets             : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'railwayFacet',
        Label : 'railway facets',
        Target: '@UI.FieldGroup#railway'
    } ]

);


