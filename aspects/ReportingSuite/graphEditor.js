var enablecache = false;
$(document).ready(function() {
    $.getJSON(getContextPath() + "/JSON/cua/i18n", undefined, function (json) {
        //    $('#statistics_GraphEditor_list_source-categories a').click(function(){
        //        var href = $(this).attr('href');
        //        var container = $('div#statistics_GraphEditor_div_datasourcepanecontent');
        //        if (enablecache) {
        //            var cached = $('div#statistics_GraphEditor_div_cache *[key="' + href + '"]');
        //            var children = container.children();
        //            if (children.length > 0) {
        //                var key = container.attr('content');
        //                children.attr('key', key);
        //                $('div#statistics_GraphEditor_div_cache *[key="' + key + '"]').remove();
        //                children.appendTo($('div#statistics_GraphEditor_div_cache'));
        //            }
        //            if (cached.length > 0) {
        //                cached.appendTo(container);
        //                findAndImportJSFilesWithin(container);
        //            }
        //            else {
        //                container.load(href + ' .extractme', getDataObject(undefined), function() {
        //                    findAndImportJSFilesWithin($('div#statistics_GraphEditor_div_datasourcepanecontent'));
        //                });
        //            }
        //        } else {
        //            container.load(href + ' .extractme', getDataObject(undefined), function() {
        //                findAndImportJSFilesWithin($('div#statistics_GraphEditor_div_datasourcepanecontent'));
        //            });
        //        }
        //
        //        container.attr('content', href);
        //        return false;
        //    });
        $(document).data('i18n', json);
        $('div#aspect_statistics_GraphEditor_div_dataSourceSettings').tabs({
            cache: false,
            collapsible: true,
            spinner: $(document).data('i18n').loading,
            //        fx: {
            //            opacity: 'toggle'
            //        },
            //        selected: -1, //means: collapse on open
            select: function(event, ui) {
                if ($('div#' + ui.panel.id + ':visible').length > 0) { //if the tab clicked is the current one
                    $('div[aria-labelledby = "ui-dialog-title-statistics_editorparts_BagTransformer_div_overlaydiv"]').remove();
                    $('div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv').remove();
                    $('div#aspect_statistics_GraphEditor_div_dataSourceSettings.ui-tabs .ui-tabs-nav li').toggleClass('closed').toggleClass('ui-corner-all').toggleClass('ui-corner-top');
                    $('ul#aspect_statistics_GraphEditor_list_source-categories').toggleClass('closed').toggleClass('ui-corner-all').toggleClass('ui-corner-top');
                }
            },
            show: function(event, ui) {
                $('div[aria-labelledby = "ui-dialog-title-statistics_editorparts_BagTransformer_div_overlaydiv"]').remove();
                $('div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv').remove();
                $('div#aspect_statistics_GraphEditor_div_dataSourceSettings.ui-tabs .ui-tabs-nav li').removeClass('closed').removeClass('ui-corner-all').addClass('ui-corner-top');
                $('ul#aspect_statistics_GraphEditor_list_source-categories').removeClass('closed').removeClass('ui-corner-all').addClass('ui-corner-top');
            },
            ajaxOptions : {
                cache: false,
                complete: function(res, status) {
                    // If successful, inject the HTML into all the matched elements
                    if (status == "success" || status == "notmodified")
                    // See if a selector was specified
                    {
                        $('div.ui-tabs-hide:not(:empty)').html(''); //clear all other tabs.
                        var content = res.responseText.replace(/<script(.|\s)*?\/script>/g, "");
                        var openTab = $('div.ui-tabs-panel:not(.ui-tabs-hide):eq(0)');
                        openTab.html(
                            // Create a dummy div to hold the results
                                jQuery("<div/>")
                                    // inject the contents of the document in, removing the scripts
                                    // to avoid any 'Permission Denied' errors in IE
                                        .append(content)

                                    // Locate the specified elements
                                        .find('.extractme'));
                        $('div#aspect_statistics_GraphEditor_div_DataSourceHelp td.leftpopup_container > div').html(
                            // Create a dummy div to hold the results
                                jQuery("<div/>")
                                    // inject the contents of the document in, removing the scripts
                                    // to avoid any 'Permission Denied' errors in IE
                                        .append(content)

                                    // Locate the specified elements
                                        .find('.foldableHelpContent'));
                        findAndImportJSFilesWithin(openTab);
                    }
                    try {
                        matchHeights();
                    } catch(e) {
                    }

                    //                self.each( callback, [res.responseText, status, res] );
                }
            }
        });
        {
            var action = $('form#aspect_statistics_GraphEditor_div_wrapper').attr('action');
            var newaction = action.substr(0, action.indexOf("reporting-suite")) + 'reporting-suite/export-csv';
            $('form#aspect_statistics_GraphEditor_div_wrapper').attr('altaction', newaction);
        }

        $("form#aspect_statistics_GraphEditor_div_wrapper").bind("keydown", function(e) {
            if (e.keyCode == 13) {
                return false;
            }
        });

        $('img#aspect_statistics_GraphEditor_field_maximize').attr('altval', 'Original Size').addClass('normal');
        //    $('img#aspect_statistics_GraphEditor_field_maximize').attr('altbg', '../themes/Atmire-add-ons/images/view-restore.png');
        $("img.foldableHelpButton").addClass('normal');
        $('img#aspect_statistics_GraphEditor_field_maximize').bind('click', function() {
            toggleMaximize();
            var value = $(this).attr('alt');
            $(this).attr('alt', $(this).attr('altval'));
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

        findAndImportJSFilesWithin($('div[id$="_div_datapanecontent"]'), function () {
            packageTable();
            $('div#aspect_statistics_editorparts_DataTableTransformer_div_DataTabHelp').addClass('unusedHelp').removeClass('foldableHelp');
            $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_GraphTabHelp').addClass('foldableHelp').removeClass('unusedHelp');
            $('div[id$="_div_datapanecontent"]').tabs({
                //            fx: {
                //                opacity: 'toggle'
                //            },
                selected: 1,
                show: function(event, ui) {
                    $("fieldset#aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings").dialog('close');
                    var currentpanel = $('div#' + ui.panel.id + ':visible');
                    if (currentpanel.children().length == 0) {
                        currentpanel.html("<div id=\"aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv\" class=\"loading\">&nbsp;</div>");
                        var array = getDataTableAsArray();
                        if (array && array.length > 0)
                            ajaxUpdateGraph();
                        else
                            updateData();
                    }
                    else {
                        try {
                            matchHeights();
                        } catch(e) {
                        }
                    }
                    var helpStatus = $('img.foldableHelpButton').data('status');
                    if (!helpStatus)
                        helpStatus = 'closed';

                    var graphtTabHelp = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_GraphTabHelp');
                    var dataTabHelp = $('div#aspect_statistics_editorparts_DataTableTransformer_div_DataTabHelp');
                    var graphContainer = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphSettingsContainer');
                    var dataContainer = $('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablecontainer');
                    if (ui.panel.id == 'aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv') {
                        graphContainer.hide();
                        dataContainer.show();
                        graphtTabHelp.addClass('unusedHelp').removeClass('foldableHelp');
                        dataTabHelp.addClass('foldableHelp').removeClass('unusedHelp');
                        graphtTabHelp.hide();
                        if (helpStatus == 'open')
                            dataTabHelp.show();
                        else
                            dataTabHelp.hide();
                    }
                    else {
                        dataContainer.hide();
                        graphContainer.show();
                        dataTabHelp.addClass('unusedHelp').removeClass('foldableHelp');
                        graphtTabHelp.addClass('foldableHelp').removeClass('unusedHelp');
                        dataTabHelp.hide();
                        if (helpStatus == 'open')
                            graphtTabHelp.show();
                        else
                            graphtTabHelp.hide();
                    }
                }
            });
            $('form#aspect_statistics_GraphEditor_div_wrapper').animate({opacity: 1});
        });
    });
});

function findAndImportJSFilesWithin(jqObj, callback) {
    var jslink = jqObj.find('[name="functjavascript"]');
    if ($.isFunction(callback)) {
        var callbackID = 'callback' + generateID();
        registerCallbackCounter(callbackID, callback, jslink.length);
        for (var i = 0; i < jslink.length; i++){
            var val = $(jslink.get(i)).val();
            var semicolonIndex = val.indexOf(";");
            if (semicolonIndex == -1) {
                $.getScript(val, function() {
                    removeCallbackConstraint(callbackID);
                });
            } else {
                var url = val.substring(0, semicolonIndex);
                var method = val.substring(semicolonIndex + 1);
                evalExternalMetod(method, url, function() {
                    removeCallbackConstraint(callbackID);
                });
            }
        }
    }
    else {
        for (var i = 0; i < jslink.length; i++) {
            var val = $(jslink.get(i)).val();
            var semicolonIndex = val.indexOf(";");
            if (semicolonIndex == -1) {
                $.getScript(val);
            } else {
                var url = val.substring(0, semicolonIndex);
                var method = val.substring(semicolonIndex + 1);
                evalExternalMetod(method, url);
            }
        }
    }
}

function registerCallbackCounter(callbackID, callbackFunction, initialNb) {
    var form = $('form#aspect_statistics_GraphEditor_div_wrapper');
    if (!initialNb)
        initialNb = 0;
    form.data(callbackID + 'counter', initialNb);
    form.data(callbackID, callbackFunction);
}

function addCallbackConstraint(callbackID){
    var counterID = callbackID + 'counter';
    var form = $('form#aspect_statistics_GraphEditor_div_wrapper');
    var counter = form.data(counterID) * 1;
    counter++;
    form.data(counterID, counter);
}

function removeCallbackConstraint(callbackID){
    var counterID = callbackID + 'counter';
    var form = $('form#aspect_statistics_GraphEditor_div_wrapper');
    var counter = form.data(counterID) * 1;
    counter--;
    if (counter == 0){
        var callbackFunction = form.data(callbackID);
        if ($.isFunction(callbackFunction))
            callbackFunction.call(this);
        form.removeData(callbackID);
        form.removeData(counterID);
    }
    else
        form.data(counterID, counter);
}

function evalExternalMetod(method, jsUrl, callback) {
    try {
        eval(method + ";");
    }
    catch(e) {
        //if the method is not defined, the js file containing it is not yet loaded, so load it first.
        $.getScript(jsUrl, function() {
            eval(method + ";");
            if ($.isFunction(callback))
                callback.call(this);
        });
    }
}

function uniqueifyIDs(jqObj) {
    var arr = jqObj.find('[id *="generateid"]');
    var html = jqObj.html();
    if (arr.length > 0) {
        jQuery.each(arr, function() {
            var id = $(this).attr('id');
            var toReplace = id.substring(id.indexOf('generateid'));
            var newId = generateID();
            html = html.replace(eval('/' + id + '/g'), newId);
            html = html.replace(eval('/' + toReplace + '/g'), newId);
//            eval('html = html.replace( + /' + toReplace + '/g, \'' + newId + '\');');
        });
        jqObj.html(html);
    }
}

function generateID()
{
    var newDate = new Date;
    return newDate.getTime();
}

function getContextPath() {
    return $('[name="contextpath"]').val();
}

function gatherDataSourceInfo() {
    var dataarray = new Array();
    var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
    if (action.length > 0) {
        var first = true;
        jQuery.each(action, function(i, val) {
            var currentaction = action[i];
            if (currentaction.length > 0){
                var currentresult;
                eval("currentresult = " + currentaction);
                if (currentresult) {
                    dataarray.push(currentresult);
                }
            }
        });
    }
    return dataarray;
}

function updateData(extraDataArray) {
    try {
        var data = getDataObject(extraDataArray);
        if(data && data.title)
            delete data.title;
        var graphExtractor = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphExtractor');
        var dataWrapper = $('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv');
        graphExtractor.addClass('loading');
        dataWrapper.addClass('loading');
        graphExtractor.empty();
        dataWrapper.empty();
        $('body > #aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings').remove();
        $('body > div[aria-labelledby = "ui-dialog-title-aspect_statistics_editorparts_GraphSettingsTransformer_list_hiddenSettings"]').remove();
        var filterTab = $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilterwrapperdiv');
        var dataTab = $('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv');
        var graphTab = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphSettingsContainer');
        var loadDiv = jQuery("<div/>");
        loadDiv.load(getContextPath() + '/atmire/reporting-suite/graph-editor/datapanecontent', data, function() {
            filterTab.html(loadDiv.find('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilterwrapperdiv').html());
            dataTab.html(loadDiv.find('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv').html());
            graphTab.html(loadDiv.find('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphSettingsContainer').html());
            findAndImportJSFilesWithin(filterTab);
            findAndImportJSFilesWithin(dataTab);
            findAndImportJSFilesWithin(graphTab);
            graphExtractor.removeClass('loading');
            dataWrapper.removeClass('loading');
            try {
                matchHeights();
            } catch(e) {
            }
        });
    } catch(e) {
        var name = e.name;
        var message = e.message;
        if (name && name.length > 0) {
            if (name == "Error"  && message && message.length > 0) {
                jqAlert("Error", message);
            }
            else {
                var hidewarning = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name);
                if (!hidewarning && message && message.length > 0)
                    jqConfirm("Warning", message, function() {
                        $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name, true);
                        updateData(extraDataArray);
                        $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name, false);
                    }, undefined);
            }
        }
    }
}

function getDataObject(extraDataArray, excludeDataSources) {
    var dataarray;
    if (!excludeDataSources) 
        dataarray = gatherDataSourceInfo();
    else
        dataarray = [];
    if (extraDataArray){
        jQuery.each(extraDataArray, function() {
            dataarray.push(this);
        });
    }
    var filters = gatherFilterInfo();
    if (filters && filters.length > 0){
        jQuery.each(filters, function() {
            dataarray.push(this);
        });
    }
    var settings = gatherGraphSettings();
    if (settings && settings.length > 0){
        jQuery.each(settings, function() {
            dataarray.push(this);
        });
    }
    var dataobject = new Object();
    jQuery.each(dataarray, function() {
        var key = this.key;
        var value = this.value;
        if (key && value && key.length > 0 && value.length > 0) {
            dataobject[key] = value;
        }
    });

    return dataobject;
}

function ajaxUpdateGraph(current) {
    try { //  TODO Escaping?
        var container = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphExtractor');
        var dataTableArray = getDataTableAsArray();
        if (dataTableArray)
        {
            var o = new Object();
            o.key = "forceMatrixValues";
            o.value = 'true';
            dataTableArray.push(o);
        }
        container.addClass('loading');
        container.empty();
        var loadDiv = jQuery("<div/>");
        var data = getDataObject(dataTableArray, true);
        loadDiv.load(getContextPath() + '/atmire/reporting-suite/graph-editor/graph .extractme2', data, function() {
            container.html(loadDiv.find('div#aspect_statistics_editorparts_GraphTransformer_div_graphExtractor').html());
            container.removeClass('loading');
            try {
                matchHeights();
            } catch(e) {
            }
        });
    } catch(e) {
        var name = e.name;
        var message = e.message;
        if (name && name.length > 0) {
            if (name == 'SyntaxError'){
                updateData();
            }
            else if (name == "Error"  && message && message.length > 0) {
                jqAlert("Error", message);
            }
            else {
                var hidewarning = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name);
                if (!hidewarning && message && message.length > 0)
                    jqConfirm("Warning", message, function() {
                        $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name, true);
                        ajaxUpdateGraph(current);
                        $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name, false);
                    }, undefined);
            }
        }
    }
}

function swap(value) {
    try {
        var dataTableArray = getDataTableAsArray();
        var o = new Object();
        o.key = "swapRowsAndCols";
        o.value = value ? 'true' : 'false';
        dataTableArray.push(o);
        var o2 = new Object();
        o2.key = "forceMatrixValues";
        o2.value = 'true';
        dataTableArray.push(o2);
        var dataWrapper = $('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv');
        dataWrapper.addClass('loading');
        dataWrapper.empty();
        var filterTab = $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilterwrapperdiv');
        var dataTab = $('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv');
        var graphTab = $('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphSettingsContainer');
        var loadDiv = jQuery("<div/>");
        var data = getDataObject(dataTableArray, true);
        loadDiv.load(getContextPath() + '/atmire/reporting-suite/graph-editor/datapanecontent .extractme', data, function() {
            filterTab.html(loadDiv.find('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilterwrapperdiv').html());
            dataTab.html(loadDiv.find('div#aspect_statistics_editorparts_DataTableTransformer_div_datatablewrapperdiv').html());
            graphTab.html(loadDiv.find('div#aspect_statistics_editorparts_GraphSettingsTransformer_div_graphSettingsContainer').html());
            dataWrapper.removeClass('loading');
            findAndImportJSFilesWithin(filterTab);
            findAndImportJSFilesWithin(dataTab);
            findAndImportJSFilesWithin(graphTab);
            try {
                matchHeights();
            } catch(e) {
            }
        });
    } catch(e) {
        var name = e.name;
        var message = e.message;
        if (name && name.length > 0) {
            if (name == 'SyntaxError'){ //means the datatable's content is too large to fit in a single js string. The only solution I can think of atm is to generate the data again
                updateData();
            }
            else if (name == "Error"  && message && message.length > 0) {
                jqAlert("Error", message);
            }
            else {
                var hidewarning = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name);
                if (!hidewarning && message && message.length > 0)
                    jqConfirm("Warning", message, function() {
                        $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name, true);
                        swap(value);
                        $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + name, false);
                    }, undefined);
            }
        }
        else if(message && message.length > 0)
            jqAlert("Error", message);
    }
}

function packageTable() {
    if($('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable').length == 0)
        return true;
    var currentrow = 3;
    var resultA = "";
    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.datacell').each(function() {
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
    $('input#aspect_statistics_editorparts_DataTableTransformer_field_dataMatrix').val(resultA);

    resultA = "";
    var resultB = "";
    var resultC = "";
    $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.labelcell').each(function() {
        var value = $(this).html();
        var content = $(this).data('content');
        if (content != undefined)
            value = content;
        var posx = $(this).attr('posx');
        if (posx == 1){
            resultC += value + ";";
        }
        else if (posx == 2){
            resultA += value + ";";
        }
        else {
            var posy = $(this).attr('posy');
            if (posy == 1){
                resultC += value;
            }
            else {
                resultB += value + ";";
            }
        }
    });
    resultA = resultA.substring(0, resultA.length - 1);      //remove last ';'
    resultB = resultB.substring(0, resultB.length - 1);      //remove last ';'
    $('input#aspect_statistics_editorparts_DataTableTransformer_field_columnLabels').val(resultA);
    $('input#aspect_statistics_editorparts_DataTableTransformer_field_rowLabels').val(resultB);
    $('input#aspect_statistics_editorparts_DataTableTransformer_field_axisLabels').val(resultC);


    return true;
}

function getDataTableAsArray() {
    var result = new Array();
    if ($('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable').length != 0) {
        var currentrow = 3;
        var resultA = "";
        $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.datacell').each(function() {
            var posx = $(this).attr('posx') * 1;
            if (posx > currentrow) {
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
        var o = new Object();
        o.key = "dataMatrix";
        o.value = resultA;
        result.push(o);

        resultA = "";
        var resultB = "";
        var resultC = "";
        $('table#aspect_statistics_editorparts_DataTableTransformer_table_dataTable td.labelcell').each(function() {
            var value = $(this).html();
            var content = $(this).data('content');
            if (content != undefined)
                value = content;
            var posx = $(this).attr('posx');
            if (posx == 1) {
                resultC += value + ";";
            }
            else if (posx == 2) {
                resultA += value + ";";
            }
            else {
                var posy = $(this).attr('posy');
                if (posy == 1) {
                    resultC += value;
                }
                else {
                    resultB += value + ";";
                }
            }
        });
        resultA = resultA.substring(0, resultA.length - 1);      //remove last ';'
        resultB = resultB.substring(0, resultB.length - 1);      //remove last ';'
        var o1 = new Object();
        o1.key = "columnLabels";
        o1.value = resultA;
        result.push(o1);
        var o2 = new Object();
        o2.key = "rowLabels";
        o2.value = resultB;
        result.push(o2);
        var o3 = new Object();
        o3.key = "axisLabels";
        o3.value = resultC;
        result.push(o3);
    }
    return result;
}

function toggleMaximize(){
    var hiddenitems = $('body').data('hiddenitems');
    if (hiddenitems == undefined || hiddenitems.length == 0) {
        $('form#aspect_statistics_GraphEditor_div_wrapper').parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).addClass('maximizedwidth');
        });
        hideAllAncestorialSiblings($('form#aspect_statistics_GraphEditor_div_wrapper'));
        $('div#ds-body').data('marginOld', $('div#ds-body').css('margin-left'));
        $('form#aspect_statistics_GraphEditor_div_wrapper').parents().addClass('noMarginsOrAnyOtherCrap');
        $('div#aspect_statistics_editorparts_DataTableTransformer_div_dataTableContainer').addClass('maximizedwidth');
        $('div#aspect_statistics_StatletTransformer_div_statistic').addClass('maximizedwidth');
        //Remove any margin our ds-body div may have
        $('div#ds-body').css('margin-left', '0');
        $('div#aspect_statistics_GraphEditor_div_dataSourceSettings').css('margin-right', '75px');
    } else {
        $('.noMarginsOrAnyOtherCrap').removeClass('noMarginsOrAnyOtherCrap');
        hiddenitems.show();
        $('body').removeData('hiddenitems');
        $('form#aspect_statistics_GraphEditor_div_wrapper').parents(':not(body)').filter(':not(html)').filter(':visible').each(function() {
            $(this).removeClass('maximizedwidth');
        });
        $('div#aspect_statistics_editorparts_DataTableTransformer_div_dataTableContainer').removeClass('maximizedwidth');
        $('div#aspect_statistics_StatletTransformer_div_statistic').removeClass('maximizedwidth');
        $('div#ds-body').css('margin-left', $('div#ds-body').data('marginOld'));
        $('div#ds-body').removeData('marginOld');
        $('div#aspect_statistics_GraphEditor_div_dataSourceSettings').css('margin-right', '');

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
    var hiddenitems = $('body').data('hiddenitems');
    if (hiddenitems == undefined)
        hiddenitems = jqobj;
    else
        hiddenitems = hiddenitems.add(jqobj);
    $('body').data('hiddenitems', hiddenitems);
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

function jqAlert(title, message){
    $('<div title="' + title + '"><p>' + message + '</p></div>').dialog({
        bgiframe: true,
        resizable: false,
        open: function() {
            if($.browser.msie && $.browser.version.substr(0,1)<7) {
                var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                $("form#aspect_statistics_GraphEditor_div_wrapper").data('hiddenselects', selects);
            }
        },
        close: function() {
            var selects = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hiddenselects');
            if (selects && selects.length > 0)
                selects.css('visibility', '');
        },
        buttons: {
            Ok: function() {
                $(this).dialog('close');
            }
        },
        modal: true
    });
}

function toggleConfirmations() {
    var hideconfirmations = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hideconfirmations');
    if (hideconfirmations == undefined)
        hideconfirmations = false;
    $("form#aspect_statistics_GraphEditor_div_wrapper").data('hideconfirmations', !hideconfirmations);
}

function jqConfirm(title, message, functionOnYes, functionOnNo){
    var hideconfirmations = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hideconfirmations');
    if (!hideconfirmations) {
        $('<div title="' + title + '"><p>' + message + '</p><label><input type="checkbox" onchange="toggleConfirmations();"/>' + $(document).data('i18n').ErrorNoWarning + '</label></div>').dialog({
            bgiframe: true,
            resizable: false,
            open: function() {
                if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
                    var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                    $("form#aspect_statistics_GraphEditor_div_wrapper").data('hiddenselects', selects);
                }
            },
            close: function() {
                var selects = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hiddenselects');
                if (selects && selects.length > 0)
                    selects.css('visibility', '');
                if ($.isFunction(functionOnNo))
                    functionOnNo.call();
            },
            buttons: {
                Yes: function() {
                    $(this).dialog('close');
                    if ($.isFunction(functionOnYes))
                        functionOnYes.call();
                },
                No: function() {
                    $(this).dialog('close');
                    if ($.isFunction(functionOnNo))
                        functionOnNo.call();
                }
            },
            modal: true
        });
    }
    else if ($.isFunction(functionOnYes))
        functionOnYes.call();
}

function shortenString(string, targetLength, maxDeviation) {
    targetLength = Math.abs(targetLength * 1);
    maxDeviation = Math.abs(maxDeviation * 1);
    if (string == undefined || string.length <= targetLength + maxDeviation)
        return string;

    var currentLength = targetLength;
    var currentDeviation = 0;
    while (currentDeviation <= maxDeviation) {
        try {
            if (string.charAt(currentLength) == ' ')
                return string.substring(0, currentLength) + ' ...';
            if (string.charAt(currentLength + currentDeviation) == ' ')
                return string.substring(0, currentLength + currentDeviation) + ' ...';
            if (string.charAt(currentLength - currentDeviation) == ' ')
                return string.substring(0, currentLength - currentDeviation) + ' ...';
        } catch(e) {
            //just in case
        }

        currentDeviation++;
    }

    return string.substring(0, targetLength) + '...';
}

