var hiddenitems;

function init() {
    //Add Position attributes, used for selecting cells
    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.ds-table-cell').each(function(){
        var id = $(this).attr('id');
        id = id.substring(id.lastIndexOf("_") + 1);
        $(this).attr('posx', id.substring(0, id.indexOf("-")));
        $(this).attr('posy', id.substring(id.indexOf("-") + 1));
    });

    {
        var action = $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action');
        var newaction = action.substr(0,action.indexOf("reporting-suite")) + 'reporting-suite/export-csv';
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction', newaction);
    }

    //TODO probably not the best solution, but it'll work for now
    $('input#aspect_statistics_GraphEditor_field_csv').bind('mouseover', function(){
        var oldaction = $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('a#aspect_statistics_OldGraphEditor_field_csv_a').bind('mouseover', function(){
        var oldaction = $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('input#aspect_statistics_GraphEditor_field_csv').bind('mouseout', function(){
        var oldaction = $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('a#aspect_statistics_OldGraphEditor_field_csv_a').bind('mouseout', function(){
        var oldaction = $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action');
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action', $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction'));
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('altaction', oldaction);
    });

    $('a#aspect_statistics_OldGraphEditor_field_csv_a').bind('click', function(){
        $('form#aspect_statistics_OldGraphEditor_div_wrapper')[0].submit();
    });

    $('input#aspect_statistics_GraphEditor_field_csv').bind('click', function(){
        $('form#aspect_statistics_OldGraphEditor_div_wrapper')[0].submit();
    });

    $('table#aspect_statistics_OldGraphEditor_table_dataTable tr.ds-table-row:gt(2)').find('img').each(function(){
        var bgcolor = $(this).css('background-color');
        var lighterHexColor = lightenColor(bgcolor, 0.2);
        var posx = $(this).attr('id');
        posx = posx.substring(posx.lastIndexOf("_") + 1);
        posx = posx.substring(0, posx.indexOf("-"));
        $('table#aspect_statistics_OldGraphEditor_table_dataTable td.datacell[posx = "' + posx + '"]').each(function(){
            $(this).css('background-color', lighterHexColor);
            $(this).css('border', '2px solid ' + lighterHexColor);
        });
    });

    $('div#aspect_statistics_OldGraphEditor_div_graph').css('height', $('input#aspect_statistics_OldGraphEditor_field_height').val() + 'px');
    $('input#aspect_statistics_OldGraphEditor_field_height').bind('change', function() {
        $('div#aspect_statistics_OldGraphEditor_div_graph').css('height', $('input#aspect_statistics_OldGraphEditor_field_height').val() + 'px');
    });


//    if ($('div#statistics_OldGraphEditor_div_colorpickercontainer').length > 0) {
//        var f = $.farbtastic('div#statistics_OldGraphEditor_div_colorpickercontainer');
//        $("input#statistics_OldGraphEditor_field_bgcolor").bind("focus", function() {
//            f.linkTo("input#statistics_OldGraphEditor_field_bgcolor");
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').slideDown('fast');
//        });
//        $("input#statistics_OldGraphEditor_field_bgcolor").bind("blur", function() {
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').slideUp('fast');
//        });
//        $("input#statistics_OldGraphEditor_field_fgcolor").bind("focus", function() {
//            f.linkTo("input#statistics_OldGraphEditor_field_fgcolor");
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').slideDown('fast');
//        });
//        $("input#statistics_OldGraphEditor_field_fgcolor").bind("blur", function() {
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').slideUp('fast');
//        });
//
//        $('table#statistics_OldGraphEditor_table_dataTable img').bind('click', function(){
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').css('top', $(this).offset().top - $('div#main').offset().top);
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').css('left', $(this).offset().left - $('div#main').offset().left + 20);
//            var color = $(this).css('background-color');
//            if (color.indexOf("rgb") > -1)
//                color = rgbToHex(color);
//            f.linkTo(this);
//            f.setColor(color);
//            $('div#statistics_OldGraphEditor_div_colorpickercontainer').slideDown('fast');
//        });
//    }
//
//    $("div#statistics_OldGraphEditor_field_bgcolor").bind("blur", function() {
//        $('div#statistics_OldGraphEditor_div_colorpickercontainer').slideUp('fast');
//    });

//    $('table#statistics_OldGraphEditor_table_dataTable td').bind('focus', function(){
//        $(this).attr('oldval', $(this).html());
//    });
//
    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.ds-table-cell').bind('change', function(){
//        if ($(this).html() != $(this).attr('oldval'))
            ajaxUpdateGraph($(this));
    });

    $('div#aspect_statistics_OldGraphEditor_div_graphSettings input').bind('focus', function(){
        $(this).attr('oldval', $(this).val());
    });

    $('div#aspect_statistics_OldGraphEditor_div_graphSettings input').bind('blur', function(){
        if ($(this).val() != $(this).attr('oldval'))
            ajaxUpdateGraph($(this));
    });

    $('div#aspect_statistics_OldGraphEditor_div_graphSettings select').bind('change', function(){
            ajaxUpdateGraph($(this));
    });

    //Copy the src to the attribute origsrc for safekeeping
    $('div#aspect_statistics_OldGraphEditor_div_graph img').attr('origsrc', $('div#aspect_statistics_OldGraphEditor_div_graph img').attr('src'));

    if ('false' == $('input#aspect_statistics_OldGraphEditor_field_showAllOptions').val()){
        toggleAdvancedGraphOptions($('li#aspect_statistics_OldGraphEditor_item_link a'));
    }

    var showmoreurl = $('li#aspect_statistics_OldGraphEditor_item_link a');
    if(showmoreurl.attr('href') == 'Show more options')
        showmoreurl.attr('href', showmorevalue);
    else
        showmoreurl.attr('innerHTML', showmorevalue);

    $('li#aspect_statistics_OldGraphEditor_item_link a').bind('click', function(){

        toggleAdvancedGraphOptions($(this));
        return false;
    });

    refreshGraph();


    //Init our comm/coll selectors
    initCommCollLists('aspect_statistics_OldGraphEditor_list_dataset_items_1_ou');
    initCommCollLists('aspect_statistics_OldGraphEditor_list_dataset_items_2_ou');

    //Init datasetType
    var dataType = $('select#aspect_statistics_OldGraphEditor_field_type');
    dataType.bind('change', function(){
        var selectedOption = $(this).val();

        //Hide all the datasets
        $("fieldset[id^='aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset1List_']").hide();
        $("fieldset[id^='aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset2List_']").hide();
        //And now show the ones we need
        $("fieldset#aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset1List_" + selectedOption).show();
        $("fieldset#aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset2List_" + selectedOption).show();
        try {
            matchHeights();
        } catch(e) {
        }
    });


    dataType.each(function(){
        //Make sure that we show the correct datasets
        var selectedOption = $(this).val();

        //Hide all the datasets
        $("fieldset[id^='aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset1List_']").hide();
        $("fieldset[id^='aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset2List_']").hide();
        //And now show the ones we need
        $("fieldset#aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset1List_" + selectedOption).show();
        $("fieldset#aspect_statistics_OldGraphEditor_list_dataSourceSettings_dataset2List_" + selectedOption).show();

    });

    var datasetSelects = $("select[id^= 'aspect_statistics_OldGraphEditor_field_dataset_items_']");
    datasetSelects.each(function(){
        //Show the one we have selected
        $("[id$='" + this.name + "_" + $(this).val() + "']").show();
    });

    datasetSelects.bind('change', function(){
        //Get our 2 selects
        var select1 = $("select[name='dataset_items_1']");
        var select2 = $("select[name='dataset_items_2']");

        //Get everything straightend out for THIS select
        var selectedOptions = $(this).find('option');
        for(var i = 0; i < selectedOptions.length; i++){
            if(i == this.selectedIndex)
                $("[id$='" + this.name + "_" + $(this).val() + "']").show();
            else
                $("[id$='" + this.name + "_" + selectedOptions[i].value + "']").hide();
        }
        var change = false;
        if(select1[0].selectedIndex == select2[0].selectedIndex){
            change = true;
        }else
        if(select1.val() == 'time' || select2.val() == 'time'){
            //We got one time check if we haven't got another one
            var otherVal = select1.val() == 'time' ? select2.val() : select1.val();

            //Check our other val
            if($('input#aspect_statistics_OldGraphEditor_field_ds_type_1_' + otherVal).val() == 'date'){
                //We have a dcdate so change the selection of this one
                change = true;
            }
        }
        if(change){
            //We have 2 of the same kind this is not allowed
            var selectToEdit;
            if(this.id == select1[0].id)
                selectToEdit = select2;
            else
                selectToEdit = select1;

            //If 0 select the first options else select the previous option
            if(selectToEdit[0].selectedIndex != 0)
                selectToEdit[0].selectedIndex  = selectToEdit[0].selectedIndex - 1;
            else
                selectToEdit[0].selectedIndex  = 1;

            //Now fire the change event so our selectbox knows this
            selectToEdit.trigger('change');
        }

        try {
            matchHeights();
        } catch(e) {
        }
    });


    //Initialize dataset parameter visibility
     $("select[id ^= 'aspect_statistics_OldGraphEditor_field_dataset_visits_']").each(function(){
         var setnr = $(this).attr('id');
         setnr = setnr.substring(setnr.length - 1);
         if($(this).val() == 'none'){
             $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top:visible').hide();
             $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time:visible').hide();
         }
         else if($(this).val() == 'time'){
             if ($('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top').is(":visible"))
                 $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top').hide();
             $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time').show();
         }
         else {
             if ($('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time').is(":visible"))
                 $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time').hide();
             $('li#saspect_tatistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top').show();
         }
     });

    //Bind dataset parameter visibility events
     $("select[id ^= 'aspect_statistics_OldGraphEditor_field_dataset_visits_']").bind("change", function(){
         updateDatasetParameters(1);
         updateDatasetParameters(2);
     });

    var prevval = "nothing";
    $("select#aspect_statistics_OldGraphEditor_field_dataset_visits_2 option").each(function(){
        $(this).attr('follows', prevval);
        prevval = $(this).val();
    });

    $('select#aspect_statistics_OldGraphEditor_field_storagedataset2').empty();

    pruneDataset2Sources();

    $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_1').bind("change", function(){
        pruneDataset2Sources();
    });

    $('form#aspect_statistics_OldGraphEditor_div_wrapper').bind("submit", function(){
        return packageTable();
    });

    //Bind mouse action used for selecting an entire row or column
//    $('table#statistics_OldGraphEditor_table_dataTable td.headercell').bind("click", function(){
//        if($(this).attr("posx") == 0){
//            var posy = $(this).attr("posy");
//            $('table#statistics_OldGraphEditor_table_dataTable td.datacell').each(function() {
//                if ($(this).attr("posy") == posy)
//                    $(this).addClass('selectedcell');
//                else
//                    $(this).removeClass('selectedcell');
//            });
//        }
//        else if($(this).attr("posy") == 0){
//            var posx = $(this).attr("posx");
//            $('table#statistics_OldGraphEditor_table_dataTable td.datacell').each(function() {
//                if ($(this).attr("posx") == posx)
//                    $(this).addClass('selectedcell');
//                else
//                    $(this).removeClass('selectedcell');
//            });
//
//        }
//    });
    //TODO Meerdere rijen en kolommen selecteren door te draggen
    //TODO willekeurige cellen selecteren door ctrl in te houden.
    //TODO edit cell verplaatsen met pijlkes

    $("input#aspect_statistics_OldGraphEditor_field_editfield").attr('emptyvalue', cellcontentedit);
    $("input#aspect_statistics_OldGraphEditor_field_editfield").val($("input#aspect_statistics_OldGraphEditor_field_editfield").attr('emptyvalue'));
    $("input#aspect_statistics_OldGraphEditor_field_editfield").attr('oldval', $("input#aspect_statistics_OldGraphEditor_field_editfield").attr('emptyvalue'));
    $("input#aspect_statistics_OldGraphEditor_field_editfield").addClass('emptyInput');



    //Make all cells that aren't headercells selectable for edit mode.
    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.datacell').bind("click", function(){
        selectACell($(this));
    });

    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.labelcell').bind("click", function(){
        selectACell($(this));
    });

    $("input#aspect_statistics_OldGraphEditor_field_editfield").bind("blur", function(){
        updateACell($(this));
        $('table#aspect_statistics_OldGraphEditor_table_dataTable td.currenteditcell').removeClass('currenteditcell');
        $(this).val($(this).attr('emptyvalue'));
        $(this).attr('oldval', $(this).val());
        $(this).addClass('emptyInput');
    });

    $('input#aspect_statistics_OldGraphEditor_field_editfield').bind("keydown", function(e){
        if (e.keyCode == 13) {
            updateACell($(this));
        }
    });

    $("form#aspect_statistics_OldGraphEditor_div_wrapper").bind("keydown", function(e){
        if (e.keyCode == 13) {
            return false;
        }
    });


    //Bind mouse actions used for selecting a range of cells
//    $('table#statistics_OldGraphEditor_table_dataTable td.datacell').bind('mouseover', function() {
//        $(this).addClass('mo');
//        if ($('table#statistics_OldGraphEditor_table_dataTable').attr('startx') > 0) {
//            recalculateSelection();
//        }
//    });
//    $('table#statistics_OldGraphEditor_table_dataTable td.datacell').bind('mouseout', function() {
//        $(this).removeClass('mo');
//        if ($('table#statistics_OldGraphEditor_table_dataTable').attr('startx') > 0) {
//            recalculateSelection();
//        }
//    });
//    $('table#statistics_OldGraphEditor_table_dataTable td.datacell').bind('mousedown', function() {
//        $('table#statistics_OldGraphEditor_table_dataTable').attr('startx', $(this).attr('posx'));
//        $('table#statistics_OldGraphEditor_table_dataTable').attr('starty', $(this).attr('posy'));
//    });
//    $('table#statistics_OldGraphEditor_table_dataTable td.datacell').bind('mouseup', function() {
//        $('table#statistics_OldGraphEditor_table_dataTable').attr('startx', 0);
//        $('table#statistics_OldGraphEditor_table_dataTable').attr('starty', 0);
//    });
//
//    $(document).bind('mouseup', function() {
//        if ($('table#statistics_OldGraphEditor_table_dataTable td.mo').length == 0) {
//            $('table#statistics_OldGraphEditor_table_dataTable').attr('startx', 0);
//            $('table#statistics_OldGraphEditor_table_dataTable').attr('starty', 0);
//        }
//    });


//is voor text-selectie te disablen in ff maar werkt niet
//    $('table#statistics_OldGraphEditor_table_dataTable')[0].onselectstart = function() {
//        return false;
//    }
//    $('table#statistics_OldGraphEditor_table_dataTable')[0].unselectable = "on";

//    $('input#statistics_OldGraphEditor_field_maximize').replaceWith('<input type="button" value="Full Screen" name="maximize" class="ds-button-field" id="statistics_OldGraphEditor_field_maximize"/>')
    $('img#aspect_statistics_OldGraphEditor_field_maximize').attr('altval', 'Original Size').addClass("normal");
//    $('img#aspect_statistics_OldGraphEditor_field_maximize').attr('altbg', '../themes/Atmire-add-ons/images/view-restore.png');
    $("img.foldableHelpButton").addClass("normal");
    $('img#aspect_statistics_OldGraphEditor_field_maximize').bind('click', function(){
        toggleMaximize();
        var value = $(this).attr('alt');
        $(this).attr('alt',  $(this).attr('altval'));
        $(this).attr('altval', value);

        var oldbg = $(this).attr('src');
        var newbg = $(this).attr('altbg');
        $(this).attr('altbg', oldbg);
        $(this).attr('src', newbg);

        if ($(this).hasClass("maximized"))
            $(this).removeClass("maximized").addClass("normal");
        else
            $(this).removeClass("normal").addClass("maximized");

        var helpButton = $("img.foldableHelpButton");
        if (helpButton.hasClass("maximized"))
            helpButton.removeClass("maximized").addClass("normal");
        else
            helpButton.removeClass("normal").addClass("maximized");

    });



//    $("form#statistics_OldGraphEditor_div_wrapper a.foldLink").click(function () {
    $("#aspect_statistics_OldGraphEditor_div_dataSourceSettings_head_link").click(function () {
        $("#aspect_statistics_OldGraphEditor_div_dataSourceSettings").toggle('slow', function(){
            try {
                matchHeights();
            } catch(e) {
            }
        });
        swapFoldImage('#aspect_statistics_OldGraphEditor_div_dataSourceSettings_head_img');
    });

    $("#aspect_statistics_OldGraphEditor_div_dataTable_head_link").click(function () {
        $("#aspect_statistics_OldGraphEditor_div_dataTable").toggle('slow', function(){
            try {
                matchHeights();
            } catch(e) {
            }
        });
        swapFoldImage('#aspect_statistics_OldGraphEditor_div_dataTable_head_img');
    });

    $("#aspect_statistics_OldGraphEditor_div_graphSettings_head_link").click(function () {
        $("#aspect_statistics_OldGraphEditor_div_graphSettings").toggle('slow', function(){
            try {
                matchHeights();
            } catch(e) {
            }
        });
        swapFoldImage('#aspect_statistics_OldGraphEditor_div_graphSettings_head_img');
    });

    $("#aspect_statistics_OldGraphEditor_div_graph_head_link").click(function () {
        $("#aspect_statistics_OldGraphEditor_div_graph").toggle('slow', function(){
            try {
                matchHeights();
            } catch(e) {
            }
        });
        swapFoldImage('#aspect_statistics_OldGraphEditor_div_graph_head_img');
    });

    // Make sure that if we submit we have at least some checkboxes selected
    $("input#aspect_statistics_OldGraphEditor_field_gentable").click(function (){
//        //Currently only do this when we want to render item statistics
//        if($('select#statistics_OldGraphEditor_field_type').val() == "items"){
            //So we have our item visits selected
            var dataset1Result = checkItemDataset(1);
            if(!dataset1Result)
                return dataset1Result;

            return checkItemDataset(2);
//        } else {
//            //TODO: art do this ?
//        }
    });
    // Time to create all our date pickers
    //First for the visits
    createDatePicker($('input#aspect_statistics_OldGraphEditor_field_ds1start'));
    createDatePicker($('input#aspect_statistics_OldGraphEditor_field_ds1End'));
    createDatePicker($('input#aspect_statistics_OldGraphEditor_field_ds2Start'));
    createDatePicker($('input#aspect_statistics_OldGraphEditor_field_ds2End'));
    //Second for the item stats
    $("input[name^='ds1_date_']").each(function(){
        createDatePicker($(this));
    });
    $("input[name^='ds2_date_']").each(function(){
        createDatePicker($(this));
    });




    // When done loading the graph do the matchheight thingy
    $('div#aspect_statistics_OldGraphEditor_div_graph').children(0).ready(function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });

    //Last but not least update the graph so our exportCsv works well EVEN if we don't change anything in our table
    packageTable();
}

function createDatePicker(inputBox){
    var startDate = $('input#aspect_statistics_OldGraphEditor_field_atmire_start_date_picker').val();
//    var selectedDate = new Date();
//    selectedDate.setFullYear(inputBox.val().split('/')[2], inputBox.val().split('/')[1], inputBox.val().split('/')[0]);
    var endDate = new Date();
    endDate.setYear(1901 + endDate.getYear());
    inputBox.datePicker({
        /* Each time we click on the input box the datepicker is summoned*/
        clickInput:true,
        /* The startdate is the date given in the hidden field above */
        startDate: startDate,
        /* The enddate is the date of today, this disables us choosing dates in the future */
        endDate: endDate.asString()
    });

}

/*
* Method used to check if we have valid item datasets
*/
function checkItemDataset(dataNr){
    var select = $('select#aspect_statistics_OldGraphEditor_field_dataset_items_' + dataNr);
    var selectedOption = select.val();
    if(selectedOption == "time"){
        //Check if we have valid date interval
        var startYear = $('select#aspect_statistics_OldGraphEditor_field_ds' + dataNr + 'Start_item').val();
        var endYear = $('select#aspect_statistics_OldGraphEditor_field_ds' + dataNr + 'End_item').val();

        if(endYear < startYear){
            alert(errordate_msg);
            return false;
        }
    }else
    if(selectedOption == "ou"){
        //We have an organizational unit make sure that the user has one selected
        var nrChecked = $('ul#aspect_statistics_OldGraphEditor_list_dataset_items_' + dataNr + '_ou').find(':checkbox:checked').size();
        if(0 == nrChecked){
            //Nothing checked better let the user know
            alert(errorou_msg);
            return false;
        }
    }else{
        //We have something else some dc field.
        //Check what type we have
        var type = $('input#aspect_statistics_OldGraphEditor_field_ds_type_' + dataNr + '_' + selectedOption).val();
        if(type == "dcinput"){
            //We have one of those configured in the input-forms.xml
            var nrChecked = $('li#aspect_statistics_OldGraphEditor_item_dataset_items_' + dataNr + '_' + selectedOption).find(':checkbox:checked').size();
            if(0 == nrChecked){
                //Nother checked better let the user know
                alert(errorselect_msg + select.find('option:selected').text());
                return false;
            }
        }else
        if(type == "date"){
            var startDateStr = $('input#aspect_statistics_OldGraphEditor_field_ds' + dataNr + '_date_' + selectedOption + '_Start').val();
            var startDate = new Date();
            startDate.setFullYear(startDateStr.split('/')[2], startDateStr.split('/')[1], startDateStr.split('/')[0]);
            var endDateStr = $('input#aspect_statistics_OldGraphEditor_field_ds' + dataNr + '_date_' + selectedOption + '_End').val();
            var endDate = new Date();
            endDate.setFullYear(endDateStr.split('/')[2], endDateStr.split('/')[1], endDateStr.split('/')[0]);

            if(endDate <= startDate){
                alert(errordate_msg);
                return false;
            }
        }
    }
    return true;
}


/*
* Method used to init the community collections tree
*/
function initCommCollLists(id){
    var checkedButton = $('input[@name="scope"]:checked');
    var selectedValue = checkedButton.val();
    var mainlist = $('ul#' + id);
    mainlist.attr('style', 'margin-top:0px; padding-left:0px;margin-left:5px;');
    $('ul#aspect_metadataquality_QualityAssurance_list_firstList').attr('style', 'margin-bottom:0px;');
    var ulArr = $('ul#' + id + ' ul');
    for(var i = 0; i < ulArr.length; i++){
        var current = $(ulArr.get(i));
//        current.find(':checkbox').hide

        var label = current.prev().find("label");
        label.closest('li').addClass('collapsibleSubTreeLabel');
        var input = label.find("input");
        if (input.length > 0) {
            input.insertBefore(label);
        }
        var lbltext = label.attr('innerHTML');
        label.attr('innerHTML', '');
        label.append('<a href="" onclick="return false;"><span class="ui-icon ui-icon-triangle-1-e communityCollapser">&nbsp;</span>' + lbltext + '</span></a>');
        label.attr('target', 'ul#' + current.attr('id'));
        current.hide();
        label.bind('click', function(){
//                $($(this).attr('target')).slideToggle("fast"); //Werkt niet in IE
            var list = $($(this).attr('target'));
            if(list.is(':visible')){
                list.hide();
                $(this).find('span.ui-icon-triangle-1-s').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
            }
            else {
                list.show();
                $(this).find('span.ui-icon-triangle-1-e').removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
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

function swapFoldImage(id) {
      var currentsrc = $(id).attr('src');
      var altsrc = $(id).attr('altsrc');
      $(id).attr('altsrc', currentsrc);
      $(id).attr('src', altsrc);
}

function selectACell(jQObject) {
    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.currenteditcell').removeClass("currenteditcell");
    jQObject.addClass("currenteditcell");
    $("input#aspect_statistics_OldGraphEditor_field_editfield").removeClass('emptyInput');
    $("input#aspect_statistics_OldGraphEditor_field_editfield").val(jQObject.html());
    $("input#aspect_statistics_OldGraphEditor_field_editfield").attr('oldval', jQObject.html());
    $("input#aspect_statistics_OldGraphEditor_field_editfield").select();
}

function updateACell(jQObject){
    if (jQObject.val() != jQObject.attr('oldval')) {
        $('table#aspect_statistics_OldGraphEditor_table_dataTable td.currenteditcell').html(jQObject.val());
        ajaxUpdateGraph(jQObject);
    }
}

function ajaxUpdateGraph(current) {
    //  TODO Escaping?
    packageTable();
    var dat = "";
    $('form#aspect_statistics_OldGraphEditor_div_wrapper input').each(function(){
        if ($(this).attr('type') != 'submit') {
            dat += $(this).attr('name') + "=" + $(this).val() + "&";
        }
    });
    $('form#aspect_statistics_OldGraphEditor_div_wrapper select').each(function(){
        dat += $(this).attr('name') + "=" + $(this).val() + "&";
    });
    dat = dat.substring(0, dat.length - 1);
    jQuery.post($('form#aspect_statistics_OldGraphEditor_div_wrapper').attr('action'), dat, function(data){
        refreshGraph(data);
    });
//    $.ajax({type: "POST", url: $('form#statistics_OldGraphEditor_div_wrapper').attr('action'), data: dat, success: function(data){
//            refreshGraph(data);
//        }
//    });
}

function toggleAdvancedGraphOptions(jQObject){
    var newmsg = jQObject.attr('href');
    jQObject.attr('href', jQObject.html());
    jQObject.html(newmsg);
    $('fieldset#aspect_statistics_OldGraphEditor_list_graphSettings li:not(.alwaysshow)').toggle();
    try {
        matchHeights();
    } catch(e) {
    }
    if ('false' == $('input#aspect_statistics_OldGraphEditor_field_showAllOptions').val())
        $('input#aspect_statistics_OldGraphEditor_field_showAllOptions').val("true");
    else
        $('input#aspect_statistics_OldGraphEditor_field_showAllOptions').val("false");
}


//Convert a hex value to its decimal value - the inputted hex must be in the
//	format of a hex triplet - the kind we use for HTML colours. The function
//	will return an array with three values.
function hexToRGB(hex) {
	if(hex.charAt(0) == "#") hex = hex.slice(1); //Remove the '#' char - if there is one.
	hex = hex.toUpperCase();
	var hex_alphabets = "0123456789ABCDEF";
	var value = new Array(3);
	var k = 0;
	var int1,int2;
	for(var i=0;i<6;i+=2) {
		int1 = hex_alphabets.indexOf(hex.charAt(i));
		int2 = hex_alphabets.indexOf(hex.charAt(i+1));
		value[k] = (int1 * 16) + int2;
		k++;
	}
	return(value);
}


function rgbToHex(rgb) {
    var rgbvals = /rgb\((.+),(.+),(.+)\)/i.exec(rgb);
    var rval = parseInt(rgbvals[1]);
    var gval = parseInt(rgbvals[2]);
    var bval = parseInt(rgbvals[3]);
    return '#' + (
            rval.toString(16) +
            gval.toString(16) +
            bval.toString(16)
            ).toUpperCase();
}

/**
* Converts HSV to RGB value.
*
* @param {Integer} h Hue as a value between 0 - 360 degrees
* @param {Integer} s Saturation as a value between 0 - 100 %
* @param {Integer} v Value as a value between 0 - 100 %
* @returns {Array} The RGB values  EG: [r,g,b], [255,255,255]
*/
function hsvToRgb(h,s,v) {

    var s = s / 100,
         v = v / 100;

    var hi = Math.floor((h/60) % 6);
    var f = (h / 60) - hi;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    var rgb = [];

    switch (hi) {
        case 0: rgb = [v,t,p];break;
        case 1: rgb = [q,v,p];break;
        case 2: rgb = [p,v,t];break;
        case 3: rgb = [p,q,v];break;
        case 4: rgb = [t,p,v];break;
        case 5: rgb = [v,p,q];break;
    }

    var r = Math.min(255, Math.round(rgb[0]*256)),
        g = Math.min(255, Math.round(rgb[1]*256)),
        b = Math.min(255, Math.round(rgb[2]*256));

    return [r,g,b];

}

/**
* Converts RGB to HSV value.
*
* @param {Integer} r Red value, 0-255
* @param {Integer} g Green value, 0-255
* @param {Integer} b Blue value, 0-255
* @returns {Array} The HSV values EG: [h,s,v], [0-360 degrees, 0-100%, 0-100%]
*/
function rgbToHsv(r, g, b) {

    var r = (r / 255),
         g = (g / 255),
     b = (b / 255);

    var min = Math.min(Math.min(r, g), b),
        max = Math.max(Math.max(r, g), b),
        delta = max - min;

    var value = max,
        saturation,
        hue;

    // Hue
    if (max == min) {
        hue = 0;
    } else if (max == r) {
        hue = (60 * ((g-b) / (max-min))) % 360;
    } else if (max == g) {
        hue = 60 * ((b-r) / (max-min)) + 120;
    } else if (max == b) {
        hue = 60 * ((r-g) / (max-min)) + 240;
    }

    if (hue < 0) {
        hue += 360;
    }

    // Saturation
    if (max == 0) {
        saturation = 0;
    } else {
        saturation = 1 - (min/max);
    }

    return [Math.round(hue), Math.round(saturation * 100), Math.round(value * 100)];
}

function lightenColor(color, factor){
    var hsvArray;
    if (color.indexOf("rgb") > -1){
        var rgbvals = /rgb\((.+),(.+),(.+)\)/i.exec(color);
        var rval = parseInt(rgbvals[1]);
        var gval = parseInt(rgbvals[2]);
        var bval = parseInt(rgbvals[3]);
        hsvArray = rgbToHsv(rval, gval, bval);
    }
    else {
        var rgbarray = hexToRGB(color);
        hsvArray = rgbToHsv(rgbarray[0], rgbarray[1], rgbarray[2]);
    }
    hsvArray[1] *= factor;
    hsvArray[2] = 89;
    var rgbarray = hsvToRgb(hsvArray[0], hsvArray[1], hsvArray[2]);
    return rgbToHex('rgb(' + rgbarray[0] + ', ' + rgbarray[1] + ', ' + rgbarray[2] + ')');
}

function refreshGraph(e) {
    //Bevatte enkel deze eerste regel, maar dat werkt niet in IE
        $('div#aspect_statistics_OldGraphEditor_div_graph img').attr('src', $('div#aspect_statistics_OldGraphEditor_div_graph img').attr('origsrc') + '?e=' + Math.random());

    //Dit werkt wel, maar heeft als nadeel dat uw pagina effe korter wordt en ge dus naarboven scrolt.
    var oldhtml = $('div#aspect_statistics_OldGraphEditor_div_graph').html();
//    oldhtml = oldhtml.replace(' src="' + $('div#statistics_OldGraphEditor_div_graph img').attr('origsrc'), ' src="' + $('div#statistics_OldGraphEditor_div_graph img').attr('origsrc') + '?e=' + Math.random() + '');
    $('div#aspect_statistics_OldGraphEditor_div_graph').empty();
    $('div#aspect_statistics_OldGraphEditor_div_graph').html(oldhtml);
    $('div#aspect_statistics_OldGraphEditor_div_graph').children(0).ready(function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });
}

function pruneDataset2Sources(){
        var selectedValue = $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2').val();
        //put all stored options back in their place
        $('select#aspect_statistics_OldGraphEditor_field_storagedataset2 option').each(function() {
            var follows = $(this).attr("follows");
            if (follows == "nothing") {
                $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2').prepend($(this));
            } else {
                var predecessor = $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2 option[value = "' + follows + '"]');
                $(this).insertAfter(predecessor);
            }
        });

        var value = $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_1').val();
        var removedSelected = false;
        //if dataset1 is a Top of bitstreams, items, collections or communities
        if (value == '0' || value == '2' || value == '3' || value == '4'){
            $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2 option').each(function() {
                var currentvalue = $(this).val();
                if (currentvalue == '0' || currentvalue == '2' || currentvalue == '3' || currentvalue == '4'){
                    if ($(this).attr('selected') == 'selected') {
                        removedSelected = true;
                    }
                    $('select#aspect_statistics_OldGraphEditor_field_storagedataset2').append($(this));
                }
            });
        }
        else if (value == 'countries' || value == 'continents'){
            $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2 option').each(function() {
                var currentvalue = $(this).val();
                if (currentvalue == 'countries' || currentvalue == 'continents'){
                    if ($(this).attr('selected') == 'selected') {
                        removedSelected = true;
                    }
                    $('select#aspect_statistics_OldGraphEditor_field_storagedataset2').append($(this));
                }
            });
        }
        else if (value == 'time'){
            $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2 option').each(function() {
                var currentvalue = $(this).val();
                if (currentvalue == 'time' || currentvalue == 'none'){
                    if ($(this).attr('selected') == 'selected') {
                        removedSelected = true;
                    }
                    $('select#aspect_statistics_OldGraphEditor_field_storagedataset2').append($(this));
                }
            });
        }
        //All this removing of options screws with the selected option so
        //if we removed the selected option, select the first option, otherwise
        //select the previously selected option.
        if (removedSelected)
            $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2').val($('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2 option:first').val());
        else
            $('select#aspect_statistics_OldGraphEditor_field_dataset_visits_2').val(selectedValue);

        updateDatasetParameters(2);
}

function updateDatasetParameters(setnr){
     if($('select#aspect_statistics_OldGraphEditor_field_dataset_visits_' + setnr + '.ds-select-field').val() == 'none'){
//             $('li#statistics_OldGraphEditor_item_top' + setnr  + ':visible').slideUp('fast');
//             $('li#statistics_OldGraphEditor_item_time' + setnr + ':visible').slideUp('fast');
         $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top:visible').hide();
         $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time:visible').hide();
     }
     else if($('select#aspect_statistics_OldGraphEditor_field_dataset_visits_' + setnr + '.ds-select-field').val() == 'time'){
         if ($('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top').is(":visible"))
             $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top').hide();
//             $('li#statistics_OldGraphEditor_item_time' + setnr).slideDown('fast');
         $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time').show();
     }
     else {
         if ($('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time').is(":visible"))
             $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_time').hide();
//             $('li#statistics_OldGraphEditor_item_top' + setnr).slideDown('fast');
         $('li#aspect_statistics_OldGraphEditor_item_dataset_visits_' + setnr  + '_top').show();
     }
}

function toggleMaximize(){
    if (hiddenitems == undefined || hiddenitems.length == 0) {
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).addClass('maximizedwidth');
        });
        hideAllAncestorialSiblings($('form#aspect_statistics_OldGraphEditor_div_wrapper'));
        $('div#aspect_statistics_OldGraphEditor_div_dataTableContainer').addClass('maximizedwidth');
        $('div#aspect_statistics_StatletTransformer_div_statistic').addClass('maximizedwidth');
        //Remove any margin our ds-body div may have
        $('div#ds-body').attr('marginOld', $('div#ds-body').css('margin-left'));
        $('div#ds-body').css('margin-left', '0');
    } else {
        hiddenitems.show();
        hiddenitems = undefined;
        $('form#aspect_statistics_OldGraphEditor_div_wrapper').parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).removeClass('maximizedwidth');
        });
        $('div#aspect_statistics_OldGraphEditor_div_dataTableContainer').removeClass('maximizedwidth');
        $('div#aspect_statistics_StatletTransformer_div_statistic').removeClass('maximizedwidth');
        $('div#ds-body').css('margin-left', $('div#ds-body').attr('marginOld'));
        $('div#ds-body').removeAttr('marginOld');

    }


}

//Hides the siblings of all ancestors of the given jQuery object
function hideAllAncestorialSiblings(jqObject){
    var ancestor = findTheAncestorWithSiblings(jqObject);
    if (ancestor != undefined && ancestor.length > 0) {
        ancestor.siblings(':visible').each(function() {
            hideIt($(this));
        });
        var parent = ancestor.parent(':not(body)').filter(':not(html)');
        if (parent != undefined && parent.length > 0) {
            hideAllAncestorialSiblings(parent);
        }
    }
}

function findTheAncestorWithSiblings(jqObject){
    var siblings = jqObject.siblings();
    if (siblings.length > 0)
        return jqObject;
    else
        return findTheAncestorWithSiblings(jqObject.parent());
}

function hideIt(jqobj)
{
    jqobj.hide();
    if (hiddenitems == undefined)
        hiddenitems = jqobj;
    else
        hiddenitems = hiddenitems.add(jqobj);
}

function recalculateSelection() {
    var endx = $('table#aspect_statistics_OldGraphEditor_table_dataTable td.mo').attr('posx');
    var endy = $('table#aspect_statistics_OldGraphEditor_table_dataTable td.mo').attr('posy');
    if (endx > 0 && endy > 0) {
        $('table#aspect_statistics_OldGraphEditor_table_dataTable td.datacell').each(function() {
            if (isbetween($(this).attr('posx'), $('table#aspect_statistics_OldGraphEditor_table_dataTable').attr('startx'), endx) && isbetween($(this).attr('posy'), $('table#aspect_statistics_OldGraphEditor_table_dataTable').attr('starty'), endy))
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

function packageTable() {
    if($('table#aspect_statistics_OldGraphEditor_table_dataTable').length == 0)
        return true;
    var currentrow = 3;
    var resultA = "";
    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.datacell').each(function() {
        var posx = $(this).attr('posx') * 1;
        if(posx > currentrow){
            currentrow = posx;
            if (resultA.length > 0)
                resultA = resultA.substring(0, resultA.length - 1);      //remove last ';'
            resultA += "|";
        }
        var innerhtml = $(this).html();
        if (innerhtml == undefined || $.trim(innerhtml) == '')
            innerhtml = '0';
        resultA += innerhtml + ";";
    });
    resultA = resultA.substring(0, resultA.length - 1); //remove last '|'
    $('input#aspect_statistics_OldGraphEditor_field_dataMatrix').val(resultA);

    resultA = "";
    var resultB = "";
    var resultC = "";
    $('table#aspect_statistics_OldGraphEditor_table_dataTable td.labelcell').each(function() {
        var posx = $(this).attr('posx');
        if (posx == 1){
            resultC += $(this).html() + ";";
        }
        else if (posx == 2){
            resultA += $(this).html() + ";";
        }
        else {
            var posy = $(this).attr('posy');
            if (posy == 1){
                resultC += $(this).html();
            }
            else {
                resultB += $(this).html() + ";";
            }
        }
    });
    resultA = resultA.substring(0, resultA.length - 1);      //remove last ';'
    resultB = resultB.substring(0, resultB.length - 1);      //remove last ';'
    $('input#aspect_statistics_OldGraphEditor_field_columnLabels').val(resultA);
    $('input#aspect_statistics_OldGraphEditor_field_rowLabels').val(resultB);
    $('input#aspect_statistics_OldGraphEditor_field_axisLabels').val(resultC);


    return true;
}

function selectAllNone(listId, all){
    var li = $('li#' + listId);
    //Find all our checks
    var checks = li.find(':checkbox');
    if(all)
        checks.attr('checked', 'checked');
    else
        checks.removeAttr('checked');

}

window.onload = init;
