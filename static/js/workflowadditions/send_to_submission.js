jQuery(document).ready(function() {
    var form = jQuery("form#aspect_workflowadditions_BackToSubmissionButtonTransformer_div_send_to_submission_form");
    var warning = form.find("input[name=warning_content]").val();
    if (form.length > 0 && warning != undefined && warning.length > 0) {
        form.submit(function() {
            return confirm(warning);
        });
    }
});