$(function () {



    // Accordion
    $(".accordion").accordion({ header: "h3" });

    // Tabs
    $('#tabs').tabs();

    // Dialog			
    $('#dialog').dialog({
        autoOpen: false,
        width: 600,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        },
        modal: true
    });

    // Dialog Link
    $('#dialog_link').button().click(function () {
        $('#dialog').dialog('open');
        return false;
    });

    // Datepicker
    $('#datepicker').datepicker().children().show();

    // Horizontal Slider
    $('#horizSlider').slider({
        range: true,
        values: [17, 67]
    }).width(500);

    // Vertical Slider				
    $("#eq > span").each(function () {
        var value = parseInt($(this).text());
        $(this).empty().slider({
            value: value,
            range: "min",
            animate: true,
            orientation: "vertical"
        });
    });

    //hover states on the static widgets
    $('#dialog_link, ul#icons li').hover(
        function () { $(this).addClass('ui-state-hover'); },
        function () { $(this).removeClass('ui-state-hover'); }
    );

    // Button
    $("#divButton, #linkButton, #submitButton, #inputButton").button();

    // Icon Buttons
    $("#leftIconButton").button({
        icons: {
            primary: 'ui-icon-wrench'
        }
    });

    $("#bothIconButton").button({
        icons: {
            primary: 'ui-icon-wrench',
            secondary: 'ui-icon-triangle-1-s'
        }
    });

    // Button Set

    $(".button").button();
    $(".button-icon").button({
        icon: "ui-icon-gear",
        showLabel: false
    });


});