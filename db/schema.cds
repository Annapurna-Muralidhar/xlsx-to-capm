namespace com.satinfotech.railwaytask;
using {cuid} from '@sap/cds/common';

entity Railway : cuid {
    key ID : UUID;
    pnr_no : String(10);
    trn:String(6);
    from_add:String(40);
    to_add:String(40);
    berth_selected:String(30);
    doj:Date;
    class:String(30);
    Passenger:Composition of many Passenger on Passenger.pid=$self;

    
}
entity Passenger : cuid {
                key ID    : UUID;

                    @title: 'Product ID'
                    pid   : Association to one Railway;

                    name          : String(100);

                    add:String(1000);
                    
              }