(function($) {
    $.fn.mqm = function(method) {
        if ($.fn.mqm.methods[method]) {
            if ($.isFunction($.fn.mqm.methods[method])){
                return $.fn.mqm.methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
            }
            else
                return $.fn.mqm.methods[ method ];
        } else if (typeof method === 'object' || ! method) {
            $.fn.mqm.methods = $.extend({}, $.fn.mqm.methods, method);
            if ($.isFunction($.fn.mqm.methods.init))
                return $.fn.mqm.methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.mqm');
        }
    };

    $.fn.mqm.methods =  {
        setPhaseClasses: function() {
            //Sets the odd and even classes on the rows of a table,
            //taking in to account colspan, rowspan and hidden rows

            var table = this;
            table.find("tr.odd").removeClass("odd");
            table.find("tr.even").removeClass("even");

            var numTD;
            if (table.find("tr:not(.hiddenField):has(td[rowspan])").length == 0) {
                numTD = table.find("tr:not(.hiddenField):first > td").length * 1;
                $.each(table.find("tr:not(.hiddenField):first > td[colspan]"), function() {
                    numTD += $(this).attr('colspan') - 1;
                });
            } else {
                numTD = table.find("tr:not(.hiddenField):has(td[rowspan]):first > td").length * 1;
                $.each(table.find("tr:not(.hiddenField):has(td[rowspan]):first > td[colspan]"), function() {
                    numTD += $(this).attr('colspan') - 1;
                });
            }
            table.data('numTD', numTD).find("tr:not(.hiddenField)").filter(function() {
                var $this = $(this);
                var length = $this.children().length * 1;
                $.each($this.children('[colspan]'), function() {
                    length += $(this).attr('colspan') - 1;
                });
                //returns true if a row has the same # of cells as the first row, so if the row is a label row
                return length == $this.closest('table').data('numTD');
            }).filter(':not(.hiddenField):even').addClass('odd');

            table.find("tr.odd:not(.hiddenField) td[rowspan]").each(function() {
                //Add's the odd class to all non-label-rows that follow an odd label row.
                $(this).parent().nextAll().slice(0, this.rowSpan - 1).addClass('odd');
            });

            //Add's the even class to all other rows.
            table.find("tr:not(.hiddenField):not(.odd)").addClass('even');
            return this;
        },
        getContextPath: function() {
            return $('[name="contextpath"]:first').val();
        }
    };
})(jQuery);