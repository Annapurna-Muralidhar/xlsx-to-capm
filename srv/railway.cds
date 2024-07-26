using { com.satinfotech.railwaytask as my } from '../db/schema';

service RailwayService {
  entity Railway as projection on my.Railway;
  entity Passenger as projection on my.Passenger;
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
    },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'passengerFacet',
            Label: 'Passenger Customer',
            Target:'Passenger/@UI.LineItem',
            
        }
 ]

);

annotate RailwayService.Passenger with @(
    UI.LineItem:[
       
        {
            Label: 'PNR Number',
            Value: pid.pnr_no

        },
         {
            Label: 'Passenger Name',
            Value: name
        },
        {
            Label: 'Passenger Address',
            Value: add
        },
        
        
      
      
    ],
    UI.FieldGroup #customer : {
        $Type : 'UI.FieldGroupType',
        Data : [
        
        {
            Label: 'PNR Number',
            Value: pid.pnr_no
        },
         {
            Label: 'Passenger Name',
            Value: name
        },
        {
            Label: 'Passenger Address',
            Value: add
        },
         
       
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ItemsFacet',
            Label : 'Items',
            Target : '@UI.FieldGroup#customer',
        },
    ],
);


