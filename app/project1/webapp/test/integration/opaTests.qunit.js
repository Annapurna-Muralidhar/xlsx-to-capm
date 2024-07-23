sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/RailwayList',
		'project1/test/integration/pages/RailwayObjectPage'
    ],
    function(JourneyRunner, opaJourney, RailwayList, RailwayObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRailwayList: RailwayList,
					onTheRailwayObjectPage: RailwayObjectPage
                }
            },
            opaJourney.run
        );
    }
);