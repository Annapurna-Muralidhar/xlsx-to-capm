sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/satinfotech/railwaytask/project1/test/integration/FirstJourney',
		'com/satinfotech/railwaytask/project1/test/integration/pages/RailwayList',
		'com/satinfotech/railwaytask/project1/test/integration/pages/RailwayObjectPage',
		'com/satinfotech/railwaytask/project1/test/integration/pages/PassengerObjectPage'
    ],
    function(JourneyRunner, opaJourney, RailwayList, RailwayObjectPage, PassengerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/satinfotech/railwaytask/project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRailwayList: RailwayList,
					onTheRailwayObjectPage: RailwayObjectPage,
					onThePassengerObjectPage: PassengerObjectPage
                }
            },
            opaJourney.run
        );
    }
);