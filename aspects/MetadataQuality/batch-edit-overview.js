//Global namespace object
atmire = {
    i18n: {}
};

(function($) {


    $(document).ready(function () {

        var taskTable = $('#aspect_metadataquality_batchedit_BatchEditOverviewTransformer_table_tasktable');

        taskTable.dataTable({
            "aoColumns":[
                {   // id
                    "bSortable":false,
                    "bSearchable":false
                },
                {   // Title
                    "bSortable":false,
                    "sWidth":"30%"
                },
                {   // Created by
                    "bSortable":false,
                    "sWidth":"20%"
                },
                {   // Creation Date
                    "bSortable":false,
                    "sWidth":"20%"
                },
                {   // Progress
                    "bSortable":false,
                    "sWidth":"20%"
                },
                {   // Trashcan
                    "bSortable":false,
                    "sWidth":"5%"
                }
            ],
            "oLanguage":{
                "sInfo":atmire.i18n.OverviewTasksInfo,
                "sInfoEmpty":atmire.i18n.OverviewTasksEmpty,
                "sInfoFiltered":atmire.i18n.OverviewTasksFilter,
                "sLengthMenu":atmire.i18n.OverviewTasksMenu,
                "sZeroRecords":atmire.i18n.OverviewNoTasksSelected
            },
            "bAutoWidth":false,
            "bJQueryUI":true,
            "bProcessing":true,
            "bSort":true,
            "bPaginate":false,
            "bFilter":false,
            "bServerSide":false,
            "bInfo":false,
            "sDom":'<"H"lf>rt<"F"ip>',
            "fnInitComplete":function () {
                var table = $('table#aspect_metadataquality_batchedit_BatchEditOverviewTransformer_table_tasktable');

                table.show();
                table.parents('.dataTables_wrapper').fadeIn("fast");
            }
        });

        createIconButtonFormSubmit("start");
        createIconButtonFormSubmit("stop");
        createIconButtonFormSubmit("new");
        createIconButtonFormSubmit("trash");
    });

    function createIconButtonFormSubmit(id)
    {
        $('div[id=' + id + ']').click(function(){

            //Only allow submit if this button isn't disabled
            if(0 == $(this).find('span.toolbar-button-disabled').length)
            {
                //Show processing on the datatable
                $('div#aspect_metadataquality_batchedit_BatchEditOverviewTransformer_table_tasktable_processing').css('visibility', 'visible');
                //Disable all the buttons so we cannot repress anything !
                disableToolBarButtons();
                $(this).parent().submit();
            }
        });

    }

    function disableToolBarButtons(){
        var toolBarButtons = $('div#aspect_metadataquality_batchedit_BatchEditOverviewTransformer_div_Primera_Division').find('div.toolbar-button');
        toolBarButtons.addClass('toolbar-button-disabled');
        //Also remove the onclick action
        toolBarButtons.unbind('click');
    }

})(jQuery);