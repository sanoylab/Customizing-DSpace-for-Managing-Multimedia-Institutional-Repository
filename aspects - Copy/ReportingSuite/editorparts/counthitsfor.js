function initcounthitsfor() {
//    alert('initcounthitsfor');

    var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
    if (action) {
        action[2] = "gatherCountHitsForData();";
        $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
    }
}

function gatherCountHitsForData() {
    var inputs = $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper input:checked, div#aspect_statistics_editorparts_DataSourceTransformer_div_counthits-wrapper input:checked');
    var result = '';
    jQuery.each(inputs, function(i, val) {
        if (i > 0)
            result += ";";
        result += $(this).val();
    });
    if (result.length > 0)
    {
        var o = new Object();
        o.key = "counthitsfor";
        o.value = result;
        return o;
    }
    else if ($('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper, div#aspect_statistics_editorparts_DataSourceTransformer_div_counthits-wrapper').length > 0)
        throw new Error($(document).data('i18n').BagErrUsage);
    else
        return undefined;
}

function checkAll(element) {
    $(element).parent().parent().find('input[type=checkbox]').attr('checked', 'checked');
    return false;
}

function checkNone(element) {
    $(element).parent().parent().find('input[type=checkbox]').removeAttr('checked');
    return false;
}
