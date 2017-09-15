jQuery.datepicker._selectDayMine = function(id, month, year, inst) {
    inst.selectedDay = inst.currentDay = 1;
    inst.selectedMonth = inst.currentMonth = month;
    inst.selectedYear = inst.currentYear = year;
    if (inst.stayOpen) {
        inst.endDay = inst.endMonth = inst.endYear = null;
    }
    this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
    if (inst.stayOpen) {
        inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
        this._updateDatepicker(inst);
    }
};

(function( $, undefined ) {
    var PROP_NAME = 'datepicker';
    var dpuuid;
    var dpPrefix = 'DP_jQuery_';
    for (var key in window) {
        var dpIndex = key.lastIndexOf(dpPrefix);
        if (dpIndex > -1) {
            dpuuid = key.substring(dpIndex + dpPrefix.length);
            break;
        }
    }
jQuery.datepicker._generateHTML = function(inst) {
        var today = new Date();
        today = this._daylightSavingAdjust(
                new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
        var isRTL = this._get(inst, 'isRTL');
        var showButtonPanel = this._get(inst, 'showButtonPanel');
        var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
        var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
        var numMonths = this._getNumberOfMonths(inst);
        var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
        var stepMonths = this._get(inst, 'stepMonths');
        var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
        var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
                new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
        var minDate = this._getMinMaxDate(inst, 'min');
        var maxDate = this._getMinMaxDate(inst, 'max');
        var drawMonth = inst.drawMonth - showCurrentAtPos;
        var drawYear = inst.drawYear;
        if (drawMonth < 0) {
            drawMonth += 12;
            drawYear--;
        }
        if (maxDate) {
            var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
                    maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
            maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
            while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                drawMonth--;
                if (drawMonth < 0) {
                    drawMonth = 11;
                    drawYear--;
                }
            }
        }
        inst.drawMonth = drawMonth;
        inst.drawYear = drawYear;
        var prevText = this._get(inst, 'prevText');
        prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
                this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
                this._getFormatConfig(inst)));
        var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
                '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid +
                        '.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
                        ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
                (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
        var nextText = this._get(inst, 'nextText');
        nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
                this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
                this._getFormatConfig(inst)));
        var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
                '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid +
                        '.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
                        ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
                (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
        var currentText = this._get(inst, 'currentText');
        var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
        currentText = (!navigationAsDateFormat ? currentText :
                this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
        var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
                '.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
        var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
                (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid +
                        '.datepicker._gotoToday(\'#' + inst.id + '\');"' +
                        '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
        var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
        firstDay = (isNaN(firstDay) ? 0 : firstDay);
        var showWeek = this._get(inst, 'showWeek');
        var dayNames = this._get(inst, 'dayNames');
        var dayNamesShort = this._get(inst, 'dayNamesShort');
        var dayNamesMin = this._get(inst, 'dayNamesMin');
        var monthNames = this._get(inst, 'monthNames');
        var monthNamesShort = this._get(inst, 'monthNamesShort');
        var beforeShowDay = this._get(inst, 'beforeShowDay');
        var showOtherMonths = this._get(inst, 'showOtherMonths');
        var selectOtherMonths = this._get(inst, 'selectOtherMonths');
        var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
        var defaultDate = this._getDefaultDate(inst);
        var html = '';
        for (var row = 0; row < numMonths[0]; row++) {
            var group = '';
            for (var col = 0; col < numMonths[1]; col++) {
                var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                var cornerClass = ' ui-corner-all';
                var calender = '';
                if (isMultiMonth) {
                    calender += '<div class="ui-datepicker-group';
                    if (numMonths[1] > 1)
                        switch (col) {
                            case 0: calender += ' ui-datepicker-group-first';
                                cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
                            case numMonths[1] - 1: calender += ' ui-datepicker-group-last';
                                cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
                            default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
                        }
                    calender += '">';
                }
                calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
                        (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
                        (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
                        this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
                                row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
                        '</div><div class="ui-datepicker-calendar-slider';
                if (this._get(inst, "hideDays") == true) {
                    calender += ' ui-datepicker-calendar-hideDays';
                }
                calender += '"><table class="ui-datepicker-calendar"><thead>' +
                        '<tr>';
                var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
                for (var dow = 0; dow < 7; dow++) { // days of the week
                    var day = (dow + firstDay) % 7;
                    thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
                            '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
                }
                calender += thead + '</tr></thead><tbody>';
                var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
                    inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
                var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                    calender += '<tr>';
                    var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
                            this._get(inst, 'calculateWeek')(printDate) + '</td>');
                    for (var dow = 0; dow < 7; dow++) { // create date picker days
                        var daySettings = (beforeShowDay ?
                                beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
                        var otherMonth = (printDate.getMonth() != drawMonth);
                        var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
                                (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                        tbody += '<td class="' +
                                ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
                                (otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
                                ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
                                        (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
                                    // or defaultDate is current printedDate and defaultDate is selectedDate
                                        ' ' + this._dayOverClass : '') + // highlight selected day
                                (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + // highlight unselectable days
                                (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
                                        (printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
                                        (printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
                                ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
                                (unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.datepicker._selectDay(\'#' +
                                        inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + // actions
                                (otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
                                        (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
                                                (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
                                                (printDate.getTime() == selectedDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
                                                (otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
                                                '" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
                        printDate.setDate(printDate.getDate() + 1);
                        printDate = this._daylightSavingAdjust(printDate);
                    }
                    calender += tbody + '</tr>';
                }
                drawMonth++;
                if (drawMonth > 11) {
                    drawMonth = 0;
                    drawYear++;
                }
                calender += '</tbody></table></div>' + (isMultiMonth ? '</div>' +
                        ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
                group += calender;
            }
            html += group;
        }
        html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ?
                '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
        inst._keyEvent = false;
        return html;
}
jQuery.datepicker._generateMonthYearHeader = function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
        var changeMonth = this._get(inst, 'changeMonth');
        var changeYear = this._get(inst, 'changeYear');
        var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
        var html = '<div class="ui-datepicker-title">';
        var monthHtml = '';
        // month selection
        if (secondary || !changeMonth)
            monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
        else {
            var inMinYear = (minDate && minDate.getFullYear() == drawYear);
            var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
            monthHtml += '<div class="ui-datepicker-month-slider';
            if (this._get(inst, "hideMonths") == true) {
                monthHtml += ' ui-datepicker-month-hideMonths';
            }
            monthHtml += '"><select class="ui-datepicker-month" ' +
                    'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
                    'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
                    '>';
            for (var month = 0; month < 12; month++) {
                if ((!inMinYear || month >= minDate.getMonth()) &&
                        (!inMaxYear || month <= maxDate.getMonth()))
                    monthHtml += '<option value="' + month + '"' +
                            (month == drawMonth ? ' selected="selected"' : '') +
                            '>' + monthNamesShort[month] + '</option>';
            }
            monthHtml += '</select></div>';
        }
        if (!showMonthAfterYear)
            html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
        // year selection
        if (secondary || !changeYear)
            html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
        else {
            // determine range of years to display
            var years = this._get(inst, 'yearRange').split(':');
            var thisYear = new Date().getFullYear();
            var determineYear = function(value) {
                var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
                        (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
                                parseInt(value, 10)));
                return (isNaN(year) ? thisYear : year);
            };
            var year = determineYear(years[0]);
            var endYear = Math.max(year, determineYear(years[1] || ''));
            year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
            endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
            html += '<div class="ui-datepicker-year-slider';
            if (this._get(inst, "hideMonths") == true) {
                html += ' ui-datepicker-year-hideMonths'
            }
            html += '"><select class="ui-datepicker-year" ' +
                    'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
                    'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' +
                    '>';
            for (; year <= endYear; year++) {
                html += '<option value="' + year + '"' +
                        (year == drawYear ? ' selected="selected"' : '') +
                        '>' + year + '</option>';
            }
            html += '</select></div>';
        }
        html += this._get(inst, 'yearSuffix');
        if (showMonthAfterYear)
            html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
        html += '</div>'; // Close datepicker_header
        return html;
}
})(jQuery);

function inittimefilter() {
    //    $('#statistics_editorparts_TimeFilterTransformer_div_timefilterwrapperdiv').append('<div style="clear: both;">&nbsp;</div>');
//    $('.rangePicker').html('<a href="#" class="rangeDisplay"><span>Pick a Date</span></a>').dateRangePicker({menuSet: 'pastRange'});
//    $('#statistics_editorparts_TimeFilterTransformer_div_timefilterwrapperdiv').slideDown("fast");
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_rangediv').append('<div id="startCalDiv"/><div id="endCalDiv"/>');
    var startDateArr = $('#aspect_statistics_editorparts_TimeFilterTransformer_field_start_date').val().split('/');
    var endDateArr = $('#aspect_statistics_editorparts_TimeFilterTransformer_field_end_date').val().split('/');
    var groupByValue = $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').val();
    var hideDays = groupByValue == "YEAR" || groupByValue == "MONTH";
    var hideMonths = groupByValue == "YEAR";
    $("div#startCalDiv").datepicker({
        altField: 'input#aspect_statistics_editorparts_TimeFilterTransformer_field_start_date',
        altFormat: 'dd/mm/yy',
        dateFormat: 'dd/mm/yy',
//        showButtonPanel: true,
        yearRange: '-20:+20',
        hideDays: hideDays,
        hideMonths: hideMonths,
        changeMonth: true,
        changeYear: true,
        minDate:new Date(1970, 0, 1),
        maxDate:0,
        onChangeMonthYear: function(year, month, inst){
            changeMonthYear(year, month, inst);
        }
    });
    $("div#endCalDiv").datepicker({
        altField: 'input#aspect_statistics_editorparts_TimeFilterTransformer_field_end_date',
        altFormat: 'dd/mm/yy',
        dateFormat: 'dd/mm/yy',
//        showButtonPanel: true,
        yearRange: '-20:+20',
        hideDays: hideDays,
        hideMonths: hideMonths,
        changeMonth: true,
        changeYear: true,
        minDate:new Date(1970, 0, 1),
        maxDate:0,
        onChangeMonthYear: function(year, month, inst) {
            changeMonthYear(year, month, inst);
        }
    });
    $("div#startCalDiv").datepicker('setDate', new Date(startDateArr[2]*1, (startDateArr[1] * 1) - 1, startDateArr[0]*1));
    $("div#endCalDiv").datepicker('setDate', new Date(endDateArr[2]*1, (endDateArr[1] * 1) - 1, endDateArr[0]*1));
    $('input[name=enable_time_filter]').change(function() {
        if ($(this).attr('checked')) {
            $("div#startCalDiv").datepicker('enable');
            $("div#endCalDiv").datepicker('enable');
            $("select.ui-datepicker-month, select.ui-datepicker-year").attr('disabled', false);
            var groupByCheckbox = $('input[name=enable_group_by]');
            groupByCheckbox.attr('disabled', false);
            if (groupByCheckbox.attr('checked'))
                $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').attr('disabled', false);
        }
        else {
            $("div#startCalDiv").datepicker('disable');
            $("div#endCalDiv").datepicker('disable');
            $("select.ui-datepicker-month, select.ui-datepicker-year").attr('disabled', true);
            $('input[name=enable_group_by]').attr('disabled', true);
            $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').attr('disabled', true);
        }
    });
    $('input[name=enable_group_by]').change(function() {
        if ($(this).attr('checked')) {
            $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').attr('disabled', false);
            $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').change();
        }
        else {
            $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').attr('disabled', true);
            var daysHidden = $("div#startCalDiv").datepicker('option', 'hideDays');
            if (daysHidden == undefined)
                daysHidden = false;
            if (daysHidden)
                enableDayEdit();
        }
    });
    $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').change(function() {
        var val = $(this).val();
        var daysHidden = $("div#startCalDiv").datepicker('option', 'hideDays');
        if (daysHidden == undefined)
            daysHidden = false;
        var monthsHidden = $("div#startCalDiv").datepicker('option', 'hideMonths');
        if (monthsHidden == undefined)
            monthsHidden = false;
        if ('DAY' == val) {
            if (daysHidden) {
                enableDayEdit();
            }
        }
        else if ('MONTH' == val) {
            if (!daysHidden) {
                disableDayEdit();
            }
            if (monthsHidden)
                enableMonthEdit();
        }
        else if ('YEAR' == val) {
            if (!daysHidden) {
                disableDayEdit();
            }
            if (!monthsHidden)
                disableMonthEdit();
        }
    });
    $('input[name=enable_group_by], input[name=enable_time_filter]').change();
}

function months_between(date1, date2) {
    if (date1 > date2) {
        return months_between(date2, date1);
    }

    var number = 0;
    if (date2.getFullYear() > date1.getFullYear()) {
        number = number + (date2.getFullYear() - date1.getFullYear() - 1) * 12;
    } else {
        return date2.getMonth() - date1.getMonth();
    }

    if (date2.getMonth() > date1.getMonth()) {
        number = number + 12 + date2.getMonth() - date1.getMonth();
    } else {
        number = number + (12 - date1.getMonth()) + date2.getMonth();
    }
    return Math.abs(number);
}

function days_between(date1, date2) {

    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);

}

function gatherFilterInfo() {
    if ($('input[name=enable_group_by]:checked').length > 0) {
        var startDate = $("div#startCalDiv").datepicker('getDate');
        var endDate = $("div#endCalDiv").datepicker('getDate');
        var groupUnit = $('select#aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').val();
        var number;
        if (groupUnit == 'DAY') {
            number = days_between(startDate, endDate);
        }
        else if (groupUnit == 'MONTH') {
            number = months_between(startDate, endDate);
        }
        else {
            number = Math.abs(endDate.getYear() - startDate.getYear());
        }
        if (number > 30) {
            var id = "timefilterwarning";
            var suppressError = $("form#aspect_statistics_GraphEditor_div_wrapper").data('hidewarning' + id);
            if (!suppressError) {
                var e = new Error();
                e.name = id;
                e.message = "Your time filter settings will generate a table with " + number + " columns. This will take some time. Do you want to continue?";
                throw e;
            }
        }
    }
    var result = new Array();
    $('input[name=enable_time_filter], input[name=enable_group_by]').each(function(){
        var o = new Object();
        o.key = $(this).attr("name");
        o.value = '' + $(this).attr('checked');
        result.push(o);
    });
    $('#aspect_statistics_editorparts_TimeFilterTransformer_field_start_date, #aspect_statistics_editorparts_TimeFilterTransformer_field_end_date, #aspect_statistics_editorparts_TimeFilterTransformer_field_groupby').each(function(){
        var o = new Object();
        o.key = $(this).attr("name");
        o.value = '' + $(this).val();
        result.push(o);
    });
    return result;
}


function changeMonthYear(year, month, inst) {
    var daysHidden = $("div#startCalDiv").datepicker('option', 'hideDays');
    if (daysHidden == undefined)
        daysHidden = false;
    if (daysHidden) {
        var monthsHidden = $("div#startCalDiv").datepicker('option', 'hideMonths');
        if (monthsHidden == undefined)
            monthsHidden = false;
        var id = '#' + inst.id;
        if (monthsHidden) {
            jQuery.datepicker._selectDayMine(id, 0, year, inst);
        } else {
            jQuery.datepicker._selectDayMine(id, month - 1, year, inst);
        }
    }
}


function toggleDayEdit() {
    var daysHidden = $("div#startCalDiv").datepicker('option', 'hideDays');
    if (daysHidden == undefined)
        daysHidden = false;
    if (daysHidden) {
        enableDayEdit();
    }
    else {
        disableDayEdit();
    }
}

function enableDayEdit() {
    setMonthEnabledParams();
    setDayEnabledParams();
}

function setDayEnabledParams() {
    $('div.ui-datepicker-calendar-hideDays').removeClass("ui-datepicker-calendar-hideDays");
    $("div#startCalDiv").datepicker('option', 'hideDays', false);
    $("div#endCalDiv").datepicker('option', 'hideDays', false);
}

function disableDayEdit() {
    setDayDisabledParams();
}

function setDayDisabledParams() {
    $('div.ui-datepicker-calendar-slider').addClass("ui-datepicker-calendar-hideDays");
    $("div#startCalDiv").datepicker('option', 'hideDays', true);
    $("div#endCalDiv").datepicker('option', 'hideDays', true);
    var startDate = $("div#startCalDiv").datepicker('getDate');
    var endDate = $("div#endCalDiv").datepicker('getDate');
    $("div#startCalDiv").datepicker('setDate', startDate);
    $("div#endCalDiv").datepicker('setDate', endDate);
}

function toggleMonthEdit() {
    var monthsHidden = $("div#startCalDiv").datepicker('option', 'hideMonths');
    if (monthsHidden == undefined)
        monthsHidden = false;
    if (monthsHidden) {
        enableMonthEdit();
    } else {
        disableMonthEdit();
    }
}

function enableMonthEdit() {
    setMonthEnabledParams();
}

function setMonthEnabledParams() {
    $('div.ui-datepicker-month-hideMonths').removeClass('ui-datepicker-month-hideMonths');
    $("div#startCalDiv").datepicker('option', 'hideMonths', false);
    $("div#endCalDiv").datepicker('option', 'hideMonths', false);
    $("div#startCalDiv").datepicker('option', 'stepMonths', 1);
    $("div#endCalDiv").datepicker('option', 'stepMonths', 1);
}

function disableMonthEdit() {
    setDayDisabledParams();
    setMonthDisabledParams();
    $('select.ui-datepicker-month').unbind('select');
}

function setMonthDisabledParams(){
    $('div.ui-datepicker-month-slider, div.ui-datepicker-year-slider').addClass('ui-datepicker-month-hideMonths');
    $("div#startCalDiv").datepicker('option', 'hideMonths', true);
    $("div#endCalDiv").datepicker('option', 'hideMonths', true);
    $("div#startCalDiv").datepicker('option', 'stepMonths', 12);
    $("div#endCalDiv").datepicker('option', 'stepMonths', 12);
}

function showTimeFilterOptions() {
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilter a.showOptions').hide();
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_rangediv').show();
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_rightCellDiv').show();
    $('div.time-update-button').show();
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilter a.hideOptions').show();
    try {
        matchHeights();
    } catch(e) {
    }
}

function hideTimeFilterOptions() {
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilter a.hideOptions').hide();
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_rightCellDiv').hide();
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_rangediv').hide();
    $('div.time-update-button').hide();
    $('div#aspect_statistics_editorparts_TimeFilterTransformer_div_timefilter a.showOptions').show();
    try {
        matchHeights();
    } catch(e) {
    }
}