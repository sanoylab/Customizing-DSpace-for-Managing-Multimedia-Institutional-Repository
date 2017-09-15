var itemBag;
var itemStore;

//Namespace initializations should move to separate init file.
//We'll need a dependency manager (require.js) for that.
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

window.Atmire.Utils.getParameter = function (q, s) {
    s = s ? s : window.location.search;
    var re = new RegExp('&' + q + '(?:=([^&]*))?(?=&|$)', 'i');
    return (s = s.replace(/^\?/, '&').match(re)) ? (typeof s[1] === 'undefined' ? '' : decodeURIComponent(s[1])) : undefined;
};

window.Atmire.Mqm.Batchedit.workflowMode = false;

$(document).ready(function(){
    $.getJSON(getContextPath() + "/JSON/mqm/i18n", undefined, function (json) {
        $(document).data('i18n', json);

        window.Atmire.Mqm.Batchedit.workflowMode = $('[name = "workflow-mode"]').val() === "true";

        initItemBag();
        $('table#aspect_metadataquality_batchedit_BagTransformer_table_itemtable').show();
        if ($('div#aspect_metadataquality_batchedit_BagTransformer_table_itemtable_wrapper').length == 0) {
            initItemTable();
        }
        $("div#aspect_metadataquality_batchedit_BagTransformer_div_overlaydiv").dialog({
            bgiframe: true,
            autoOpen: false,
            width: 664,
            resizable: false,
            title: $(document).data('i18n').AddItems,
            open: function() {
                var filterDiv = $(this).find('div.dataTables_filter');
                var inputWith = filterDiv.find('input').outerWidth();
                var scope = filterDiv.find('select[name="scope"]');
                scope.width(inputWith);
            },
            modal: false
        });
        $('div.add-to-bag-button').click(function () {
            $("div#aspect_metadataquality_batchedit_BagTransformer_div_overlaydiv").dialog('open');
        });
        $('div.reset-button').click(function () {
            $.post(getContextPath() + "/JSON/mqm/inform", $.param({"batch-edit-stop": 'true'}, true), function() {
                window.location.reload();
            });
        });
        $(document).inspector('init', {
                    dataTable: itemBag,
                    removeFromDataTable: removeFromItemBag,
                    getActive: function(){
                        //Check if our dialog is open, if it is open the dialog becomes the default one
                        if($("div#aspect_metadataquality_batchedit_BagTransformer_div_overlaydiv").dialog( "isOpen" )){
                            return $('.quiklookDialogItemDiv');
                        }else{
                            return $('.inspector');
                        }
                    }
                });
//        Add inspector for our popup item table
        $(document).inspector('init', {
                    dataTable: itemStore,
                    classes: 'dataTables_wrapper quiklookDialogItemDiv',
                    //Do not bind keyboard events, they are already added (by the previous item bag)
                    bindKeyboardEvents: false
//                    removeFromItemBag: removeFromItemBag
                });
        updatePossibleActions();
    });
});


function initItemBag() {
    var notificationId, columns;

    notificationId = 'proc' + new Date().getTime();
    $(document).notify('neutral', {
        id:notificationId,
        message:$(document).data('i18n').OverlayProcessing,
        duration:0
    });
    $('#aspect_metadataquality_batchedit_BagTransformer_table_itembag th.toggleHeader').html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Click To Remove All\" style=\"cursor: pointer;\" onclick=\"removeAllFromItemBag()\"/>");
    if (window.Atmire.Mqm.Batchedit.workflowMode) {
        columns = [
            {
                "bSortable":false,
                "bSearchable":false,
                "bVisible":false
            },
            {
                "bSortable":false,
                "sWidth":"16px"
            },
            {
                "bSortable":true,
                "sWidth":"45%"
            },
            {
                "bSortable":false,
                "sWidth":"45%"
            },
            {
                "bSortable":true,
                "sWidth":"10%"
            },
            {
                "bSortable":false,
                "sWidth":"16px"
            }
        ];
    }
    else {
        columns = [
            {
                "bSortable":false,
                "bSearchable":false,
                "bVisible":false
            },
            {
                "bSortable":false,
                "sWidth":"16px"
            },
            {
                "bSortable":true,
                "sWidth":"50%"
            },
            {
                "bSortable":false,
                "sWidth":"50%"
            },
            {
                "bSortable":false,
                "bVisible": false
            },
            {
                "bSortable":false,
                "sWidth":"16px"
            }
        ];
    }
    itemBag = $('#aspect_metadataquality_batchedit_BagTransformer_table_itembag').dataTable({
        "aaSorting":[
            [2, 'asc']
        ],
        "aoColumns":columns,
        "oLanguage":{
            "sInfo":$(document).data('i18n').BagItemsInfo,
            "sInfoEmpty":$(document).data('i18n').BagItemsEmpty,
            "sInfoFiltered":$(document).data('i18n').BagItemsFilter,
            "sLengthMenu":$(document).data('i18n').BagItemsMenu,
            "sZeroRecords":$(document).data('i18n').BagNoItemsSelected
        },
        "bAutoWidth":false,
        "bJQueryUI":true,
        "bProcessing":true,
        "bSort":true,
        "bPaginate":true,
        "bServerSide":true,
        "sPaginationType":"full_numbers",
        "sAjaxSource":getContextPath() + "/JSON/mqm/searchbag",
        "fnInitComplete":function () {
            var table = $('table#aspect_metadataquality_batchedit_BagTransformer_table_itembag');
            table.show();
            toggleTabsVisibility();
            $('div#ds-body:hidden').fadeIn('fast', function () {
                if (itemBag.fnGetData().length == 0) {
                    $('div.add-to-bag-button').click();
                }
                $(document).notify('hide', notificationId);
            });
            var wrapper = table.parents('.dataTables_wrapper');

            //IE7 sort header bugfix
            $.each(wrapper.find('.DataTables_sort_wrapper'), function () {
                $(this).prepend($(this).find("span.css_right"));
            });

            wrapper.fadeIn("fast");

        },
        "fnRowCallback":function (nRow, aData, iDisplayIndex) {
            $(nRow).attr('handle', aData[0]);
            $(nRow).find('td:first').attr('align', 'center');
            return nRow;
        },
        "fnDrawCallback":function () {
            try {
                matchHeights();
            } catch (e) {
                //in case there's no matchHeights() in this DSpace
            }
            $("div.inspector").inspector('selectItemAfterPaging');
            $(itemBag.fnGetNodes()).each(function () {
                $(this).click(function (evt) {
                    if (!$(evt.target).closest('img') || $(evt.target).closest('img').size() == 0) {
                        $("div.inspector").inspector('selectItem', this);
                    }
                });
            });
            toggleTabsVisibility();
        },
        "fnServerData":function (sSource, aoData, fnCallback) {
            var i, dataObj, sortByObj;

            sortByObj = {
                name:"sort_by"
            };

            for (i = 0; i < aoData.length; i++) {
                dataObj = aoData[i];
                if (dataObj.name === 'iSortCol_0') {
                    if (dataObj.value === 2) {
                        sortByObj.value = "title"
                    }

                    if (dataObj.value === 4) {
                        sortByObj.value = "status"
                    }
                }
            }

            aoData.push(sortByObj);

            $.ajax({
                cache:false,
                url:sSource,
                type:'POST',
                dataType:'json',
                data:aoData,
                success:function (json) {
                    fnCallback(json);
                    if (json.iTotalRecords > 0)
                        $('div#aspect_metadataquality_batchedit_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
                }
            });
        }
    });

}

function initItemTable() {
    var handle, scope, table, wrapperDiv, p, filterDiv, changed, scopeArray, docStatus, lengthDiv, innerHTML, row;

    scope = $('select[name="scope"]');
    docStatus = $('select[name="DocStatus"]');

    if (window.Atmire.Mqm.Batchedit.workflowMode) {
        if (window.Atmire.Utils.getParameter('view') === "workflow") {
            docStatus.val('workflow');
        } else {
            docStatus.val('archived');
        }
    } else {
        docStatus.val('archived').hide();
    }

    handle = window.Atmire.Utils.getParameter('handle');
    if (typeof handle === "string") {
        addToItemBag(null, handle)
    }

    $('#aspect_metadataquality_batchedit_BagTransformer_table_itemtable th.toggleHeader').html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Click To Add All\" style=\"cursor: pointer;\" onclick=\"addAllToItemBag()\"/>");
    itemStore = $('#aspect_metadataquality_batchedit_BagTransformer_table_itemtable').dataTable({
        "aaSorting":[
            [2, 'asc']
        ],
        "aoColumns":[
            {
                "bSortable":false,
                "bSearchable":false,
                "bVisible":false
            },
            {
                "bSortable":false,
                "sWidth":"16px"
            },
            {
                "bSortable":true,
                "sWidth":"310px"
            },
            {
                "bSortable":false,
                "sWidth":"310px"
            },
            {
                "bSortable":false,
                "sWidth":"16px"
            }
        ],
        "oLanguage":{
            "sInfo":$(document).data('i18n').BagItemsInfo,
            "sInfoEmpty":$(document).data('i18n').BagItemsEmpty,
            "sInfoFiltered":$(document).data('i18n').BagItemsFilter,
            "sLengthMenu":$(document).data('i18n').BagItemsMenu,
            "sZeroRecords":$(document).data('i18n').BagNoItemsSelected
        },
        "bAutoWidth":false,
        "bJQueryUI":true,
        "bProcessing":true,
        "bSort":true,
        "bPaginate":true,
        "bServerSide":true,
        "sDom":'<"datatablesheader"lfr><"datatablescroller"t><"datatablefooter"ip>',
        "sPaginationType":"full_numbers",
        "sAjaxSource":getContextPath() + "/JSON/mqm/searchdspace",
        "fnInitComplete":function () {
            table = $('#aspect_metadataquality_batchedit_BagTransformer_table_itemtable');
            wrapperDiv = table.parents('.dataTables_wrapper');
            if (scope.length > 0) {
                p = scope.parent('p');
                filterDiv = wrapperDiv.find("div.dataTables_filter");
                innerHTML = filterDiv.clone(true, true);
                innerHTML.removeClass('dataTables_filter');
                filterDiv.empty();

                row = $('<div class="row"/>');
                filterDiv.append(row);
                row.append(innerHTML);

                row = $('<div class="row"/>');
                filterDiv.append(row);
                row.append(scope);

                p.remove();

                scope.change(function () {
                    scope.data('changed', true);
                    itemStore.fnDraw(false);
                });
            }

            if (docStatus.length > 0) {
                p = docStatus.closest('p');
                lengthDiv = $('.dataTables_length', wrapperDiv);
                innerHTML = lengthDiv.clone(true, true);
                innerHTML.removeClass('dataTables_length');
                lengthDiv.empty();

                row = $('<div class="row"/>');
                lengthDiv.append(row);
                row.append(innerHTML);

                row = $('<div class="row"/>');
                lengthDiv.append(row);
                row.append(docStatus);

                p.remove();

                docStatus.change(function () {
                    itemStore.fnDraw(false);
                });
            }

            //IE7 sort header bugfix
            $.each(wrapperDiv.find('.DataTables_sort_wrapper'), function () {
                $(this).prepend($(this).find("span.css_right"));
            });

            table.show();
//            $('div#ds-body:hidden').fadeIn('fast');
            wrapperDiv.show();
        },
        "fnRowCallback":function (nRow, aData, iDisplayIndex) {
            $(nRow).attr('handle', aData[0]);
            $(nRow).find('td:first').attr('align', 'center');
            return nRow;
        },
        "fnServerData":function (sSource, aoData, fnCallback) {
            /* Add some extra data to the sender */
            if (scope.length > 0) {
                aoData.push({ "name":"sScope", "value":scope.val() });
                changed = scope.data('changed');
                if (changed == undefined || changed == '')
                    changed = false;
                aoData.push({ "name":"bScopeChanged", "value":changed });
                scope.data('changed', false);
            }

            if (docStatus.length > 0) {
                aoData.push({name:"sDocStatus", value:docStatus.val()});
            }

            $.ajax({
                cache:false,
                url:sSource,
                type:'POST',
                dataType:'json',
                data:aoData,
                success:function (json) {
                    scopeArray = json.aScope;
                    if (scopeArray != undefined) {
                        scope.find('option:not(:first)').remove();
                        $.each(scopeArray, function () {
                            scope.append('' + this);
                        });
                    }
                    fnCallback(json);
                }
            });
        },
        "fnDrawCallback":function () {
            $("div.quiklookDialogItemDiv").inspector('selectItemAfterPaging');
            $(itemStore.fnGetNodes()).each(function () {
                $(this).click(function (evt) {
                    if (!$(evt.target).closest('img') || $(evt.target).closest('img').size() == 0) {
                        $("div.quiklookDialogItemDiv").inspector('selectItem', this);
                    }
                });
            });
        }
    });
}

function addToItemBag(button, handle) {
    if (button) {
        var buttonCell = $(button).parent('td');
        buttonCell.html("<img alt=\"remove\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_close.png\" title=\"Remove From Selection\" style=\"cursor: pointer;\" onclick=\"removeFromItemBag('" + handle + "')\"/>");
    }
    var dataArray = [
        {"name": "addAll", "value": "false"},
        {"name": "included_handles", "value": handle}
    ];
//    var searchField = itemStore.parents('div.dataTables_wrapper:first').find('div.dataTables_filter input');
//    if (searchField.length > 0)
//        dataArray.push({"name": "query", "value": searchField.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/mqm/addToBag",
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            itemStore.fnDraw(false);
            updatePossibleActions();
        }
    });
}

function addAllToItemBag() {
    var dataArray, wrapper, searchField, scope, docStatus;

    dataArray = [{"name": "addAll", "value": "true"}];

    wrapper = itemStore.parents('div.dataTables_wrapper:first');

    searchField = wrapper.find('div.dataTables_filter input');
    if (searchField.length > 0) {
        dataArray.push({"name":"query", "value":searchField.val()});
    }

    scope = wrapper.find('div.dataTables_filter select');
    if (scope.length > 0) {
        dataArray.push({"name":"scope", "value":scope.val()});
    }

    docStatus = $('select[name="DocStatus"]', wrapper);
    if (docStatus.length > 0) {
        dataArray.push({name: "docStatus", value: docStatus.val()});
    }

    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/mqm/addToBag",
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            itemStore.fnDraw(false);
            updatePossibleActions();
            $('div#aspect_metadataquality_batchedit_BagTransformer_div_bagvisibilitydiv:hidden').slideDown("fast");
        }
    });
}

function removeFromItemBag(handle) {
    var nbItemsOnPageBeforeDelete = itemBag.fnGetData().length;
    var dataArray = [
        {"name": "all", "value": "false"},
        {"name": "handles", "value": handle}
    ];
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/mqm/removeFromBag",
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(false);
            updatePossibleActions();
            if (itemStore != undefined) {
                var storeRow = itemStore.find('tr[handle = "' + handle + '"]');
                if (storeRow.length > 0) {
                    var td = storeRow.find('img[alt="remove"]').parent('td');
                    td.html("<img alt=\"add\" src=\"" + getContextPath() + "/aspects/Datatables/shared/images/details_open.png\" title=\"Add To Selection\" style=\"cursor: pointer;\" onclick=\"addToItemBag(this, '" + handle + "')\"/>");
                }
            }
            if (nbItemsOnPageBeforeDelete <= 1)
                itemBag.fnPageChange('previous');
            $("div#aspect_metadataquality_batchedit_BagTransformer_div_infodiv").dialog('close');
            //Close the dialog of our inspector
            $('.inspector').inspector('closeItemDetailsDialog');
        }
    });
}


function removeAllFromItemBag() {
    var dataArray = [
        {"name": "all", "value": "true"}
    ];
    var wrapper = itemBag.parents('div.dataTables_wrapper:first');
    var searchField = wrapper.find('div.dataTables_filter input');
    if (searchField.length > 0)
        dataArray.push({"name": "query", "value": searchField.val()});
    var scope = wrapper.find('div.dataTables_filter select');
    if (scope.length > 0)
        dataArray.push({"name": "scope", "value": scope.val()});
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/mqm/removeFromBag",
        dataType: 'json',
        data: dataArray,
        success: function (json) {
            itemBag.fnDraw(true);
            if (itemStore != undefined)
                itemStore.fnDraw(true);
            updatePossibleActions();
        }
    });
}

function updatePossibleActions() {
    $.ajax({
        cache: false,
        url: getContextPath() + "/JSON/mqm/getBagCollections",
        dataType: 'json',
        success: function(json) {
            var collections, status;

            status = json.sStatus;

            $('input[name="documentStatus"]').val(status);

            if (status === "workflow") {
                $('.moveTreeWrapper').show();
                $('.addCollTreeWrapper').hide();
                $('.removeCollListWrapper').hide();
            }
            else {
                $('.moveTreeWrapper').hide();
                $('.addCollTreeWrapper').show();
                $('.removeCollListWrapper').show();
            }

            collections = json.aCollections;

            if (collections != undefined) {
                var list = $('ul#aspect_metadataquality_batchedit_BatchActionTransformer_list_remCollList');
                var kids = list.children();
                var checkedBoxes = kids.find(':checked');
                var checkedCollectionIds = new Array();
                $.each(checkedBoxes, function() {
                    checkedCollectionIds.push($(this).attr('value'));
                });
                kids.remove();
                $.each(collections, function() {
                    list.append('' + this);
                });
                $.each(checkedCollectionIds, function() {
                    list.find('input[value="' + this + '"]').attr('checked', 'checked');
                });
            }
            $('#aspect_metadataquality_batchedit_BatchActionTransformer_div_itemMappingDiv input[type="checkbox"]').change(updatePerformButtonStatus);
        }
    });
}


function toggleTabsVisibility() {
    var totalNbItems = itemBag.fnSettings().fnRecordsTotal();
    if (totalNbItems > 0) {
        $('#aspect_metadataquality_batchedit_TabsTransformer_div_tabwrapper:hidden').fadeIn('fast');
    } else {
        var tabs = $('#aspect_metadataquality_batchedit_TabsTransformer_div_tabwrapper');
        if (tabs.is(":visible"))
            tabs.fadeOut('fast');
        else
            tabs.hide();
    }
}