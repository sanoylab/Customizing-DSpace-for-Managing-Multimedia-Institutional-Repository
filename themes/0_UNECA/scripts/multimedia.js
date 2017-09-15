/*
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree and available online at
 *
 * http://www.dspace.org/license/
 */
(function ($) {

    /**
     * Function ensures that all the links clicked in our results pass through the internal logging mechanism
     */
    $(document).ready(function() {
        var descriptionParagraphs = $('.rss-description p');
        for(i=0;i<descriptionParagraphs.length;i++) {
            descriptionParagraphs[i].innerHTML = descriptionParagraphs[i].innerHTML.substr(0,80) + '...';
        }
    });

})(jQuery);
