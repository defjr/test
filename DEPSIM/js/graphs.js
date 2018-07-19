var tflabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
var prepped1 = 0;
var prepped2 = 0;

function prepGraphsForPrint() {

    if ($('#graphtabs .ui-tabs-selected').index() == 0) {
        if (prepped1 == 0) {
            var canvas1 = document.getElementById("chartAWLGR_IBN");
            var img1    = canvas1.toDataURL("image/png");
            var canvas2 = document.getElementById("chartAWLGR_TBN");
            var img2    = canvas2.toDataURL("image/png");
            var canvas3 = document.getElementById("chartAWLGR_RCV");
            var img3    = canvas3.toDataURL("image/png");
            var canvas4 = document.getElementById("chartAWLGR_IBK");
            var img4    = canvas4.toDataURL("image/png");
            var canvas5 = document.getElementById("chartAWLGR_TBK");
            var img5    = canvas5.toDataURL("image/png");
            var canvas6 = document.getElementById("chartAWLGR_INV");
            var img6    = canvas6.toDataURL("image/png");
            $("#graphs_one_hide").hide();
            $("#graphs_two_hide").hide();
            document.getElementById('chartAWLGR_IBN_img').innerHTML = "<img src='" + img1 + "'>";
            document.getElementById('chartAWLGR_TBN_img').innerHTML = "<img src='" + img2 + "'>";
            document.getElementById('chartAWLGR_RCV_img').innerHTML = "<img src='" + img3 + "'>";
            document.getElementById('chartAWLGR_IBK_img').innerHTML = "<img src='" + img4 + "'>";
            document.getElementById('chartAWLGR_TBK_img').innerHTML = "<img src='" + img5 + "'>";
            document.getElementById('chartAWLGR_INV_img').innerHTML = "<img src='" + img6 + "'>";
            prepped1 = 1;
        }
    }

    if ($('#graphtabs .ui-tabs-selected').index() == 1) {
        if (prepped2 == 0) {
            var canvas7 = document.getElementById("chartTBPGR_BSR");
            var img7    = canvas7.toDataURL("image/png");
            var canvas8 = document.getElementById("chartTBPGR_UC");
            var img8    = canvas8.toDataURL("image/png");
            var canvas9 = document.getElementById("chartTBPGR_WF");
            var img9    = canvas9.toDataURL("image/png");
            var canvas10 = document.getElementById("chartTBPGR_Score");
            var img10    = canvas10.toDataURL("image/png");
            $("#graphs_one_show").show();
            $("#graphs_two_show").show();
            document.getElementById('chartTBPGR_BSR_img').innerHTML = "<img src='" + img7 + "'>";
            document.getElementById('chartTBPGR_UC_img').innerHTML = "<img src='" + img8 + "'>";
            document.getElementById('chartTBPGR_WF_img').innerHTML = "<img src='" + img9 + "'>";
            document.getElementById('chartTBPGR_Score_img').innerHTML = "<img src='" + img10 + "'>";
            prepped2 = 1;
        }
    }
}

function populateGraphs() {

    //populate the entire table with DWL values
    for (var t = 1; t <= 12; t++) {
        document.getElementById('reportTBPGR_ActlSpent_TF' + t).innerHTML = formatter.format(reportSpentActual[t - 1]);
        document.getElementById('reportTBPGR_ProjSpent_TF' + t).innerHTML = formatter.format(reportSpentProjected[t - 1]);
        document.getElementById('reportTBPGR_AvgUC_TF' + t).innerHTML = formatter.format(reportAverageUnitCost[t - 1]);
        document.getElementById('reportTBPGR_StdUC_TF' + t).innerHTML = formatter.format(costParamsStandardUnitCost);
        document.getElementById('reportTBPGR_ActlWF_TF' + t).innerHTML = reportActualWorkforce[t - 1];
        document.getElementById('reportTBPGR_WFClg_TF' + t).innerHTML = simParamsWorkforceCeiling;
        document.getElementById('reportTBPGR_CurrScore_TF' + t).innerHTML = parseFloat(reportCurrentScore[t - 1]).toFixed(2);
        document.getElementById('reportTBPGR_ProjScore_TF' + t).innerHTML = parseFloat(reportProjectedScore[t - 1]).toFixed(2);
        for (var i = 0; i < jobs.length; i++) {
            document.getElementById('reportAWLGR_' + jobs[i] + '_TF' + t).innerHTML = window['simWLD' + simParamsUserWorkloadOption + jobs[i] + t];
        }
    }

    for (var i = 0; i < jobs.length; i++) {
        document.getElementById('reportFWLA_AWFmin_' + jobs[i]).innerHTML = get_adjusted_workforce_min(jobs[i]);
        document.getElementById('reportFWLA_AWFmax_' + jobs[i]).innerHTML = get_adjusted_workforce_max(jobs[i]);
        document.getElementById('reportFWLA_AWFfinal_' + jobs[i]).innerHTML = get_adjusted_workforce_final(jobs[i]);
        document.getElementById('reportFWLA_OTmin_' + jobs[i]).innerHTML = get_overtime_min(jobs[i]);
        document.getElementById('reportFWLA_OTmax_' + jobs[i]).innerHTML = get_overtime_max(jobs[i]);
        document.getElementById('reportFWLA_OTavg_' + jobs[i]).innerHTML = get_overtime_avg(jobs[i]);
        document.getElementById('reportFWLA_TWLavl_' + jobs[i]).innerHTML = get_total_workload_available(jobs[i]);
        document.getElementById('reportFWLA_TWLacc_' + jobs[i]).innerHTML = get_total_workload_accomplished(jobs[i]);
        document.getElementById('reportFWLA_TLL_' + jobs[i]).innerHTML = get_total_late_lines(jobs[i]);
        document.getElementById('reportFWLA_OnTime_' + jobs[i]).innerHTML = parseFloat(get_cumulative_ontime(jobs[i])).toFixed(2);

        document.getElementById('reportFCR_C4P_' + jobs[i]).innerHTML = formatter.format(get_cost_for_personnel(jobs[i]));
        document.getElementById('reportFCR_C4O_' + jobs[i]).innerHTML = formatter.format(get_cost_for_overtime(jobs[i]));
        document.getElementById('reportFCR_C4H_' + jobs[i]).innerHTML = formatter.format(get_cost_for_hiring(jobs[i]));
        document.getElementById('reportFCR_C4E_' + jobs[i]).innerHTML = formatter.format(get_cost_for_equipment(jobs[i]));
        document.getElementById('reportFCR_OpC_' + jobs[i]).innerHTML = formatter.format(get_cost_for_operations(jobs[i]));
    }
    document.getElementById('reportFWLA_AWFfinal_Total').innerHTML = get_adjusted_workforce_final_total();
    document.getElementById('reportFWLA_TWLavl_Total').innerHTML = get_total_workload_available_total();
    document.getElementById('reportFWLA_TWLacc_Total').innerHTML = get_total_workload_accomplished_total();
    document.getElementById('reportFWLA_TLL_Total').innerHTML = get_total_late_lines_total();
    document.getElementById('reportFWLA_OnTime_Total').innerHTML = parseFloat(get_cumulative_ontime_total()).toFixed(2);
    document.getElementById('reportFWLA_TotalTFs').innerHTML = currentTimeframe;

    document.getElementById('reportFCR_C4P_Total').innerHTML = formatter.format(get_cost_for_personnel_total());
    document.getElementById('reportFCR_C4O_Total').innerHTML = formatter.format(get_cost_for_overtime_total());
    document.getElementById('reportFCR_C4H_Total').innerHTML = formatter.format(get_cost_for_hiring_total());
    document.getElementById('reportFCR_C4E_Total').innerHTML = formatter.format(get_cost_for_equipment_total());
    document.getElementById('reportFCR_OpC_Total').innerHTML = formatter.format(get_cost_for_operations_total());
    document.getElementById('reportFCR_OntimePerf').innerHTML = parseFloat(score_ontime()).toFixed(2);
    document.getElementById('reportFCR_UnitCostScore').innerHTML = parseFloat(score_unitcost()).toFixed(2);
    document.getElementById('reportFCR_BudgetScore').innerHTML = parseFloat(score_budget()).toFixed(2);
    document.getElementById('reportFCR_BacklogPerf').innerHTML = parseFloat(score_backlog()).toFixed(2);
    document.getElementById('reportFCR_CompPoints').innerHTML = parseFloat(score_tfs()).toFixed(2);
    document.getElementById('reportFCR_BacklogWorkload').innerHTML = parseFloat(score_backlog_workload()).toFixed(2);
    document.getElementById('reportFCR_UnitCostBonus').innerHTML = parseFloat(score_unitcost_bonus()).toFixed(2);
    document.getElementById('reportFCR_GroupScore').innerHTML = parseFloat(get_tf_score()).toFixed(2);
    document.getElementById('reportFCR_OperationsCost').innerHTML = formatter.format(get_cost_for_operations_total());
    document.getElementById('reportFCR_SpaceUtilCost').innerHTML = formatter.format(get_space_util_cost_final());
    document.getElementById('reportFCR_TotalCost').innerHTML = formatter.format(get_cost_for_operations_total() + get_space_util_cost_final());
    document.getElementById('reportFCR_UnitCost').innerHTML = formatter.format(get_average_unit_cost());
    document.getElementById('reportFCR_FinalWorkforce').innerHTML = document.getElementById('reportAWL_WF_Total').innerHTML;
    document.getElementById('reportFCR_TFsComplete').innerHTML = currentTimeframe;


    //hide unnecessary rows
    if (simParamsTimeframes == 6) {
        $('.graphrow7').hide();
        $('.graphrow8').hide();
        $('.graphrow9').hide();
        $('.graphrow10').hide();
        $('.graphrow11').hide();
        $('.graphrow12').hide();
    }
    if (simParamsTimeframes == 8) {
        $('.graphrow9').hide();
        $('.graphrow10').hide();
        $('.graphrow11').hide();
        $('.graphrow12').hide();
    }
    if (simParamsTimeframes == 10) {
        $('.graphrow11').hide();
        $('.graphrow12').hide();
    }
    //BUILD GRAPHS
    //IBN GRAPH
    var barChartDataIBN = {
        labels: window.tflabels.slice(0,simParamsTimeframes),
        datasets: [{
            label: 'IBN3',
            backgroundColor: window.chartColors.blue,
            data: [window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 1],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 2],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 3],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 4],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 5],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 6],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 7],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 8],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 9],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 10],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 11],window['simWLD' + simParamsUserWorkloadOption + 'IBN3' + 12]]
        }, {
            label: 'IBN2',
            backgroundColor: window.chartColors.red,
            data: [window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 1],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 2],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 3],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 4],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 5],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 6],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 7],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 8],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 9],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 10],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 11],window['simWLD' + simParamsUserWorkloadOption + 'IBN2' + 12]]
        }, {
            label: 'IBN1',
            backgroundColor: window.chartColors.yellow,
            data: [window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 1],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 2],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 3],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 4],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 5],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 6],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 7],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 8],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 9],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 10],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 11],window['simWLD' + simParamsUserWorkloadOption + 'IBN1' + 12]]
        }]
    };

    var ctxchartAWLGR_IBN = document.getElementById("chartAWLGR_IBN").getContext("2d");
    window.myBarIBN = new Chart(ctxchartAWLGR_IBN, {
        type: 'bar',
        data: barChartDataIBN,
        options: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title:{
                display:true,
                text:"Bin Issue Workload"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    window.myBarIBN.data.datasets[0].data = window.myBarIBN.data.datasets[0].data.slice(0,simParamsTimeframes);
    window.myBarIBN.data.datasets[1].data = window.myBarIBN.data.datasets[1].data.slice(0,simParamsTimeframes);
    window.myBarIBN.data.datasets[2].data = window.myBarIBN.data.datasets[2].data.slice(0,simParamsTimeframes);
    window.myBarIBN.update();


//TBN GRAPH
    var barChartDataTBN = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'TBN3',
                backgroundColor: window.chartColors.blue,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 1],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 2],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 3],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 4],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 5],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 6],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 7],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 8],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 9],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 10],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 11],window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + 12]]
            }, {
                label: 'TBN2',
                backgroundColor: window.chartColors.red,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 1],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 2],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 3],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 4],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 5],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 6],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 7],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 8],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 9],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 10],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 11],window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + 12]]
            }, {
                label: 'TBN1',
                backgroundColor: window.chartColors.yellow,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 1],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 2],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 3],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 4],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 5],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 6],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 7],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 8],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 9],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 10],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 11],window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + 12]]
            }]
    };

    var ctxchartAWLGR_TBN = document.getElementById("chartAWLGR_TBN").getContext("2d");
    window.myBarTBN = new Chart(ctxchartAWLGR_TBN, {
        type: 'bar',
        data: barChartDataTBN,
        options: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title:{
                display:true,
                text:"Bin Transportation Workload"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    window.myBarTBN.data.datasets[0].data = window.myBarTBN.data.datasets[0].data.slice(0,simParamsTimeframes);
    window.myBarTBN.data.datasets[1].data = window.myBarTBN.data.datasets[1].data.slice(0,simParamsTimeframes);
    window.myBarTBN.data.datasets[2].data = window.myBarTBN.data.datasets[2].data.slice(0,simParamsTimeframes);
    window.myBarTBN.update();

//RCV GRAPH
    var barChartDataRCV = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'RBKR',
                backgroundColor: window.chartColors.blue,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 1],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 2],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 3],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 4],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 5],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 6],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 7],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 8],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 9],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 10],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 11],window['simWLD' + simParamsUserWorkloadOption + 'RBKR' + 12]]
            }, {
                label: 'RBNR',
                backgroundColor: window.chartColors.red,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 1],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 2],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 3],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 4],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 5],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 6],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 7],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 8],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 9],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 10],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 11],window['simWLD' + simParamsUserWorkloadOption + 'RBNR' + 12]]
            }, {
                label: 'RBKP',
                backgroundColor: window.chartColors.yellow,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 1],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 2],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 3],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 4],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 5],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 6],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 7],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 8],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 9],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 10],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 11],window['simWLD' + simParamsUserWorkloadOption + 'RBKP' + 12]]
            }, {
                label: 'RBNP',
                backgroundColor: window.chartColors.green,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 1],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 2],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 3],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 4],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 5],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 6],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 7],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 8],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 9],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 10],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 11],window['simWLD' + simParamsUserWorkloadOption + 'RBNP' + 12]]
            }]
    };

    var ctxchartAWLGR_RCV = document.getElementById("chartAWLGR_RCV").getContext("2d");
    window.myBarRCV = new Chart(ctxchartAWLGR_RCV, {
        type: 'bar',
        data: barChartDataRCV,
        options: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title:{
                display:true,
                text:"Receiving Workload"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    window.myBarRCV.data.datasets[0].data = window.myBarRCV.data.datasets[0].data.slice(0,simParamsTimeframes);
    window.myBarRCV.data.datasets[1].data = window.myBarRCV.data.datasets[1].data.slice(0,simParamsTimeframes);
    window.myBarRCV.data.datasets[2].data = window.myBarRCV.data.datasets[2].data.slice(0,simParamsTimeframes);
    window.myBarRCV.data.datasets[3].data = window.myBarRCV.data.datasets[3].data.slice(0,simParamsTimeframes);
    window.myBarRCV.update();

//IBK GRAPH
    var barChartDataIBK = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'IBK3',
                backgroundColor: window.chartColors.blue,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 1],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 2],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 3],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 4],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 5],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 6],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 7],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 8],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 9],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 10],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 11],window['simWLD' + simParamsUserWorkloadOption + 'IBK3' + 12]]
            }, {
                label: 'IBK2',
                backgroundColor: window.chartColors.red,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 1],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 2],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 3],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 4],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 5],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 6],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 7],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 8],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 9],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 10],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 11],window['simWLD' + simParamsUserWorkloadOption + 'IBK2' + 12]]
            }, {
                label: 'IBK1',
                backgroundColor: window.chartColors.yellow,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 1],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 2],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 3],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 4],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 5],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 6],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 7],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 8],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 9],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 10],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 11],window['simWLD' + simParamsUserWorkloadOption + 'IBK1' + 12]]
            }]
    };

    var ctxchartAWLGR_IBK = document.getElementById("chartAWLGR_IBK").getContext("2d");
    window.myBarIBK = new Chart(ctxchartAWLGR_IBK, {
        type: 'bar',
        data: barChartDataIBK,
        options: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title:{
                display:true,
                text:"Bulk Issue Workload"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    window.myBarIBK.data.datasets[0].data = window.myBarIBK.data.datasets[0].data.slice(0,simParamsTimeframes);
    window.myBarIBK.data.datasets[1].data = window.myBarIBK.data.datasets[1].data.slice(0,simParamsTimeframes);
    window.myBarIBK.data.datasets[2].data = window.myBarIBK.data.datasets[2].data.slice(0,simParamsTimeframes);
    window.myBarIBK.update();

//TBK GRAPH
    var barChartDataTBK = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'TBK3',
                backgroundColor: window.chartColors.blue,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 1],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 2],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 3],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 4],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 5],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 6],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 7],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 8],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 9],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 10],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 11],window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + 12]]
            }, {
                label: 'TBK2',
                backgroundColor: window.chartColors.red,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 1],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 2],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 3],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 4],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 5],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 6],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 7],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 8],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 9],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 10],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 11],window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + 12]]
            }, {
                label: 'TBK1',
                backgroundColor: window.chartColors.yellow,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 1],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 2],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 3],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 4],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 5],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 6],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 7],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 8],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 9],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 10],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 11],window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + 12]]
            }]
    };

    var ctxchartAWLGR_TBK = document.getElementById("chartAWLGR_TBK").getContext("2d");
    window.myBarTBK = new Chart(ctxchartAWLGR_TBK, {
        type: 'bar',
        data: barChartDataTBK,
        options: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title:{
                display:true,
                text:"Bulk Transportation Workload"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    window.myBarTBK.data.datasets[0].data = window.myBarTBK.data.datasets[0].data.slice(0,simParamsTimeframes);
    window.myBarTBK.data.datasets[1].data = window.myBarTBK.data.datasets[1].data.slice(0,simParamsTimeframes);
    window.myBarTBK.data.datasets[2].data = window.myBarTBK.data.datasets[2].data.slice(0,simParamsTimeframes);
    window.myBarTBK.update();

//INV GRAPH
    var barChartDataINV = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'SLS',
                backgroundColor: window.chartColors.blue,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 1],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 2],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 3],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 4],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 5],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 6],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 7],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 8],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 9],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 10],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 11],window['simWLD' + simParamsUserWorkloadOption + 'SLS' + 12]]
            }, {
                label: 'INV',
                backgroundColor: window.chartColors.red,
                data: [window['simWLD' + simParamsUserWorkloadOption + 'INV' + 1],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 2],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 3],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 4],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 5],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 6],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 7],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 8],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 9],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 10],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 11],window['simWLD' + simParamsUserWorkloadOption + 'INV' + 12]]
            }]
    };

    var ctxchartAWLGR_INV = document.getElementById("chartAWLGR_INV").getContext("2d");
    window.myBarINV = new Chart(ctxchartAWLGR_INV, {
        type: 'bar',
        data: barChartDataINV,
        options: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title:{
                display:true,
                text:"Inventory Management Workload"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    window.myBarINV.data.datasets[0].data = window.myBarINV.data.datasets[0].data.slice(0,simParamsTimeframes);
    window.myBarINV.data.datasets[1].data = window.myBarINV.data.datasets[1].data.slice(0,simParamsTimeframes);
    window.myBarINV.update();

//BUDGET GRAPH
    var barChartDataBSR = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'Actual',
                pointStyle: 'rect',
                fill: false,
                backgroundColor: window.chartColors.blue,
                data: [reportSpentActual[0],reportSpentActual[1],reportSpentActual[2],reportSpentActual[3],reportSpentActual[4],reportSpentActual[5],reportSpentActual[6],reportSpentActual[7],reportSpentActual[8],reportSpentActual[9],reportSpentActual[10],reportSpentActual[11]]
            }, {
                label: 'Projected',
                pointStyle: 'triangle',
                fill: false,
                backgroundColor: window.chartColors.red,
                data: [reportSpentProjected[0],reportSpentProjected[1],reportSpentProjected[2],reportSpentProjected[3],reportSpentProjected[4],reportSpentProjected[5],reportSpentProjected[6],reportSpentProjected[7],reportSpentProjected[8],reportSpentProjected[9],reportSpentProjected[10],reportSpentProjected[11]]
            }]
    };

    var ctxchartTBPGR_BSR = document.getElementById("chartTBPGR_BSR").getContext("2d");
    window.myBarBSR = new Chart(ctxchartTBPGR_BSR, {
        type: 'line',
        data: barChartDataBSR,
        options: {
            legend: {
                display:false,
                labels: {
                    boxWidth: 20
                },
                position: 'left'
            },
            title:{
                display:true,
                text:"Budget Spending Rate"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Timeframe'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Budget'
                    }
                }]
            }
        }
    });
    window.myBarBSR.update();


//UNIT COST GRAPH
    var barChartDataUC = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'Average',
                backgroundColor: window.chartColors.blue,
                data: [reportAverageUnitCost[0],reportAverageUnitCost[1],reportAverageUnitCost[2],reportAverageUnitCost[3],reportAverageUnitCost[4],reportAverageUnitCost[5],reportAverageUnitCost[6],reportAverageUnitCost[7],reportAverageUnitCost[8],reportAverageUnitCost[9],reportAverageUnitCost[10],reportAverageUnitCost[11]]
            }, {
                label: 'Standard',
                backgroundColor: window.chartColors.red,
                data: [18.0,18.0,18.0,18.0,18.0,18.0,18.0,18.0,18.0,18.0,18.0,18.0]
            }]
    };

    var ctxchartTBPGR_UC = document.getElementById("chartTBPGR_UC").getContext("2d");
    window.myBarUC = new Chart(ctxchartTBPGR_UC, {
        type: 'bar',
        data: barChartDataUC,
        options: {
            legend: {
                display:false,
                labels: {
                    boxWidth: 20
                },
                position: 'left'
            },
            title:{
                display:true,
                text:"Unit Cost"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: false,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });
    window.myBarUC.update();

//WORKFORCE GRAPH
    var barChartDataWF = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'Actual',
                backgroundColor: window.chartColors.blue,
                data: [reportActualWorkforce[0],reportActualWorkforce[1],reportActualWorkforce[2],reportActualWorkforce[3],reportActualWorkforce[4],reportActualWorkforce[5],reportActualWorkforce[6],reportActualWorkforce[7],reportActualWorkforce[8],reportActualWorkforce[9],reportActualWorkforce[10],reportActualWorkforce[11]]
            }, {
                label: 'Ceiling',
                backgroundColor: window.chartColors.red,
                data: [293,293,293,293,293,293,293,293,293,293,293,293]
            }]
    };

    var ctxchartTBPGR_WF = document.getElementById("chartTBPGR_WF").getContext("2d");
    window.myBarWF = new Chart(ctxchartTBPGR_WF, {
        type: 'bar',
        data: barChartDataWF,
        options: {
            legend: {
                display:false,
                labels: {
                    boxWidth: 20
                },
                position: 'left'
            },
            title:{
                display:true,
                text:"Workforce"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: false,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        min: 200
                    }
                }]
            }
        }
    });
    window.myBarWF.update();

//SCORE GRAPH
    var barChartDataScore = {
            labels: window.tflabels.slice(0,simParamsTimeframes),
            datasets: [{
                label: 'Current',
                backgroundColor: window.chartColors.blue,
                data: [reportCurrentScore[0],reportCurrentScore[1],reportCurrentScore[2],reportCurrentScore[3],reportCurrentScore[4],reportCurrentScore[5],reportCurrentScore[6],reportCurrentScore[7],reportCurrentScore[8],reportCurrentScore[9],reportCurrentScore[10],reportCurrentScore[11]]
            }, {
                label: 'Projected',
                backgroundColor: window.chartColors.red,
                data: [reportProjectedScore[0],reportProjectedScore[1],reportProjectedScore[2],reportProjectedScore[3],reportProjectedScore[4],reportProjectedScore[5],reportProjectedScore[6],reportProjectedScore[7],reportProjectedScore[8],reportProjectedScore[9],reportProjectedScore[10],reportProjectedScore[11]]
            }]
    };

    var ctxchartTBPGR_Score = document.getElementById("chartTBPGR_Score").getContext("2d");
    window.myBarScore = new Chart(ctxchartTBPGR_Score, {
        type: 'bar',
        data: barChartDataScore,
        options: {
            legend: {
                display:false,
                labels: {
                    boxWidth: 20
                },
                position: 'left'
            },
            title:{
                display:true,
                text:"Score"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: false,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });
    window.myBarScore.update();

}