function initgraph() {
    $('div#aspect_statistics_editorparts_GraphTransformer_div_graph').css('height', $('input#aspect_statistics_editorparts_GraphSettingsTransformer_field_height').val() + 'px');

    //Copy the src to the attribute origsrc for safekeeping
    $('div#aspect_statistics_editorparts_GraphTransformer_div_graph img').attr('origsrc', $('div#aspect_statistics_editorparts_GraphTransformer_div_graph img').attr('src'));

    $('div#aspect_statistics_editorparts_GraphTransformer_div_graph').children(0).ready(function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });

}

function refreshGraph(e) {
    //Bevatte enkel deze eerste regel, maar dat werkt niet in IE
        $('div#aspect_statistics_editorparts_GraphTransformer_div_graph img').attr('src', $('div#aspect_statistics_editorparts_GraphTransformer_div_graph img').attr('origsrc') + '?e=' + Math.random());

    //Dit werkt wel, maar heeft als nadeel dat uw pagina effe korter wordt en ge dus naarboven scrolt.
    var oldhtml = $('div#aspect_statistics_editorparts_GraphTransformer_div_graph').html();
//    oldhtml = oldhtml.replace(' src="' + $('div#statistics_editorparts_GraphTransformer_div_graph img').attr('origsrc'), ' src="' + $('div#statistics_editorparts_GraphTransformer_div_graph img').attr('origsrc') + '?e=' + Math.random() + '');
    $('div#aspect_statistics_editorparts_GraphTransformer_div_graph').empty();
    $('div#aspect_statistics_editorparts_GraphTransformer_div_graph').html(oldhtml);
    $('div#aspect_statistics_editorparts_GraphTransformer_div_graph').children(0).ready(function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });
}
