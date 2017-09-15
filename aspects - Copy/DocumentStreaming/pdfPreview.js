$(document).ready(function() {
    var scribd_doc;
    if ($("input[name='scribdmethod']").val() != 'uploaded') {
        scribd_doc = scribd.Document.getDocFromUrl($("input[name='url']").val(), $("input[name='publisher']").val());
        scribd_doc.addParam("public", false);
    } else {
        scribd_doc = scribd.Document.getDoc($("input[name='docid']").val(), $("input[name='accesskey']").val());
    }
    scribd_doc.addParam('jsapi_version', 2);
    scribd_doc.write('aspect_documentstreaming_ScribdViewer_div_embedded_doc');
    if (typeof matchHeights == 'function') {matchHeights();}
});