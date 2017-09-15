
//******************************************************
// Functions used by controlled vocabulary add-on
// There might be overlaping with existing functions
//******************************************************
function ec(node, contextPath, target) {
	expandCollapse(node, contextPath, target);
	return false;
}

function expandCollapse(node, contextPath, target) {
	node = node.parentNode;
	var childNode  = $("ul#aspect\\.submission\\.submit\\.ControlledVocabularyTransformer\\.list\\.submitcontrolledvocabulary_"+target)[0];

	if(!childNode) return false;

	var image = node.getElementsByTagName("img")[0];

	if(childNode.style.display != "block") {
		childNode.style.display  = "block";
		image.src = contextPath + "/static/images/controlledvocabulary/m.gif";
		image.alt = "Collapse search term category";
	} else {
		childNode.style.display  = "none";
		image.src = contextPath + "/static/images/controlledvocabulary/p.gif";
		image.alt = "Expand search term category";
	}

	return false;
}


function i(node, fieldname) {
	return sendBackToParentWindow(node, fieldname);
}

function sendBackToParentWindow(node, fieldname) {
    var resultPath = "";
    var firstNode = 1;
    var pathSeparator = "::";


    while(node != null) {
        if(firstNode == 1) {
            resultPath = getTextValue(node);
            firstNode = 0;
        } else {
            resultPath = getTextValue(node) + pathSeparator + resultPath;
        }
        node = getParentTextNode(node);
    }

    //For our todisplay value we need to make sure that we only show(and save) the last bit of our taxonomies string
    var displayVal = resultPath.split("::")[resultPath.split("::").length - 1];

    var displayElement = window.opener.document.getElementById("aspect_submission_StepTransformer_field_"+fieldname);
    if(window.opener.document.getElementById("aspect_submission_StepTransformer_field_"+fieldname + "_fullpath") != null){
        displayElement.value = displayVal;
        window.opener.document.getElementById("aspect_submission_StepTransformer_field_"+fieldname + "_fullpath").value = resultPath;
    }else{
        displayElement.value = resultPath;
    }


    self.close();
    return false;
}


function getParentTextNode(node) {
	var parentNode = node.parentNode.parentNode;
	var id = parentNode.id.substring(89);

	parentNode = $("li#controlledvocabulary_li_"+id)[0];

	if (parentNode) {
        var children = parentNode.childNodes;
        var textNode;
        for(var i=0; i< children.length; i++) {
            var child = children.item(i);
            if(child.className == "value") {
                return child;
            }
        }
	}
	return null;
}

function getTextValue(node) {
    if(node.nodeName == "A"){
 		return getAnchorText(node);
 	} else
    if(node.nodeName == "SPAN"){
        return node.innerHTML;
    } else {
 		return "";
 	}

}


function getAnchorText(ahref) {
 	if(isMicrosoft()) return ahref.childNodes.item(0).nodeValue;
	else return ahref.text;
}

function isMicrosoft() {
    return isBrowser("Microsoft", 0);
}


function isBrowser(b,v) {
    browserOk = false;
    versionOk = false;

    browserOk = (navigator.appName.indexOf(b) != -1);
    if (v == 0) versionOk = true;
    else  versionOk = (v <= parseInt(navigator.appVersion));
    return browserOk && versionOk;
}


$(document).ready(function(){
    //HIDE NAVIGATION & HEADER & OTHER STUFF
    $('body').css('background', 'none');
    $('div#ds-main-watermark').css('background', 'none');
    $('div#ds-main-content').css('background', 'none');
    $('div#ds-main-content').css('overflow', 'visible');
    $('div#ds-main').css('width', 'auto');
    $('header').hide();
    $('div.inverted').hide();
    $('div.trail-wrapper').hide();
    $('footer').hide();
});

