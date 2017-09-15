function initCommCollLists(id){
//    alert('initCommCollLists');
    var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
    if (action) {
        action[1] = "gatherScope();";
        $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
    }

    var checkedButton = $('input[name="scope"]:checked');
    var selectedValue = checkedButton.val();
    var mainlist = $('ul#' + id);
    mainlist.attr('style', 'margin-top:0px; padding-left:0px;margin-left:5px;');
    $('ul#aspect_metadataquality_QualityAssurance_list_firstList').attr('style', 'margin-bottom:0px;');
    var ulArr = $('ul#' + id + ' ul');
    for(var i = 0; i < ulArr.length; i++){
        var current = $(ulArr.get(i));
//        current.find(':checkbox').hide

        var label = current.prev().find("label");
        var input = label.find("input");
        if (input.length > 0) {
            if (label.parent().attr('class').indexOf('uncheckable') < 0) {
                input.insertBefore(label);
            }
            else {
                input.remove();
            }
        }
        var lbltext = $.trim(label.attr('innerHTML'));
        label.attr('innerHTML', '');
        label.append('<a href="" onclick="return false;"><img src="' + getContextPath() + '/themes/ReportingSuite/images/arrowonlyleft.png" style="vertical-align:middle; display: inline; padding-right:3px; padding-bottom:3px;"/>' + lbltext + '</a>');
        label.attr('target', 'ul#' + current.attr('id'));
        current.hide();
        label.bind('click', function(){
//                $($(this).attr('target')).slideToggle("fast"); //Werkt niet in IE
            var list = $($(this).attr('target'));
            if(list.is(':visible')){
                list.hide();
                $(this).find('img').attr('src', getContextPath() + '/themes/ReportingSuite/images/arrowonlyleft.png');
            }
            else {
                list.show();
                $(this).find('img').attr('src', getContextPath() + '/themes/ReportingSuite/images/arrowonlydown.png');
            }
            try {
                matchHeights();
            } catch(e) {
            }
        });
    }
//    if(selectedValue == undefined || selectedValue == 'all')
//        mainlist.hide();
//    else {
        //doorloop alle 'ul's die ancestor zijn van het geselecteerde element en 'click' erop, zodat ze openklappen
        ulArr = checkedButton.parents('ul');
        for(var i = 0; i < ulArr.length; i++){
            var current = $(ulArr.get(i));
            //Als de bovenste (relevante) 'ul' bereikt is mag de lus beindigd worden
            if (current.attr('id') == id)
                break;
            current.prev().find('label').click();
        }

        //door de clicks in de for lus hierboven wordt in IE het verkeerde element geselecteerd, dus selecteer terug het juiste
        checkedButton.attr('checked', 'true');
//        $('p#aspect_metadataquality_QualityAssurance_p_openTreePara').hide();
//    }
}

function gatherScope() {
    var inputs = $('div#aspect_statistics_editorparts_ContentTreeTransformer_div_treecontentdiv input:checked');
    var result = '';
    jQuery.each(inputs, function(i, val) {
        if (i > 0)
            result += ";";
        result += $(this).val();
    });
    if (result.length > 0){
        var o = new Object();
        o.key = "scope";
        o.value = result;
        return o;
    }
    else
        return undefined;
}
