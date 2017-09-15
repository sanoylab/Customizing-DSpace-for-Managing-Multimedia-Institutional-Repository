function initdatatable() {

    $('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv :header').click(function() {
        $('div#aspect_statistics_editorparts_DataTableTransformer_div_dataTable').slideToggle('fast');
    });

    //Add Position attributes, used for selecting cells
    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.ds-table-cell').each(function(){
        var id = $(this).attr('id');
        id = id.substring(id.lastIndexOf("_") + 1);
        $(this).attr('posx', id.substring(0, id.indexOf("-")));
        $(this).attr('posy', id.substring(id.indexOf("-") + 1));
    });

    //TODO probably not the best solution, but it'll work for now
    $('input#aspect_statistics_editorparts_DataTableTransformer_field_csv').bind('mouseover', function(){
        var oldaction = $('form#aspect_statistics_editorparts_DataTableTransformer_div_wrapper').attr('action');
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('a#aspect_statistics_editorparts_DataTableTransformer_field_csv_a').bind('mouseover', function(){
        var oldaction = $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('input#aspect_statistics_editorparts_DataTableTransformer_field_csv').bind('mouseout', function(){
        var oldaction = $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('a#aspect_statistics_editorparts_DataTableTransformer_field_csv_a').bind('mouseout', function(){
        var oldaction = $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('a#aspect_statistics_editorparts_DataTableTransformer_field_csv_a').bind('click', function(){
        packageTable();
        $('form#aspect_statistics_GraphEditor_div_wrapper')[0].submit();
    });

    $('input#aspect_statistics_editorparts_DataTableTransformer_field_csv').bind('click', function(){
        packageTable();
        $('form#aspect_statistics_GraphEditor_div_wrapper')[0].submit();
    });

    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable tr.ds-table-row:gt(2)').find('img').each(function(){
        var bgcolor = $(this).css('background-color');
        var lighterHexColor = lightenColor(bgcolor, 0.2);
        var posx = $(this).attr('id');
        posx = posx.substring(posx.lastIndexOf("_") + 1);
        posx = posx.substring(0, posx.indexOf("-"));
        $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.datacell[posx = "' + posx + '"]').each(function(){
            $(this).css('background-color', lighterHexColor);
            $(this).css('border', '2px solid ' + lighterHexColor);
        });
    });

    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.ds-table-cell').bind('change', function(){
//        if ($(this).html() != $(this).attr('oldval'))
            ajaxUpdateGraph($(this));
    });

    //TODO Meerdere rijen en kolommen selecteren door te draggen
    //TODO willekeurige cellen selecteren door ctrl in te houden.
    //TODO edit cell verplaatsen met pijlkes

    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").attr('emptyvalue', $(document).data('i18n').EditCell);
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").val($("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").attr('emptyvalue'));
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").attr('oldval', $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").attr('emptyvalue'));
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").addClass('emptyInput');



    //Make all cells that aren't headercells selectable for edit mode.
    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.datacell').bind("click", function(){
        selectACell($(this));
    });

    var labelCells = $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.labelcell');
    labelCells.bind("click", function(){
        selectACell($(this));
    });
    $.each(labelCells, function() {
        var cell = $(this);
        var value = cell.text();
        cell.data('content', value);
        cell.attr('title', value);
        var shortValue = shortenString(value, 20, 5);
        cell.text(shortValue);
    });

    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").bind("blur", function(){
        updateACell($(this));
        $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.currenteditcell').removeClass('currenteditcell');
        $(this).val($(this).attr('emptyvalue'));
        $(this).attr('oldval', $(this).val());
        $(this).addClass('emptyInput');
    });

    $('input#aspect_statistics_editorparts_DataTableTransformer_field_editfield').bind("keydown", function(e){
        if (e.keyCode == 13) {
            updateACell($(this));
        }
    });
}


function selectACell(jQObject) {
    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.currenteditcell').removeClass("currenteditcell");
    jQObject.addClass("currenteditcell");
    var value = jQObject.text();
    var content = jQObject.data('content');
    if (content != undefined)
        value = content;
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").removeClass('emptyInput');
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").val(value);
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").data('oldval', value);
    $("input#aspect_statistics_editorparts_DataTableTransformer_field_editfield").select();
}

function updateACell(jQObject){
    var value = jQObject.val();
    if (value != jQObject.data('oldval')) {
        var cell = $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.currenteditcell');
        if (cell.is('.labelcell')) {
            cell.data('content', value);
            cell.attr('title', value);
            value = shortenString(value, 20, 5);
        }
        cell.html(value);
        ajaxUpdateGraph(jQObject);
    }
}

function recalculateSelection() {
    var endx = $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.mo').attr('posx');
    var endy = $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.mo').attr('posy');
    if (endx > 0 && endy > 0) {
        $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.datacell').each(function() {
            if (isbetween($(this).attr('posx'), $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable').attr('startx'), endx) && isbetween($(this).attr('posy'), $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable').attr('starty'), endy))
                $(this).addClass('selectedcell');
            else
                $(this).removeClass('selectedcell');
        });
    }
}

function isbetween(a, b, c) {
    // every variable * 1 to make js understand that these are numbers and not strings.
    a *= 1;
    b *= 1;
    c *= 1;
    if (c < b && a >= c && a <= b)
        return true
    else return a >= b && a <= c;
}

