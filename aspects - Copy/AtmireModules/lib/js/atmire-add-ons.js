

// jQuery code for the help buttons used in the modules.

$(document).ready(function(){
    //init helpbuttons
    initHelpButton();
//    setTimeout('matchHeights()', 100);
});


//var clear="images/clear.gif" //path to clear.gif


function initHelpButton() {
    var helpButton = $('img.foldableHelpButton');
    if (helpButton.length>0) {
        helpButton.bind('click', function(){
            var status = helpButton.data('status');
            if (!status)
                status = 'closed';
            if (status == 'open') {
                $('div.foldableHelp').slideUp("fast", function() {
                    helpButton.data('status', 'closed');
                    try {
                        matchHeights();
                    } catch(e) {
                    }
                });
            }
            else {
                $('div.foldableHelp').slideDown("fast", function() {
                    helpButton.data('status', 'open');
                    try {
                        matchHeights();
                    } catch(e) {
                    }
                });
            }
//            $('div.foldableHelp').each(function (i) { slideToggle("fast"); });
        });
    }

}

function matchHeights(){
    //Bogus function just to keep everything happy
}