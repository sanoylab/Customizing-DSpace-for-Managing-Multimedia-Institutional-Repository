function initdatasource() {
//    alert('initdatasource');
    var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
    if (action) {
        action[0] = "gatherDataSourceType();";
        $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
    }
    else
        $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", ["gatherDataSourceType();", "", ""]);
    
    $('select#aspect_statistics_editorparts_DataSourceTransformer_field_datasource-select').change(function(){
        $('div[aria-labelledby = ui-dialog-title-statistics_editorparts_BagTransformer_div_overlaydiv]').remove();
        $('div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv').remove();
        var url = getContextPath() + '/atmire/reporting-suite/graph-editor/datasourceselect-specific?value=' + $(this).val();
        $('#aspect_statistics_editorparts_DataSourceTransformer_div_specific-datasource-content').load(url + ' .extractme', undefined, function(response, status, xhr) {
            var container = $('div#aspect_statistics_editorparts_DataSourceTransformer_div_specific-datasource-content');
            if (status == "error") {
                container.html('');
            }
            else {
                uniqueifyIDs(container);
                findAndImportJSFilesWithin(container, function() {
                    try {
                        matchHeights();
                    } catch(e) {
                    }
                    //                IE6 Bugfix - Start
                    $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').hide();
                    $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').show();
                    //                IE6 Bugfix - End
                });
            }
        });
        return false;
    });
}

function gatherDataSourceType() {
    var select = $('select#aspect_statistics_editorparts_DataSourceTransformer_field_datasource-select');
    if (select.length > 0)
    {
        var value = select.val();
        if (value && value.substr(-2) == '-0') {
            var number = $('input#aspect_statistics_editorparts_DataSourceTransformer_field_all_number').val() * 1;
            if (number > 30) {
                var id = "datasourcewarning";
                var suppressError = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + id);
                if (!suppressError) {
                    var e = new Error();
                    e.name = id;
                    e.message = "Your data source settings will generate a table with " + number + " rows. This will take some time. Do you want to continue?";
                    throw e;
                }

            }
        }
        var o = new Object();
        o.key = "datasourcetype";
        o.value = value;
        return o;
    }
    else
    {
        var o = new Object();
        o.key = "datasourcetype";
        o.value = '5-0';
        return o;
    }
}
