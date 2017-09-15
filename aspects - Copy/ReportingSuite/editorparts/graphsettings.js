function initgraphsettings() {
    var heightInput = $('input#aspect_statistics_editorparts_GraphSettingsTransformer_field_height');
    var height = heightInput.val() * 1;
    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphExtractor').css('height', (height + 20)  + 'px');

    $('body > #aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings').remove();
    $('body > div[aria-labelledby = ui-dialog-title-aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings]').remove();
    $("fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings").dialog({
        bgiframe: true,
        autoOpen: false,
        width: 280,
        resizable: false,
        title: $(document).data('i18n').SettingsHead,
        modal: false,
        open: function() {
            if($.browser.msie && $.browser.version.substr(0,1)<7) {
                var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                $("fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings").data('hiddenselects', selects);
            }
        },
        close: function() {
            var selects = $("fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings").data('hiddenselects');
            if (selects && selects.length > 0)
                selects.css('visibility', '');
        }
    });


    $('input#aspect_statistics_editorparts_GraphSettingsTransformer_field_height').bind('change', function() {
        var newHeight = $('input#aspect_statistics_editorparts_GraphSettingsTransformer_field_height').val() * 1;
        $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').css('height', newHeight + 'px');
        $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphExtractor').css('height', (newHeight + 20)  + 'px');
    });

    $('fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings input').bind('focus', function(){
        $(this).attr('oldval', $(this).val());
    });

    $('fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings input').bind('blur', function(){
        if ($(this).val() != $(this).attr('oldval'))
            ajaxUpdateGraph();
    });

    $('fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_graphSettings select').bind('change', function(){
            ajaxUpdateGraph();
    });


    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').css('height', $('input#aspect_statistics_editorparts_GraphSettingsTransformer_field_height').val() + 'px');

    //Copy the src to the attribute origsrc for safekeeping
    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph img').attr('origsrc', $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph img').attr('src'));

    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').children(0).ready(function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });


//    refreshGraph();
}


function toggleHiddenPrefs(){
    var hiddenSettings = $('fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings');
    if (hiddenSettings.length > 1)
         $('div[aria-labelledby = ui-dialog-title-aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings]:last').siblings('div[aria-labelledby = ui-dialog-title-aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings]').remove();

    hiddenSettings = $('fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings');
    if (hiddenSettings.dialog('isOpen')) {
        hiddenSettings.dialog('close');
    } else {
        hiddenSettings.dialog('open');
    }
}


function gatherGraphSettings() {
    var result = new Array();
    $('fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_graphSettings, fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings').find('input, select').each(function(){
        if ($(this).attr('type') != 'submit') {
            var o = new Object();
            o.key =  $(this).attr('name');
            o.value = '' + $(this).val();
            result.push(o);
        }
    });
    return result;
}

function refreshGraph(e) {
    //Bevatte enkel deze eerste regel, maar dat werkt niet in IE
        $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph img').attr('src', $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph img').attr('origsrc') + '?e=' + Math.random());

    //Dit werkt wel, maar heeft als nadeel dat uw pagina effe korter wordt en ge dus naarboven scrolt.
    var oldhtml = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').html();
//    oldhtml = oldhtml.replace(' src="' + $('div#statistics_editorparts_GraphSettingsTransformer_div_graph img').attr('origsrc'), ' src="' + $('div#statistics_editorparts_GraphSettingsTransformer_div_graph img').attr('origsrc') + '?e=' + Math.random() + '');
    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').empty();
    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').html(oldhtml);
    $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graph').children(0).ready(function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });
}
