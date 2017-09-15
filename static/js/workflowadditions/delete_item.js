jQuery(document).ready(function() {
    var form = jQuery("form#aspect_workflowadditions_DeleteItemButtonTransformer_div_delete_form");
    var warning = form.find("input[name=warning_content]").val();
    if (form.length > 0 && warning != undefined && warning.length > 0) {
        form.submit(function() {
            return confirm(warning);
        });
    }
});