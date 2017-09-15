
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
    //aspect.discovery.VocabularySearch.list.searchcontrolledvocabulary_N106D5
	var childNode  = $("ul#aspect\\.discovery\\.VocabularySearch\\.list\\.searchcontrolledvocabulary_"+target)[0];

	if(!childNode) return false;

	var image = node.getElementsByTagName("img")[0];

	if(childNode.style.display != "block") {
		childNode.style.display  = "block";
		image.src = contextPath + "/themes/uneca/images/controlledvocabulary/m.gif";
		image.alt = "Collapse search term category";
	} else {
		childNode.style.display  = "none";
		image.src = contextPath + "/themes/uneca/images/controlledvocabulary/p.gif";
		image.alt = "Expand search term category";
	}

	return false;
}


function i(node) {
	return updateValue(node);
}

function updateValue(node) {
    var resultPath = "";
    var firstNode = 1;
    var pathSeparator = "::";
    var orig_node = node;

    node = node.parentNode;
    if (node) {
        var children = node.childNodes;
        for(var i=0; i< children.length; i++) {
            var child = children.item(i);
            if(child.className == "value") {
                node = child;
            }
        }
	}

    while(node != null) {
        if(firstNode == 1) {
            resultPath = getTextValue(node);
            firstNode = 0;
        } else {
            resultPath = getTextValue(node) + pathSeparator + resultPath;
        }
        node = getParentTextNode(node);
    }

    orig_node.value = resultPath;

    return false;
}


function getParentTextNode(node) {
	var parentNode = node.parentNode.parentNode;
	var id = parentNode.id.substring(72);

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
 	if(node.nodeName == "SPAN" || node.nodeName == "LABEL") {
 		return $(node).text();
 	} else {
 		return "";
 	}

}


//function getAnchorText(ahref) {
// 	if(isMicrosoft()) return ahref.childNodes.item(0).nodeValue;
//	else return ahref.text;
//}
//
//function isMicrosoft() {
//    return isBrowser("Microsoft", 0);
//}


function isBrowser(b,v) {
    browserOk = false;
    versionOk = false;

    browserOk = (navigator.appName.indexOf(b) != -1);
    if (v == 0) versionOk = true;
    else  versionOk = (v <= parseInt(navigator.appVersion));
    return browserOk && versionOk;
}

