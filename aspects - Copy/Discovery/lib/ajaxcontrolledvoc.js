jQuery(document).ready(function() {
    jQuery('body').append('<ul id="o0templateList0o" style="display:none;"></ul>');

    var ul = jQuery('#aspect_discovery_AJAXVocabularySearch_list_searchcontrolledvocabulary');
    if (ul.length == 0)
        ul = jQuery('#aspect_submission_submit_AJAXControlledVocabularyTransformer_list_submitcontrolledvocabulary');

    var wrapper = ul.parent();

    var templateUl = jQuery("ul#o0templateList0o");
    templateUl.append(ul.children());

    var params = { vocabulary: jQuery('input[name = vocabulary]').val(), lang: jQuery('input[name = lang]').val() };
    var filterval = jQuery('input[name=filter]').val();
    if (filterval != undefined && filterval.length > 0) {
        params.filter = filterval;
    }

    jQuery.get(getContextPath() + "/vocsearch", params, function(data) {
        jQuery.each(jQuery(data).find('root > node'), function() {
            var vocabularyNode = jQuery(this);
            var newNodeId = vocabularyNode.attr('id');
            var newHtml = templateUl.html().replace(/o0ROOT_NODE_ID0o/g, newNodeId);
            newHtml = newHtml.replace(/o0ROOT_NODE_LABEL0o/g, vocabularyNode.attr('label'));
            var newNode = jQuery(newHtml);
            newNode.find('li[id*=o0NODE_ID0o]').remove();

            var img = newNode.find('img[alt*=expand]');
            img.click(function() {
                var currentImg = jQuery(this);
                var sublist = jQuery("ul[id$='"  + newNodeId + "']");
                if (sublist.is(':hidden')) {
                    currentImg.attr('src', templateUl.find('li[id$=o0ROOT_NODE_ID0o] img').attr('src'));
                    sublist.slideDown("fast");
                }
                else {
                    sublist.slideUp("fast");
                    jQuery(this).attr('src', templateUl.find('li[id$=o0NODE_ID0o] img').attr('src'));
                }
            });

            ul.append(newNode);

            parseXMLNodeList(newNode.find('ul[id*=' + newNodeId + ']'), vocabularyNode.children());

            ul.find("input[type=checkbox]").change(function() {
                if (ul.find("input[type=checkbox]:checked").length > 0)
                    $("input#aspect_discovery_AJAXVocabularySearch_field_submit_search:disabled, button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton:disabled").removeAttr("disabled");
                else
                    $("input#aspect_discovery_AJAXVocabularySearch_field_submit_search:enabled, button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton:enabled").attr("disabled", "disabled");
            });
        });

        if (ul.find("input[type=checkbox]:checked").length > 0)
            $("input#aspect_discovery_AJAXVocabularySearch_field_submit_search:disabled, button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton:disabled").removeAttr("disabled");
        else
            $("input#aspect_discovery_AJAXVocabularySearch_field_submit_search:enabled, button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton:enabled").attr("disabled", "disabled");

        jQuery('div.loading').hide();
        wrapper.show('fast');
    });

    $("button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton").click(addSelectedValues);
});

function getSublist(ul, id, callback) {
    var params = { vocabulary: jQuery('input[name = vocabulary]').val(), parentNodeID: id, lang: jQuery('input[name = lang]').val() };
    var filterval = jQuery('input[name=filter]').val();
    if (filterval != undefined && filterval.length > 0) {
        params.filter = filterval;
    }
    jQuery.get(getContextPath() + "/vocsearch", params, function(data) {
        var list = jQuery(data).find('root > node');
        parseXMLNodeList(ul, list);
        ul.find("input[type=checkbox]").change(function() {
            if (ul.find("input[type=checkbox]:checked").length > 0)
                $("input#aspect_discovery_AJAXVocabularySearch_field_submit_search:disabled, button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton:disabled").removeAttr("disabled");
            else
                $("input#aspect_discovery_AJAXVocabularySearch_field_submit_search:enabled, button#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_addbutton:enabled").attr("disabled", "disabled");
        });
        if (jQuery.isFunction(callback)) {
            callback.call(this);
        }
    });
}

function parseXMLNodeList(ul, nodelist) {
    jQuery.each(nodelist, function() {
        var child = jQuery(this);
        if (child.is('[hasChildren=true]')) {
            var childID = child.attr('id');
            var templateUl = jQuery("ul#o0templateList0o");
            var templateNodeHtml = templateUl.find('li[id*=o0NODE_ID0o]').parent().html();
            var newHtml = templateNodeHtml.replace(/o0NODE_ID0o/g, childID);
            newHtml = newHtml.replace(/o0NODE_LABEL0o/g, child.attr('label'));
            var newChild = jQuery(newHtml);
            newChild.find('input[name*=o0LEAF_ID0o]').parent().remove();
            newChild.find('span:contains(o0LEAF_LABEL0o), a:contains(o0LEAF_LABEL0o), label:contains(o0LEAF_LABEL0o)').parent().remove();

            var img = newChild.find('img[alt*=expand]');
            img.removeAttr('onclick');
            img.click(function () {
                var currentImg = jQuery(this);
                if (currentImg.data('processing') != true) { //ensures it only gets triggered once if the user clicks again before it's finished.
                    var newChildSublist = jQuery("ul[id$='" + childID + "']");
                    if (newChildSublist.is(':hidden')) {
                        if (newChildSublist.find('li').length == 0) {
                            currentImg.data('processing', true);
                            getSublist(newChildSublist, childID, function() {
                                currentImg.attr('src', templateUl.find('li[id$=o0ROOT_NODE_ID0o] img').attr('src'));
                                newChildSublist.slideDown("fast");
                                currentImg.data('processing', false);
                            });
                        }
                        else {
                            currentImg.attr('src', templateUl.find('li[id$=o0ROOT_NODE_ID0o] img').attr('src'));
                            newChildSublist.slideDown("fast");
                        }
                    }
                    else {
                        newChildSublist.slideUp("fast");
                        jQuery(this).attr('src', templateUl.find('li[id$=o0NODE_ID0o] img').attr('src'));
                    }
                }
            });

            ul.append(newChild);
        }
        else {
            var templateLeafHtml = jQuery("ul#o0templateList0o").find('span:contains(o0LEAF_LABEL0o), a:contains(o0LEAF_LABEL0o), label:contains(o0LEAF_LABEL0o)').parents('ul:first').html();
            newHtml = templateLeafHtml.replace(/o0LEAF_ID0o/g, child.attr('id'));
            newHtml = newHtml.replace(/o0LEAF_LABEL0o/g, child.attr('label'));
            ul.append(newHtml);
        }
    });
}

function getContextPath() {
    return jQuery('[name=contextpath]').val();
}

function addSelectedValues() {
    var div = jQuery("div#aspect_submission_submit_AJAXControlledVocabularyTransformer_div_vocabulary");
    var fieldName = $('input#aspect_submission_submit_AJAXControlledVocabularyTransformer_field_name').val();
    var parentField = $(window.opener.document).find("#aspect_submission_StepTransformer_field_" + fieldName);
    var wrapper = parentField.parents('div.ds-form-content:first');
    var exists = true;
    var i = 0;
    while(exists) {
        i++;
        exists = wrapper.find('input[type=hidden][name=' + fieldName + '_' + i +']').length > 0;
    }
    div.find("input[type=checkbox]:checked").each(function() {
        var checkbox = $(this);
        var label = $('label[for="'+checkbox.attr('id')+'"]')[0];
        parentField.after('<input type="hidden" value="' + label.innerHTML + '" name="' + fieldName + '_' + i + '"/>');
        parentField.after('<input type="hidden" value="' + checkbox.attr('id') + '" name="' + fieldName + '_' + i + '_id' +'"/>');
        console.log(label.innerHTML);

        i++;
    });

    parentField.parents("form:first").submit();

    self.close();
    return false;
}
