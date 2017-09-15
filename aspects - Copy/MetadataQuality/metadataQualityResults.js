$(document).ready(function(){
    $('div[id*="aspect_metadataquality_Results_div_long_item_"]').hide();
    $("a[href $= '?show=full']").attr('target', '_blank');
});

function toggleTable(id) {
    $('div#' + id).slideToggle("fast");
}