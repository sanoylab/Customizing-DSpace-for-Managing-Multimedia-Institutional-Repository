(function ($) {

    $(document).ready(function () {
        list = $('.recent-submission').each(initNavigation);
    });

    function initNavigation() {
        var list = $(this).find('.ds-artifact-list').find('.ds-artifact-item').first().parent();
        $(this).find('.icon-navigate.left').parent().click(shift_left);
        $(this).find('.icon-navigate.right').parent().click(shift_right);

        function shift_left() {
            list.children().last().prependTo(list);
        }

        function shift_right() {
            list.children().first().appendTo(list);
        }
    }


})(jQuery);