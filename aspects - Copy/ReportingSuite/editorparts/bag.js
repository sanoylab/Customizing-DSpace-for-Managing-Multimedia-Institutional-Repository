var itemBag;
var bitstreamBag;
var itemStore;
var bitstreamStore;
var epersonStore;
var epersonBag;
var groupBag;

function initbag(source) {
//    alert('initbag');

    if (source == 2) {
        $.ajax({
            cache: false,
            url: getContextPath() + "/JSON/cua/clearBag",
            type: 'POST',
            dataType: 'json',
            data: undefined, //has to be undefined, can't just leave it out or it will break in IE
            success: function (json) {
                var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";
                evalExternalMetod('initItemBag()',dataTableJSUrl);
            }
        });

        var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
        if (action) {
            action[1] = "";
            $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
        }
        $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").dialog({
            bgiframe: true,
            autoOpen: false,
            width: 664,
            position: ['center', 120],
            resizable: false,
            title: $(document).data('i18n').AddItems,
            open: function() {
                if($.browser.msie && $.browser.version.substr(0,1)<7) {
                    var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                    $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects', selects);
                }
                if ($('#aspect_statistics_editorparts_BagTransformer_table_itemtable_wrapper').length == 0) {
                    var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";
                    evalExternalMetod('initItemTable()',dataTableJSUrl);
                }
            },
            close: function() {
                var selects = $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects');
                if (selects && selects.length > 0)
                    selects.css('visibility', '');
            },
            modal: false
        });
    } else
    if(source == 6) {
        //Groups

        /**
         * Initialize our results bag
         */
        $.ajax({
            cache: false,
            url: getContextPath() + "/JSON/cua/clearBag",
            type: 'POST',
            dataType: 'json',
            data: undefined, //has to be undefined, can't just leave it out or it will break in IE
            success: function (json) {
                var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";
                evalExternalMetod('initGroupBag()',dataTableJSUrl);
    }
        });

        var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
        if (action) {
            action[1] = "";
            $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
        }
        /**
         * Init the group selection dialog
         */
        $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").dialog({
            bgiframe: true,
            autoOpen: false,
//            width: 664,
//            height: 400,
            width:'auto',
            position: ['center', 120],
            resizable: true,
            title: $(document).data('i18n').AddGroups,
            open: function() {
                if($.browser.msie && $.browser.version.substr(0,1)<7) {
                    var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                    $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects', selects);
                }
                if ($('#aspect_statistics_editorparts_BagTransformer_div_groupsDiv').children().length == 0) {
                    evalExternalMetod('initGroupsDialogDiv()');
                }
            },
            close: function() {
                var selects = $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects');
                if (selects && selects.length > 0)
                    selects.css('visibility', '');
            },
            modal: false
        });

    }

    if (source == 7) {
        $.ajax({
            cache: false,
            url: getContextPath() + "/JSON/cua/clearBag",
            type: 'POST',
            dataType: 'json',
            data: undefined, //has to be undefined, can't just leave it out or it will break in IE
            success: function (json) {
                var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";
                evalExternalMetod('initepersonBag()',dataTableJSUrl);
            }
        });
        var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
        if (action) {
            action[1] = "";
            $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
        }
        $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").dialog({
            bgiframe: true,
            autoOpen: false,
            width: 664,
            position: ['center', 120],
            resizable: false,
            title: $(document).data('i18n').AddEpersons,
            open: function() {
                if($.browser.msie && $.browser.version.substr(0,1)<7) {
                    var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                    $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects', selects);
                }
                if ($('#aspect_statistics_editorparts_BagTransformer_table_epersontable_wrapper').length == 0) {
                    var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";
                    evalExternalMetod('initEpersonTable()',dataTableJSUrl);
                }
            },
            close: function() {
                var selects = $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects');
                if (selects && selects.length > 0)
                    selects.css('visibility', '');
            },
            modal: false
        });
    }
    else if (source == 0) {
        $.ajax({
            cache: false,
            url: getContextPath() + "/JSON/cua/clearBag",
            type: 'POST',
            dataType: 'json',
            data: undefined,
            success: function (json) {
                var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";

                evalExternalMetod('initBitstreamBag()',dataTableJSUrl);
            }
        });

        var action = $('form#aspect_statistics_GraphEditor_div_wrapper').data("action");
        if (action) {
            action[1] = "";
            $('form#aspect_statistics_GraphEditor_div_wrapper').data("action", action);
        }
        $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").dialog({
            bgiframe: true,
            autoOpen: false,
            width: 664,
            position: ['center', 120],
            resizable: false,
            title: $(document).data('i18n').BagBitsHead,
            open: function() {
                if($.browser.msie && $.browser.version.substr(0,1)<7) {
                    var selects = $('form#aspect_statistics_GraphEditor_div_wrapper select:visible').css('visibility', 'hidden');
                    $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects', selects);
                }
                if ($('#aspect_statistics_editorparts_BagTransformer_table_bitstreamtable_wrapper').length == 0) {
                    var dataTableJSUrl = getContextPath() + "/aspects/Datatables/DataTables-1.8.0/media/js/jquery.dataTables.min.js";
                    evalExternalMetod('initBitstreamTable()',dataTableJSUrl);
                }
            },
            close: function() {
                var selects = $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").data('hiddenselects');
                if (selects && selects.length > 0)
                    selects.css('visibility', '');
            },
            modal: false
        });
    }
    $('div.add-to-bag-button').click(function () {
        $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").dialog('open');
    });

}

function initItemBag() {
    $('#aspect_statistics_editorparts_BagTransformer_table_itembag th.toggleHeader').html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Click To Remove All\" style=\"cursor: pointer;\" onclick=\"removeAllFromItemBag()\"/>");
    itemBag = $('#aspect_statistics_editorparts_BagTransformer_table_itembag').dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false,
                "sWidth": "16px"
            },
            {
                "bSortable": true,
                "sWidth": "50%"
            },
            {
                "bSortable": false,
                "sWidth": "50%"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagItemsInfo,
            "sInfoEmpty": $(document).data('i18n').BagItemsEmpty,
            "sInfoFiltered": $(document).data('i18n').BagItemsFilter,
            "sLengthMenu": $(document).data('i18n').BagItemsMenu,
            "sZeroRecords": $(document).data('i18n').BagNoItemsSelected,
            "sSearch": $(document).data('i18n').BagSearch,
            "oPaginate": {
                "sFirst":    $(document).data('i18n').BagNavFirst,
                "sPrevious": $(document).data('i18n').BagNavPrev,
                "sNext":     $(document).data('i18n').BagNavNext,
                "sLast":     $(document).data('i18n').BagNavLast
            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        "sAjaxSource": getContextPath() + "/JSON/cua/searchbag",
        "fnInitComplete": function() {
            var table = $('table#aspect_statistics_editorparts_BagTransformer_table_itembag');
            table.show();
            table.parents('.dataTables_wrapper').fadeIn("fast");
//                IE6 Bugfix - Start
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').hide();
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').show();
//                IE6 Bugfix - End
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $(nRow).attr('handle', aData[0]);
            return nRow;
        },
        "fnDrawCallback": function() {
            try {
                matchHeights();
            } catch(e) {
                //in case there's no matchHeights() in this DSpace
            }
        },
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            aoData.push( { "name": "value", "value": "2-1" });
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    /* Do whatever additional processing you want on the callback, then tell DataTables */
                    fnCallback(json);
                }
            });
        }
    });

}
function initepersonBag() {
    $('#aspect_statistics_editorparts_BagTransformer_table_epersonbag th.toggleHeader').html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Click To Remove All\" style=\"cursor: pointer;\" onclick=\"removeAllFromEpersonBag()\"/>");
    epersonBag = $('#aspect_statistics_editorparts_BagTransformer_table_epersonbag').dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false,
                "sWidth": "16px"
            },
            {
                "bSortable": true,
                "sWidth": "50%"
            },
            {
                "bSortable": true,
                "sWidth": "50%"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagEpersonsInfo,
            "sInfoEmpty": $(document).data('i18n').BagepErsonsEmpty,
            "sInfoFiltered": $(document).data('i18n').BagEpersonsFilter,
            "sLengthMenu": $(document).data('i18n').BagEpersonsMenu,
            "sZeroRecords": $(document).data('i18n').BagNoEpersonsSelected,
            "sSearch": $(document).data('i18n').BagSearch,
            "oPaginate": {
                "sFirst":    $(document).data('i18n').BagNavFirst,
                "sPrevious": $(document).data('i18n').BagNavPrev,
                "sNext":     $(document).data('i18n').BagNavNext,
                "sLast":     $(document).data('i18n').BagNavLast
            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        "sAjaxSource": getContextPath() + "/JSON/cua/searchepersonbag",
        "fnInitComplete": function() {
            var table = $('table#aspect_statistics_editorparts_BagTransformer_table_epersonbag');
            table.show();
            table.parents('.dataTables_wrapper').fadeIn("fast");
//                IE6 Bugfix - Start
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').hide();
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').show();
//                IE6 Bugfix - End
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $(nRow).attr('handle', aData[0]);
            return nRow;
        },
        "fnDrawCallback": function() {
            try {
                matchHeights();
            } catch(e) {
                //in case there's no matchHeights() in this DSpace
            }
        },
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            aoData.push( { "name": "value", "value": "7-1" });
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    /* Do whatever additional processing you want on the callback, then tell DataTables */
                    fnCallback(json);
                }
            });
        }
    });

}

function initGroupBag() {
    groupBag = $('#aspect_statistics_editorparts_BagTransformer_table_groupbag').dataTable({
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false,
                "sWidth": "16px"
            },
            {
                "bSortable": false,
                "sWidth": "100%"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagEpersonsInfo,
            "sInfoEmpty": $(document).data('i18n').BagepErsonsEmpty
//            "sZeroRecords": $(document).data('i18n').BagNoEpersonsSelected,
//            "sSearch": $(document).data('i18n').BagSearch,
//            "oPaginate": {
//                "sFirst":    $(document).data('i18n').BagNavFirst,
//                "sPrevious": $(document).data('i18n').BagNavPrev,
//                "sNext":     $(document).data('i18n').BagNavNext,
//                "sLast":     $(document).data('i18n').BagNavLast
//            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": false,
        "bPaginate": false,
        "bServerSide": true,
        "bFilter": false,
        "bInfo": false,
        "sAjaxSource": getContextPath() + "/JSON/cua/searchgroupbag",
        "fnInitComplete": function() {
            var table = $('table#aspect_statistics_editorparts_BagTransformer_table_groupbag');
            table.show();
            table.parents('.dataTables_wrapper').fadeIn("fast");
//                IE6 Bugfix - Start
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').hide();
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').show();
//                IE6 Bugfix - End
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $(nRow).attr('handle', aData[0]);
            return nRow;
        },
        "fnDrawCallback": function() {
            try {
                matchHeights();
            } catch(e) {
                //in case there's no matchHeights() in this DSpace
            }
        },
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            aoData.push( { "name": "value", "value": "7-1" });
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    /* Do whatever additional processing you want on the callback, then tell DataTables */
                    fnCallback(json);
                }
            });
        }
    });

}
function initBitstreamBag() {
    $('#aspect_statistics_editorparts_BagTransformer_table_bitstreambag th.foldHeader').html("<div id=\"bitstreamMenuBagTrigger\" class=\"gear-icon\">&#160;</div><ul id=\"bitstreamMenu\"><li><a href=\"#\"><span class=\"ui-icon ui-icon-triangle-1-s\" title=\"Click To Close All\" style=\"cursor: pointer;\" />"+$(document).data('i18n').CloseAll+"</a></li>" +
        "<li><a href=\"#\"><span class=\"remove-icon\" title=\"Click To Select All\" style=\"cursor: pointer;\" onclick=\"removeAllBitstreams(this)\"/>"+$(document).data('i18n').DeselectAll+"</a></li></ul>");

    $("#bitstreamMenu li:first").click(function(){
        var $span = $('span:first',$(this));
        if($span.hasClass('ui-icon-triangle-1-s'))
       {
           foldCloseAll($span);
       } else {
            foldOpenAll($span);
        }
    });

    $("#bitstreamMenu li:last").click(function(){
        removeAllBitstreams($('span:first',$(this)));
    });

    $('#bitstreamMenu').hide().menu().menu("collapseAll");
    $('#bitstreamMenuBagTrigger').click(function(){
        var menu=$('#bitstreamMenu');
        if(menu.is(":visible")){
            menu.hide();
        } else {
            menu.show();
        }

    });
    bitstreamBag = $('#aspect_statistics_editorparts_BagTransformer_table_bitstreambag').dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false
            },
            {
                "bSortable": true,
                "sWidth": "100%"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagItemsInfo,
            "sInfoEmpty": $(document).data('i18n').BagItemsEmpty,
            "sInfoFiltered": $(document).data('i18n').BagItemsFilter,
            "sLengthMenu": $(document).data('i18n').BagItemsMenu,
            "sZeroRecords": $(document).data('i18n').BagNoItemsSelected,
            "sSearch": $(document).data('i18n').BagSearch,
            "oPaginate": {
                "sFirst":    $(document).data('i18n').BagNavFirst,
                "sPrevious": $(document).data('i18n').BagNavPrev,
                "sNext":     $(document).data('i18n').BagNavNext,
                "sLast":     $(document).data('i18n').BagNavLast
            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        "sAjaxSource": getContextPath() + "/JSON/cua/searchbag",
        "fnInitComplete": function() {
            var table = $('table#aspect_statistics_editorparts_BagTransformer_table_bitstreambag');
            table.show();
            table.parents('.dataTables_wrapper').fadeIn("fast");
//                IE6 Bugfix - Start
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').hide();
            $('div#aspect_statistics_editorparts_CountHitsForTransformer_div_counthits-wrapper').show();
//                IE6 Bugfix - End
        },
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            var handle = aData[0].toString();
            $(nRow).attr('handle', handle);
            $('td:first', nRow).css('vertical-align','top');
            var foldDefault = bitstreamBag.data('foldDefault');
            if (foldDefault == undefined)
                foldDefault = 'opened';
            if (foldDefault == 'closed') {
                try {
                    var opened = bitstreamBag.data('opened');
                    if (jQuery.inArray(handle, opened) > -1)
                        foldOpen($(nRow).find('td:first span.ui-icon').get(0), handle, false);
                } catch(e) {
                    //opened doesn't exist.
                }

            }
            if (foldDefault == 'opened') {
                try {
                    var closed = bitstreamBag.data('closed');
                    if (closed == undefined || jQuery.inArray(handle, closed) == -1)
                        foldOpen($(nRow).find('td:first span.ui-icon').get(0), handle, false);
                } catch(e) {
                    //closed doesn't exist.
                }
            }

            return nRow;
        },
        "fnDrawCallback": function() {
            try {
                matchHeights();
            } catch(e) {
                //in case there's no matchHeights() in this DSpace
            }
        },
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            aoData.push( { "name": "value", "value": "0-1" });
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    /* Do whatever additional processing you want on the callback, then tell DataTables */
                    fnCallback(json);
                }
            });
        }
    });

}

function initItemTable() {
    var scope = $('select[name="scope"]');
    $('#aspect_statistics_editorparts_BagTransformer_table_itemtable  th.toggleHeader').html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Click To Add All\" style=\"cursor: pointer;\" onclick=\"addAllToItemBag()\"/>");
    itemStore = $('#aspect_statistics_editorparts_BagTransformer_table_itemtable').dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false,
                "sWidth": "16px"
            },
            {
                "bSortable": true,
                "sWidth": "310px"
            },
            {
                "bSortable": false,
                "sWidth": "310px"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagItemsInfo,
            "sInfoEmpty": $(document).data('i18n').BagItemsEmpty,
            "sInfoFiltered": $(document).data('i18n').BagItemsFilter,
            "sLengthMenu": $(document).data('i18n').BagItemsMenu,
            "sZeroRecords": $(document).data('i18n').BagNoItemsSelected,
            "sSearch": $(document).data('i18n').BagSearch,
            "oPaginate": {
                "sFirst":    $(document).data('i18n').BagNavFirst,
                "sPrevious": $(document).data('i18n').BagNavPrev,
                "sNext":     $(document).data('i18n').BagNavNext,
                "sLast":     $(document).data('i18n').BagNavLast
            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "bServerSide": true,
        "sDom": '<"datatablesheader"lfr><"datatablescroller"t><"datatablefooter"ip>',
        "sPaginationType": "full_numbers",
        "sAjaxSource": getContextPath() + "/JSON/cua/searchdspace",
        "fnInitComplete": function() {
            var table = $('#aspect_statistics_editorparts_BagTransformer_table_itemtable');
            var wrapperDiv = table.parents('.dataTables_wrapper');
            table.show();
            wrapperDiv.show();
            if (scope.length > 0) {
                var p = scope.parent('p');
                var filterDiv = wrapperDiv.find("div.dataTables_filter");
                var inputWith = filterDiv.find('input').outerWidth();
                filterDiv.append("<br/>" + $(document).data('i18n').BagScope + ": ");
                filterDiv.append(scope);
                scope.width(inputWith);
                p.remove();
                scope.change(function() {
                    scope.data('changed', true);
                    itemStore.fnDraw(false);
                });
            }
        },
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $(nRow).attr('handle', aData[0]);
			return nRow;
		},
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            if (itemBag) {
                aoData.push( { "name": "value", "value": "2-1" });
            }
            if (scope.length > 0) {
                aoData.push( { "name": "sScope", "value": scope.val() });
                var changed = scope.data('changed');
                if (changed == undefined || changed == '')
                    changed = false;
                aoData.push( { "name": "bScopeChanged", "value": changed });
                scope.data('changed', false);
            }
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    var scopeArray = json.aScope;
                    if (scopeArray != undefined) {
                        scope.find('option:not(:first)').remove();
                        $.each(scopeArray, function() {
                            scope.append('' + this);
                        });
                    }
                    fnCallback(json);
                }
            });
        }
    });
}



function renderGroup(groups, owningList) {
    for (var i = 0; i < groups.length; i++) {
        var groupRecord = groups[i];
        var item = $('<li></li>').appendTo(owningList);
        item.append($('<input>',
                {
                    id: 'group_' + groupRecord.identifier,
                    type: 'checkbox',
                    name: 'group_id',
                    value: groupRecord.identifier

                }));
        var hasChildren = groupRecord.children != undefined && 0 < groupRecord.children.length;

        var a = $('<a/>', {
            href: "",
            onclick: "return false;",
            text: groupRecord.name
        }).appendTo(item);

        $('<img/>', {
            src: getContextPath() + '/themes/ReportingSuite/images/arrowonlyleft.png',
            srcAlt: getContextPath() + '/themes/ReportingSuite/images/arrowonlydown.png',
            style: "vertical-align:middle; display: inline; padding-right:3px; padding-bottom:3px;"
        }).addClass(hasChildren ? '' : 'hidden').prependTo(a);

        a.click(function (e) {
            e.preventDefault();

            var img = $(this).find('img');
            var oldSrc = img.attr('src');
            img.attr('src', img.attr('srcAlt'));
            img.attr('srcAlt', oldSrc);

            var list = $(this).parent().find('> ul');
            if(list.is(':visible')){
                list.hide();
            }else{
                list.show();
            }
        });
//
        if(hasChildren)
        {
            var childList = $('<ul class="ds-simple-list commCollList notDisplayed"></ul>');
            renderGroup(groupRecord.children, childList);
            item.append(childList);
        }
    }
}

function initGroupsDialogDiv() {
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/searchdspacegroup",
        type: 'POST',
        dataType: 'json',
        data: undefined, //has to be undefined, can't just leave it out or it will break in IE
        success: function (json) {
            var mainDivision = $('#aspect_statistics_editorparts_BagTransformer_div_groupsDiv');
            var addButton = $('<div/>',
                    {
                        text: $(document).data('i18n').addSelectedGroups
                    }
            ).addClass('add-to-bag-button ui-corner-all');
            addButton.mouseout(function(){
                $(this).removeClass("button-hover");
            });
            addButton.mouseover(function(){
                $(this).addClass("button-hover");
            });
            addButton.click(function(){
                //Collect all the groups & construct a query & display variable & pass this on to the group bag
                var query = '';
                var displayed = '';
                var checkBoxes = $('#aspect_statistics_editorparts_BagTransformer_div_groupsDiv').find('input[name="group_id"]:checked');
                checkBoxes.each(function(){
                    var $this = $(this);
                    if(0 < query.length)
                    {
                        query += ' ';
                        //Use this char as a separtater so we can easily separate group names
                        displayed += '|||';
                    }
                    query += $this.val();
                    displayed += $this.parent().find('a:first').text();
                });


                //Check if at least one group has been selected
                if(0 < query.length)
                {

                    addToGroupBag(query, displayed);
                }
                //Close the dialog
                $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").dialog("close");
            });

            mainDivision.append(addButton);
            var list = $('<ul class="ds-simple-list commCollList"></ul>');
            renderGroup(json.list, list);
            mainDivision.append(list);
            mainDivision.append(addButton);
            //IE 7 header bugfix
            if($('body.ie7'))
            {
                var dialogBox = $("div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv").parent();
                dialogBox.find('div.ui-dialog-titlebar').css('width', dialogBox.width());
            }
        }
    });
}
function initEpersonTable() {
    var scope = $('select[name="scope"]');
    $('#aspect_statistics_editorparts_BagTransformer_table_epersontable  th.toggleHeader').html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Click To Add All\" style=\"cursor: pointer;\" onclick=\"addAllToEpersonBag()\"/>");
    epersonStore = $('#aspect_statistics_editorparts_BagTransformer_table_epersontable').dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false,
                "sWidth": "16px"
            },
            {
                "bSortable": true,
                "sWidth": "310px"
            },
            {
                "bSortable": true,
                "sWidth": "310px"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagEpersonsInfo,
            "sInfoEmpty": $(document).data('i18n').BagEpersonsEmpty,
            "sInfoFiltered": $(document).data('i18n').BagEpersonsFilter,
            "sLengthMenu": $(document).data('i18n').BagEpersonsMenu,
            "sZeroRecords": $(document).data('i18n').BagNoEpersonsSelected,
            "sSearch": $(document).data('i18n').BagSearch,
            "oPaginate": {
                "sFirst":    $(document).data('i18n').BagNavFirst,
                "sPrevious": $(document).data('i18n').BagNavPrev,
                "sNext":     $(document).data('i18n').BagNavNext,
                "sLast":     $(document).data('i18n').BagNavLast
            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "bServerSide": true,
        "sDom": '<"datatablesheader"lfr><"datatablescroller"t><"datatablefooter"ip>',
        "sPaginationType": "full_numbers",
        "sAjaxSource": getContextPath() + "/JSON/cua/searchdspaceeperson",
        "fnInitComplete": function() {
            var table = $('#aspect_statistics_editorparts_BagTransformer_table_epersontable');
            var wrapperDiv = table.parents('.dataTables_wrapper');
            table.show();
            wrapperDiv.show();
            if (scope.length > 0) {
                var p = scope.parent('p');
                var filterDiv = wrapperDiv.find("div.dataTables_filter");
                var inputWith = filterDiv.find('input').outerWidth();
                filterDiv.append("<br/>" + $(document).data('i18n').BagScope + ": ");
                filterDiv.append(scope);
                scope.width(inputWith);
                p.remove();
                scope.change(function() {
                    scope.data('changed', true);
                    epersonStore.fnDraw(false);
                });
            }
        },
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $(nRow).attr('handle', aData[0]);
			return nRow;
		},
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            if (epersonBag) {
                aoData.push( { "name": "value", "value": "7-1" });
            }
            if (scope.length > 0) {
                aoData.push( { "name": "sScope", "value": scope.val() });
                var changed = scope.data('changed');
                if (changed == undefined || changed == '')
                    changed = false;
                aoData.push( { "name": "bScopeChanged", "value": changed });
                scope.data('changed', false);
            }
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    var scopeArray = json.aScope;
                    if (scopeArray != undefined) {
                        scope.find('option:not(:first)').remove();
                        $.each(scopeArray, function() {
                            scope.append('' + this);
                        });
                    }
                    fnCallback(json);
                }
            });
        }
    });
}

function initBitstreamTable() {
    var scope = $('select[name="scope"]');
    $('#aspect_statistics_editorparts_BagTransformer_table_bitstreamtable th.foldHeader').html("<div id=\"bitstreamMenuTrigger\" class=\"gear-icon\">&#160;</div><ul id=\"bitstreamTableMenu\"><li><a href=\"#\"><span class=\"ui-icon ui-icon-triangle-1-e float_left\" title=\"Click To Close All\" style=\"cursor: pointer;\" />"+$(document).data('i18n').OpenAll+"</a></li>" +
        "<li><a href=\"#\" onclick=\"addAllToBitstreamBag(this)\"><span class=\"add-icon\" title=\"Click To Select All\" style=\"cursor: pointer;\" />"+$(document).data('i18n').SelectAll+"</a></li></ul>");

    $('#bitstreamTableMenu').hide().menu().menu("collapseAll");
    $('#bitstreamMenuTrigger').click(function(){
        var menu=$('#bitstreamTableMenu');
        if(menu.is(":visible")){
            menu.hide();
        } else {
            menu.show();
        }

    });

    $("#bitstreamTableMenu li:first").click(function(){
        var $span = $('span:first',$(this));
        if($span.hasClass('ui-icon-triangle-1-s'))
        {
            foldCloseAll($span);
        } else {
            foldOpenAll($span);
        }
    });
    bitstreamStore = $('#aspect_statistics_editorparts_BagTransformer_table_bitstreamtable').dataTable({
        "aaSorting": [[2,'asc']],
        "aoColumns": [
            {
                "bSortable": false,
                "bSearchable": false,
                "bVisible":    false
            },
            {
                "bSortable": false
            },
            {
                "bSortable": true,
                "sWidth": "620px"
            }
        ],
        "oLanguage": {
            "sProcessing": $(document).data('i18n').BagProcessing,
            "sInfo": $(document).data('i18n').BagItemsInfo,
            "sInfoEmpty": $(document).data('i18n').BagItemsEmpty,
            "sInfoFiltered": $(document).data('i18n').BagItemsFilter,
            "sLengthMenu": $(document).data('i18n').BagItemsMenu,
            "sZeroRecords": $(document).data('i18n').BagNoItemsSelected,
            "sSearch": $(document).data('i18n').BagSearch,
            "oPaginate": {
                "sFirst":    $(document).data('i18n').BagNavFirst,
                "sPrevious": $(document).data('i18n').BagNavPrev,
                "sNext":     $(document).data('i18n').BagNavNext,
                "sLast":     $(document).data('i18n').BagNavLast
            }
        },
        "bAutoWidth": false,
        "bJQueryUI": true,
        "bProcessing": true,
        "bSort": true,
        "bPaginate": true,
        "bServerSide": true,
        "sDom": '<lfr><"datatablescroller"t><"datatablefooter"ip>',
        "sPaginationType": "full_numbers",
        "sAjaxSource": getContextPath() + "/JSON/cua/searchdspace",
        "fnInitComplete": function() {
            var table = $('#aspect_statistics_editorparts_BagTransformer_table_bitstreamtable');
            var wrapperDiv = table.parents('.dataTables_wrapper');
            table.show();
            wrapperDiv.show();
            if (scope.length > 0) {
                var p = scope.parent('p');
                var filterDiv = wrapperDiv.find("div.dataTables_filter");
                var inputWith = filterDiv.find('input').outerWidth();
                filterDiv.append("<br/>" + $(document).data('i18n').BagScope + ": ");
                filterDiv.append(scope);
                scope.width(inputWith);
                p.remove();
                scope.change(function() {
                    scope.data('changed', true);
                    bitstreamStore.fnDraw(false);
                });
            }
        },
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            var handle = aData[0].toString();
            $(nRow).attr('handle', handle);
            $('td:first', nRow).css('vertical-align','top');
            var foldDefault = bitstreamStore.data('foldDefault');
            if (foldDefault == undefined)
                foldDefault = 'closed';
            if (foldDefault == 'closed') {
                try {
                    var opened = bitstreamStore.data('opened');
                    if (jQuery.inArray(handle, opened) > -1)
                        foldOpen($(nRow).find('td:first span.ui-icon').get(0), handle, false);
                } catch(e) {
                    //opened doesn't exist.
                }

            }
            if (foldDefault == 'opened') {
                try {
                    var closed = bitstreamStore.data('closed');
                    if (closed == undefined || jQuery.inArray(handle, closed) == -1)
                        foldOpen($(nRow).find('td:first span.ui-icon').get(0), handle, false);
                } catch(e) {
                    //closed doesn't exist.
                }
            }

			return nRow;
		},
        "fnServerData": function ( sSource, aoData, fnCallback ) {
            /* Add some extra data to the sender */
            if (bitstreamBag) {
                aoData.push( { "name": "value", "value": "0-1" });
            }
            if (scope.length > 0) {
                aoData.push( { "name": "sScope", "value": scope.val() });
                var changed = scope.data('changed');
                if (changed == undefined || changed == '')
                    changed = false;
                aoData.push( { "name": "bScopeChanged", "value": changed });
                scope.data('changed', false);
            }
            $.ajax({
                cache: false,
                url: sSource,
                type: 'POST',
                dataType: 'json',
                data: aoData,
                success: function (json) {
                    var scopeArray = json.aScope;
                    if (scopeArray != undefined) {
                        scope.find('option:not(:first)').remove();
                        $.each(scopeArray, function() {
                            scope.append('' + this);
                        });
                    }
                    fnCallback(json);
                }
            });
        }
    });
}

function addToItemBag(button, handle) {
    var buttonCell = $(button).parent('td');
    buttonCell.html("<img alt=\"remove\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Remove From Selection\" style=\"cursor: pointer;\" onclick=\"removeFromItemBag('" + handle + "')\"/>");
    var cells = buttonCell.siblings();
    var dataArray = [
        {"name": "value", "value": "2-1"},
        {"name": "addAll", "value": "false"},
        {"name": "included_handles", "value": handle}
    ];
    var searchField = itemStore.find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function removeFromItemBag(handle) {
    var dataArray = [
        {"name": "value", "value": "2-1"},
        {"name": "all", "value": "false"},
        {"name": "handles", "value": handle}
    ];
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            var storeRow = itemStore.find('tr[handle = "' + handle + '"]');
            if (storeRow.length > 0) {
                var td = storeRow.find('img[alt="remove"]').parent('td');
                td.html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Add To Selection\" style=\"cursor: pointer;\" onclick=\"addToItemBag(this, '" + handle + "')\"/>");
            }
        }
    });
}
function addToEpersonBag(button, handle) {
    var buttonCell = $(button).parent('td');
    buttonCell.html("<img alt=\"remove\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Remove From Selection\" style=\"cursor: pointer;\" onclick=\"removeFromEpersonBag('" + handle + "')\"/>");
    var cells = buttonCell.siblings();
    var dataArray = [
        {"name": "value", "value": "7-1"},
        {"name": "addAll", "value": "false"},
        {"name": "eperson", "value": handle}
    ];
    var searchField = epersonStore.find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            epersonBag.fnDraw(false);
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function addToGroupBag(query, display) {
//    var buttonCell = $(button).parent('td');
//    buttonCell.html("<img alt=\"remove\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Remove From Selection\" style=\"cursor: pointer;\" onclick=\"removeFromEpersonBag('" + handle + "')\"/>");
//    var cells = buttonCell.siblings();
    var dataArray = [
        {"name": "value", "value": "6-1"},
        {"name": "addAll", "value": "false"},
        {"name": "groupQuery", "value": query},
        {"name": "groupDisplayed", "value": display}
    ];
//    var searchField = epersonStore.find('div.dataTables_filter input');
//    if (searchField.length > 0)
//        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            groupBag.fnDraw(false);
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function removeFromEpersonBag(handle) {
    var dataArray = [
        {"name": "value", "value": "7-1"},
        {"name": "all", "value": "false"},
        {"name": "eperson", "value": handle}
    ];
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            epersonBag.fnDraw(false);
            var storeRow = epersonStore.find('tr[handle = "' + handle + '"]');
            if (storeRow.length > 0) {
                var td = storeRow.find('img[alt="remove"]').parent('td');
                td.html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Add To Selection\" style=\"cursor: pointer;\" onclick=\"addToEpersonBag(this, '" + handle + "')\"/>");
            }
        }
    });
}

function removeFromGroupBag(query) {
    var dataArray = [
        {"name": "value", "value": "6-1"},
        {"name": "all", "value": "false"},
        {"name": "groupQuery", "value": query}
    ];
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            groupBag.fnDraw(false);
        }
    });
    //Now remove the select checkbox
    var selectedBox = $('div#aspect_statistics_editorparts_BagTransformer_div_overlaydiv').find('input[id="group_' + query + '"]:checkbox:checked');
    selectedBox.removeAttr('checked');
}

function removeAllFromItemBag() {
    var dataArray = [
        {"name": "value", "value": "2-1"},
        {"name": "all", "value": "true"}
    ];
    var searchField = itemBag.parent().parent().find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            itemStore.fnDraw(false);
        }
    });
}

function addToBitstreamBag(button, handle, bitstreamID) {
    handle = handle.toString();


    var buttonCell = $(button).parent('td');
    var itemRow = handle + ":";
    itemRow += buttonCell.parents('tr:first').attr('bitstream_id');

    var dataArray = [
        {"name": "value", "value": "0-1"},
        {"name": "addAll", "value": "false"},
        {"name": "included", "value": itemRow}
    ];
    var searchField = bitstreamStore.find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            bitstreamBag.fnDraw(false);
            bitstreamStore.fnDraw(false);
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function removeFromBitstreamBag(button, handle, bitstreamID) {
    var buttonCell = $(button).parent('td');
    var itemRow = handle + ":";
    itemRow += buttonCell.parents('tr:first').attr('bitstream_id');

    var dataArray = [
        {"name": "value", "value": "0-1"},
        {"name": "all", "value": "false"},
        {"name": "handles", "value": itemRow}
    ];
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            bitstreamBag.fnDraw(false);
            bitstreamStore.fnDraw(false);
        }
    });
}


function foldOpen(button, handle, userAction) {
    handle = handle.toString();
    var jqButton = $(button);
    var jqObj = jqButton.parents("table:first");
    if (userAction) {
        try {
            var closed = jqObj.data('closed');
            var closedIndex = jQuery.inArray(handle, closed);
            if (closedIndex > -1)
                closed.splice(closedIndex, 1); //remove the id from the closed array
        } catch(e) {
            //closed doesn't exist, but it doesn't need to exist.
        }
        try {
            var opened = jqObj.data('opened');
            if (jQuery.inArray(handle, opened) == -1)
                opened.push(handle);
        } catch(e) {
            //opened doesn't exist, create it.
            jqObj.data('opened', [handle]);
        }
    }

    var buttonCell = jqButton.parent('td');
    var sliderDiv = buttonCell.siblings().find("div.tableslider");
    if (userAction)
        sliderDiv.slideDown("fast");
    else
        sliderDiv.css('display', 'block'); //can't use show() doesn't work in IE
    buttonCell.html("<span class=\"ui-icon ui-icon-triangle-1-s\" title=\"" + $(document).data('i18n').BagBitClose + "\" style=\"cursor: pointer;\" onclick=\"foldClose(this, '" + handle + "', true)\"/>");
}

function foldClose(button, handle, userAction) {
    handle = handle.toString();
    var jqButton = $(button);
    var jqObj = jqButton.parents("table:first");
    if (userAction) {
        try {
            var opened = jqObj.data('opened');
            var openedIndex = jQuery.inArray(handle, opened);
            if (openedIndex > -1)
                opened.splice(openedIndex, 1); //remove the id from the opened array
        } catch(e) {
            //opened doesn't exist, but it doesn't need to exist.
        }
        try {
            var closed = jqObj.data('closed');
            if (jQuery.inArray(handle, closed) == -1)
                closed.push(handle);
        } catch(e) {
            //closed doesn't exist, create it.
            jqObj.data('closed', [handle]);
        }
    }
    var buttonCell = jqButton.parent('td');
    var sliderDiv = buttonCell.siblings().find("div.tableslider");
    if (userAction)
        sliderDiv.slideUp("fast");
    else
        sliderDiv.css('display', 'none'); //can't use hide() doesn't work in IE
    buttonCell.html("<span class=\"ui-icon ui-icon-triangle-1-e\" title=\"" + $(document).data('i18n').BagBitOpen + "\" style=\"cursor: pointer;\" onclick=\"foldOpen(this, '" + handle + "', true)\"/>");
}

function foldOpenAll(button) {
    var jqButton = $(button);
    var jqObj = jqButton.parents("table:first");

    jqButton.next('span').text($(document).data('i18n').CloseAll);
    jqButton.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
    jqObj.data('foldDefault', 'opened');
    jqObj.removeData('opened');
    jqObj.removeData('closed');
    jQuery.each(jqObj.find("span.ui-icon-triangle-1-e"), function(){
        var buttonCell = $(this).parent('td');
        var handle = buttonCell.parent('tr').attr('handle').toString();
        buttonCell.siblings().find("div.tableslider").slideDown("fast");
        buttonCell.html("<span class=\"ui-icon ui-icon-triangle-1-s\" title=\"" + $(document).data('i18n').BagBitClose + "\" style=\"cursor: pointer;\" onclick=\"foldClose(this, '" + handle + "', true)\"/>");
    });
    $('#bitstreamTableMenu').hide();
    $('#bitstreamMenu').hide();
}

function foldCloseAll(button) {
    var jqButton = $(button);
    var jqObj = jqButton.parents("table:first");
    jqButton.next('span').text($(document).data('i18n').OpenAll);
    jqButton.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
    jqObj.data('foldDefault', 'closed');
    jqObj.removeData('opened');
    jqObj.removeData('closed');
    jQuery.each(jqObj.find("span.ui-icon-triangle-1-s"), function() {
        var buttonCell = $(this).parent('td');
        var handle = buttonCell.parent('tr').attr('handle').toString();
        buttonCell.siblings().find("div.tableslider").slideUp("fast");
        buttonCell.html("<span class=\"ui-icon ui-icon-triangle-1-e\" title=\"" + $(document).data('i18n').BagBitOpen + "\" style=\"cursor: pointer;\" onclick=\"foldOpen(this, '" + handle + "', true)\"/>");
    });
    $('#bitstreamTableMenu').hide();
    $('#bitstreamMenu').hide();
}

function isOpenInStore(handle) {
    var foldDefault = bitstreamStore.data('foldDefault');
    if ('opened' == foldDefault) {
        var storeClosed = bitstreamStore.data('closed');
        return !(storeClosed != undefined && jQuery.inArray(handle, storeClosed) > -1);
    } else {
        var storeOpened = bitstreamStore.data('opened');
        return storeOpened != undefined && jQuery.inArray(handle, storeOpened) > -1;
    }
}

function isOpenInBag(handle) {
    var bagFoldDefault = bitstreamBag.data('foldDefault');
    if ('closed' == bagFoldDefault) {
        var bagOpened = bitstreamBag.data('opened');
        return bagOpened != undefined && jQuery.inArray(itemID, bagOpened) > -1;
    } else {
        var bagClosed = bitstreamBag.data('closed');
        return !(bagClosed != undefined && jQuery.inArray(itemID, bagClosed) > -1);
    }

}

function getStoreFoldDefault() {
    var foldDefault = bitstreamStore.data('foldDefault');
    if (foldDefault == undefined)
        foldDefault = 'closed';
    return foldDefault;
}

function getBagFoldDefault() {
    var foldDefault = bitstreamBag.data('foldDefault');
    if (foldDefault == undefined)
        foldDefault = 'opened';
    return foldDefault;
}

function getItemBagContents() {
    var bagContents = "";
    if (itemBag) {
        var dataMatrix = itemBag.fnGetData();
        var first = true;
        jQuery.each(dataMatrix, function(i, val) {
            if (dataMatrix[i] != null) {
                if (first)
                    first = false;
                else
                    bagContents += ";";

                bagContents += dataMatrix[i][0];
            }
        });
    }
    return bagContents;
}

function getEpersonBagContents() {
    var bagContents = "";
    if (epersonBag) {
        var dataMatrix = epersonBag.fnGetData();
        var first = true;
        jQuery.each(dataMatrix, function(i, val) {
            if (dataMatrix[i] != null) {
                if (first)
                    first = false;
                else
                    bagContents += ";";

                bagContents += dataMatrix[i][0];
            }
        });
    }
    return bagContents;
}

function getBitstreamBagContents() {
    var bagContents = "";
    if (bitstreamBag) {
        var dataMatrix = bitstreamBag.fnGetData();
        var first = true;
        jQuery.each(dataMatrix, function(i, val) {
            if (dataMatrix[i] != null) {
                if (first)
                    first = false;
                else
                    bagContents += ";";
                var handle = dataMatrix[i][0];
                $('body').append('<div id="hidden_search_div" style="display: none"/>');
                var searchDiv = $('div#hidden_search_div');
                searchDiv.append(dataMatrix[i][2]);
                var buttons = searchDiv.find("img[alt=remove]");
                jQuery.each(buttons, function(j, val2) {
                    if (j > 0)
                        bagContents += ",";

                    bagContents += $(this).parents('tr:first').attr('bitstream_id');
                });
                searchDiv.remove();
            }
        });
    }
    return bagContents;
}

function gatherItemBag() {
    var bagContents = getItemBagContents();
    if (bagContents.length > 0)
    {
        var o = new Object();
        o.key = "itembag";
        o.value = bagContents;
        return o;
    }
    else
        throw new Error($(document).data('i18n').BagErrItem);
}

function gatherEpersonBag() {
    var bagContents = getEpersonBagContents();
    if (bagContents.length > 0)
    {
        var o = new Object();
        o.key = "epersonbag";
        o.value = bagContents;
        return o;
    }
    else
        throw new Error($(document).data('i18n').BagErrItem);
}

function gatherBitstreamBag() {
    var bagContents = getBitstreamBagContents();
    if (bagContents.length > 0){
        var o = new Object();
        o.key = "bitstreambag";
        o.value = bagContents;
        return o;
    }

    else
        throw new Error($(document).data('i18n').BagErrBit);
}

function addAllToItemBag() {
    var dataArray = [
        {"name": "value", "value": "2-1"},
        {"name": "addAll", "value": "true"}

    ];
    var searchField = itemStore.parent().parent().find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $('.dataTables_processing').addClass("notice").css("visibility","visible").addClass("notice");
    var scope=$('#aspect_statistics_editorparts_BagTransformer_field_scope');
    if(scope.length>0){
        dataArray.push({"name": "scope", "value": scope.val()});
    }
    $('.dataTables_processing').addClass("notice").css("visibility","visible").addClass("notice");
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            itemStore.fnDraw(false);
            $('.dataTables_processing').css("visibility","visible");
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function addAllToBitstreamBag() {

    $('.dataTables_processing').addClass("notice").css("visibility","visible").addClass("notice");

    $('#bitstreamTableMenu').hide();


    var dataArray = [
        {"name": "value", "value": "0-1"},
        {"name": "addAll", "value": "true"}

    ];

    var searchField = bitstreamStore.parent().parent().find('div.dataTables_filter input');
    if (searchField.length > 0) {
        dataArray.push({"name": "query", "value": searchField.val()});
    }
    var scope=$('#aspect_statistics_editorparts_BagTransformer_field_scope');
    if(scope.length>0){
        dataArray.push({"name": "scope", "value": scope.val()});
    }

    $('.dataTables_processing').addClass("notice").css("visibility","visible").addClass("notice");
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            $('.dataTables_processing').css("visibility","visible");
            bitstreamStore.fnDraw(false);

            bitstreamBag.fnDraw(false);
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}


function removeAllBitstreams() {

    $('#bitstreamMenu').hide();
    var dataArray = [
        {"name": "value", "value": "0-1"},
        {"name": "all", "value": "true"}
    ];
    var searchField = bitstreamBag.find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            bitstreamBag.fnDraw(false);
            bitstreamStore.fnDraw(false);
        }
    });
}

function addAllToEpersonBag() {


    var dataArray = [
        {"name": "value", "value": "7-1"},
        {"name": "addAll", "value": "true"}
    ];
    var searchField = epersonStore.parent().parent().find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/addToBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            epersonBag.fnDraw(false);
            epersonStore.fnDraw(true);
            $('div#aspect_statistics_editorparts_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function removeAllFromEpersonBag(handle) {
    var dataArray = [
        {"name": "value", "value": "7-1"},
        {"name": "all", "value": "true"}
    ];
    var searchField = epersonBag.parent().parent().find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/cua/removeFromBag",
        type: 'POST',
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            epersonBag.fnDraw(false);
            epersonStore.fnDraw(false);
//            var storeRow = epersonStore.find('tr[handle = "' + handle + '"]');
//            if (storeRow.length > 0) {
//                var td = storeRow.find('img[alt="remove"]').parent('td');
//                td.html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Add To Selection\" style=\"cursor: pointer;\" onclick=\"addToEpersonBag(this, '" + handle + "')\"/>");
//            }
        }
    });
}
