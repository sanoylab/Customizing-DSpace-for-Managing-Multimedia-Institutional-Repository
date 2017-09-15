(function($) {
    window['atmire'] = window['atmire'] || {};
    window.atmire['cua'] = window.atmire['cua'] || {};

    window.atmire.cua.setGearMenuSortByOption = function() {
        var sortable_headers, index;

        sortable_headers = $('th.sortable');
        index = sortable_headers.index(sortable_headers.has('.toggleArrow'));

        $('.sort_by_column .glyphicon').addClass('invisible');
        $($('.sort_by_column')[index]).find('.glyphicon').removeClass('invisible');
    };

    function initVisibleColumn() {
        var sortable_headers, index;

        sortable_headers = $('th.sortable, th.additional-header');
        index = sortable_headers.index(sortable_headers.has('.toggleArrow'));

        $('.show_column:eq(' + index + ')').click();
    }

    function initGear() {
        var dropdown = $(".interactive_stats_gear_dropdown");
        $('.show_column', dropdown).click(function() {
            var table, visible_col_index, $this;

            $this = $(this);
            $this.mouseout();
            $('.show_column .glyphicon:visible').addClass('invisible');
            $this.find('.glyphicon.invisible').removeClass('invisible');
            visible_col_index = $('.show_column').index($this);

            table = $('.cua-most-popular .ds-table');
            table.find('th.sortable, th.additional-header').each(function(index) {
                var absolute_index, $this;
                $this = $(this);
                absolute_index = $this.parent().find('th').index($this) + 1;
                if (index === visible_col_index) {
                    table.find("th:nth-child(" + absolute_index + "), td:nth-child(" + absolute_index + ")").removeClass('hidden-xs');
                }
                else {
                    table.find("th:nth-child(" + absolute_index + "), td:nth-child(" + absolute_index + ")").addClass('hidden-xs');
                }
            });
        });

        initVisibleColumn();

        $('.sort_by_column', dropdown).click(function() {
            var table, sortable_col_index, $this;

            $this = $(this);
            $this.mouseout();
            sortable_col_index = $('.sort_by_column').index($this);

            table = $('.cua-most-popular .ds-table');
            table.find('th.sortable:eq(' + sortable_col_index + ')').click();
        });
    }

    $(document).ready(function () {
        initGear();
    });

})(jQuery);