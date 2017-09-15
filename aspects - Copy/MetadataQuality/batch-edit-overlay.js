var styleGroups =
{
    text: [
        "font-family",
        "font-size",
        "font-weight",
        "font-style",
        "color",
        "text-transform",
        "text-decoration",
        "letter-spacing",
        "word-spacing",
        "line-height",
        "text-align",
        "vertical-align",
        "direction",
        "column-count",
        "column-gap",
        "column-width",
        "-moz-tab-size", // FF4.0
        "-moz-font-feature-settings", // FF4.0
        "-moz-font-language-override" // FF4.0
    ],

    background: [
        "background-color",
        "background-image",
        "background-repeat",
        "background-position",
        "background-attachment",
        "opacity",
        "-moz-background-clip",
        "-moz-background-inline-policy",
        "-moz-background-origin",
        "-moz-background-size",
        "-moz-image-region"
    ],

    box: [
        "width",
        "height",
        "top",
        "right",
        "bottom",
        "left",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
        "-moz-padding-start",
        "-moz-padding-end",
        "border-top-width",
        "border-right-width",
        "border-bottom-width",
        "border-left-width",
        "border-top-color",
        "-moz-border-top-colors",
        "border-right-color",
        "-moz-border-right-colors",
        "border-bottom-color",
        "-moz-border-bottom-colors",
        "border-left-color",
        "-moz-border-left-colors",
        "border-top-style",
        "border-right-style",
        "border-bottom-style",
        "border-left-style",
        "-moz-border-end",
        "-moz-border-end-color",
        "-moz-border-end-style",
        "-moz-border-end-width",
        "-moz-border-image",
        "-moz-border-start",
        "-moz-border-start-color",
        "-moz-border-start-style",
        "-moz-border-start-width",
        "-moz-border-top-radius",
        "-moz-border-right-radius",
        "-moz-border-bottom-radius",
        "-moz-border-left-radius",
        "-moz-outline-radius-bottomleft",
        "-moz-outline-radius-bottomright",
        "-moz-outline-radius-topleft",
        "-moz-outline-radius-topright",
        "-moz-box-shadow",
        "box-shadow",
        "outline-top-width",
        "outline-right-width",
        "outline-bottom-width",
        "outline-left-width",
        "outline-top-color",
        "outline-right-color",
        "outline-bottom-color",
        "outline-left-color",
        "outline-top-style",
        "outline-right-style",
        "outline-bottom-style",
        "outline-left-style",
        "-moz-box-align",
        "-moz-box-direction",
        "-moz-box-flex",
        "-moz-box-flexgroup",
        "-moz-box-ordinal-group",
        "-moz-box-orient",
        "-moz-box-pack",
        "-moz-box-sizing",
        "-moz-margin-start",
        "-moz-margin-end"
    ],

    layout: [
        "position",
        "display",
        "visibility",
        "z-index",
        "overflow-x",  // http://www.w3.org/TR/2002/WD-css3-box-20021024/#overflow
        "overflow-y",
        "overflow-clip",
        "-moz-transform",
        "-moz-transform-origin",
        "white-space",
        "clip",
        "float",
        "clear",
        "-moz-appearance",
        "-moz-stack-sizing",
        "-moz-column-count",
        "-moz-column-gap",
        "-moz-column-width",
        "-moz-column-rule",
        "-moz-column-rule-width",
        "-moz-column-rule-style",
        "-moz-column-rule-color",
        "-moz-float-edge"
    ],

    other: [
        "cursor",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "marker-offset",
        "-moz-user-focus",
        "-moz-user-select",
        "-moz-user-modify",
        "-moz-user-input",
        "-moz-transition", // FF4.0
        "-moz-transition-delay", // FF4.0
        "-moz-transition-duration", // FF4.0
        "-moz-transition-property", // FF4.0
        "-moz-transition-timing-function", // FF4.0
        "-moz-force-broken-image-icon",
        "-moz-window-shadow"
    ]
};

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 500);
      };
  }
	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

(function($) {
    var contextPath = $(document).mqm('getContextPath');
    var visSrc = contextPath + '/themes/MetadataQualityModule/images/vis_enabled.png';
    var invisSrc = contextPath + '/themes/MetadataQualityModule/images/vis_disabled.png';
    var lookupSrc = contextPath + '/themes/MetadataQualityModule/images/lookup.png';
    var addSrc = contextPath + '/aspects/Datatables/shared/images/details_open.png';
    var removeSrc = contextPath + '/aspects/Datatables/shared/images/details_close.png';

    $(document).ready(function() {
        $.getJSON(contextPath + "/JSON/mqm/i18n", undefined, function (json) {
            $(document).data('i18n', json);

            $('body').append($('div.batch-edit-overlay'));

            $('#aspect_metadataquality_batchedit_OverlayTransformer_div_folder .ds-table-head').hide();

            var handle = $('[name="handle"]').val();
            var bagIndex = $('[name="bagIndex"]').val() * 1;
            var start = $('[name="batch-edit-bag-start"]').val();
            if (!start)
                start = 0;

            $.each($('input[name^="vis_"]'), function() {
                if ("false" == $(this).val()) {
                    var fieldName = $(this).attr('name').substring(4);
                    var rows = getRowsByFieldname(fieldName);
                    rows.addClass('hiddenField').hide();
                }
            });

            var prevButton = $('#aspect_metadataquality_batchedit_OverlayTransformer_field_prev-item');
            if (prevButton.length > 0) {
                var prevTitle = $('[name="prev-title"]').val();
                var prevTooltip = $('[name="prev-tooltip"]').val();
                var prevAction = $('[name="prev-action"]').val();
                prevButton.attr('value', "\u2190 " + prevTitle);
                if (prevTooltip)
                    prevButton.attr('title', prevTooltip);
                prevButton.click(function() {
                    if (pageHasChanges()) {
                        executeFunctionAfterAutosave(function() {
                            window.onbeforeunload = null;
                            eval(prevAction);
                        });
                    }
                    else {
                        window.onbeforeunload = null;
                        eval(prevAction);
                    }
                });
                prevButton.mouseover(function() {
                    $('tr[bagIndex="' + (bagIndex - 1) + '"]').addClass('hover-item');
                });
                prevButton.mouseout(function() {
                    $('tr[bagIndex="' + (bagIndex - 1) + '"]').removeClass('hover-item');
                });
            }

            var nextButton = $('#aspect_metadataquality_batchedit_OverlayTransformer_field_next-item');
            if (nextButton.length > 0) {
                var nextTitle = $('[name="next-title"]').val();
                var nextTooltip = $('[name="next-tooltip"]').val();
                var nextAction = $('[name="next-action"]').val();
                nextButton.attr('value', nextTitle + " \u2192");
                if (nextTooltip)
                    nextButton.attr('title', nextTooltip);
                nextButton.click(function() {
                    if (pageHasChanges()) {
                        executeFunctionAfterAutosave(function() {
                            window.onbeforeunload = null;
                            eval(nextAction);
                        });
                    } else {
                        window.onbeforeunload = null;
                        eval(nextAction);
                    }
                });
                nextButton.mouseover(function() {
                    $('tr[bagIndex="' + (bagIndex + 1) + '"]').addClass('hover-item');
                });
                nextButton.mouseout(function() {
                    $('tr[bagIndex="' + (bagIndex + 1) + '"]').removeClass('hover-item');
                });
            }

            var wrapper = $('#aspect_metadataquality_batchedit_OverlayTransformer_table_itembag_wrapper');
            var scroller = $('#aspect_metadataquality_batchedit_OverlayTransformer_div_scroller');
            var bagTable = $('#aspect_metadataquality_batchedit_OverlayTransformer_table_itembag');

            var windowWidth = $(window).width();
            var bagWidth = windowWidth - 620;
            if (bagWidth < 310)
                bagWidth = 310;
            if (bagWidth > 750)
                bagWidth = 750;
            if ($('body').hasClass('ie7')) {
                bagWidth = bagWidth - 70;
            }

            var scrollerWidth = windowWidth - 10;
            if (scrollerWidth < 870)
                scrollerWidth = 870;

            scroller.width(scrollerWidth);
            wrapper.width(bagWidth);
            bagTable.width(bagWidth);
            bagTable.data('nbVisChars', Math.floor(bagWidth * 0.15));
            bagTable.dataTable({
                "aaSorting": [
                    [2,'asc']
                ],
                "aoColumns": [
                    {
                        "bSortable": false,
                        "bSearchable": false,
                        "bVisible":    false
                    },
                    {
                        "bSortable": false,
                        "bSearchable": false,
                        "bVisible":    false
                    },
                    {
                        "bSortable": true
                    }
                ],
                "oLanguage": {
                    "sInfo": $(document).data('i18n').BagItemsInfo,
                    "sInfoEmpty": $(document).data('i18n').BagItemsEmpty,
                    "sInfoFiltered": $(document).data('i18n').BagItemsFilter,
                    "sLengthMenu": $(document).data('i18n').BagItemsMenu,
                    "sZeroRecords": $(document).data('i18n').BagNoItemsSelected
                },
                "bAutoWidth": false,
                "bLengthChange": false,
                "bJQueryUI": true,
                "bProcessing": true,
                "bFilter": false,
                "bSort": true,
                "bPaginate": true,
                "bServerSide": true,
                "iDisplayLength": 5,
                "iDisplayStart": start,
                "sDom": '<"H"lfr><"batch-edit-height-equalizer"t><"F"ip>',
                "sPaginationType": "full_numbers",
                "sAjaxSource": contextPath + "/JSON/mqm/searchbag",
                "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                    var $nRow = $(nRow);
                    $nRow.attr('bagindex', aData[0]);
                    $nRow.attr('handle', aData[1]);
                    var titleSpan = $nRow.find('.titlespan');
                    titleSpan.data('value', titleSpan.text());
                    if (aData[1] == handle)
                        $nRow.addClass('current-item');
                    var clickableElement = $nRow.find("[onclick]");
                    var clickEvent = clickableElement.attr('onclick');
                    if ($.isFunction(clickEvent)) {
                        clickableElement.click(function() {
                            if (pageHasChanges()) {
                                executeFunctionAfterAutosave(function() {
                                    window.onbeforeunload = null;
                                    clickEvent.call(this);
                                });
                            }
                            else {
                                window.onbeforeunload = null;
                                clickEvent.call(this);
                            }
                        });
                        clickableElement.removeAttr('onclick');
                    }
                    return nRow;
                },
                "fnDrawCallback": function() {
                    equalizeHeights(visTable.closest('.batch-edit-height-equalizer'), bagTable.closest('.batch-edit-height-equalizer'), settingsList.closest('.batch-edit-height-equalizer'));
                    equalizeHeights(visTable.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'), bagTable.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'), settingsList.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'));
                    equalizeHeights(visTable.closest('.batch-edit-height-equalizer').next('.fg-toolbar'), bagTable.closest('.batch-edit-height-equalizer').next('.fg-toolbar'), settingsList.closest('.batch-edit-height-equalizer').next('.fg-toolbar'));
                },
                "fnInitComplete": function() {
                    wrapper = $('#aspect_metadataquality_batchedit_OverlayTransformer_table_itembag_wrapper');
                    wrapper.find('.fg-toolbar:first').prepend(wrapper.prev('.ds-table-head').show());
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    /* Add some extra data to the sender */
                    aoData.push({ "name": "bOverlay", "value": "true" });
                    aoData.push({ "name": "nbVisChars", "value": bagTable.data('nbVisChars') });
                    $.ajax({
                        cache: false,
                        url: sSource,
                        dataType: 'json',
                        data: aoData,
                        success: function (json) {
                            /* Do whatever additional processing you want on the callback, then tell DataTables */
                            fnCallback(json);
                        }
                    });
                }
            });

            $(window).smartresize(function() {
                windowWidth = $(window).width();
                bagWidth = windowWidth - 620;
                if (bagWidth < 310)
                    bagWidth = 310;
                if (bagWidth > 750)
                    bagWidth = 750;
                if ($('body').hasClass('ie7')) {
                    bagWidth = bagWidth - 70;
                }

                scrollerWidth = windowWidth - 10;
                if (scrollerWidth < 870)
                    scrollerWidth = 870;

                scroller.width(scrollerWidth);
                wrapper.width(bagWidth);
                bagTable.width(bagWidth);
                bagTable.data('nbVisChars', Math.floor(bagWidth * 0.15));
                bagTable.dataTable().fnDraw();
            });

            $('.detailtable').append('<tr>' +
                    '<td colspan="3">' +
                    '<input class="ds-text-field add-field-ac" type="text"/>' +
                    '<input class="ds-button-field" type="submit" value="Add a field"/>' +
                    '</td>' +
                    '</tr>');

            var visTable = $('#aspect_metadataquality_batchedit_OverlayTransformer_table_visibilityTable');

            var settingsList = $('#aspect_metadataquality_batchedit_OverlayTransformer_list_settings');
            var settingsDiv = $('#aspect_metadataquality_batchedit_OverlayTransformer_div_settings');
            if (settingsDiv.length > 0) {
                var topBar = $('<div class="settings-top-bar clearfix fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"/>');
                topBar.append(settingsDiv.find('h1:first'));
                settingsDiv.prepend(topBar);

                var heightEq = $('<div class="batch-edit-height-equalizer"><span class="li_margin_fixer">&nbsp;</span></div>');
                heightEq.append(settingsList);
                settingsDiv.append(heightEq);

                var bottomBar = $('<div class="settings-bottom-bar clearfix fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix">&nbsp;</div>');
                settingsDiv.append(bottomBar);

                var autosaveCheckbox = $('#aspect_metadataquality_batchedit_OverlayTransformer_list_settings input[name="autosave"]');
                autosaveCheckbox.change(function() {
                    toggleAutosave($(this).is(':checked'));
                    $.post(contextPath + "/JSON/mqm/inform", $.param({"batch-edit-autosave": '' + $(this).is(':checked')}, true));
                });
                toggleAutosave(autosaveCheckbox.is(':checked'));

                settingsDiv.find(".ds-radio-field [name=default-edit-mode]").change(function() {
                    var data = $.param({"batch-edit-default-edit-mode": settingsDiv.find(".ds-radio-field [name=default-edit-mode]:checked").val()}, true);
                    $.post(contextPath + "/JSON/mqm/inform", data);
                });

                settingsDiv.find("[name=default-language]").blur(function() {
                    var data = $.param({"batch-edit-default-language": $.trim($(this).val())}, true);
                    $.post(contextPath + "/JSON/mqm/inform", data);
                });
            }


            var acContent = new Array();
            $.each(visTable.find('tbody tr'), function() {
                acContent.push({
                    "value": $(this).find('td:first-child').text(),
                    "label": $(this).find('td:last-child').text()
                });
            });

            var acBox = $('input.add-field-ac');
            acBox.autocomplete({
                source: acContent,
                minLength: 0
            });
            var addFieldButton = acBox.siblings('.ds-button-field');
            addFieldButton.click(function() {
                var currentValue = acBox.val();
                var bLegalValue = false;
                for (var i = 0; i < acContent.length; i++) {
                    if (acContent[i].value == currentValue) {
                        bLegalValue = true;
                        break;
                    }
                }
                if (!bLegalValue) {
                    acBox.addClass('error');
                    acBox.focus();
                }
                else {
                    $('.ui-autocomplete.ui-menu').hide();
                    var fieldElement = $('*[field="' + currentValue + '"]');
                    if (fieldElement.length > 0) { //if the user tries to add a field that's already present, edit that field.
                        var rows = getRowsByEditButton(fieldElement);
                        var wasHidden = false;
                        if (rows.hasClass('hiddenField')) {
                            var data = $.param({"batch-edit-visibility": fieldElement.attr('field') + ";true"}, true);
                            $.post(contextPath + "/JSON/mqm/inform", data);
                            var visDataTable = visTable.dataTable();
                            var matrix = visDataTable.fnGetData();
                            for (var j = 0; j < matrix.length; j++) {
                                var aData = matrix[j];
                                if (aData[0] == fieldElement.attr('field')) {
                                    aData[1] = "true";
                                    break;
                                }
                            }
                            visDataTable.fnDraw(false);
                            rows.removeClass('hiddenField').show();
                            wasHidden = true;
                        }
                        $.scrollTo(fieldElement, {
                            axis: 'y',
                            duration: 200,
                            offset: -100
                        });

                        if (!fieldElement.is('form'))
                            fieldElement.click();


                        if (wasHidden) {
                            $(document).notify('neutral', {
                                message: $(document).data('i18n').OverlayExistsButInvisible.replace(new RegExp('_0_', 'g'), currentValue),
                                duration: 12,
                                maxWidth: 50
                            });
                        }
                        else {
                            $(document).notify('neutral', $(document).data('i18n').OverlayExists.replace(new RegExp('_0_', 'g'), currentValue));
                        }
                    }
                    else {
                        var notificationId = 'proc' + new Date().getTime();
                        $(document).notify('neutral', {
                            id: notificationId,
                            message: $(document).data('i18n').OverlayProcessing,
                            duration: 0
                        });
                        var fieldData = {
                            handle: handle,
                            field: currentValue,
                            mode: settingsList.find(".ds-radio-field [name=default-edit-mode]:checked").val()
                        };
                        var addFieldRow = $(this).closest('tr');
                        var rowclass = 'odd';
                        if (addFieldRow.is('.even'))
                            rowclass = 'even';
                        var loadDiv = $("<div/>");
                        loadDiv.load(contextPath + '/atmire/metadata-quality/batch-edit/manual/get-editor', fieldData, function() {
                            var newFieldData = {};
                            $.each(fieldData, function (key, value) {
                                if (key === "handle" || key == "mode" || key == "field") {
                                    newFieldData[key] = value;
                                }
                            });

                            $.each(loadDiv.find("#aspect_submission_StepTransformer_div_metadataDiv input[type=hidden]"), function() {
                                newFieldData[$(this).attr('name')] = $(this).val();
                            });
                            var form = loadDiv.find(".submission");
                            form.hide();
                            $('body').append(form);
                            if ("simple" == newFieldData.mode) {
                                $.each(form.find('*'), function() {
                                    inlineCSS(this);
                                });
                            }
                            if ("advanced" == newFieldData.mode) {
                                $.each(form.find('.field-help:first, .ds-form-label:first'), function() {
                                    inlineCSS(this);
                                });
                            }
                            var subFormID = form.attr('id');
                            var newMode = "advanced";
                            var newModeLabel = $(document).data('i18n').EditModeAdvanced;
                            if ("advanced" == newFieldData.mode) {
                                newMode = "simple";
                                newModeLabel = $(document).data('i18n').EditModeSimple;
                            }
                            var newContent = $('<tr class="' + rowclass + '">' +
                                    '<td colspan="' + addFieldRow.find('td[colspan]').attr('colspan') + '">' +
                                    '<form class="eip-form" id="' + subFormID + '_temp' + '" action="#" onsubmit="return false;">' +
                                    '<a class="edit-toggle-link ' + newMode + '" href="javascript:void(0);" onclick="return false;">' + newModeLabel + '</a>' +
                                    '</form>' +
                                    '</td>' +
                                    '</tr>');
                            var list = form.find('.ds-form-list').css('margin', '0');
                            var newForm = newContent.find('#' + subFormID + '_temp');
                            newForm.data('fieldData', newFieldData);
                            newForm.append(list);
                            newForm.append('<input class="ds-button-field beo-save-button" type="button" value="' + $(document).data('i18n').OverlaySave + '"/>');
                            newForm.append('<input class="ds-button-field beo-cancel-button" type="button" value="' + $(document).data('i18n').OverlayCancel + '"/>');
                            var enclosingRow = newForm.closest('tr');
                            newForm.find('.beo-cancel-button').click(function() {
                                var remRow = $(this).closest('tr');
                                remRow.remove();
                                $(".detailtable").mqm('setPhaseClasses');
                            });
                            if ("false" === newFieldData.inSubmission) {
                                newForm.find('a.edit-toggle-link').remove();
                            }
                            else {
                                newForm.find('a.edit-toggle-link').click(function() {
                                    if ($(this).hasClass("advanced"))
                                        newFieldData.mode = 'advanced';
                                    else
                                        newFieldData.mode = 'simple';

                                    editField(enclosingRow, newFieldData);
                                });
                            }
                            newForm.find('.beo-save-button').click(function() {
                                submitEIP(enclosingRow, "submit_next", newFieldData, function() {
                                    var data = $.param({"batch-edit-visibility": newFieldData.field + ";true"}, true);
                                    $.post(contextPath + "/JSON/mqm/inform", data);
                                    var visDataTable = visTable.dataTable();
                                    var matrix = visDataTable.fnGetData();
                                    for (var j = 0; j < matrix.length; j++) {
                                        var aData = matrix[j];
                                        if (aData[0] == newFieldData.field) {
                                            aData[1] = "true";
                                            break;
                                        }
                                    }
                                    visDataTable.fnDraw(false);
                                    getField(enclosingRow, newFieldData);
                                });
                            });
                            if ("simple" == newFieldData.mode) {
                                newForm.find('input[name^="submit"]').click(function() {
                                    submitEIP(enclosingRow, $(this).attr('name'), newFieldData, function() {
                                        editField(enclosingRow, newFieldData);
                                    });
                                });
                            }
                            if ("advanced" == newFieldData.mode) {
                                var firstId = newForm.find('.advanced-edit-value:first').attr('id');
                                var pattern = /(.*)_([\d]+)$/g;
                                var results = pattern.exec(firstId);
                                if (results != undefined && results.length == 3) {
                                    var stem = results[1];
                                    var firstIndex = results[2] * 1;
                                    newForm.data('stem', stem);
                                    newForm.data('field', newFieldData.field);

                                    var help = newForm.find('.field-help:first');
                                    if (help.length > 0)
                                        newForm.find('.ds-form-list').prepend(help);

                                    var label = newForm.find('.ds-form-label:first');
                                    if (label.length > 0)
                                        newForm.find('.ds-form-list').prepend(label);

                                    newForm.find('.advanced-edit-value').change(function() {
                                        //clear all authority control values on change
                                        var item = $(this).closest('.advanced-edit-item');
                                        item.find('input[type = text]:not(.advanced-edit-language), input[type = hidden]').val("");
                                        item.find('.ds-authority-confidence').attr('class', 'ds-authority-confidence cf-blank');
                                    });

                                    $.each(newForm.find('.advanced-edit-language'), function() {
                                        var langInput = $(this);
                                        langInput.before('<br/><label class="ds-form-label field-lang-label" for="' + langInput.attr('id') + '">' + $(document).data('i18n').OverlayLang + '&nbsp;</label>');
                                        var defaultVal = $.trim(settingsList.find("[name=default-language]").val());
                                        if (defaultVal.length > 0) {
                                            langInput.val(defaultVal);
                                        }
                                    });

                                    $.each(newForm.find('input[name^="lookup_' + newFieldData.field.replace(/\./g, '_') + '"]'), function() {
                                        var button = $(this);
                                        var id = button.attr('id');
                                        var img = $('<img class="clickable field_lookup_button" src="' + lookupSrc + '"/>');
                                        button.after(img);
                                        button.hide();
                                        img.attr('title', button.attr('value'));
                                        img.click(function() {
                                            button.click();
                                        });
                                    });
                                    $.each(newForm.find('input[id^="' + stem + '_add"]'), function() {
                                        var button = $(this);
                                        var img = $('<img class="clickable field_add_button" src="' + addSrc + '"/>');
                                        button.after(img);
                                        button.remove();
                                        img.attr('title', button.attr('value'));
                                        img.click(function() {
                                            addNewField($(this), newForm);
                                        });
                                    });
                                    $.each(newForm.find('input[id^="' + stem + '_remove"]'), function() {
                                        var button = $(this);
                                        var img = $('<img class="clickable field_remove_button" src="' + removeSrc + '"/>');
                                        button.after(img);
                                        button.remove();
                                        img.attr('title', button.attr('value'));
                                        img.click(function() {
                                            removeField($(this), newForm);
                                        });
                                    });
                                } else {
                                    $(document).notify('error', 'A problem occured opening the advanced edit for ' + fieldData.field);
                                }
                            }
                            newForm.attr('field', fieldData.field);

                            //put the new field in the place it would appear by default
                            //if it already had been part of the item
                            var predecessors = $('*[field]').filter(function() {
                                return $(this).attr('field') < fieldData.field;
                            });
                            if (predecessors.length > 0) {
                                getRowsByFieldname(predecessors.last().attr('field')).last().after(newContent);
                            }
                            else {
                                $('.detailtable tr:first').before(newContent);
                            }
                            $.scrollTo(newContent, {
                                axis: 'y',
                                duration: 200,
                                offset: -100
                            });

                            acBox.removeClass('error').val('');
                            form.remove();
                            newForm.attr('id', subFormID);
                            newForm.data('savedContent', '');
                            $(".detailtable").mqm('setPhaseClasses');
                            $(document).notify('hide', notificationId);
                        });
                    }
                }
            });
            acBox.keypress(function(e) {
                $(this).removeClass('error');
                if (e.keyCode == 13) {
                    addFieldButton.click();
                }
            });
            acBox.focus(function() {
                acBox.autocomplete("search", $(this).val());
            });


            var p = $('#aspect_metadataquality_batchedit_OverlayTransformer_p_hidden-fields');
            visTable.dataTable({
                "aaSorting": [
                    [2,'asc']
                ],
                "aoColumns": [
                    {
                        "bSortable": false,
                        "bSearchable": false,
                        "bVisible": false
                    },
                    {
                        "bSortable": false,
                        "bSearchable": false
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
                "bAutoWidth": true,
                "bLengthChange": false,
                "bJQueryUI": true,
                "bProcessing": false,
                "bFilter": true,
                "bSort": true,
                "bPaginate": true,
                "iDisplayLength": 5,
                //                "iDisplayStart": start,
                "sDom": '<"H"lfr><"batch-edit-height-equalizer"t><"F"ip>',
                "sPaginationType": "full_numbers",
                "fnInitComplete": function() {
                    visTable.attr('style', '');
                    visTable.show();
                    var wrapper = visTable.closest('.dataTables_wrapper');
                    var datatable = visTable.dataTable();
                    var hmvth = hasMoreVisibleThanHidden(datatable.fnGetData());
                    redrawShowHideAllButton(wrapper, datatable, hmvth);
                    wrapper.find('.fg-toolbar:first').prepend(wrapper.prev('.ds-table-head').show());
                    wrapper.fadeIn("fast");
                },
                "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                    $(nRow).data('field', aData[0]);
                    var src;
                    if ("true" == aData[1])
                        src = visSrc;
                    else
                        src = invisSrc;

                    $(nRow).find('td:first').css('width', '16px').html('<img src="' + src + '"/>');
                    $(nRow).addClass('clickable').click(function(event) {
                        //This timestamp stuff fixes a jQuery bug that will sometimes fire a click event on a row twice for the same click.
                        if ($(nRow).data('lastClickTime') == undefined || event.timeStamp > $(nRow).data('lastClickTime')) {
                            $(nRow).data('lastClickTime', event.timeStamp);
                            if (aData[1] == "true") {
                                $(this).find('td:first img').attr('src', invisSrc);
                                aData[1] = "false";
                                var data = $.param({"batch-edit-visibility": aData[0] + ";false"}, true);
                                $.post(contextPath + "/JSON/mqm/inform", data);
                                getRowsByFieldname(aData[0]).addClass('hiddenField').hide();
                            }
                            else {
                                $(this).find('td:first img').attr('src', visSrc);
                                aData[1] = "true";
                                data = $.param({"batch-edit-visibility": aData[0] + ";true"}, true);
                                $.post(contextPath + "/JSON/mqm/inform", data);
                                getRowsByFieldname(aData[0]).removeClass('hiddenField').show();
                            }
                            var datatable = visTable.dataTable();
                            var hmvth = hasMoreVisibleThanHidden(datatable.fnGetData());
                            redrawShowHideAllButton(visTable.closest('.dataTables_wrapper'), datatable, hmvth);
                            $(".detailtable").mqm('setPhaseClasses');
                        }
                    });
                    return nRow;
                },
                "fnDrawCallback": function() {
                    equalizeHeights(visTable.closest('.batch-edit-height-equalizer'), bagTable.closest('.batch-edit-height-equalizer'), settingsList.closest('.batch-edit-height-equalizer'));
                    equalizeHeights(visTable.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'), bagTable.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'), settingsList.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'));
                    equalizeHeights(visTable.closest('.batch-edit-height-equalizer').next('.fg-toolbar'), bagTable.closest('.batch-edit-height-equalizer').next('.fg-toolbar'), settingsList.closest('.batch-edit-height-equalizer').next('.fg-toolbar'));
                }
            });
            $('#aspect_metadataquality_batchedit_OverlayTransformer_table_itembag_wrapper').find('.fg-toolbar:first').prepend(wrapper.prev('.ds-table-head'));

            var toolbars = $('.dataTables_wrapper').find('.fg-toolbar:first');
            var maxHeight = 0;
            $.each(toolbars, function() {
                var currentHeight = $(this).height();
                if (currentHeight > maxHeight)
                    maxHeight = currentHeight;
            });
            toolbars.css('height', maxHeight + "px");
            //            equalizeHeights(visTable, bagTable, settingsList);

            var backToEditButton = $('#aspect_metadataquality_batchedit_OverlayTransformer_field_edit-bag');
            $('#aspect_metadataquality_batchedit_OverlayTransformer_table_itembag_processing').after(backToEditButton);
            backToEditButton.click(function() {
                window.location = contextPath + '/atmire/metadata-quality/batch-edit/edit-task';
            });


            var toggleVisButton = $('div.batch-edit-overlay input[name="toggle-vis"]');
            var toggleInput = $('div.batch-edit-overlay input[name="fold-toggle"]');
            var folderclass = 'ui-icon-carat-1-s';
            if ($('#aspect_metadataquality_batchedit_OverlayTransformer_div_folder').hasClass('hidden'))
                folderclass = 'ui-icon-carat-1-n';
            else
                toggleVisButton.hide();
            var toggleButton = $('<div class="batch-edit-overlay-fold-toggle clickable ui-widget-header ui-corner-all"><span class="ui-icon ' + folderclass + '"></span></div>');
            toggleInput.after(toggleButton);
            toggleInput.remove();
            toggleButton.click(function() {
                var bOpen = $('#aspect_metadataquality_batchedit_OverlayTransformer_div_folder').is(":hidden");
                $('#aspect_metadataquality_batchedit_OverlayTransformer_div_folder').slideToggle('fast', function() {
                    if ($(this).is(':visible')) {
                        equalizeHeights(visTable.closest('.batch-edit-height-equalizer'), bagTable.closest('.batch-edit-height-equalizer'), settingsList.closest('.batch-edit-height-equalizer'));
                        equalizeHeights(visTable.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'), bagTable.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'), settingsList.closest('.batch-edit-height-equalizer').prev('.fg-toolbar'));
                        equalizeHeights(visTable.closest('.batch-edit-height-equalizer').next('.fg-toolbar'), bagTable.closest('.batch-edit-height-equalizer').next('.fg-toolbar'), settingsList.closest('.batch-edit-height-equalizer').next('.fg-toolbar'));
                    }
                    var north = toggleButton.find('span.ui-icon-carat-1-n');
                    var south = toggleButton.find('span.ui-icon-carat-1-s');
                    north.removeClass('ui-icon-carat-1-n').addClass("ui-icon-carat-1-s");
                    south.removeClass('ui-icon-carat-1-s').addClass("ui-icon-carat-1-n");
                    if (toggleVisButton.is(':hidden'))
                        toggleVisButton.fadeIn('fast');
                    else
                        toggleVisButton.fadeOut('fast');
                });
                $.ajax({
                    cache: false,
                    url: contextPath + "/JSON/mqm/inform",
                    dataType: 'json',
                    data: {"batch-edit-overlay-open": bOpen},
                    success: function (json) {
                        //TODO error notice maybe?
                    }
                });
            });

            var stopInput = $('#aspect_metadataquality_batchedit_OverlayTransformer_field_stop-batch-edit');
            var stopButton = $('<div class="batch-edit-overlay-stop clickable ui-widget-header ui-corner-all" title="' + stopInput.val() + '"><span class="ui-icon ui-icon-power"></span></div>');
            stopInput.after(stopButton);
            stopInput.remove();
            stopButton.click(function() {
                $('<div title="' + $(document).data('i18n').OverlayWarning + '"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>' + $(document).data('i18n').OverlayConfirmStop + '</p></div>').dialog({
                    resizable: false,
                    height:160,
                    modal: true,
                    buttons: {
                        Cancel: function() {
                            $(this).dialog("close");
                        },
                        "Stop the batch edit": function() {
                            $(this).dialog("close");
                            if (pageHasChanges()) {
                                executeFunctionAfterAutosave(function() {
                                    window.onbeforeunload = null;
                                    $.post(contextPath + "/JSON/mqm/inform", $.param({"batch-edit-stop": 'true'}, true), function() {
                                        $('html').fadeOut('fast');
                                        window.location = window.location.href.replace(/atmire\/metadata-quality\//g, "");
                                    });
                                });
                            }
                            else {
                                $.post(contextPath + "/JSON/mqm/inform", $.param({"batch-edit-stop": 'true'}, true), function() {
                                    $('html').fadeOut('fast');
                                    window.location = window.location.href.replace(/atmire\/metadata-quality\//g, "");
                                });
                            }
                        }
                    }
                });
            });

            $('div.batch-edit-overlay input[name="toggle-vis"]').click(function() {
                toggleButton.click();
            });

            $('#aspect_metadataquality_batchedit_OverlayTransformer_div_folder.hidden').removeClass('hidden').hide();


            $('td.label-cell .ui-icon-pencil').click(function() {
                var fieldData = {
                    "handle": handle,
                    "field": $(this).attr('field'),
                    "mode": settingsDiv.find(".ds-radio-field [name=default-edit-mode]:checked").val()
                };
                editField(getRowsByEditButton($(this)), fieldData);
            });
            $('td.label-cell .ui-icon-pencil:hidden').show();

            var buttonsPara = $('#aspect_metadataquality_batchedit_OverlayTransformer_p_buttonspara');
            var bpFloater = $('<div class="buttonspara_floater"/>');
            bpFloater.append(buttonsPara.find('.ds-button-field'));
            buttonsPara.prepend(bpFloater);

            //Set the defaults if there's 0 or 1 item in the bag
            if (!(nextButton.length > 0 || prevButton.length > 0)) {
                $.each(settingsDiv.find(".ds-radio-field [name=default-edit-mode]"), function() {
                    var $this = $(this);
                    if ($this.val() == "advanced") {
                        $this.attr('checked', true);
                    }
                    else {
                        $this.removeAttr('checked');
                    }
                });
            }
            $('div.batch-edit-overlay.invisible').removeClass('invisible').fadeIn('fast');

            $.each($('#ds-header a, #ds-trail a, #ds-options a, .ds-referenceSet-list a'), function() {
                $(this).click(function(e) {
                    e.preventDefault();
                    var href = $(this).attr('href');
                    if (pageHasChanges()) {
                        executeFunctionAfterAutosave(function() {
                            window.onbeforeunload = null;
                            window.location = href;
                        });
                    }
                    else {
                        window.onbeforeunload = null;
                        window.location = href;
                    }
                });
            });
            $('#ds-options .back-button').attr('onclick', '').click(function() {
                if (pageHasChanges()) {
                    executeFunctionAfterAutosave(function() {
                        window.onbeforeunload = null;
                        window.location = contextPath;
                    });
                }
                else {
                    window.onbeforeunload = null;
                    window.location = contextPath;
                }
            });

            $(".detailtable").mqm('setPhaseClasses');

            $.each($('input[name^="efd_"]'), function() {
                var fieldName = $(this).attr('name').substring(4);
                var rows = getRowsByFieldname(fieldName);
                if (!rows.hasClass('hiddenField')) {
                    editField(rows, {
                        "handle": handle,
                        "field": fieldName,
                        "mode": $(this).val()
                    });
                }
            });

            $('div#ds-body:hidden').fadeIn('fast');
        });
    });

    function toggleAutosave(bAutosaveOn) {
        $(document).data('autosave', bAutosaveOn);
        if (bAutosaveOn) {
            window.onbeforeunload = function() {
                if (pageHasChanges()) {
                    return $(document).data('i18n').OverlayUnsavedChanges;
                } else {
                    return; //don't show a message (can't return null, that doesn't work in IE)
                }
            };
        }
        else {
            window.onbeforeunload = null;
        }
    }

    function executeFunctionAfterAutosave(fnction) {
        if (!$.isFunction(fnction))
            return;

        var saveButton = $('.beo-save-button:first');
        if ($(document).data('autosave') && saveButton.length > 0) {
            var form = saveButton.closest('[field]');
            var fieldData = form.data('fieldData');

            var row = form.closest('tr');
            submitEIP(row, saveButton.attr('name'), fieldData, function() {
                saveButton.removeClass('beo-save-button').addClass('beo-saved-button');
                executeFunctionAfterAutosave(fnction);
            });
        }
        else {
            fnction.call(this);
        }
    }

    function redrawShowHideAllButton(wrapper, datatable, hmvth) {
        var span = wrapper.find("span.vis-show-toggle");
        if (span.length == 0 || span.attr('hmvth') == "" + (!hmvth)) {
            span.remove();
            if (hmvth)
                wrapper.find('.fg-toolbar:last').prepend('<span class="vis-show-toggle clickable" title="' + $(document).data('i18n').VisHideAll + '" hmvth="true"><img src="' + invisSrc + '"/></span>');
            else
                wrapper.find('.fg-toolbar:last').prepend('<span class="vis-show-toggle clickable" title="' + $(document).data('i18n').VisShowAll + '" hmvth="false"><img src="' + visSrc + '"/></span>');
            span = wrapper.find("span.vis-show-toggle");
            span.click(function() {
                var data = [];
                var matrix = datatable.fnGetData();
                for (var i = 0; i < matrix.length; i++) {
                    var aData = matrix[i];
                    aData[1] = "" + (!hmvth);
                    data.push(aData[0] + ";" + (!hmvth));
                }
                datatable.fnDraw(false);
                if (hmvth) {
                    $.each($(".detailtable tr:has(*[field]):not(.hiddenField)"), function() {
                        getRowsByFieldname($(this).find('*[field]').attr('field')).addClass('hiddenField').hide();
                    });
                }
                else
                    $(".detailtable tr.hiddenField").removeClass('hiddenField').show();

                $(".detailtable").mqm('setPhaseClasses');

                $.post(contextPath + "/JSON/mqm/inform", $.param({"batch-edit-visibility": data}, true), function() {
                    redrawShowHideAllButton(wrapper, datatable, !hmvth);
                });

            });
        }
    }

    function equalizeHeights() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length < 2)
            return;

        var bToolbars = false;

        var max = 0;
        for (var i = 0; i < args.length; i++) {
            args[i].css('height', '');
            if (!bToolbars && args[i].hasClass('fg-toolbar')) {
                bToolbars = true;
            }
            if (args[i].is(':visible')) {
                var height = args[i].height();
                if (max < height) {
                    max = height;
                }
            }
        }

        //This is here to ensure that there's a min height,
        //when this method gets called during init or on invisble elements
        //The current solution sucks, but it's the best I can come up with 
        //in the available time
        if (max <= 0) {
            if (bToolbars) {
                max = 22;
            } else {
                max = 150;
            }
        }

        for (var j = 0; j < args.length; j++) {
            args[j].height(max);
        }
    }

    function editField(rows, fieldData) {
        var notificationId = 'proc' + new Date().getTime();
        $(document).notify('neutral', {
            id: notificationId,
            message: $(document).data('i18n').OverlayProcessing,
            duration: 0
        });
        var rowclass = 'odd';
        if (rows.first().is('.even'))
            rowclass = 'even';
        rows.addClass('processing-overlay');
        var loadDiv = $("<div/>");
        loadDiv.load(contextPath + '/atmire/metadata-quality/batch-edit/manual/get-editor', fieldData, function() {
            var newFieldData = {};
            $.each(fieldData, function (key, value) {
                if (key === "handle" || key == "mode" || key == "field") {
                    newFieldData[key] = value;
                }
            });

            $.each(loadDiv.find("#aspect_submission_StepTransformer_div_metadataDiv input[type=hidden]"), function() {
                newFieldData[$(this).attr('name')] = $(this).val();
            });
            var form = loadDiv.find(".submission");
            form.hide();
            $('body').append(form);
            if ("simple" == newFieldData.mode) {
                $.each(form.find('*'), function() {
                    inlineCSS(this);
                });
            }
            if ("advanced" == newFieldData.mode) {
                $.each(form.find('.field-help:first, .ds-form-label:first'), function() {
                    inlineCSS(this);
                });
            }
            var subFormID = form.attr('id');
            var length = rows.first().children().length * 1;
            $.each(rows.children('[colspan]'), function() {
                length += $(this).attr('colspan') - 1;
            });
            var newMode = "advanced";
            var newModeLabel = $(document).data('i18n').EditModeAdvanced;
            if ("advanced" == newFieldData.mode) {
                newMode = "simple";
                newModeLabel = $(document).data('i18n').EditModeSimple;
            }
            var newContent = $('<tr class="' + rowclass + '">' +
                    '<td colspan="' + length + '">' +
                        '<form class="eip-form" id="' + subFormID + '_temp' + '" action="#" onsubmit="return false;">' +
                            '<a class="edit-toggle-link ' + newMode + '" href="javascript:void(0);" onclick="return false;">' + newModeLabel + '</a>' +
                        '</form>' +
                    '</td>' +
                '</tr>');
            var list = form.find('.ds-form-list').css('margin', '0');
            var newForm = newContent.find('#' + subFormID + '_temp');
            newForm.data('fieldData', newFieldData);
            newForm.append(list);
            newForm.append('<input class="ds-button-field beo-save-button" type="button" value="' + $(document).data('i18n').OverlaySave + '"/>');
            newForm.append('<input class="ds-button-field beo-cancel-button" type="button" value="' + $(document).data('i18n').OverlayCancel + '"/>');
            newContent.data('rows', rows);
            var enclosingRow = newForm.closest('tr');
            newForm.find('.beo-cancel-button').click(function() {
                enclosingRow.addClass('processing-overlay');
                getField(enclosingRow, newFieldData);
            });
            if("false" === newFieldData.inSubmission) {
                newForm.find('a.edit-toggle-link').remove();
            }
            else {
                newForm.find('a.edit-toggle-link').click(function() {
                    if ($(this).hasClass("advanced"))
                        newFieldData.mode = 'advanced';
                    else
                        newFieldData.mode = 'simple';

                    editField(enclosingRow, newFieldData);
                });
            }
            newForm.find('.beo-save-button').click(function() {
                submitEIP(enclosingRow, "submit_next", newFieldData, function() {
                    getField(enclosingRow, newFieldData);
                });
            });
            if ("simple" == newFieldData.mode) {
                newForm.find('input[name^="submit"]').click(function() {
                    submitEIP(enclosingRow, $(this).attr('name'), newFieldData, function() {
                        editField(enclosingRow, newFieldData);
                    });
                });
            }
            if ("advanced" == newFieldData.mode) {
                var firstId = newForm.find('.advanced-edit-value:first').attr('id');
                var pattern = /(.*)_([\d]+)$/g;
                var results = pattern.exec(firstId);
                if (results != undefined && results.length == 3) {
                    var stem = results[1];
                    var firstIndex = results[2] * 1;
                    newForm.data('stem', stem);
                    newForm.data('field', newFieldData.field);

                    var help = newForm.find('.field-help:first');
                    if (help.length > 0 )
                        newForm.find('.ds-form-list').prepend(help);

                    var label = newForm.find('.ds-form-label:first');
                    if (label.length > 0)
                        newForm.find('.ds-form-list').prepend(label);

                    newForm.find('.advanced-edit-value').change(function() {
                        //clear all authority control values on change
                        var item = $(this).closest('.advanced-edit-item');
                        item.find('input[type = text]:not(.advanced-edit-language), input[type = hidden]').val("");
                        item.find('.ds-authority-confidence').attr('class', 'ds-authority-confidence cf-blank');
                    });

                    $.each(newForm.find('.advanced-edit-language'), function() {
                        var langInput = $(this);
                        langInput.before('<br/><label class="ds-form-label field-lang-label" for="' + langInput.attr('id') + '">' + $(document).data('i18n').OverlayLang + '&nbsp;</label>');
                    });

                    $.each(newForm.find('input[name^="lookup_' + newFieldData.field.replace(/\./g,'_') + '"]'), function() {
                        var button = $(this);
                        var id = button.attr('id');
                        var img = $('<img class="clickable field_lookup_button" src="' + lookupSrc + '"/>');
                        button.after(img);
                        button.hide();
                        img.attr('title', button.attr('value'));
                        img.click(function() {
                            button.click();
                        });
                    });
                    $.each(newForm.find('input[id^="' + stem + '_add"]'), function() {
                        var button = $(this);
                        var img = $('<img class="clickable field_add_button" src="' + addSrc + '"/>');
                        button.after(img);
                        button.remove();
                        img.attr('title', button.attr('value'));
                        img.click(function() {
                            addNewField($(this), newForm);
                        });
                    });
                    $.each(newForm.find('input[id^="' + stem + '_remove"]'), function() {
                        var button = $(this);
                        var img = $('<img class="clickable field_remove_button" src="' + removeSrc + '"/>');
                        button.after(img);
                        button.remove();
                        img.attr('title', button.attr('value'));
                        img.click(function() {
                            removeField($(this), newForm);
                        });
                    });
                } else {
                    $(document).notify('error', 'A problem occured opening the advanced edit for ' + fieldData.field);
                }
            }
            rows.last().after(newContent);
            rows.remove();
            form.remove();
            newForm.attr('id', subFormID);
            newForm.attr('field', fieldData.field);
            var origContent = '';
            $.each(newForm.find(':input').filter(function() {
                return !$(this).is('[type="button"]') && $(this).val() != ""
            }), function() {
                if ($(this).is(':checkbox'))
                    origContent += $(this).is(':checked');
                else
                    origContent += $(this).val();
            });
            newForm.data('savedContent', origContent);
            $(".detailtable").mqm('setPhaseClasses');
            $(document).notify('hide', notificationId);
        });
    }

    function pageHasChanges() {
        var dirty = false;
        $.each($('.eip-form'), function() {
            if(formHasChanges($(this))) {
                dirty = true;
                return;
            }
        });
        return dirty;
    }

    function formHasChanges(form) {
        var savedContent = form.data('savedContent');
        if (savedContent == undefined)
            return false;
        else {
            var currentContent = '';
            $.each(form.find(':input').filter(function() {
                return !$(this).is('[type="button"]') && $(this).val() != ""
            }), function() {
                if ($(this).is(':checkbox'))
                    currentContent += $(this).is(':checked');
                else
                    currentContent += $(this).val();
            });
            return currentContent != savedContent;
        }
    }

    function removeField(img, form) {
        //If it's the last remaining field, don't remove it, but clear it instead.
        if (img.closest('.ds-form-list').find('.advanced-edit-item:visible').length == 1) {
            var item = img.closest('.advanced-edit-item');
            item.find('input[type ="text"], input[type = "hidden"], textarea').val("");
            item.find('.ds-authority-confidence').attr('class', 'ds-authority-confidence cf-blank');
            item.find('textarea').focus();
        }
        else {
            img.closest('li.advanced-edit-item').remove();
            reIndexFields(form);
        }
    }

    function addNewField(img, form) {
        var item = img.closest ('.advanced-edit-item');
        var newItem = item.clone();
        //TODO dit werkt niet altijd
        newItem.find('input[type ="text"], input[type = "hidden"], textarea').val("");
        newItem.find('.ds-authority-confidence').attr('class', 'ds-authority-confidence cf-blank');
        newItem.find(".field_lookup_button").click(function() {
            $(this).siblings('input[name^="lookup_"]').click();
        });
        newItem.find(".field_add_button").click(function() {
            addNewField($(this), form);
        });
        newItem.find(".field_remove_button").click(function() {
            removeField($(this), form);
        });

        var langInput = newItem.find('.advanced-edit-language');
        var defaultVal = $.trim($('#aspect_metadataquality_batchedit_OverlayTransformer_list_settings [name="default-language"]').val());
        if (defaultVal.length > 0 && langInput.length > 0) {
            langInput.val(defaultVal);
        }

        item.after(newItem);
        reIndexFields(form);
        newItem.find('textarea').focus();
    }

    function reIndexFields(form){
        var stem = form.data('stem');
        var field = form.data('field');
        if (stem == undefined || field == undefined) {
            $(document).notify('error', 'A problem occured while re-indexing the fields');
            return;
        }
        var counter = 1;
        var lis = form.find('.advanced-edit-item');
        $.each(lis, function() {
            var fieldName = $(this).find('textarea[id^="' + stem + '"]').attr('name');
            $.each($(this).find('textarea[id^="' + stem + '"], input[id^="' + stem + '_lang"]'), function(){
                var element = $(this);
                var elementId = element.attr('id');
                var results = /(.*)_([\d]+)/g.exec(elementId);
                element.attr('id', results[1] + "_" + counter);
                results = /(.*)_([\d]+)/g.exec(element.attr('name'));
                element.attr('name', results[1] + "_" + counter);
            });

            var lookupPattern = new RegExp(fieldName, 'g');
            var tempDiv = $('<div/>');
            var textArea = $(this).find('textarea[id^="' + stem + '"]');
            //find everything in between the textarea and the lookup img, i.e. all authority control stuff.
            var acStuff = textArea.nextUntil('.clickable');
            //put it in a temporary div
            tempDiv.append(acStuff);
            //update all references to fieldname_counter in the innerHTML with the new number.
            //Doing it this way will also update all javascript params in the onclick and onchange functions
            tempDiv.html(tempDiv.html().replace(lookupPattern, field.replace(/\./g, '_') + '_' + counter));
            //put it back
            textArea.after(tempDiv.html());
            tempDiv.remove();
            counter++;
        });
        lis.removeClass('last');
        form.find('.advanced-edit-item:last').addClass('last');
    }

    function submitEIP(row, buttonName, fieldData, callback) {
        var notificationId = 'proc' + new Date().getTime();
        $(document).notify('neutral', {
            id: notificationId,
            message: $(document).data('i18n').OverlayProcessing,
            duration: 0
        });

        var data = fieldData;
        data["buttonPressed"] = buttonName;
        $.each(row.find('.ds-form-list :input'), function() {
            if (!$(this).is(':checkbox') || $(this).is(':checked')) {
                data[$(this).attr('name')] = $(this).val(), true;
            }
        });
        var loadDiv = $("<div/>");
        var fieldName = fieldData.field;
        var handle = fieldData.handle;

        data = $.param(data, true); //this ensures arrays are sent in a way the java backend will understand
        //(by default jquery optimizes this for things like ruby on rails, but it doesn't work for the dspace backend.

        $.ajax({
            cache: false,
            url: contextPath + '/JSON/mqm/saveEIP',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (json) {
                var message = json.message;
                if (json.params != undefined) {
                    for (var i = 0; i < json.params.length; i++) {
                        var param = json.params[i];
                        message = message.replace(new RegExp('_' + i + '_', 'g'), param);
                    }
                }
                if ($.isFunction(callback)) {
                    callback.call(this);
                    
                }
                $(document).notify('hide', notificationId);
                $(document).notify('neutral', {
                    classes: json.status,
                    message: message,
                    duration: json.duration
                });
            }
        });
    }

    function getField(row, fieldData) {
        var notificationId = 'proc' + new Date().getTime();
        $(document).notify('neutral', {
            id: notificationId,
            message: $(document).data('i18n').OverlayProcessing,
            duration: 0
        });
        var loadDiv = $("<div/>");
        loadDiv.load(contextPath + '/atmire/metadata-quality/batch-edit/manual/get-metadata', fieldData, function() {
            var rows = getRowsByFieldname(fieldData.field, loadDiv);
            var rowclass = 'odd';
            if (row.is('.even'))
                rowclass = 'even';
            rows.addClass(rowclass);
            if (row.data('rows') != undefined)
                row.data('rows').remove();
            row.after(rows);
            row.remove();
            rows.find('td.label-cell .ui-icon-pencil').click(function(){
                //use the default mode again
                fieldData.mode = $("#aspect_metadataquality_batchedit_OverlayTransformer_div_settings .ds-radio-field [name='default-edit-mode']:checked").val();
                editField(getRowsByEditButton($(this)), fieldData);
            });
            rows.find('td.label-cell .ui-icon-pencil:hidden').show();
            $(".detailtable").mqm('setPhaseClasses');
            $(document).notify('hide', notificationId);
        });
    }

    function getRowsByFieldname(fieldName, contextElement) {
        var fieldElement;
        if (contextElement == undefined)
            fieldElement = $('*[field="' + fieldName + '"]');
        else
            fieldElement = contextElement.find('*[field="' + fieldName + '"]');

        return getRowsByEditButton(fieldElement);  
    }

    function getRowsByEditButton(editButton) {
        var rowspan = editButton.parent().attr('rowspan') * 1;
        var rows = editButton.parents('tr:first');
        for (var i = 1; i < rowspan; i++) {
            rows = rows.add(rows.next());
        }
        return rows;
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

    function inlineCSS(element) {
        var style = getComputedStyleFor(element);
        var result = '';
        for (var key in style) {
            result += key + ': ' + style[key] + '\; ';
        }
        $(element).attr('style', result);
    }
})(jQuery);

function getComputedStyleFor(oElm){
    if (oElm != undefined) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            var style = document.defaultView.getComputedStyle(oElm, "");
            var props = new Object;

            for (var groupName in styleGroups) {
                var groupProps = styleGroups[groupName];

                for (var i = 0; i < groupProps.length; ++i) {
                    var propName = groupProps[i];
                    //                if (!Firebug.showMozillaSpecificStyles && propName.match(/^-moz/))
                    //                    continue;
                    if (propName.match(/^-moz/))
                        continue;

                    var propValue = style.getPropertyValue(propName);
                    if (propValue)
                        propValue = stripUnits(rgbToHex(propValue));
                    if (propValue)
                        props[propName] = propValue;
                }
            }
//            sortProperties(props);
            return props;
        }
        else if (oElm.currentStyle) {
            return oElm.currentStyle;
        }
    }
	return undefined;
}


function rgbToHex(value)
{
    return value.replace(/\brgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi, function(_, r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + (b << 0)).toString(16).substr(-6).toUpperCase();
    });
}

function stripUnits(value)
{
    // remove units from '0px', '0em' etc. leave non-zero units in-tact.
    return value.replace(/(url\(.*?\)|[^0]\S*\s*)|0(%|em|ex|px|in|cm|mm|pt|pc)(\s|$)/gi, function(_, skip, remove, whitespace) {
    return skip || ('0' + whitespace);
    });
}

function sortProperties(props)
{
    props.sort(function(a, b)
    {
        return a.name > b.name ? 1 : -1;
    });
}

