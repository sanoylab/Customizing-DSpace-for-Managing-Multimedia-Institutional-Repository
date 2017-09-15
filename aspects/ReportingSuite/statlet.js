$(document).ready(function() {
    var altval = $('div#aspect_statistics_StatletTransformer_div_showStats a').attr('href');
//    $('div#statistics_StatletTransformer_div_showStats a').attr('href', '#');
    $('div#aspect_statistics_StatletTransformer_div_showStats a').attr('href', altval);
    $('div#aspect_statistics_StatletTransformer_div_showStats a').bind('click', function() {
        try {
            matchHeights(1000);
        } catch(e) {
        }
        var oldval = $(this).html();
        $(this).html($(this).attr('href'));
        $(this).attr('href', oldval);
        if (oldval.indexOf("Show") > -1) {
//            $('div#ds-body').height($('div#ds-body').height()+1000);
            $('div#aspect_statistics_StatletTransformer_div_statswrapper').show("slide", function(){
                $('div[id^=aspect_statistics_StatletTransformer_div_graph]').show("blind", function(){
                    try {
                        matchHeights();
                    } catch(e) {
                    }
                });
                if($('div[id^=aspect_statistics_StatletTransformer_div_graph]').length == 0)
                    try {
                        matchHeights();
                    } catch(e) {
                    }
            });
        }
        else {
//            $('div#ds-body').height($('div#ds-body').height()+1000);
            $('div[id^=aspect_statistics_StatletTransformer_div_graph]').hide("slide", function(){
                $('div#aspect_statistics_StatletTransformer_div_statswrapper').hide("blind", function(){
                    try {
                        matchHeights();
                    } catch(e) {
                    }
                });
            });
            if($('div[id^=aspect_statistics_StatletTransformer_div_graph]').length == 0){
                $('div#aspect_statistics_StatletTransformer_div_statswrapper').hide("blind", function(){
                    try {
                        matchHeights();
                    } catch(e) {
                    }
                });
            }
        }
        return false;
    });

    $('div#aspect_statistics_StatletTransformer_div_showStats img').bind('click', function() {
        $('div#aspect_statistics_StatletTransformer_div_showStats a').click();
        return false;
    });

});
