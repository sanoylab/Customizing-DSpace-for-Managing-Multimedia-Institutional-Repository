var hiddenitems;


jQuery.extend(
    jQuery.expr[':'], {
        regex: function(a, i, m, r) {
            var r = new RegExp(m[3], 'i');
            return r.test(jQuery(a).attr('id'));
        }
    }
);

if (typeof window.Atmire === "undefined") {
    window.Atmire = {};
}

if (typeof window.Atmire.Utils === "undefined") {
    window.Atmire.Utils = {};
}

if (typeof window.Atmire.Mqm === "undefined") {
    window.Atmire.Mqm = {};
}

if (typeof window.Atmire.Mqm.Batchedit === "undefined") {
    window.Atmire.Mqm.Batchedit = {};
}

window.Atmire.Utils.getContextPath = function() {
    return $('[name="contextpath"]').val();
};

function getContextPath() {
    return window.Atmire.Utils.getContextPath();
}

function initSearchTools() {
    var numFields = $("input#aspect_metadataquality_QualityAssurance_field_num_search_field").attr('value');
    for (var i = 1; i <= numFields; i++) {
        $("img#aspect_metadataquality_QualityAssurance_field_addButton" + i).click(function() {
            return addSearchRow('QualityAssurance');
        });
        if (i > 1) {
            $("img#aspect_metadataquality_QualityAssurance_field_delButton" + i).click(function() {
                return delSearchRow(this.id, 'QualityAssurance');
            });
        }
    }
}

//Geeft alle substrings terug van string die aan de regex voldoen.
function matchAll(regex, string){
    var resultarr = new Array();
    var arr = string.match(regex);
    while (arr != undefined && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            string = string.replace(arr[i], '');
        }
        resultarr = resultarr.concat(arr);
        arr = string.match(regex);
    }
    return resultarr;
}


function addSearchRow(transformername){
    var lastrow = $('table#aspect_metadataquality_' + transformername + '_table_searchParamTable tr:last-child');
    if (!lastrow.is(':visible')) {
        lastrow.show();
    }
    else {
        var parity = 'odd';
        var oddIndex = lastrow.attr('class').indexOf('odd');
        if (oddIndex > -1)
            parity = 'even';

        var rowIdPrefix = "aspect_metadataquality_" + transformername + "_row_searchrow";
        var lastindex = lastrow.attr('id').replace(rowIdPrefix, "");
        var index = parseInt(lastindex) + 1;

        var innerHTML = lastrow.html();

        //verwijdert alle jquery attributen die in IE worden toegevoegd.
        var jCrappy = matchAll(' ?jQuery\\d*="?\\d*"?', innerHTML);
        if (jCrappy != undefined && jCrappy.length > 0){
            for (var i = 0; i < jCrappy.length; i++){
                innerHTML = innerHTML.replace(jCrappy[i], '');
            }
        }

        //Zoekt alle id's en names in innerHTML en vervangt ze door id's en names met de nieuwe index.
        var matches = matchAll('id="?[a-z,A-Z,_]*|name="?[a-z,A-Z,_]*', innerHTML);
        var newValues = new Array(matches.length);
        for (var i = 0; i < matches.length; i++){
            var closer = '';
            if (matches[i].indexOf('"') > 0) //IE sucks!!! (gebruikt soms quotes, en soms niet)
                closer = '"';
            if (matches[i].indexOf('conjunction') > 0){
                newValues[i] = matches[i] + lastindex + closer;
                var lastconindex = lastindex - 1;
                matches[i] = matches[i] + lastconindex + closer;
            }
            else {
                newValues[i] = matches[i] + index + closer;
                matches[i] = matches[i] + lastindex + closer;
            }
        }
        for (var i = 0; i < matches.length; i++){
            innerHTML = innerHTML.replace(matches[i], newValues[i]);
        }

        var newrowid = 'aspect_metadataquality_' + transformername + '_row_searchrow' + index;
        var newrowHTML = '<tr id="' + newrowid + '" class="ds-table-row ' + parity + '">';
        newrowHTML += innerHTML;
        newrowHTML += '</tr>';
        var table = lastrow.parent();
        table.append(newrowHTML);
        $('tr#' + newrowid).find('input[type="text"]').attr('value', '');
        $("img#aspect_metadataquality_" + transformername + "_field_addButton" + index).bind('click', function() {
            return addSearchRow(transformername);
        });
        $("img#aspect_metadataquality_" + transformername + "_field_delButton" + index).bind('click', function() {
            return delSearchRow(this.id, transformername);
        });
    }

    var numOfields = $("input#aspect_metadataquality_" + transformername + "_field_num_search_field");
    var numfields = numOfields.attr('value');
    numfields++;
    numOfields.attr('value', numfields);


    try {
        matchHeights();
    } catch(e) {
    }
//    TR's sliden niet omdat er een bug zit in het slide effect van jquery voor TR's
//    $('tr#aspect_metadataquality_QualityAssurance_row_searchrow' + index).slideDown("fast");
    return false;
}

function delSearchRow(buttonid, transformername){
    var row = $($("img#" + buttonid).parents("tr").get(0));
//    TR's sliden niet omdat er een bug zit in het slide effect van jquery voor TR's
//    row.slideUp("fast");
    var table = row.parent();

    var numfields = $('table#aspect_metadataquality_QualityAssurance_table_searchParamTable tr.ds-table-row:visible');
    if (numfields > 2) {
        row.remove();
    }
    else {
        row.find('input[type="text"]').attr('value', '');
        row.hide();
    }
    table.find("tr:nth-child(even)").attr('class', 'ds-table-row even');
    table.find("tr:nth-child(odd)").attr('class', 'ds-table-row odd');
    table.find("tr:first-child").attr('class', 'ds-table-header-row');

    try {
        matchHeights();
    } catch(e) {
    }
    return false;
}

function initActions(){
    var parity = 'even';
    var list = $("fieldset#aspect_metadataquality_batchedit_BatchActionTransformer_list_actionList");
    if (list.length != 0) {
//        list.hide();
        list.find("ol").hide();
        $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_remCollList').hide();
        initAddCollList();
        initMoveCollList();
        list.append('<ol id="aspect_metadataquality_batchedit_BatchActionTransformer_list_dynamicactionList" nrActions="0"/>');
        addEmptyActionRow();
    }
    //This is needed to ensure that the delimiter input text box only has one char in it
    $('input#aspect_metadataquality_batchedit_BatchActionTransformer_field_delimiter').attr('maxlength', '1');
    $('[name="perform"], input[name="add_to_queue"]').addClass('ds-button-field').attr('disabled', 'disabled').addClass('disabled').removeAttr('onclick').click(performSubmit);
}


function createActionHTML(parity, nr){
    var content = '<li id="aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow' + nr + '" class="ds-form-item ' + parity + '" style="display:none;">';
    content += '<table class="actiontable">';
    content += '<tr class="' + parity + '">';
    content += '<td class="actionTd" valign="top">';
    content += getActionHTML(nr);
    content += '</td>';
    content += '<td class="contentTd">';
    content += '<span id="aspect_metadataquality_batchedit_BatchActionTransformer_list_actionChoice' + nr + '" currentContent="remove">';
    content += getLanguageHTML(nr);
    content += getFieldHTML(nr);
    content += getFilterHTML(nr);
    content += '<span id="aspect_metadataquality_batchedit_BatchActionTransformer_list_filterChoice' + nr + '" currentContent="not used" style="display:none;">';
    content += getValueHTML(nr);
    content += "</span>";
    content += "</span>";
    content += '</td>';
    content += '<td class="buttonsTd">';
    content += getAddButtonHTML(nr);
    content += getDelButtonHTML(nr);
    content += '</td>';
    content += '</tr>';
    content += '</table>';
    content += '</li>';
    return content;
}

function addActionRow(id){
    var list = $("ol#aspect_metadataquality_batchedit_BatchActionTransformer_list_dynamicactionList");
    var nrActions = list.data('nrActions');
    //in IE is een attribuut met waarde '0' undefined
    if (nrActions == undefined)
        nrActions = 0;
//    if (nrActions == 0){
////        list.find("li:last-child").find("input[@id*='aspect_metadataquality_batchedit_BatchActionTransformer_field_actionDelButton']").fadeIn("fast");
//        var row = $('li#aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow0');
//        row.slideUp("fast");
//        row.remove();
//    }
    nrActions++;
    list.data('nrActions', nrActions);
    var nr = 1;
    while ($('select#aspect_metadataquality_batchedit_BatchActionTransformer_field_actions'+nr).length != 0)
        nr++;
    var lastLi = $("li#" + id);
    var parity = 'even';
    if (lastLi.is(':not(:only-child)') && lastLi.is(':even'))
        parity = 'odd';
    lastLi.after(createActionHTML(parity, nr));
    $("img#aspect_metadataquality_batchedit_BatchActionTransformer_field_actionAddButton" + nr).bind('click', function(){
        addActionRow("aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow" + nr);
    });
    $("img#aspect_metadataquality_batchedit_BatchActionTransformer_field_actionDelButton" + nr).bind('click', function(){
        delActionRow("aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow" + nr);
    });
    $("select#aspect_metadataquality_batchedit_BatchActionTransformer_field_filters" + nr).bind('change', function() {
        filterChangeAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_filters" + nr, nr);
    });
    $("select#aspect_metadataquality_batchedit_BatchActionTransformer_field_actions" + nr).bind('change', function() {
        actionChangeAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_actions" + nr, nr);
    });
    var textbox = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//    textbox.bind('blur', function() {
//        textboxBlurAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//    });
    textbox.bind('focus', function() {
        textboxFocusAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
    });
    textboxBlurAction(textbox.attr('id'));
    if (nrActions == 1){
//        list.find("li:last-child").find("input[@id*='aspect_metadataquality_batchedit_BatchActionTransformer_field_actionDelButton']").fadeIn("fast");
        var row = $('li#aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow0');
        row.slideUp("fast");
        row.remove();
    }
    $('li#aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow' + nr).slideDown("fast", function() {
        try {
            matchHeights();
        } catch(e) {
        }
    });
    list.find('li:odd').animate({ backgroundColor: "#fafafa" }, 'fast');
    list.find('li:even').animate({ backgroundColor: "#FFFFFF" }, 'fast');
    updatePerformButtonStatus();
}

function delActionRow(id){
    $('li#'+id).slideUp("fast", function() {
        $('li#'+id).remove();
        var list = $("ol#aspect_metadataquality_batchedit_BatchActionTransformer_list_dynamicactionList");
        list.find('li:odd').animate({ backgroundColor: "#fafafa" }, 'fast');
        list.find('li:even').animate({ backgroundColor: "#FFFFFF" }, 'fast');
        var nrActions = parseInt(list.data('nrActions'));
        nrActions--;
        if (nrActions == 0){
//            list.find("li:last-child").find("input[@id*='aspect_metadataquality_batchedit_BatchActionTransformer_field_actionDelButton']").fadeOut("fast");
            addEmptyActionRow();
        }
        list.data('nrActions', nrActions);
        updatePerformButtonStatus();
        try {
            matchHeights();
        } catch(e) {
        }
    });
}

function addEmptyActionRow(){
    var list = $("ol#aspect_metadataquality_batchedit_BatchActionTransformer_list_dynamicactionList");
    var nr = 0;
    var parity = 'even';
    var content = '<li id="aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow' + nr + '" class="' + parity + '" style="padding: 5px; display:none;"><div class="ds-form-content">';
    content += $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_emptyItem").children()[0].innerHTML;
    content += getAddButtonHTML(nr);
    content += '</div>';
    content += '</li>';
    list.append(content);
    $("img#aspect_metadataquality_batchedit_BatchActionTransformer_field_actionAddButton" + nr).css('display','inline');
    $("img#aspect_metadataquality_batchedit_BatchActionTransformer_field_actionAddButton" + nr).bind('click', function(){
        addActionRow("aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow" + nr);
    });
    $('li#aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow' + nr).slideDown("fast", function() {
        try {
            matchHeights();
        } catch(e) {
        }
    });
}

function getAddButtonHTML(nr) {
    return '<img name="actionAddButton' + nr + '" class="adButtonImg" id="aspect_metadataquality_batchedit_BatchActionTransformer_field_actionAddButton' + nr + '" src="' + getContextPath() + '/aspects/Datatables/shared/images/details_open.png"/>';
}

function getDelButtonHTML(nr) {
    return '<img name="actionDelButton' + nr + '" class="adButtonImg" id="aspect_metadataquality_batchedit_BatchActionTransformer_field_actionDelButton' + nr + '" src="' + getContextPath() + '/aspects/Datatables/shared/images/details_close.png"/>'
}

function actionChangeAction(selectId, nr) {
    var selectedValue = $("select#" + selectId + " option:selected").attr('value');
    var span = $("span#aspect_metadataquality_batchedit_BatchActionTransformer_list_actionChoice" + nr);
    if (selectedValue != span.attr("currentContent")) {
        if (selectedValue == 'remove') {
            span.fadeOut("fast", function(){
                span.attr('innerHTML', '');
                var content = getLanguageHTML(nr);
                content += getFieldHTML(nr);
                content += getFilterHTML(nr);
                content += '<span id="aspect_metadataquality_batchedit_BatchActionTransformer_list_filterChoice' + nr + '" currentContent="not used" style="display:none;">';
                content += getValueHTML(nr);
                content += "</span>";
                span.append(content);
                $("select#aspect_metadataquality_batchedit_BatchActionTransformer_field_filters" + nr).bind('change', function(){
                    filterChangeAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_filters" + nr, nr);
                });
                var textbox = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                textbox.bind('blur', function(){
//                    textboxBlurAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                });
                textbox.bind('focus', function(){
                    textboxFocusAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
                });
                textboxBlurAction(textbox.attr('id'));
                span.fadeIn("fast");
            });
        }
        else if (selectedValue == 'insert') {
            span.fadeOut("fast", function(){
                span.attr('innerHTML', '');
                var content = getValueHTML(nr);
                content += '<span>&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_inItem").children()[0].innerHTML + '</span>';
                content += '<span>&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_toItem").children()[0].innerHTML + '</span>';
                content += getLanguageHTML(nr);
                content += getFieldHTML(nr);
                content += getExistHTML(nr);
                span.append(content);
                $("select#aspect_metadataquality_batchedit_BatchActionTransformer_field_properties" + nr).bind('change', function() {
                    propertyChangeAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_properties" + nr, nr);
                });
                var textbox = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                textbox.bind('blur', function(){
//                    textboxBlurAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                });
                textbox.bind('focus', function(){
                    textboxFocusAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
                });
                textboxBlurAction(textbox.attr('id'));
                span.fadeIn("fast");
            });
        }
        else if (selectedValue == 'move' || selectedValue == 'copy') {
            span.fadeOut("fast", function(){
                span.attr('innerHTML', '');
                var content = getLanguageHTML(nr);
                content += getFieldHTML(nr);
                content += getFilterHTML(nr);
                content += '<span id="aspect_metadataquality_batchedit_BatchActionTransformer_list_filterChoice' + nr + '" currentContent="not used" style="display:none;">';
                content += getValueHTML(nr);
                content += "</span>";
                content += '<span>&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_toItem").children()[0].innerHTML + '</span>';
                content += getLanguageHTML("to" + nr);
                content += getFieldHTML("to" + nr);
                span.append(content);
                $("select#aspect_metadataquality_batchedit_BatchActionTransformer_field_filters" + nr).bind('change', function(){
                    filterChangeAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_filters" + nr, nr);
                });
                var textbox = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                textbox.bind('blur', function(){
//                    textboxBlurAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                });
                textbox.bind('focus', function(){
                    textboxFocusAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
                });
                textboxBlurAction(textbox.attr('id'));
                span.fadeIn("fast");
            });
        }
        else if (selectedValue == 'replace') {
            span.fadeOut("fast", function(){
                span.attr('innerHTML', '');
                var content = getValueHTML(nr);
                content += '<span>&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_withItem").children()[0].innerHTML + '</span>';
                content += getValueHTML("to" + nr);
                content += '<span>&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_inItem").children()[0].innerHTML + '</span>';
                content += getLanguageHTML(nr);
                content += getFieldHTML(nr);
                span.append(content);
                $("select#aspect_metadataquality_batchedit_BatchActionTransformer_field_properties" + nr).bind('change', function() {
                    propertyChangeAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_properties" + nr, nr);
                });
                var textbox = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                textbox.bind('blur', function(){
//                    textboxBlurAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
//                });
                textbox.bind('focus', function(){
                    textboxFocusAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
                });
                textboxBlurAction(textbox.attr('id'));
                textbox = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_valueto" + nr);
//                textbox.bind('blur', function(){
//                    textboxBlurAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_valueto" + nr);
//                });
                textbox.bind('focus', function(){
                    textboxFocusAction("aspect_metadataquality_batchedit_BatchActionTransformer_field_valueto" + nr);
                });
                textboxBlurAction(textbox.attr('id'));
                span.fadeIn("fast");
            });
        }
        else if (selectedValue == 'modify') {
            span.fadeOut("fast", function(){
                span.attr('innerHTML', '');
                var content = getLanguageHTML(nr);
                content += getFieldHTML(nr);
                content += getModifyHTML(nr);
//                content += '<span id="aspect_metadataquality_batchedit_BatchActionTransformer_list_filterChoice' + nr + '" currentContent="not used" style="display:none;">';
//                content += getValueHTML(nr);
//                content += "</span>";
                span.append(content);


                span.fadeIn("fast");
            });
        }
        else if (selectedValue == 'split'){
            span.fadeOut("fast", function(){
                span.attr('innerHTML', '');
                var content = getFieldHTML(nr);
                content += getSplitHTML(nr);
//                content += '<span id="aspect_metadataquality_batchedit_BatchActionTransformer_list_filterChoice' + nr + '" currentContent="not used" style="display:none;">';
//                content += getValueHTML(nr);
//                content += "</span>";
                span.append(content);


                span.fadeIn("fast");
            });
        }
        span.attr("currentContent", selectedValue);
    }
}

function filterChangeAction(selectId, nr){
    var span = $("span#aspect_metadataquality_batchedit_BatchActionTransformer_list_filterChoice" + nr);
    var selectedValue = $("select#" + selectId + " option:selected").val();
    if (selectedValue != span.attr("currentContent")) {
        if (selectedValue == 'not used') {
            span.fadeOut("fast");
        }
        else {
            span.fadeIn("fast");
        }
        span.attr("currentContent", selectedValue);
    }
}

function propertyChangeAction(selectId, nr){
    var fieldKey = $("select#" + selectId + " option:selected").text().replace(/\./g, "_");
    var choiceSupportItem = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_choiceSupportItem_" + fieldKey);
    if (choiceSupportItem.length > 0) {
        var fromInput = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
        if (fromInput) {
            var content = choiceSupportItem.children()[0].innerHTML;

            var regex = new RegExp("(" + fieldKey + "(_authority|_confidence)?)", "g");
            // e.g. for the fieldkey "dc_title" this regex will match "dc_title",
            // "dc_title_authority" and "dc_title_confidence". The outer parenthesis
            // are there to make sure you can use the matched string as a variable
            // in the replace ($1 for the first, $2 for the second, ...), the "g"
            // parameter tells it to match all occurences, not just the first one

            var fromContent = content.replace(regex, "$1" + nr);
            // This replace will find all fields matching the regex, and replace them with
            // the string they matched followed by 'nr'

            var fromSpan = $('<span id="valueFromSpan' + nr + '" class="acValueWrapper">' + fromContent + '</span>');

            fromInput.replaceWith(fromSpan);

            fromSpan.find('input.lookup-button').click(function() {
                var name = fromSpan.find('input#aspect_metadataquality_batchedit_BatchActionTransformer_field_' + fieldKey + nr).attr('name');
                DSpaceChoiceLookup(
                        getContextPath() + '/admin/lookup', //URL
                        fieldKey, //FieldKey
                        'valueFromSpan' + nr, //ID of wrapper
                        fieldKey + nr, //name of textbox
                        fieldKey + "_authority" + nr, //name of Authority ID field
                        'aspect_metadataquality_batchedit_BatchActionTransformer_field_' + fieldKey + '_confidence' + nr + '_indicator', //ID of confidence indicator img
                        -1, //collection ID
                        false, //isName
                        false //isRepeatable
                );
            });
            fromSpan.find('input[name ="' + fieldKey + '_authority' + nr + '"]').change(function() {
                DSpaceAuthorityOnChange(this, $(this).siblings('input[name = ' + fieldKey + '_confidence' + nr + ']'), $(this).siblings('img:first'))
            });

            var toInput = $("input#aspect_metadataquality_batchedit_BatchActionTransformer_field_valueto" + nr);
            if (toInput) {
                var toContent = content.replace(regex, "$1to" + nr);
                var toSpan = $('<span id="valueToSpan' + nr + '" class="acValueWrapper">' + toContent + '</span>');
                toInput.replaceWith(toSpan);
                toSpan.find('input.lookup-button').click(function() {
                    var name = toSpan.find('input#aspect_metadataquality_batchedit_BatchActionTransformer_field_' + fieldKey + "to" + nr).attr('name');
                    DSpaceChoiceLookup(
                            getContextPath() + '/admin/lookup', //URL
                            fieldKey, //FieldKey
                            'valueToSpan' + nr, //ID of wrapper
                            fieldKey + "to" + nr, //name of textbox
                            fieldKey + "_authorityto" + nr, //name of Authority ID field
                            'aspect_metadataquality_batchedit_BatchActionTransformer_field_' + fieldKey + '_confidenceto' + nr + '_indicator', //ID of confidence indicator img
                            -1, //collection ID
                            false, //isName
                            false //isRepeatable
                    );
                });
                toSpan.find('input[name ="' + fieldKey + '_authorityto' + nr + '"]').change(function() {
                    DSpaceAuthorityOnChange(this, $(this).siblings('input[name = ' + fieldKey + '_confidenceto' + nr + ']'), $(this).siblings('img:first'))
                });
            }

        }
    } else {
        var fromSpan = $('span#valueFromSpan' + nr);
        if (fromSpan.length > 0) {
//            var fromVal = fromCSI.val();
            fromSpan.replaceWith(getValueHTML(nr));
            var toSpan = $('span#valueToSpan' + nr);
            if (toSpan.length > 0) {
                toSpan.replaceWith(getValueHTML("to" + nr));
            }
        }
    }
}

function textboxFocusAction(tbId){
    var textbox = $("input#" + tbId);
    var currentValue = textbox.val();
    if ("this value" == currentValue && "true" == textbox.attr("empty")){
        textbox.val("");
        textbox.attr("style", "");
        textbox.attr("empty", "false");
    }
}

function textboxBlurAction(tbId){
    var textbox = $("input#" + tbId);
    var currentValue = textbox.val();
    if (currentValue == undefined || "" == currentValue){
        textbox.val("this value");
        textbox.attr("style", "color:gray;");
        textbox.attr("empty", "true");
    }
}

function getActionHTML(nr){
    var content = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_actionItem").children()[0].innerHTML;
    content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_actions", "aspect_metadataquality_batchedit_BatchActionTransformer_field_actions" + nr);
    content = content.replace("name=\"actions\"", "name=\"actions" + nr + "\"");
    //This is for IE
    content = content.replace("name=actions", "name=actions" + nr);
    return content;
}

function getFilterHTML(nr){
    var content = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_filterItem").children()[0].innerHTML;
    content = content.replace('aspect_metadataquality_batchedit_BatchActionTransformer_field_filters', 'aspect_metadataquality_batchedit_BatchActionTransformer_field_filters' + nr);
    content = content.replace("name=\"filters\"", "name=\"filters" + nr + "\"");
    //This is for IE
    content = content.replace("name=filters", "name=filters" + nr);
    return content;
}

function getLanguageHTML(nr){
    if ($("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_languageItem").length > 0) {
        var content = '&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_languageItem").children()[0].innerHTML;
        content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_lang", "aspect_metadataquality_batchedit_BatchActionTransformer_field_lang" + nr);
        content = content.replace("name=\"lang\"", "name=\"lang" + nr + "\"");
        //This is for IE
        content = content.replace("name=lang", "name=lang" + nr);
        return content;
    }
    else
        return '';
}

function getFieldHTML(nr){
    var content = '&nbsp;' + $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_fieldItem").children()[0].innerHTML;
    content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_properties", "aspect_metadataquality_batchedit_BatchActionTransformer_field_properties" + nr);
    content = content.replace("name=\"properties\"", "name=\"properties" + nr + "\"");
    //This is for IE
    content = content.replace("name=properties", "name=properties" + nr);
    return content;
}

function getExistHTML(nr){
    var content = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_existItem").children()[0].innerHTML;
    content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_exist", "aspect_metadataquality_batchedit_BatchActionTransformer_field_filter" + nr);
    content = content.replace("name=\"exist\"", "name=\"filters" + nr + "\"");
    //This is for IE
    content = content.replace("name=exist", "name=filters" + nr);
    return content;
}

function getValueHTML(nr){
    var content = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_valueItem").children()[0].innerHTML;
    content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_value", "aspect_metadataquality_batchedit_BatchActionTransformer_field_value" + nr);
    content = content.replace("name=\"value\"", "name=\"value" + nr + "\"");
    //This is for IE
    content = content.replace("name=value", "name=value" + nr);
    return content;
}

function getModifyHTML(nr){
    var content = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_modifyItem").children()[0].innerHTML;
    content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_modify", "aspect_metadataquality_batchedit_BatchActionTransformer_field_modify" + nr);
    content = content.replace("name=\"modify\"", "name=\"modify" + nr + "\"");
    //This is for IE
    content = content.replace("name=modify", "name=modify" + nr);
    return content;
}

function getSplitHTML(nr){
    var content = $("li#aspect_metadataquality_batchedit_BatchActionTransformer_item_delimiterItem").children()[0].innerHTML;
    content = content.replace("aspect_metadataquality_batchedit_BatchActionTransformer_field_delimiter", "aspect_metadataquality_batchedit_BatchActionTransformer_field_delimiter" + nr);
    content = content.replace("name=\"delimiter\"", "name=\"delimiter" + nr + "\"");
    //This is for IE
    content = content.replace("name=delimiter", "name=delimiter" + nr + "");
    return content;
}


function initAddCollList(){
    var mainlist = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_addCollList');
    $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_addCollList li').addClass('clearfix');
    var ulArr = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_addCollList ul');
    for(var i = 0; i < ulArr.length; i++){
        var current = $(ulArr.get(i));
        var xref = current.prev();
        var xrefText = xref.html();
        var spanid = 'aspect_metadataquality_batchedit_BatchActionTransformer_addtree_span_' + i;
        xref.before('<span id="' + spanid + '" target="ul#' + current.attr('id') + '"><a href="" onclick="return false;" class="communityCollapserLink"><span class="ui-icon ui-icon-triangle-1-e communityCollapser">&nbsp;</span>' + xrefText + '</a></span>');
        xref.remove();
        current.hide();
        $('span#' + spanid).click(treeLinkChange);
    }
    var oldMaidArray = mainlist.find('a[href="winglink"]');
    for (var i = 0; i < oldMaidArray.length; i++){
        var oldMaid = $(oldMaidArray.get(i));
        var text = oldMaid.html();
        oldMaid.before('<span>' + text + '</span>');
        oldMaid.remove();
    }
    mainlist.hide();
    $('#aspect_metadataquality_batchedit_BatchActionTransformer_div_itemMappingDiv input[type="checkbox"]').change(updatePerformButtonStatus);
}

function initMoveCollList() {
    var _mainlist = $('#aspect_metadataquality_batchedit_BatchActionTransformer_list_moveCollList');
    _mainlist.addClass("clearfix");

    $('ul', _mainlist).each(function () {
        var _$this, _li, _xref, _id, _spanId;

        _$this = $(this);
        _li = _$this.closest('li');
        _li.addClass('clearfix');
        _xref = _li.children('a:first');
        _id = _$this.attr('id');
        _spanId = _id + "_span";

        _xref.before('<span id="' + _spanId + '" target="ul#' + _id + '"><a href="" onclick="return false;" class="communityCollapserLink"><span class="ui-icon ui-icon-triangle-1-e communityCollapser">&nbsp;</span>' + _xref.html() + '</a></span>')
                .remove();
        _$this.hide();

        $('#' + _spanId).click(treeLinkChange);
    });

    $('a[href="winglink"]', _mainlist).each(function () {
        var _$this, _text;

        _$this = $(this);
        _text = _$this.html();
        _$this.before('<span>' + _text + '</span>').remove();
    });
    _mainlist.hide();
    $('#aspect_metadataquality_batchedit_BatchActionTransformer_div_itemMappingDiv input[type="radio"]').change(updatePerformButtonStatus);
}

function initCommCollLists(){
    var checkedButton = $('input[@name="scope"]:checked');
    var selectedValue = checkedButton.val();
    var mainlist = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_comCollList');
    mainlist.attr('style', 'margin-top:0px;');
    $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_firstList').attr('style', 'margin-bottom:0px;');
    var ulArr = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_comCollList ul');
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
        label.click(treeLinkChange);
    }
    if(selectedValue == undefined || selectedValue == 'all')
        mainlist.hide();
    else {
        //doorloop alle 'ul's die ancestor zijn van het geselecteerde element en 'click' erop, zodat ze openklappen
        ulArr = checkedButton.parents('ul');
        for(var i = 0; i < ulArr.length; i++){
            var current = $(ulArr.get(i));
            //Als de bovenste (relevante) 'ul' bereikt is mag de lus beindigd worden
            if (current.attr('id') == 'aspect_metadataquality_batchedit_BatchActionTransformer_list_comCollList')
                break;
            current.prev().find('label').click();
        }
        //door de clicks in de for lus hierboven wordt in IE het verkeerde element geselecteerd, dus selecteer terug het juiste
        checkedButton.attr('checked', 'true');
        $('p#aspect_metadataquality_batchedit_BatchActionTransformer_p_openTreePara').hide();
    }
    $('#aspect_metadataquality_batchedit_BatchActionTransformer_div_itemMappingDiv input[type="checkbox"]').change(updatePerformButtonStatus);
}

function showSearchTree(){
    $('p#aspect_metadataquality_batchedit_BatchActionTransformer_p_openTreePara').fadeOut("fast", function(){
        $("ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_comCollList").slideDown("fast");
    });
}

function includeAll(){
    $('input[name^="included"]').attr('checked', 'checked');
}

function excludeAll(){
    $('input[name^="included"]').removeAttr('checked');
}

$.toggleAddCollTree = function() {
    $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_addCollList').slideToggle("fast", function(){
        var obj = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_addCollList');
        window.scrollBy(0, obj.height());
        try {
            matchHeights();
        } catch(e) {
        }
    });
};

$.toggleMoveCollTree = function() {
    $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_moveCollList').slideToggle("fast", function(){
        var obj = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_moveCollList');
        window.scrollBy(0, obj.height());
        try {
            matchHeights();
        } catch(e) {
        }
    });
};

$.toggleRemCollTree = function() {
    $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_remCollList').slideToggle("fast", function(){
        var obj = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_remCollList');
        window.scrollBy(0, obj.height());
        try {
            matchHeights();
        } catch(e) {
        }
    });
};

function initLinks(){
    var resultsTable = $('table#aspect_metadataquality_batchedit_BatchActionTransformer_table_resultsTable').find("tr[class^='ds-table-row']");
    resultsTable.find('a').attr('target', '_blank');
}

function toggleMaximize(){
    if (hiddenitems == undefined || hiddenitems.length == 0) {
        hideAllAncestorialSiblings($('div#aspect_metadataquality_QualityAssurance_div_Primera_Division'));
        $('div#aspect_metadataquality_QualityAssurance_div_Primera_Division').parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).addClass('maximizedwidth');
        });
        //Remove any margin our ds-body div may have
        $('div#ds-body').attr('marginOld', $('div#ds-body').css('margin-left'));
        $('div#ds-body').css('margin-left', '0');
    } else {
        hiddenitems.show();
        hiddenitems = undefined;
        $('div#aspect_metadataquality_QualityAssurance_div_Primera_Division').parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
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
        ancestor.siblings().each(function() {
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

function initMaximize(){
    $('img#aspect_metadataquality_QualityAssurance_field_maximize').attr('altval', 'Original Size');
    $('img#aspect_metadataquality_QualityAssurance_field_maximize').attr('altbg', '../themes/Atmire-add-ons/images/view-restore.png');
    $('img#aspect_metadataquality_QualityAssurance_field_maximize').attr('altTop', '5');
    $("img[class='foldableHelpButton']").attr('altTop', '60');
    $('img#aspect_metadataquality_QualityAssurance_field_maximize').bind('click', function(){
        toggleMaximize();
        var value = $(this).attr('alt');
        $(this).attr('alt',  $(this).attr('altval'));
        $(this).attr('altval', value);

        var oldbg = $(this).attr('src');
        var newbg = $(this).attr('altbg');
        $(this).attr('altbg', oldbg);
        $(this).attr('src', newbg);

        var oldTop = $(this).position().top;
        var newTop = $(this).attr('altTop');
        $(this).attr('altTop', oldTop);
        $(this).css('cssText', 'top: ' + newTop + 'px !important;');

        var helpButton = $("img[class='foldableHelpButton']");
        oldTop = helpButton.position().top;
        newTop = helpButton.attr('altTop');
        helpButton.attr('altTop', oldTop);
        helpButton.css('cssText', 'top: ' + newTop + 'px !important;');

    });
}

$(document).ready(function(){
    $.getJSON(getContextPath() + "/JSON/mqm/i18n", undefined, function (json) {
        $(document).data('i18n', json);

        initTabs();
        initVisibilityTable();
        initSearchTools();
        initCommCollLists();
        initActions();
        initLinks();
        initMaximize();

        try {
            matchHeights();
        } catch(e) {
        }

        $('#aspect_metadataquality_batchedit_BatchEditor_div_Primera_Division:hidden').show();
    });
});

function performSubmit(){
    var actionRows = $("li[id^='aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow']");
    var hiddenField = $('input#aspect_metadataquality_batchedit_BatchActionTransformer_field_actionsOrder');
    var hiddenVal = '';
    for(var i = 0; i < actionRows.length; i++){
        var id = actionRows[i].id;
        var index = id.substring('aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow'.length);
        if(i != 0)
            hiddenVal += ';';

        hiddenVal += index;
    }
    //Set the hiddenfield to our hiddenval
    hiddenField.val(hiddenVal);
}

function initTabs() {
    var sel;
    try {
        sel = $('[name="activetab"]').val();
    } catch(e) {
        sel = 1;
    }
    if (sel != 0)
        sel = 1;
    $('#aspect_metadataquality_batchedit_TabsTransformer_div_tabwrapper').tabs({
        selected: sel,
        select: function(event, ui) {
            var data = $.param({"batch-edit-active-tab": ui.index}, true);
            $.post(getContextPath() + "/JSON/mqm/inform", data);
        }
    });
}


function initVisibilityTable() {
    var form = $('#aspect_metadataquality_batchedit_ManualEditTransformer_div_browse-bag');
    var table = $('#aspect_metadataquality_batchedit_ManualEditTransformer_table_visibility');
    var visSrc = getContextPath() + '/themes/MetadataQualityModule/images/vis_enabled.png';
    var invisSrc = getContextPath() + '/themes/MetadataQualityModule/images/vis_disabled.png';
    table.dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible": false
            },
            {
                "bSortable": false,
                "bSearchable": false,
                "sWidth": "16px"
            },
            {
                "bSortable": true
            }
        ],
        "oLanguage": {
            "sInfo": $(document).data('i18n').VisFieldsInfo,
            "sInfoEmpty": $(document).data('i18n').VisFieldsEmpty,
            "sInfoFiltered": $(document).data('i18n').VisFieldsFilter,
            "sLengthMenu": $(document).data('i18n').VisFieldsMenu,
            "sZeroRecords": $(document).data('i18n').VisNoFieldsSelected
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "sPaginationType": "full_numbers",
        "fnInitComplete": function() {
            table.attr('style', '');
            table.show();
            var wrapper = table.closest('.dataTables_wrapper');
            var datatable = table.dataTable();
            var hmvth = hasMoreVisibleThanHidden(datatable.fnGetData());
            redrawShowHideAllButton(wrapper, datatable, hmvth);

            //IE7 sort header bugfix
            $.each(wrapper.find('.DataTables_sort_wrapper'), function() {
                $(this).prepend($(this).find("span.css_right"));
            });

            wrapper.fadeIn("fast");
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $(nRow).data('field', aData[0]);
            var src;
            if ("true" == aData[1])
                src = visSrc;
            else
                src = invisSrc;

            $(nRow).find('td:first').html('<img src="' + src + '"/>');
            $(nRow).addClass('clickable').click(function(event) {
                //This timestamp stuff fixes a jQuery bug that will sometimes fire a click event on a row twice for the same click.
                if ($(nRow).data('lastClickTime') == undefined || event.timeStamp  > $(nRow).data('lastClickTime')) {
                    $(nRow).data('lastClickTime', event.timeStamp);
                    if (aData[1] == "true") {
                        $(this).find('td:first img').attr('src', invisSrc);
                        aData[1] = "false";
                        form.find('input[name="vis_' + aData[0] + '"]').remove();
                        form.append('<input type="hidden" name="vis_' + aData[0] + '" value="false"/>');
                    }
                    else {
                        $(this).find('td:first img').attr('src', visSrc);
                        aData[1] = "true";
                        form.find('input[name="vis_' + aData[0] + '"]').remove();
                    }
                    var datatable = table.dataTable();
                    var hmvth = hasMoreVisibleThanHidden(datatable.fnGetData());
                    redrawShowHideAllButton(table.closest('.dataTables_wrapper'), datatable, hmvth);
                }
            });
            return nRow;
        },
        "fnDrawCallback": function() {
            try {
                matchHeights();
            } catch(e) {
                //in case there's no matchHeights() in this DSpace
            }
        }
    });
}

function redrawShowHideAllButton(wrapper, datatable, hmvth) {
    var visSrc = getContextPath() + '/themes/MetadataQualityModule/images/vis_enabled.png';
    var invisSrc = getContextPath() + '/themes/MetadataQualityModule/images/vis_disabled.png';
    var form = $('#aspect_metadataquality_batchedit_ManualEditTransformer_div_browse-bag');
    var span = wrapper.find("span.vis-show-toggle");
    if (span.length == 0 || span.attr('hmvth') == "" + (!hmvth)) {
        span.remove();
        if (hmvth)
            wrapper.find('th:first').prepend('<span class="vis-show-toggle clickable" title="' + $(document).data('i18n').VisHideAll + '" hmvth="true"><img src="' + invisSrc + '"/></span>');
        else
            wrapper.find('th:first').prepend('<span class="vis-show-toggle clickable" title="' + $(document).data('i18n').VisShowAll + '" hmvth="false"><img src="' + visSrc + '"/></span>');
        span = wrapper.find("span.vis-show-toggle");
        span.click(function() {
            var data = [];
            var matrix = datatable.fnGetData();
            for (var i = 0; i < matrix.length; i++) {
                var aData = matrix[i];
                aData[1] = "" + (!hmvth);
                form.find('input[name="vis_' + aData[0] + '"]').remove();
                form.append('<input type="hidden" name="vis_' + aData[0] + '" value="' + aData[1] + '"/>');
            }
            datatable.fnDraw(false);
            redrawShowHideAllButton(wrapper, datatable, !hmvth);
        });
    }
}


function hasMoreVisibleThanHidden(dataTablesMatrix) {
    var trues = 0;
    var falses = 0;
    for (var i = 0; i < dataTablesMatrix.length; i++) {
        var aData = dataTablesMatrix[i];
        if (aData[1] == "true")
            trues++;
        else
            falses++;
    }
    return trues >= falses;
}

function updatePerformButtonStatus() {
    var actionRows = $("li[id^='aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow']");
    var emptyRow = $("#aspect_metadataquality_batchedit_BatchActionTransformer_item_actionRow0");
    var checkedMappingBoxes = $('#aspect_metadataquality_batchedit_BatchActionTransformer_div_itemMappingDiv input:checked');
    if (actionRows.length == 1 && emptyRow.length == 1 && checkedMappingBoxes.length == 0) {
        $('input[name="perform"], input[name="add_to_queue"]').attr('disabled', 'disabled').addClass('disabled');
    }
    else {
        $('input[name="perform"]:disabled, input[name="add_to_queue"]:disabled').removeAttr('disabled').removeClass('disabled');
    }
}

function treeLinkChange() {
    var _$this, _list;

    _$this = $(this);
    _list = $(_$this.attr('target'));
    if (_list.is(':visible')) {
        _list.hide();
        $('span.ui-icon-triangle-1-s', _$this)
                .removeClass('ui-icon-triangle-1-s')
                .addClass('ui-icon-triangle-1-e');
    }
    else {
        _list.show();
        $('span.ui-icon-triangle-1-e', _$this)
                .removeClass('ui-icon-triangle-1-e')
                .addClass('ui-icon-triangle-1-s');
    }
    try {
        matchHeights();
    } catch(e) {
    }
}

