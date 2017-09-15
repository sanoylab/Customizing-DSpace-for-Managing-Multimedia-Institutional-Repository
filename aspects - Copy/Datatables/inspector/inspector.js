(function($) {

    $.fn.inspector = function(method) {
        // return if this is empty
        if(this.length == 0) { return this; }
        // Method calling logic
        if ($.fn.inspector.methods[method]) {
            if ($.isFunction($.fn.inspector.methods[method])){
                return $.fn.inspector.methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
            }
            else
                return $.fn.inspector.methods[ method ];
        } else if (typeof method === 'object' || ! method) {
            $.fn.inspector.methods = $.extend({}, $.fn.inspector.methods, method);
            if ($.isFunction($.fn.inspector.methods.init))
                return $.fn.inspector.methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.inspector');
        }
    }

    $.fn.inspector.methods = {

        /**
         * Initialize inspector
         *      Will generate necessary html and append it to element on which init is called
         *      Later inspector invocations should happen on .inspector (or on the custom class given as argument)
         * Argument: options object with following properties
         *      REQUIRED properties:
         *          dataTable: the item DataTable
         *      OPTIONAL properties:
         *          bindKeyboardEvents: if true (default), registers event handler on keyboard events for this inspector
         *          customClasses: by default the generated div gets ghe classes .inspector and .dtcontainer;
         *              custom classes to use instead can be specified here (eg for multiple inspectors on a page)
         *          removeFromDataTable: function to call when removing an item from the DataTable
         *
         */
        init: function(options) {
            // determine classes to add to div for inspector
            var classes = 'dtcontainer inspector';
            if(options && options.classes) {
                classes = options.classes;
            }

            // generate div for inspector
            var $this = $('<div class="' + classes + '"></div>');
            this.append($this);
            // append table for datatable
            $this.append('<table class="ds-table dttable" rows="1" cols="2">' +
                    '<tbody>' +
                        '<tr class="ds-table-row odd">' +
                            '<td class="ds-table-cell odd dataTables_empty" rowspan="1" colspan="2">Loading data from server</td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>');
            // append buttons
            var next = $('<div class="inspector-next-button" name="next">&nbsp;</div>');
            next.mouseover(function() { next.addClass('button-hover'); });
            next.mouseout(function() { next.removeClass('button-hover'); });
            next.click(function() { $this.inspector('showNextItemDetails'); });
            var prev = $('<div class="inspector-prev-button" name="prev">&nbsp;</div>');
            prev.mouseover(function() { prev.addClass('button-hover'); });
            prev.mouseout(function() { prev.removeClass('button-hover'); });
            prev.click(function() { $this.inspector('showPrevItemDetails'); });
            //Only add a remove button IF we have a remove function !
            $this.append(next).append(prev);
            if(options.removeFromDataTable){
                var remove = $('<div class="inspector-remove-this-item-button" name="remove-this-item-button">&nbsp;</div>');
                remove.mouseover(function() { remove.addClass('button-hover'); });
                remove.mouseout(function() { remove.removeClass('button-hover'); });
                remove.click(function() { $this.inspector('removeCurrentItem'); });

                $this.append(remove);
            }

            // initialize dialog, using i18n string
            // todo: check, if i18n not present, throw error or sth
            $this.dialog({
                bgiframe: true,
                autoOpen: false,
                width: 664,
                resizable: false,
                title: $(document).data('i18n').ItemDetails,
                open: function() {$this.inspector('updateItemDetailsTable');},
                modal: false,
                dialogClass: 'inspectorDialog'
            });

            /**
             * Keyboard event handler
             *      Used to handle next/previous/open/close keyboard events for inspector
             */
            if(!options || options.bindKeyboardEvents !== false) {
                $(document).bind('keydown', function (evt) {
                    if($(evt.target).closest(':input').length > 0) {
                        return;
                    }

                    switch(evt.which) {
                        case 37:    // left
                        case 38:    // up
                            evt.preventDefault();
                            options.getActive().inspector('showPrevItemDetails');
                            break;

                        case 39:    // right
                        case 40:    // down
                            evt.preventDefault();
                            options.getActive().inspector('showNextItemDetails');
                            break;

                        case 32:    // space
                            evt.preventDefault();
                            options.getActive().inspector('toggleItemDetailsDialog');
                            return false;
                            break;

                        case 8:     // backspace
                        case 46:    // delete
                            evt.preventDefault();
                            options.getActive().inspector('removeCurrentItem');
                            break;
                    }
                });
            }

            if(!options || !options.dataTable) {
                if(console) {
                    console.log("inspector init has some required options which were not");
                }
            }
            // store itemBag for later use
            $this.data('itemBag', options.dataTable);
            // store callback function
            if(options.removeFromDataTable){
                $this.data('removeFromDataTable', options.removeFromDataTable);
            }

            // initialize datatable
            $this.inspector('initItemDetailsTable');
            return this;
        },


        /**
         * Force redraw of the itemdetails datatable
         * If it does not exist yet, create it
         */
        updateItemDetailsTable: function() {
            this.find('table').dataTable().fnDraw();
            return this;
        },


        /**
         * Initialize datatable used in inspector dialog
         */
        initItemDetailsTable: function() {
            var $this = this;
            this.find('table').dataTable({
                "aoColumns": [
                    {
                        "bSortable": false,
                        "sWidth": "320px"
                    },
                    {
                        "bSortable": false,
                        "sWidth": "320px"
                    }
                ],
                "oLanguage": {
                    "sInfo": $(document).data('i18n').BagItemsInfo,
                    "sInfoEmpty": $(document).data('i18n').BagItemsEmpty,
                    "sInfoFiltered": $(document).data('i18n').BagItemsFilter,
                    "sLengthMenu": $(document).data('i18n').BagItemsMenu,
                    "sZeroRecords": $(document).data('i18n').BagNoItemsSelected
                },
                "bAutoWidth": false,
                "bFilter": false,
                "bJQueryUI": true,
                "bProcessing": true,
                "bSort": false,
                "bPaginate": false,
                "bServerSide": true,
                "sDom": '<"datatablesheader"lfr><"datatablescroller"t><"datatablefooter"p>',
                "sPaginationType": "full_numbers",
                        // todo: generalize JSON URL -> move to different package
                "sAjaxSource": getContextPath() + "/JSON/datatables/searchitemdetails",
                "fnInitComplete": function() {
                    // todo: pass id of div somehow
                    var table = this;
                    var wrapperDiv = table.parents('.dataTables_wrapper');
                    table.show();
                    $('div#ds-body:hidden').fadeIn('fast');
                    wrapperDiv.show();
                },
                "fnServerData": function ( sSource, aoData, fnCallback ) {
                    var tr = this.data('selected');
                    if(tr && tr.length > 0) {
                        var nb = $this.data('itemBag').fnGetPosition(tr[0]);
                        var res = $this.data('itemBag').fnGetData(nb);
                        var hdl = res[0];

                        tr.addClass('current-item');

                        aoData.push({ "name": "sSearch", "value": hdl });
                        $.ajax({
                            cache: false,
                            url: sSource,
                            type: 'POST',
                            dataType: 'json',
                            data: aoData,
                            success: function(json) {
                                json.title = json.title.substr(1, json.title.length - 2);
                                if (json.aaData != undefined) {
                                    var data = [];
                                    $.each(json.aaData, function() {
                                        data.push([this[0], this[1].substr(1, this[1].length - 2)]);
                                    });
                                    json.aaData = data;
                                }
                                $this.dialog('option', 'title', json.title);
                                fnCallback(json);
                            }
                        });
                    }
                }
            });
            return this;
        },


        /**
         * After the itembag has been redrawn
         * - clear the old selected row (if any)
         * - check if this was a paging operation, and if so, select the correct row
         * - update selected item details table
         */
        selectItemAfterPaging: function() {
            this.find('table').removeData('selected');
            var toSelect = this.data('toSelect');

            if(toSelect == "first") {
                var nodes = this.data('itemBag').fnGetNodes();
                if(nodes.length > 0) {
                    var tr = $(nodes[0]);
                    this.find('table').data('selected', tr);
                }
            }
            if(toSelect == "last") {
                var nodes = this.data('itemBag').fnGetNodes();
                if(nodes.length > 0) {
                    var tr = $(nodes[nodes.length - 1]);
                    this.find('table').data('selected', tr);
                }
            }
            this.inspector('updateItemDetailsTable');
            return this;
        },


        /**
         * Show item details for the given table row
         * @param obj
         *        dom child object of datatable row corresponding to item for which to show details
         */
        showItemDetails: function(obj) {
            this.inspector('selectItem',obj);
            this.dialog('open');
            return this;
        },

        /**
         * Select the item for the given table row
         * @param obj
         *        dom child object of datatable row corresponding to item for which to show details
         */
        selectItem: function(obj) {
            var tr = this.find('table').data('selected');
            if(tr && tr.length > 0) {
                tr.removeClass('current-item');
            }

            var newtr = $(obj).closest('tr');
            this.find('table').data('selected', newtr);

            this.find('table').dataTable().fnDraw();
            return this;
        },

        /**
         * Function to advance itemdetails display to next item from itembag
         */
        showNextItemDetails: function() {
            var tr = this.find('table').data('selected');
            var newtr;

            if(tr && tr.length > 0) {
                newtr = tr.next();
            } else {
                var nodes = this.data('itemBag').fnGetNodes();
                if(nodes.length > 0) {
                    newtr = $(nodes[0]);
                }
            }

            if(newtr && newtr.length > 0) {
                if(tr && tr.length > 0) {
                    tr.removeClass('current-item');
                }
                this.find('table').data('selected', newtr);
                this.find('table').dataTable().fnDraw();
            } else {
                // check if we need to do paging or are simply at the beginning
                var oSettings = this.data('itemBag').fnSettings();
                var remaining = oSettings._iRecordsTotal - oSettings._iDisplayStart - oSettings._iDisplayLength;
                if(remaining > 0) {
                    if(tr && tr.length > 0) {
                        tr.removeClass('current-item');
                    }
                    // need to do paging
                    this.data('toSelect', 'first');
                    this.data('itemBag').fnPageChange('next');
                }
            }
            return this;
        },

        /**
         * Function to change itemdetails display to previous item from itembag
         */
        showPrevItemDetails: function() {
            var tr = this.find('table').data('selected');
            var newtr;

            if(tr && tr.length > 0) {
                newtr = tr.prev();
            } else {
                var nodes = this.data('itemBag').fnGetNodes();
                if(nodes.length > 0) {
                    newtr = $(nodes[nodes.length - 1]);
                }
            }

            if(newtr && newtr.length > 0) {
                if(tr && tr.length > 0) {
                    tr.removeClass('current-item');
                }
                this.find('table').data('selected', newtr);
                this.find('table').dataTable().fnDraw();
            } else {
                // check if we need to do paging or are simply at the end
                var oSettings = this.data('itemBag').fnSettings();
                if(oSettings._iDisplayStart > 0) {
                    if(tr && tr.length > 0) {
                        tr.removeClass('current-item');
                    }
                    // need to do paging
                    this.data('toSelect', 'last');
                    this.data('itemBag').fnPageChange('previous');
                }
            }
            return this;
        },

        /**
         * Remove the item for which details are currently shown from the itembag
         * TODO: redraw of itembag removes current selected tr, current workaround: close details page
         *       decent fix: remember handle of item to select
         */
        removeCurrentItem: function() {
            //Only call the remove function, if there is an actual remove function
            if(typeof this.data('removeFromDataTable') == 'function'){
                // todo: function references
                var tr = this.find('table').data('selected');
                var nb = this.data('itemBag').fnGetPosition(tr[0]);
                var res = this.data('itemBag').fnGetData(nb);
                var hdl = res[0];
                this.data('removeFromDataTable')(hdl);
                return this;
            }
        },


        /**
         * Open/close the inspector dialog
         */
        toggleItemDetailsDialog: function() {
            if(this.dialog('isOpen')) {
                this.dialog('close');
            } else {
                var tr = this.find('table').data('selected');
                if(tr && tr.length > 0) {
                    this.dialog('open');
                }
            }
            return this;
        },
        /**
         * Close the inspector dialog (if it is open)
         */
        closeItemDetailsDialog: function() {
            if(this.dialog('isOpen')) {
                this.dialog('close');
            }
        }
    };

    function getContextPath() {
        return $('[name="contextpath"]').val();
    }


})(jQuery);