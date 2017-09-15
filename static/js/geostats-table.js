/**
 * Created by Bavo Van Geit
 * Date: 14/12/12
 * Time: 14:33
 */
var map;
var spinner;
(function ($) {

    var startFilter;
    var endFilter;
    var timefilter;


    $.fn.spin = function (opts, color) {
        var presets = {
            "tiny": {lines: 8, length: 2, width: 2, radius: 3},
            "small": {lines: 8, length: 4, width: 3, radius: 5},
            "large": {lines: 10, length: 8, width: 4, radius: 8}
        };
        if (Spinner) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data();

                if (data.spinner) {
                    data.spinner.stop();
                    delete data.spinner;
                }
                if (opts !== false) {
                    if (typeof opts === "string") {
                        if (opts in presets) {
                            opts = presets[opts];
                        } else {
                            opts = {};
                        }
                        if (color) {
                            opts.color = color;
                        }
                    }
                    data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
                }
            });
        } else {
            throw "Spinner class not available.";
        }
    };


    var TimeFilter = function (callback) {
        var $wrapper, $all, $prev, $current, isActive, ACTIVE_CLASS, _this;
        _this = this;

        $wrapper = $('#aspect_statistics_MostPopularItems_field_timeFilter');
        $all = $('option[value="#all"]', $wrapper);
        $prev = $('option[value="#prev"]', $wrapper);
        $current = $('option[value="#current"]', $wrapper);

        isActive = function (jqobj) {
            return jqobj.is(':selected');
        };

        $($wrapper).change(function () {
            if (typeof callback === "function") {
                callback(_this);
            }
            return false;
        });

        this.isPrevious = function () {
            return isActive($prev);
        };

        this.isCurrent = function () {
            return isActive($current);
        };

        this.isActive = function () {
            return !isActive($all);
        };

        this.getStartDate = function () {
            var d = new Date();
            d.setDate(1);
            if (isActive($prev)) {
                d.setMonth(d.getMonth() - 1);
                return d;
            }
            else if (isActive($current)) {
                return d;
            }
            return null;
        };

        this.getEndDate = function () {
            var d = new Date();
            d.setDate(1);
            if (isActive($prev)) {
                return d;
            }
            else if (isActive($current)) {
                d.setMonth(d.getMonth() + 1);
                return d;
            }
            return null;
        };
    };
    timefilter = new TimeFilter(function () {
        loadTable();
    });
    $(function () {
        var table = $('#aspect_statistics_MostPopularItems_table_statable');

        //IE sucks
        $('th.sortable').each(function () {
            var $this;
            $this = $(this);
            $this.html('<span class="sortable_label">' + $this.text() + '</span><span class="toggleArrowSpacer expanded">&nbsp;</span></td></tr></tbody></table>')
        });
        $('th.sortable.downloads .toggleArrowSpacer', table)
            .removeClass('toggleArrowSpacer')
            .addClass('toggleArrow');

        $('th.sortable', table).click(function () {
            var $this = $(this);
            if ($('.toggleArrow', $this).length > 0) {
                return;
            }
            $('.toggleArrow', table)
                .removeClass('toggleArrow')
                .addClass('toggleArrowSpacer');
            $('.toggleArrowSpacer', $this)
                .removeClass('toggleArrowSpacer')
                .addClass('toggleArrow');
            loadTable();
        });

        //table
        $('#aspect_statistics_MostPopularItems_field_nbitems').change(loadTable);
        $('#aspect_statistics_MostPopularItems_field_collection').change(loadTable);
        $('#aspect_statistics_MostPopularItems_field_geo').change(loadTable);
        $('#aspect_statistics_MostPopularItems_field_newCountryCode').change(function () {
            $('h1.ds-div-head').text($('#aspect_statistics_MostPopularItems_field_newCountryCode').find('option:selected').text()
            + ':' + $('h1.ds-div-head').text().split(':').pop());
            loadTable();
        });
        loadTable();


    });
    var fallback = false;
    var originalText;

    function loadTable() {
        var start = null;
        var end = null;
        var table = $('#aspect_statistics_MostPopularItems_table_statable');
        var bycountry = $('input#aspect_statistics_MostPopularItems_field_bycountry').val();
        if (bycountry === undefined) {
            bycountry = "";
        }
        var country = $('#aspect_statistics_MostPopularItems_field_newCountryCode').val()
        if (country === undefined) {
            country = "";
        }
        if (timefilter.getStartDate() != null) {
            start = (timefilter.getStartDate().getMonth() + 1) + '/' + timefilter.getStartDate().getFullYear().toString();
        }
        if (timefilter.getEndDate() != null) {
            end = (timefilter.getEndDate().getMonth() + 1) + '/' + timefilter.getEndDate().getFullYear().toString();
        }

        $.ajax(window.DSpace.context_path + '/JSON/cua/geo-stat-ajax', {

                type: 'POST',
                dataType: 'json',
                data: {
                    nbitems: $('#aspect_statistics_MostPopularItems_field_nbitems').val(),
                    collection: $('#aspect_statistics_MostPopularItems_field_collection').val(),
                    geo: $('#aspect_statistics_MostPopularItems_field_geo').val(),
                    timefilter: $('#aspect_statistics_MostPopularItems_field_timeFilter').val(),
                    time_filter_start_date: start,
                    time_filter_end_date: end,
                    bycountry: bycountry,
                    country: country,
                    sort_by: $('.toggleArrow', table).closest('th.sortable').index() - 1
                },
                success: function (data) {
                    $('.count-data').remove();
                    table.addClass('hidden');
                    $('.total_row').addClass("hidden");

                    var proto = $('.count-data-proto');
                    var nores = $('#aspect_statistics_MostPopularItems_div_error');
                    var warn = $('#aspect_statistics_MostPopularItems_div_warning');
                    nores.addClass("hidden");
                    if (!fallback) {
                        $('p', warn).hide();
                    }
                    if (data == null || data.results.length == 0) {


                        $('.coms', nores);
                        nores.removeClass("hidden");
                        var current = $('.toggleArrow', table);
                        if (!fallback) {
                            if (current.closest('th.sortable').hasClass('downloads')) {
                                $('.items', table).click();
                                $('.downloads', warn).slideDown().delay(10000).slideUp();
                            } else if (current.closest('th.sortable').hasClass('items')) {
                                $('.downloads', table).click();
                                $('.items', warn).slideDown().delay(10000).slideUp();
                            }
                            fallback = true;
                            current.removeClass("sortable");

                        } else {
                            $('p', warn).hide();
                            fallback = false;
                        }


                    } else {

                        fallback = false;

                        $.each(data.results, function (i, item) {
                            var row = proto.clone();
                            $('.itemname a', row).text(item.itemName);
                            $('.itemname a', row).attr("href", item.handle);
                            $.each(item.count, function (j, res) {
                                $('.count-' + j, row).text(res);
                            });

                            row.removeClass("count-data-proto");
                            row.addClass("count-data");
                            row.removeClass("hidden");
                            $('#aspect_statistics_MostPopularItems_table_statable').append(row);

                        });


                        $.each(data.total, function (i, res) {
                            var succ = $('#aspect_statistics_MostPopularItems_p_total-row-' + i);
                            $('span', succ).text(res);
                            succ.removeClass('hidden');

                        });
                        table.removeClass('hidden');
                    }
                    matchHeights();

                }

            }
        );
    }

    function processLayerChange(id) {
        map.removeLayer(0);
        map.addLayer({
            source: 'finder:' + id,
            title: 'Item views by country',
            type: 'FinderData',
            visible: true,
            styles: {
                type: 'GRADUATED',
                icon: {
                    //color: '0x9B2D29',
                    symbol: 'propCircle',
                    size: '1',
                    gradSize: '1',
                    classificationType: 'equal_interval',
                    categories: '7',
                    selectedAttribute: 'count',
                    opacity: 0.75


                },
                fill: {
                    //color: '0x9B2D29' ,
                    opacity: 0.75
                },
                stroke: {
                    weight: '1'
                }


            }

        });
    }
})(jQuery);




