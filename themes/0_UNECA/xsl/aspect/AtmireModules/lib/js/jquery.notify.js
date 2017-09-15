(function($) {
    $.fn.notify = function(method) {
        if ($.fn.notify.methods[method]) {
            if ($.isFunction($.fn.notify.methods[method])){
                return $.fn.notify.methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
            }
            else
                return $.fn.notify.methods[ method ];
        } else if (typeof method === 'object' || ! method) {
            $.fn.notify.methods = $.extend({}, $.fn.notify.methods, method);
            if ($.isFunction($.fn.notify.methods.init))
                return $.fn.notify.methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.notify');
        }
    };

    $.fn.notify.methods =  {
        error: function(message) {
            if (typeof message === 'object')
                message.classes = "error";
            else
                message = {
                    message: message,
                    classes: "error"
                };
            hideMessage(function() {
                showMessage(message);
            });
            return this;
        },
        success: function(message) {
            if (typeof message === 'object')
                message.classes = "success";
            else
                message = {
                    message: message,
                    classes: "success"
                };
            hideMessage(function() {
                showMessage(message);
            });
            return this;
        },
        neutral: function(message) {
            hideMessage(function() {
                showMessage(message);
            });
            return this;
        },
        hide: function(id) {
            hideMessage(id);
            return this;
        }
    };

    function showMessage(extraParams) {
        var params =  {
            duration: 5,
            minWidth: 130, //minwidth is defined in px
            maxWidth: 80 //maxwidth is a precentage of the window's width
        };

        if (typeof extraParams === 'object')
            params = $.extend({}, params, extraParams);
        else
            params = $.extend({}, params, {message: extraParams});

        if (params.message == undefined)
            return;

        var klass = "";
        if (params.classes   != undefined) {
            if (params.classes instanceof Array){
                for (var i = 0; i < params.classes.length; i++) {
                    if (i > 0)
                        klass += ' ';
                    klass += params.classes[i];
                }
            }
            else
                klass = params.classes;
        }
        var notification = $('<div class="atmire-notification"><div class="atmire-notification-content ' + klass + '">' + params.message + '</div></div>');
        if (params.id != undefined)
            notification.attr('id', params.id);
        //width needs to be explicitly set for margin auto to work.
        notification.css('visibility', 'hidden');
        $('body').append(notification);
        setWidth(notification.find('.atmire-notification-content'), params.minWidth, params.maxWidth);
        notification.css('visibility', '');
        var duration = params.duration * 1000;
        if (duration > 0) {
            window.setTimeout(function() {
                if (notification != undefined)
                        notification.fadeOut('fast', function() {
                            notification.remove();
                        });
                }, duration);
        }
    }

    function hideMessage(id, callback) {
        if ($.isFunction(id)) {
            if (callback == undefined)
                callback = id;

            id = undefined;
        }
        var existingNotification;

        if (id != undefined)
            existingNotification = $('#' + id);
        else
            existingNotification = $('.atmire-notification');

        if (existingNotification.length > 0) {
            existingNotification.stop(true, true).remove();
            if ($.isFunction(callback))
                callback.call(this);
        }
        else {
            if ($.isFunction(callback))
                callback.call(this);
        }
    }

    function setWidth(element, minWidth, maxWidth) {
        element.css('display', 'inline');
        var newWidth = element.outerWidth();
        var maxWidth = Math.floor($(window).width() * maxWidth/100);
        if (newWidth > maxWidth)
            newWidth = maxWidth;
        if (newWidth < minWidth)
            newWidth = minWidth;
        element.css({display: '', width: newWidth + "px"});
    }
})(jQuery);