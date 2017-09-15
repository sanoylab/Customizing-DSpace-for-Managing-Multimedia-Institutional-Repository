var hiddenitems


$(document).ready(function(){
    $.getJSON($('[name="contextpath"]').val() + "/JSON/mqm/i18n", undefined, function (json) {
        $(document).data('i18n', json);

        var notificationId = 'proc' + new Date().getTime();
        $(document).notify('neutral', {
            id: notificationId,
            message: $(document).data('i18n').OverlayProcessing,
            duration: 0
        });

        //Init the fullscreen button
        initFullScreen();

        initAccordion();

        //Inits used for the search/results pages of the duplicatechecker
        initCommCollLists();
        //    initNoDoublesList();
        initMergeButtons();
        initCheckLocButtons();
        initMoreInfoListRemoveDoublesList();
        //Inits used for the compose merge of the duplicatechecker
        initSelectAllButtons();
        initSortTables();

        /* After all initialized enable our buttons */
        initEnableDuplicateButtons();

        $('div#ds-body:hidden').fadeIn('fast', function() {
            $(document).notify('hide', notificationId);
        });
    });
});

//A variable detecting IE6
var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;

function initAccordion() {
    var sel = 0;
    var counter = 0;
    var accordionWrapper = $('#aspect_duplicatechecker_DuplicateChecker_div_accordion');
    $.each(accordionWrapper.children('.methodContent'), function() {
        if ($(this).hasClass('showContent')) {
            $(this).removeClass('showContent');
            sel = counter;
        }
        counter = counter + 1;
    });
    accordionWrapper.accordion({
        active: sel,
        autoHeight: false,
        clearStyle: true,
        create: function() {
            accordionWrapper.find('.ui-accordion-header.ui-state-active.ui-state-default').removeClass('ui-state-default');
            $('#aspect_duplicatechecker_DuplicateChecker_div_methodMain1_content').after($('#aspect_duplicatechecker_DuplicateChecker_div_Method1Help'));
            $('#aspect_duplicatechecker_DuplicateChecker_div_methodMain2_content').after($('#aspect_duplicatechecker_DuplicateChecker_div_Method2Help'));
            $('#aspect_duplicatechecker_DuplicateChecker_div_methodMain3_content').after($('#aspect_duplicatechecker_DuplicateChecker_div_Method3Help'));
        }
    });
}


/*/**********************/
/* FULLSCREEN FUNCTIONS */
/************************/
function initFullScreen(){
//    $('input#aspect_duplicatechecker_DuplicateChecker_field_maximize').replaceWith('<img alt="Full Screen" name="maximize" class="ds-button-field fullscreen" id="aspect_duplicatechecker_Duplicatechecker_field_maximize" onFocus="this.blur();" src="../themes/Atmire-add-ons/images/view-fullscreen.png" />');
//    $('input#aspect_duplicatechecker_DuplicateResults_field_maximize').replaceWith('<img alt="Full Screen" name="maximize" class="ds-button-field fullscreen" id="aspect_duplicatechecker_Duplicatechecker_field_maximize" onFocus="this.blur();" src="../themes/Atmire-add-ons/images/view-fullscreen.png" />');
//    $('input#aspect_duplicatechecker_DuplicateCompare_field_maximize').replaceWith('<img alt="Full Screen" name="maximize" class="ds-button-field fullscreen" id="aspect_duplicatechecker_Duplicatechecker_field_maximize" onFocus="this.blur();" src="../themes/Atmire-add-ons/images/view-fullscreen.png" />');
//    $('input#aspect_duplicatechecker_DuplicateMergeStart_field_maximize').replaceWith('<img alt="Full Screen" name="maximize" class="ds-button-field fullscreen" id="aspect_duplicatechecker_Duplicatechecker_field_maximize" onFocus="this.blur();" src="../themes/Atmire-add-ons/images/view-fullscreen.png" />');
//    $('input#aspect_duplicatechecker_DuplicateMergeReview_field_maximize').replaceWith('<img alt="Full Screen" name="maximize" class="ds-button-field fullscreen" id="aspect_duplicatechecker_Duplicatechecker_field_maximize" onFocus="this.blur();" src="../themes/Atmire-add-ons/images/view-fullscreen.png" />');
    $('img#aspect_duplicatechecker_DuplicateResults_field_maximize').attr('id', 'aspect_duplicatechecker_DuplicateChecker_field_maximize');
    $('img#aspect_duplicatechecker_DuplicateCompare_field_maximize').attr('id', 'aspect_duplicatechecker_DuplicateChecker_field_maximize');
    $('img#aspect_duplicatechecker_DuplicateMergeStart_field_maximize').attr('id', 'aspect_duplicatechecker_DuplicateChecker_field_maximize');
    $('img#aspect_duplicatechecker_DuplicateMergeReview_field_maximize').attr('id', 'aspect_duplicatechecker_DuplicateChecker_field_maximize');


    $('img#aspect_duplicatechecker_DuplicateChecker_field_maximize').attr('altval', 'Original Size');
    $('img#aspect_duplicatechecker_DuplicateChecker_field_maximize').attr('altbg', '../../themes/Atmire-add-ons/images/view-restore.png');

    $('img#aspect_duplicatechecker_DuplicateChecker_field_maximize').attr('altTop', '5');
    $('img#aspect_duplicatechecker_DuplicateChecker_field_maximize').attr('altRight', '0');
    $("img[class='foldableHelpButton']").attr('altTop', '60');
    $("img[class='foldableHelpButton']").attr('altRight', '16px');
    $('img#aspect_duplicatechecker_DuplicateChecker_field_maximize').bind('click', function(){
        toggleMaximize('aspect_duplicatechecker_DuplicateChecker_div_wrapper');
        toggleMaximize('aspect_duplicatechecker_DuplicateResults_div_wrapper');
        toggleMaximize('aspect_duplicatechecker_DuplicateCompare_div_wrapper');
        toggleMaximize('aspect_duplicatechecker_DuplicateMergeStart_div_wrapper');
        toggleMaximize('aspect_duplicatechecker_DuplicateMergeReview_div_wrapper');
        var value = $(this).attr('alt');
        $(this).attr('alt',  $(this).attr('altval'));
        $(this).attr('altval', value);

        var oldbg = $(this).attr('src');
        var newbg = $(this).attr('altbg');
        $(this).attr('altbg', oldbg);
        $(this).attr('src', newbg);

        var oldTop = $(this).css('top');
        var newTop = $(this).attr('altTop');
        $(this).attr('altTop', oldTop);
        $(this).css('top', newTop);

        var oldRight = $(this).css('right');
        var newRight = $(this).attr('altRight');
        $(this).attr('altRight', oldRight);
        $(this).css('right', newRight);
    });
        
}

function toggleMaximize(wrapperId){
    //Check if we have the div to be maximazed if not then return
    if($('div#' + wrapperId).length == 0)
        return;
    if (hiddenitems == undefined || hiddenitems.length == 0) {
        hideAllAncestorialSiblings($('div#' + wrapperId));
        $('div#' + wrapperId).parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).addClass('maximizedwidth');
        });
        $('div#ds-body').attr('marginOld', $('div#ds-body').css('margin-left'));
        $('div#ds-body').css('margin-left', '0');
    } else {
        hiddenitems.show();
        hiddenitems = undefined;
        $('script').hide(); //makes sure no scripts are shown because of this.
        $('div#' + wrapperId).parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).removeClass('maximizedwidth');
        });
        $('div#ds-body').css('margin-left', $('div#ds-body').attr('marginOld'));
        $('div#ds-body').removeAttr('marginOld');
        try {
            matchHeights();
        } catch(e) {
        }
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




/*
* Method used to init the community collections tree
*/
function initCommCollLists(){
    var checkedButton = $('input[@name="scope"]:checked');
    var selectedValue = checkedButton.val();
    var mainlist = $('ul#aspect_duplicatechecker_DuplicateChecker_list_commCollList');
    mainlist.attr('style', 'margin-top:0px; padding-left:0px;margin-left:5px;')
    $('ul#aspect_metadataquality_QualityAssurance_list_firstList').attr('style', 'margin-bottom:0px;')
    var ulArr = $('ul#aspect_duplicatechecker_DuplicateChecker_list_commCollList ul');
    for(var i = 0; i < ulArr.length; i++){
        var current = $(ulArr.get(i));
        var label = current.prev().find("label");
        var input = label.find("input");
        if (input.length > 0) {
            input.insertBefore(label);
        }
        var lbltext = label.attr('innerHTML');
        label.attr('innerHTML', '');
        label.append('<a href="" onclick="return false;" class="communityCollapserLink"><span class="ui-icon ui-icon-triangle-1-e communityCollapser">&nbsp;</span>' + lbltext + '</a>');
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
        //doorloop alle 'ul's die ancestor zijn van het geselecteerde element en 'click' erop.
        ulArr = checkedButton.parents('ul');
        for(var i = 0; i < ulArr.length; i++){
            var current = $(ulArr.get(i));
            //Als de bovenste (relevante) 'ul' bereikt is mag de lus beindigd worden
            if (current.attr('id') == 'aspect_duplicatechecker_DuplicateChecker_list_commCollList')
                break;
            current.prev().find('label').click();
        }
        //door de clicks in de for lus hierboven wordt in IE het verkeerde element geselecteerd, dus selecteer terug het juiste
        checkedButton.attr('checked', 'true');
        $('p#aspect_metadataquality_QualityAssurance_p_openTreePara').hide();
//    }
}

/*
* Method used to init the onclick for the search location button (checks if location is checked)
*/
function initCheckLocButtons(){
    var button = $('input#aspect_duplicatechecker_DuplicateChecker_field_query_double_loc');
    button.bind('click', function(){
        var locRadios = $("input[name='location']");
        //Check if we have at least got a location checked
        if(!$("input[name='location']").is(":checked")){
            alert('Please select a community/collection to check');
            return false;
        }
    });
}

/*
* Method used to init the more info & the delete buttons
*/
//TODO: rename method
function initMoreInfoListRemoveDoublesList(){
    var delFields = $("tr[id^='aspect_duplicatechecker_DuplicateResults_row_deleteOption_']");
    for(var i = 0; i < delFields.length; i ++){

        var delField = $('tr#aspect_duplicatechecker_DuplicateResults_row_deleteOption_' + i);
        delField.removeClass('hiddenRow');
        delField[0].style.display = 'none';
        $('#aspect_duplicatechecker_DuplicateResults_field_delete_' + i).bind('click', function(){
            var delButton= $(this);
            var id = delButton[0].id.split("_")[delButton[0].id.split("_").length - 1];
            var delField = $('tr#aspect_duplicatechecker_DuplicateResults_row_deleteOption_' + id);
            delField = delField[0];
            if(delField.style.display == ''){
               delField.style.display = 'none';
            } else {
                delField.style.display = '';
            }
            try {
                matchHeights();
            } catch(e) {
            }
            return false;
        });
    }
}

function initEnableDuplicateButtons(){
    var buttons = $("table[id^='aspect_duplicatechecker_DuplicateResults_table_doubleTable']").find("input[type='submit']");
    buttons.removeClass('disabled').removeAttr('disabled');
}

function hideShowMoreInfoRow(link){
    var id_array = link.id.split("_");
    var id = id_array[id_array.length -2] + "_" + id_array[id_array.length - 1];
    var infoField = $("tr[id^='aspect.duplicatechecker.DuplicateResults.row.moreinfo_" + id + "']");
    infoField = infoField[0];
    if(infoField.style.display == ''){
       infoField.style.display = 'none';
       link.innerHTML = 'More Info';
    } else {
        infoField.style.display = '';
        link.innerHTML = 'Hide Info';
    }
    try {
        matchHeights();
    } catch(e) {
    }
    return false;

}

/**
* Called each time we press on a checkbox from an item
* Each time a checkbox is clicked the item dissapears out of the refer to item select box
* When all the items are checked remove all becomes the only row visible
*/
function updateDeleteOptions(checkbox){
    var postFix = checkbox.id.split('_')[1];
    //TODO: uncheck the checkbox of keep handle

    //Find the affected table
    var table = $('table#aspect_duplicatechecker_DuplicateResults_table_doubleTable-' + postFix);
    //Find the checkboxes that are not checked
    var checkboxes = table.find("input[id^='aspect.duplicatechecker.DuplicateResults.field.item_" + postFix + "_']:not(:checked)");
    if(checkboxes.length == 0){
        //They are all checked so hide the keep handle row cause we don't need it
        table.find("tr[id='aspect.duplicatechecker.DuplicateResults.row.deleteOption_" + postFix + "_handleRow']").hide();
        //And then check the delete everything option cause it is the only one left
        table.find("input[id='aspect.duplicatechecker.DuplicateResults.field.del_handle_opt_" + postFix + "']").attr('checked', 'checked');
        try {
            matchHeights();
        } catch(e) {
        }
    }else {
        table.find("tr[id='aspect.duplicatechecker.DuplicateResults.row.deleteOption_" + postFix + "_handleRow']").show();
        try {
            matchHeights();
        } catch(e) {
        }
    }

    //Now find the select
    var select = table.find("select[id='aspect.duplicatechecker.DuplicateResults.field.del_handle_" + postFix + "']");
    //First empty the select box
    select.empty();
    //Find the hidden select box from where we get our values
    var hiddenSelect = table.find(("select[id='" + select[0].id + "_hidden']"));

    for(var i = 0; i < checkboxes.length; i++){
        //Example ID: aspect.duplicatechecker.DuplicateResults.field.item_0_5
        //We need the 5 of this id
        var optionCounter = checkboxes[i].id.split('_')[2];
        //add +1 cause option id's count from 1 up
        optionCounter++;
        var optionToAdd = hiddenSelect.find("option[id^='" + select[0].id + "_Item" + optionCounter + "']");
        select.append(optionToAdd.clone());
    }
    //Make sure that we have an option selected
    select.selectedIndex = 0;
}

/**
* Checks if at least one checkbox is checked for delete of an item
*/
function checkDeleteOptions(button){
    var postFix = button.name.split('_')[2];

    //Find the affected table
    var table = $('table#aspect_duplicatechecker_DuplicateResults_table_doubleTable-' + postFix);
    //Find the checkboxes that are checked
    var deleteCheck = table.find("input[id='aspect.duplicatechecker.DuplicateResults.field.del_handle_opt_" + postFix + "_handle']");
    var checked = table.find("input[id^='aspect.duplicatechecker.DuplicateResults.field.item_" + postFix + "_']:checked");
    if(deleteCheck.is(':checked') && checked.length == 0){
        alert('Please select at least one item to delete');
        return false;
    }
    return true;
}
    

/*
* Method used to init the merge buttons
* (if no checkboxes are checked for merging, check them all & go to the merge page)
*/
function initMergeButtons(){
    var mergeButtons = $("input[id^='aspect_duplicatechecker_DuplicateResults_field_merge_']");
    mergeButtons.bind('click', function(){
        var mergeButton= $(this);
        var id = mergeButton[0].id.split("_")[mergeButton[0].id.split("_").length - 1];
        var itemCheckboxes = $("input[name^='item_" + id + "_']");
// Check if we got at LEAST 2 checkboxes checked
        var nrChecked = $("input[name^='item_" + id + "_']:checked").length;
        if(nrChecked == 0)
            itemCheckboxes.attr('checked', 'checked');
        else
        if (nrChecked == 1){
            alert('Please select at least 2 items to merge');
            return false;
        }

        return true;
    });
    var compButtons = $("input[id^='aspect_duplicatechecker_DuplicateResults_field_compare']");
    compButtons.bind('click', function(){
        var compButton= $(this);
        var id = compButton[0].id.split("_")[compButton[0].id.split("_").length - 1];
        var itemCheckboxes = $("input[name^='item_" + id + "_']");
// Check if we got at least 2 checkboxes checked
        var nrChecked = $("input[name^='item_" + id + "_']:checked").length;
        if(nrChecked == 0)
            itemCheckboxes.attr('checked', 'checked');
        else
        if (nrChecked == 1){
            alert('Please select at least 2 items to compare');
            return false;
        }

        return true;
    });
}

/*******************/
/* COMPARE METHODS */
/*******************/

/*
* Function used if a checkbox is clicked on the top of the compare box then make sure the box is also checked below
*/
function keepCheckboxesMatched(genId, pos){
    //Check if the checkbox clicked is checked or not
    var checked = $('input[id="' + pos + ':' + genId + '"]').is(':checked');

    var checkBoxes = $("input[id$='" + genId + "']");
    if(checked)
        checkBoxes.attr('checked', 'checked');
    else
        checkBoxes.removeAttr('checked');
}

/*
* Function used to make sure that the user has checked at LEAST 2 checkboxes from items to merge/compare
*/
function checkCheckBoxes(buttonClicked){
    var boxIdsPrefix = "top:item_" + buttonClicked.name.split("_")[1] + "_";
    //Now find em
    var checks = $("input[id^='" + boxIdsPrefix + "']:checked");
    if(checks.length < 2){
        alert('Please select at least 2 items');
        return false;
    }
    return true;
}

function toggleOneHelpFunction(divId){
    $("div#" + divId).slideToggle('fast', function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });
}

function toggleViewTable(imgId, tableId){
    var table = $("table#" + tableId);
    var fadeDiv = $('<div/>');
    if (table.is(':hidden')) {
        fadeDiv.hide();
    }
    table.before(fadeDiv);
    fadeDiv.append(table);
    if (fadeDiv.is(':visible')) {
        fadeDiv.slideUp("fast", function() {
            table.hide();
            fadeDiv.after(table);
            fadeDiv.remove();
            try {
                matchHeights();
            } catch(e) {
            }
        });
    }
    else {
        table.show();
        fadeDiv.slideDown("fast", function() {
            fadeDiv.after(table);
            fadeDiv.remove();
            try {
                matchHeights();
            } catch(e) {
            }
        })    }
    swapFoldImage("img#" + imgId);
}

function swapFoldImage(id) {
      var currentsrc = $(id).attr('src');
      var altsrc = $(id).attr('altsrc');
      $(id).attr('altsrc', currentsrc);
      $(id).attr('src', altsrc);
}



/*****************/
/* MERGE METHODS */
/*****************/
function initSelectAllButtons(){
    //Init the select for the metadata
    var selectAllMeta = $('#aspect_duplicatechecker_DuplicateMergeStart_field_select_metadata');

    selectAllMeta.bind('click', function(){
        var select = $('#aspect_duplicatechecker_DuplicateMergeStart_field_all_metadata_selector')[0];
        var startId = select.options[select.selectedIndex].value;
        //Now that we got the startID find the radiobuttons to check (I love jquery)
        var radioButtons = $("input[id*='" + startId + "']");
        //Find the none radiobuttons and check them all !
        $("input[id^='metadataNone_']").attr('checked', 'checked');
        //And now we check all the onces we need (so the none will be unchecked where not needed
        radioButtons.attr('checked', 'checked');
        //After we checked the radio hide all the compose rows
        radioButtons.click();
//        var mergeRows = $("tr[id$='_row']");
//        mergeRows.css('display', 'none');
        return false;
    });

    var selectAllBits = $('#aspect_duplicatechecker_DuplicateMergeStart_field_select_bitstreams');

    selectAllBits.bind('click', function(){
        var select = $('#aspect_duplicatechecker_DuplicateMergeStart_field_all_bitstream_selector')[0];
        var startId = select.options[select.selectedIndex].value;
        //Now find the checkboxes to check
        var checks = $("input[id^='" + startId + "']");
        //Now that we found em check em all
        checks.attr('checked', 'checked');
        return false;
    });
}

function initSortTables(){
    var sortTables = $("table[id^='metadataField_'][id$='_sort']");
    for(var i = 0; i < sortTables.length; i++)
        $('#' + sortTables[i].id).tableDnD();
}

function showHideMergeRow(show, mergeRowId){
    //What we need to do first is check if have been reodering the values
    var reOrderButton = $("input#metadataField_" + mergeRowId + "_selectButton");
    //We only have one options so no need to show it
    if(reOrderButton.length == 0)
        return;

    if(reOrderButton[0].style.display == 'block'){
        //We are showing our reoderbutton convert back to compose values
        StartReselect(reOrderButton[0]);
    }

    //What we need to do is show/hide all the rows that we need for the compose
    //Find the main row in which all the rest is located
    var trRow = $('tr#metadataField_' + mergeRowId + '_row');
    var optionRows = trRow.find("tr[id^='" + mergeRowId + "_'][id$='_moveRow']");
    //Find our '......' row to show/hide
    var dotsRow = trRow.find('tr#metadataField_' + mergeRowId + '_dotsRow');
    //Find our order button row to show/hide
    var buttonRow = trRow.find('tr#metadataField_' + mergeRowId + '_buttons');

    //Good we have our option rows now show/hide em
    if(show){
        optionRows.css('display', '');
        dotsRow.css('display', 'none');
        buttonRow.css('display', '');
        try {
            matchHeights();
        } catch(e) {
        }
    }else{
        dotsRow.css('display', '');
        buttonRow.css('display', 'none');
        //We only need to hide everything but the first two
        for(var i = 2; i < optionRows.length; i ++){
            optionRows[i].style.display = 'none';
        }
        try {
            matchHeights();
        } catch(e) {
        }
    }
}

function checkComposeValue(checkId){
    //First check if our compose box is checked
    var compRadioId = checkId.split('_')[0] + '_' + checkId.split('_')[1] + '_merge';
    //Find the compRadio
    var compRadio = $('input#' + compRadioId);
    if(compRadio.is(':checked')){
        //If this one is checked then check/uncheck our checkbox
        $('input#' + checkId).click();
    }else{
        compRadio.click();
    }
}

function EnableReorderButton(checkbox){
    //First get the table (find a jquery object & get the parents)
    var table = $('input#' + checkbox.id).parent().parent().parent();
    //The reorder button
    var buttonId = 'metadataField_' + checkbox.id.split("_")[0] + "_" + checkbox.id.split("_")[1] + "_" + checkbox.id.split("_")[2] + '_orderButton';
    var button = $("input#" + buttonId + ":first");
    //Get all the checked checkboxes
    if(2 <= table.find(":input:checked").length){
        //Get the reorder button for this one
        button.removeClass('disabled').removeAttr('disabled');
    }else
        button.addClass('disabled').attr('disabled', 'disabled');
}

function StartReorder(reorderButton){
    //Example: metadataField_description_null_orderButton
    //We need to remove the "orderButton" suffix from the id
    var origId = reorderButton.id.substring(0, (reorderButton.id.length - "_orderButton".length));
    var tableSortId = origId + "_nosort";
    var noSortTable = $('table#' + tableSortId);
    var nonChecks = noSortTable.find(":checkbox:not(:checked)");


    //Now find all the once who are checked & move them to the sort table
    var checks = noSortTable.find(":checkbox:checked");
    //Get the rows in which our metadata fields are in
    var rows = checks.parent().parent();

    //Now we find the sorting table
    var sortTable = $('table#' + origId + '_sort');
    //Find the last row
    var lastRow = sortTable.find("tr:last");
    //Now insert before the last row the current row we got here
    rows.insertBefore(lastRow);

    //Give the checkboxes to be ordered
    ReOrderCheckboxesIds(sortTable, 0);
    //Give the non selected checkboxes new id's (the last ones available)
    ReOrderCheckboxesIds(noSortTable, (sortTable.find(":checkbox").length));

    var sortTableChecks = sortTable.find(":checkbox");
    //From the sorttable make sure the checkboxes in question are checked (IE6 bug)
    sortTableChecks.attr('checked', 'checked');
    //Once checked disable them
    sortTableChecks.attr('disabled', 'disabled');
    //Disabled the nosorttable checkboxes
    noSortTable.find(":checkbox").attr("disabled", "disabled");

    //Now show the arrows which can be found in a hidden td
    sortTable.find("table[id$='_arrowTable']").css('visibility', '');

    //First hide the label from the checkboxs(cause it cannot be dragged)
    sortTable.find("td[id$='_label']").hide();
    //Next show the draggable text (txt is the same as previous hidden element but this one is draggable)
    sortTable.find("td[id$='_drag']").show();

    //Call method to show hide arrows & put the names right
    ReOrderCheckboxesIds(sortTable, 0);
    //Serialize the drag n drop table so we can drag & drop
    sortTable.tableDnD({
        onDragClass: "dragMergeMetadata",
        onDrop: function(table, row){
            //We need a jquery object
            ReOrderCheckboxesIds($('table#' + table.id), 0);
            //Remove the class that is set when start to drag
            $(row).find("td").removeClass('dragMergeMetadata');

        },
        onDragStart: function(table, row){
            // TODO: fadeout maken
            //TODO: zien dat de row
            //Give a background color to the
            $(row).find("td").addClass('dragMergeMetadata');
            //First fade out the arrows
            $(table).find("tr[id$='_arrowUp'],[id$='_arrowDown']").css('visibility', 'hidden');
        }
    });
    sortTable.serialize();

    //Find & hide the reorder button & show the select values button
    reorderButton.style.display = "none";
    var selectValuesButton = $('input#' + origId + '_selectButton');
    selectValuesButton.css('display', 'block');
    try {
        matchHeights();
    } catch(e) {
    }
}

/*
* Moves the rows from the sorted table to select table
*/
function StartReselect(reselectButton){
    //Example: metadataField_description_null_selectButton
    //We need to remove the "selectButton" suffix from the id
    var origId = reselectButton.id.substring(0, (reselectButton.id.length - "_selectButton".length));
    //Now we find the sorting & the non sorting table
    var sortTable = $('table#' + origId + '_sort');
    var noSortTable = $('table#' + origId + "_nosort");

    //What we need to do is get all the rows from the sort table and move them on TOP of the no sort table
    var sortRows = sortTable.find(":checkbox").parent().parent();

    //Find the first row of the noSortTable (insert be4 this one)
    var firstRow = noSortTable.find("tr:first");
    sortRows.insertBefore(firstRow);

    //Make sure that the checkboxes are checked after they are set in the nosorttable (IE6 BUG)
    sortRows.find(":input").attr('checked', 'checked');

    //From the nosorttable hide all the checkboxes & show the checked img's
    noSortTable.find("td[id$='_checkbox']").show();
//    noSortTable.find("td[id$='_checkboxImg']").hide();
    //Enabled all the checkboxes
    noSortTable.find(":checkbox").removeAttr('disabled');

    //Hide the arrows
    var arrowTables = noSortTable.find("table[id$='_arrowTable']");
    arrowTables.css('visibility', 'hidden');
    arrowTables.find("tr[id$='_arrowUp'],[id$='_arrowDown']").css('visibility', 'hidden');
    //Show the labels (checkbox labels)
    noSortTable.find("td[id$='_label']").show();
    //Hide the drag labels
    noSortTable.find("td[id$='_drag']").hide();


    //Finish up by displaying the reorder button
    reselectButton.style.display = "none";
    var reorderButton = $('input#' + origId + '_orderButton');
    reorderButton.css('display', 'block');
    try {
        matchHeights();
    } catch(e) {
    }

}

function ReOrderCheckboxesIds(table, startIndex){
    //First find all the checkboxes beloning to this table (these need to renamed)
    var checkboxes = table.find(":checkbox");
    //Get the rows the checkboxes belong to
    var rows = checkboxes.parent().parent();

    //Hide the fullheightfixers it's time to show the arrows
    $(table).find("tr[id$='_heightFixerFull']").hide();

    for(var i = 0; i < rows.length; i++){
        //Show all the arrows
        
        //Only hide arrows for the sorting table
        if(startIndex == 0){
            var showHeightFixer = false;
            var arrowUp = table.find("tr[id='" + checkboxes[i].id + "_arrowUp']")
            var arrowDown = table.find("tr[id='" + checkboxes[i].id + "_arrowDown" + "']");
            if(i == 0){
                //Hide the up arrow from the first row
                arrowUp.css('visibility', 'hidden');
                showHeightFixer = true;
            }else{
                arrowUp.css('visibility', 'visible');
            }
            if(i == (rows.length - 1)){
                //Hide the down arrow for the last row
                arrowDown.css('visibility', 'hidden');
                showHeightFixer = true;
            }else{
                arrowDown.css('visibility', 'visible');
            }
        }
        var newIndex = (rows[i].rowIndex + startIndex);
        //Remove the old index of the row
        var newName = checkboxes[i].name.substring(0, checkboxes[i].name.lastIndexOf('_'));
        //Add the new index
        newName += '_' + newIndex;
        //Set the new index to the
        checkboxes[i].name = newName;
    }
}

/**
* Function used by the arrows top move the row up/down
*/
function moveMergeRow(rowId, up){
    //Find the row on which we clicked the img from
    var row = $('tr#' + rowId);
    var rowIndex = row[0].rowIndex;
    var parentRows = row.parent().children();

    if(up){
        //We are moving up
        var rowBefore = $('#' + parentRows[rowIndex - 1].id);
        row.insertBefore(rowBefore);
    }
    else{
        //We are moving up
        var rowAfter = $('#' + parentRows[rowIndex + 1].id);
        row.insertAfter(rowAfter);
    }
// Only needed for IE6 so only do it for IE6
    if(IE6)
        row.find(":checkbox").attr('checked', 'checked');
    
    var sortTable = parentRows.parent().parent();
    ReOrderCheckboxesIds(sortTable, 0);
//    alert('click');
}

/**
* Function used to select/deselect all bit streams beloning to the bundle checkbox clicked
*/
function selectAllBitsBundle(bundleCheckBox){
    //Find all the bitstream checkboxes belonging to this bundle
    var bitChecks = $("input[name^='" + bundleCheckBox.name + "']");
    if(bundleCheckBox.checked){
        //We got our bundleCheckbox checked so check all the bitstreams beloning to this one
        bitChecks.attr('checked', 'checked');
    }else{
        //Unselect all the bit checkboxes
        bitChecks.removeAttr('checked');
    }
}

/**
* Function used to show/hide the bitstreams beloning to a certain bundle
*/
function showBitsFromBundle(link, startId, pathImgDown, pathImgLeft){
    //Find the ul we are supposed to show/hide
    var bitList = $('ul#' + startId + '_bitstreams');
    if(bitList.is(':hidden')){
        $(link).find("img").attr('src', pathImgDown);
    }
    else {
        $(link).find("img").attr('src', pathImgLeft);
    }
    bitList.slideToggle('fast', function(){
        try {
            matchHeights();
        } catch(e) {
        }
    });
}


function showHideFulltext(link, fulltextId){
    var fulltext = $('span[id="' + fulltextId + '"]');
    if(fulltext.is(':hidden')){
// Show the full text
        fulltext.show();
        $(link).html('Hide full');
        try {
            matchHeights();
        } catch(e) {
        }
    }else{
        fulltext.hide();
        $(link).html('Show full');
        try {
            matchHeights();
        } catch(e) {
        }
    }

}




/*
function swapImage(id) {
    var img = $("img#" + id + "_img");
    var state = $("div#"+ id).css('display');

    if (state) { //dit voorkomt dat de status van menublokken die op de huidige pagina niet bestaan wordt weggegooid.
        if (state != 'none') {
            img.attr('src', arrowLeftSrc);
        } else {
            img.attr('src', arrowDownSrc);
        }
    }
}

function swapImageDirect(idImage, value) {
    var img = $("img#" + idImage);
    img.attr('src', value);
}
*/
