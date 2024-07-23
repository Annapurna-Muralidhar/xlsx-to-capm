namespace com.satinfotech.railwaytask;
using {managed} from '@sap/cds/common';

entity Railway : managed {
    key ID : UUID;
    pnr_no : String(10);
    trn:String(6);
    from_add:String(40);
    to_add:String(40);
    berth_selected:String(30);
    doj:Date;
    class:String(30);

    
}