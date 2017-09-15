function inittopn(){
    var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
    if (action) {
        action[1] = "gatherN();";
        $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
    }
}

function gatherN(){
    var input = $('input#aspect_statistics_editorparts_TopNTransformer_field_n');
    if (input.length > 0)
    {
        var o = new Object();
        o.key = "n";
        o.value = input.val();
        return o;
    }
    else
        return undefined;
}