(function($) {
    $(document).ready(function() {
        var batchEditUrl;

        batchEditUrl = $('[name="batch-edit-url"]').val();

        if (batchEditUrl) {
            $('[name="batch-edit-button"]').click(function () {
                window.location = batchEditUrl;
                return false;
            });
        }
    });
})(jQuery);