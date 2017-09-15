(function($) {
    $(document).ready(function() {
        jQuery('input[name="startdate"]').datepicker({
                dateFormat: 'dd-mm-yy'
        });
        jQuery('input[name="enddate"]').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    });
})(jQuery);
