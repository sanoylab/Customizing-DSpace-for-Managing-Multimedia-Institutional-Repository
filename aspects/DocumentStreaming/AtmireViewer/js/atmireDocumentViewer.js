$(document).ready(function() {

    //window. is necessary for global vars to keep IE happy
    window.current_page_width_index = getParameter('current_page_width_index')*1; //*1 to ensure it's interpreted as an int instead of a string

    window.isAutomaticScrolling = false;
    window.currentpage = 1;
    window.currentthumb = 1;
    window.thumbwidth = 100;

    window.loadingImg = getParameter('contextpath') + '/aspects/DocumentStreaming/AtmireViewer/images/loading.png';

    window.atmire_dv_nbpages = getParameter('atmire_dv_nbpages')*1;

    window.atmire_dv_page_heights = [];

    window.atmire_dv_prefix = getParameter('atmire_dv_prefix');

    for (var page = 1; page <= atmire_dv_nbpages; page++) {
        atmire_dv_page_heights[page] = [];
    }

    $.each(getParameter('atmire_dv_page_heights').split(','), function() {
        var split = this.split('|');
        if (split.length == 3) {
            atmire_dv_page_heights[split[0] * 1][split[1]] = split[2];
        }
    });

    window.atmire_dv_page_widths = getParameter('atmire_dv_page_widths').split(',');

    calculateContentWidth();

    updateImages(true);
    updateThumbs(true);

    $('div.thumb-pane-controls').html('<table align="center"><tr><td><button id="aspect_documentstreaming_AtmireDocumentViewer_button_back"class="thumb-pane-controls-previousButton"/></td><td><div class="thumb-pane-controls-page-number"id="aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-controls-page-number">1 / 1</div></td><td><button id="aspect_documentstreaming_AtmireDocumentViewer_button_forward"class="thumb-pane-controls-nextButton"/></td></tr><tr><td align="right"><button id="aspect_documentstreaming_AtmireDocumentViewer_button_zoomout"class="thumb-pane-controls-zoom-out"/></td><td align="center"><button id="aspect_documentstreaming_AtmireDocumentViewer_img_maximize"class="thumb-pane-controls-fullscreen" altclass="thumb-pane-controls-fullscreen-restore"/></td><td><button id="aspect_documentstreaming_AtmireDocumentViewer_button_zoomin"class="thumb-pane-controls-zoom-in"/></td></tr></table>');


    calculateHeights();
    $(window).bind('resize', calculateHeights);

    for (page = 1; page <= atmire_dv_nbpages; page++) {
        $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumbnr'+page).html(page);
    }

    switchedPage(currentpage);

    $('div.page_display > img').width(atmire_dv_page_widths[current_page_width_index]);
    window.scrollingdelay = 500;

    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').bind('scroll', function(e){
        var pos = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').height() / 2 + $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').offset().top;
        for (var page = 1; page <= atmire_dv_nbpages+1; page++) {
            var currentTop;
            if (page == atmire_dv_nbpages+1)
                currentTop = pos+1;
            else
                currentTop = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page' + page).offset().top;
            if (currentTop > pos) {
                page--;
                if (currentpage != page) {
                    switchedPage(page);
                }
                break;
            }
        }
    });

    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').bind('scroll', function(e){
        var pos = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').height() / 2 + $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').offset().top;
        for (var page = 1; page <= atmire_dv_nbpages+1; page++) {
            var currentTop;
            if (page == atmire_dv_nbpages+1)
                currentTop = pos+1;
            else
                currentTop = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumbwrapper'+page).offset().top;
            if (currentTop > pos) {
                page--;
                if (currentthumb != page) {
                    switchedThumb(page);
                }
                break;
            }
        }
    });

    $('div.thumb_display').bind('click', function(e){
        goToPage(this.id.replace(/aspect_documentstreaming_AtmireDocumentViewer_div_thumb/, ''));
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_back').bind('click', function(e){
        if (currentpage > 1) {
            goToPage(currentpage - 1);
        }
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_back').focus(function(){
        this.blur();
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_forward').bind('click', function(e){
        if (currentpage < atmire_dv_nbpages) {
            goToPage(currentpage + 1);
        }
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_forward').focus(function(){
        this.blur();
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_zoomout').bind('click', function(e){
        if (current_page_width_index > 0) {
            current_page_width_index--;

            updateImages(true);

            $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page' + currentpage));
            //TODO: recalculate offset within page
        }
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_zoomout').focus(function(){
        this.blur();
    });


    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_zoomin').bind('click', function(e){
        if (current_page_width_index < atmire_dv_page_widths.length - 1) {
            current_page_width_index++;

            updateImages(true);

            $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page' + currentpage));
            //TODO: recalculate offset within page
        }
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_button_zoomin').focus(function(){
        this.blur();
    });


    $('button#aspect_documentstreaming_AtmireDocumentViewer_img_maximize').bind('click', function(e){
        //Make sure that the icon flips also
        var button = $('button#aspect_documentstreaming_AtmireDocumentViewer_img_maximize');
        var altclass = button.attr('altclass');
        button.attr('altclass', button.attr('class'));
        button.attr('class', altclass);
        toggleMaximize('aspect_documentstreaming_AtmireDocumentViewer_div_full_viewer');
    });

    $('button#aspect_documentstreaming_AtmireDocumentViewer_img_maximize').focus(function(){
        this.blur();
    });

    $('#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').scrollview({
        grab: getParameter('contextpath') + '/aspects/DocumentStreaming/AtmireViewer/images/openhand.cur',
        grabbing: getParameter('contextpath') + '/aspects/DocumentStreaming/AtmireViewer/images/closedhand.cur'
    });

    $('#ds-footer-wrapper').css('margin-top', 0); //Affects Mirage only

    $('#aspect_documentstreaming_AtmireDocumentViewer_div_full_viewer').css('visibility', 'visible').hide().fadeIn('fast');

});

function updateImages(refreshAll) {
    var viewerheight = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').height();
    if (viewerheight < 200)
        viewerheight = 200;
    viewerheight *= 2;

    var startDisplayed = currentpage - 1;
    var remainingHeight = viewerheight;
    for (var page = currentpage - 1; page >= 1 && remainingHeight > 0; page--) {
        remainingHeight -= atmire_dv_page_heights[page][atmire_dv_page_widths[current_page_width_index]].replace(/px/, '');
        startDisplayed--;
    }
    if (startDisplayed < 1)
        startDisplayed = 1;

    var endDisplayed = currentpage + 1;
    remainingHeight = viewerheight;
    for (var page = currentpage + 1; page <= atmire_dv_nbpages && remainingHeight > 0; page++) {
        remainingHeight -= atmire_dv_page_heights[page][atmire_dv_page_widths[current_page_width_index]].replace(/px/, '');
        endDisplayed++;
    }
    if (endDisplayed > atmire_dv_nbpages)
        endDisplayed = atmire_dv_nbpages;


    if (refreshAll) {
        for (var page = 1; page <= startDisplayed; page++) {
            makeHiddenImage(page);
        }
        for (var page = endDisplayed; page <= atmire_dv_nbpages; page++) {
            makeHiddenImage(page);
        }
    }
    for (var page = startDisplayed; page <= endDisplayed; page++) {
        if (refreshAll || getContentsImg(page)[0].src.indexOf(atmire_dv_prefix) < 0) {
            makeDisplayedImage(page);
        }
    }
}

function updateThumbs(refreshAll) {
    var viewerheight = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').height();
    if (viewerheight < 200)
        viewerheight = 200;
    viewerheight *= 3;

    var startDisplayed = currentthumb - 1;
    var remainingHeight = viewerheight;
    for (var page = currentthumb - 1; page >= 1 && remainingHeight > 0; page--) {
        remainingHeight -= atmire_dv_page_heights[page][thumbwidth + 'px'].replace(/px/, '');
        startDisplayed--;
    }
    if (startDisplayed < 1)
        startDisplayed = 1;

    var endDisplayed = currentthumb + 1;
    remainingHeight = viewerheight;
    for (var page = currentthumb + 1; page <= atmire_dv_nbpages && remainingHeight > 0; page++) {
        remainingHeight -= atmire_dv_page_heights[page][thumbwidth + 'px'].replace(/px/, '');
        endDisplayed++;
    }
    if (endDisplayed > atmire_dv_nbpages)
        endDisplayed = atmire_dv_nbpages;


    if (refreshAll) {
        for (var page = 1; page <= startDisplayed; page++) {
            makeHiddenThumb(page);
        }
        for (var page = endDisplayed; page <= atmire_dv_nbpages; page++) {
            makeHiddenThumb(page);
        }
    }
    for (var page = startDisplayed; page <= endDisplayed; page++) {
        if (refreshAll || getThumbImg(page)[0].src.indexOf(atmire_dv_prefix) < 0) {
            makeDisplayedThumb(page);
        }
    }
}

function makeDisplayedImage(page) {
    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page'+page).html('<img src="' + atmire_dv_prefix + page + '_' + atmire_dv_page_widths[current_page_width_index].replace(/px/, '') + '" style="width: '+atmire_dv_page_widths[current_page_width_index]+'; height: '+atmire_dv_page_heights[page][atmire_dv_page_widths[current_page_width_index]]+';" />');
}

function makeHiddenImage(page) {
    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page'+page).html('<img src="' + loadingImg + '" style="width: '+atmire_dv_page_widths[current_page_width_index]+'; height: '+atmire_dv_page_heights[page][atmire_dv_page_widths[current_page_width_index]]+';" />');
}

function makeDisplayedThumb(page) {
    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumbwrapper'+page).html('<img src="' + atmire_dv_prefix + page + '_' + thumbwidth + '" class="thumb_display_notselected" style="width: ' + thumbwidth + 'px; height: '+atmire_dv_page_heights[page][thumbwidth + 'px']+';" />');
}

function makeHiddenThumb(page) {
    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumbwrapper'+page).html('<img src="' + loadingImg + '" class="thumb_display_notselected" style="width: ' + thumbwidth + 'px; height: '+atmire_dv_page_heights[page][thumbwidth + 'px']+';" />');
}

function getThumbImg(page) {
    return $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb'+page+' > div.thumb_wrapper > img');
}

function getContentsImg(page) {
    return $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page'+page+' > img');
}

function goToPage(newPage) {
    if (newPage - currentpage == 1 || currentpage - newPage == 1) {
        $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page' + newPage), scrollingdelay );
    } else {
        isAutomaticScrolling = true;
        $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page' + newPage), scrollingdelay, {onAfter:afterAutomaticScrollingMultipage } );
    }
}

function afterAutomaticScrollingMultipage() {
    isAutomaticScrolling = false;
    scrollThumbsPane();
    updateImages(false);
}

function selectThumbnail(newPage) {
    getThumbImg(currentpage).removeClass('thumb_display_selected');
    getThumbImg(currentpage).addClass('thumb_display_notselected');
    currentpage = newPage;
    getThumbImg(currentpage).removeClass('thumb_display_notselected');
    getThumbImg(currentpage).addClass('thumb_display_selected');
    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-controls-page-number').html(currentpage + '/' + atmire_dv_nbpages);
    scrollThumbsPane();
}

function switchedPage(newPage) {
    selectThumbnail(newPage);
    if(!isAutomaticScrolling) {
        updateImages(false);
    }
}

function switchedThumb(newPage) {
    currentthumb = newPage;

    updateThumbs(false);
}

function scrollThumbsPane() {
    //have thumbs pane scroll if selected thumb not visible, but not while scrolling automatically
    var thumbtop = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb'+currentpage).offset().top;
    var thumbheight = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb'+currentpage).height();
    var contenttop = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').offset().top;
    var contentheight = $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').height();
    if ((thumbtop < contenttop || thumbtop > contentheight + contenttop) && !isAutomaticScrolling) {
        $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb'+currentpage));
    }
    else if (thumbheight*1.5 < contentheight && thumbtop + thumbheight > contentheight + contenttop && !isAutomaticScrolling) {
        $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_thumb'+currentpage), {offset: {top: -contentheight + thumbheight} });
    }
}

function calculateContentWidth() {
    var viewer = $('#aspect_documentstreaming_AtmireDocumentViewer_div_full_viewer');
    var content = $('#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane');
    var rightbar = $('#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane');

    var newContentWidth = viewer.width() - rightbar.width();

    content.width(newContentWidth);

    window.current_page_width_index = 0;
    for (var i = 0; i < atmire_dv_page_widths.length; i++) {
        var cw = atmire_dv_page_widths[i];
        if (cw != undefined) {
            cw = cw.replace(/[^-\d\.]/g, '') * 1; //turn into an integer (i.e. remove 'px')
            var sw = atmire_dv_page_widths[current_page_width_index].replace(/[^-\d\.]/g, '') * 1;
            if (cw > sw && cw < newContentWidth) {
                window.current_page_width_index = i;
            }

        }
    }
}

function calculateHeights() {
    var minHeight = 500;

    var viewer = $('#aspect_documentstreaming_AtmireDocumentViewer_div_full_viewer');
    var content = $('#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane');
    var controls = $('#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-controls');
    var navigation = $('#aspect_documentstreaming_AtmireDocumentViewer_div_thumb-pane-images');

    var scrollOffset = $(window).scrollTop()*1;
    var headerHeight = viewer.offset().top*1;
    var viewerOffsetToViewport = headerHeight - scrollOffset;
    var viewportHeight = $(window).height()*1;
    var newViewerHeight = viewportHeight - viewerOffsetToViewport;

    if (newViewerHeight < minHeight) {
        newViewerHeight = minHeight;
    }

    content.height(newViewerHeight);

    var newNavigationHeight = newViewerHeight - controls.height();

    navigation.height(newNavigationHeight);

    updateImages(false);
    updateThumbs(false);
    if (typeof matchHeights == 'function') {matchHeights();}
}

var hiddenitems;

function toggleMaximize(wrapperId){
    var wrapper = $('div#' + wrapperId);
    //Check if we have the div to be maximized if not then return
    if(wrapper.length == 0)
        return;

    if(wrapper.hasClass('fullscreen')) {
        wrapper.data('origParent').append(wrapper);
        wrapper.removeClass('fullscreen');
    }
    else {
        wrapper.data('origParent', wrapper.parent());
        $('body').append(wrapper);
        wrapper.addClass('fullscreen');
    }

    calculateHeights();
    calculateContentWidth();
    var savedPage = currentpage;
    updateImages(true);
    updateThumbs(true);

    $('div#aspect_documentstreaming_AtmireDocumentViewer_div_content-pane').scrollTo( $('div#aspect_documentstreaming_AtmireDocumentViewer_div_page' + savedPage));
    selectThumbnail(savedPage);

}

//Hides the siblings of all ancestors of the given jQuery object
function hideAllAncestorialSiblings(jqObject){
    var ancestor = findTheAncestorWithSiblings(jqObject);
    if (ancestor != undefined && ancestor.length > 0) {
        ancestor.siblings().each(function() {
            hideIt($(this));
        });
        var parent = ancestor.parent(':not(body)').filter(':not(html)');
        if (parent != undefined && parent.length > 0) {
            hideAllAncestorialSiblings(parent);
        }
    }
}

function findTheAncestorWithSiblings(jqObject){
    var siblings = jqObject.siblings();
    if (siblings.length > 0)
        return jqObject;
    else
        return findTheAncestorWithSiblings(jqObject.parent());
}

function hideIt(jqobj)
{
    jqobj.hide();
    if (hiddenitems == undefined)
        hiddenitems = jqobj;
    else
        hiddenitems = hiddenitems.add(jqobj);
}

function getParameter(name) {
    return $('input[name="' + name + '"]').val();
}
