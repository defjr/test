var sPrefix = "";

function depsim_login(user,p) {
	$('#overlayLoading').fadeIn('fast', function () {
		//WRAPPED FUNCTION IN FADEIN/OUT
	if (eye_sweep(user,p)) {
		myuser = user;
		if (user == "INSTRUCT") {
			//pageLayout.addPane('west');
			$( "#content-login" ).hide();
			$( "#content-welcome" ).show ();
			$( "#nav-instructor" ).show ();
			check_scenario();
			load_initial_backlog();
			load_user_groups();
		} else {
			$("#inputReport").hide();
			$("#inputCheck").hide();
			pageLayout.removePane('north');
			$( "#content-login" ).hide();
			$( "#nav-student" ).show ();
			currentTimeframe = $.jStorage.get(myuser + 'currentTimeframe',1);
			//update TF spans
			$('.tfspan').text(" - TF #" + currentTimeframe);
			$('.tfspanNumber').text("TF #" + currentTimeframe);
			$('.groupspan').text(user);
			$('.equipmentDT').text(simParamsEquipDowntimePercent);
			//equipmentDT
			for (var rr = 1; rr <= 12; rr++) {
				$('.reserve' + rr).hide();
			}
			$('.reserve' + simParamsReserveUnitTimeframe).show();
			currentTest = 1;
			check_scenario();
			document.getElementById('maxTests').innerHTML = simParamsTestOption;
			clear_test_backlogs();
			if (scenarioSet == 1) {
				sPrefix = "";
				$( "#content-student-welcome" ).show ();
				if (scenarioType == "M" || scenarioType == "Military") {
					sPrefix += "m";
				} else {
					sPrefix += "c";
				}
				if (scenarioVersion == "C" || scenarioVersion == "Computer") {
					sPrefix += "c";
				} else {
					sPrefix += "t";
				}
				switch (scenarioLength) {
					case "6":
					case 6:
						sPrefix += "06";
						break;
					case "8":
					case 8:
						sPrefix += "08";
						break;
					case "10":
					case 10:
						sPrefix += "10";
						break;
					case "12":
					case 12:
						sPrefix += "12";
						break;
					default:
						sPrefix += "06";
						break;
				}
	            console.log('get scenario prefix: ' + sPrefix);
				denialsMessageShown = $.jStorage.get(myuser + 'denialsMessageShown', 0);
				if (denialsMessageShown == 1) {
					$('.denialsMessage').show();
					$('.denialsMesssageINV').text(simParamsINVDenialTrigger);
					$('.denialsMesssageSLS').text(simParamsSLSDenialTrigger);
				}
				for (var t = 0; t < 5; t++) {
					$( "#testrunresulttabs" ).disableTab(t, true);
					$( "#testrunresulttabs" ).tabs({ disabled: [t] });
					if (t >= simParamsTestOption) {
						$( "#testrunresulttabs" ).disableTab(t, true);
					}
				}
	            $( "#historicalresulttabs" ).tabs();
				//$( "#historicalresulttabs" ).tabs({ enabled: [0] });
				//$( "#historicalresulttabs" ).tabs( "option", "active", currentTimeframe - 1 );
				$( "#" + sPrefix + "-messagetabs" ).tabs();
				$( "#" + sPrefix + "-messagetabs" ).tabs({ enabled: [0] });
				$( "#" + sPrefix + "-messagetabs" ).tabs( "option", "active", currentTimeframe - 1 );
				for (var i = currentTimeframe; i < scenarioLength; i++) {
					$( "#" + sPrefix + "-messagetabs" ).disableTab(i, true);
				//	$( "#" + sPrefix + "-messagetabs" ).tabs({ hide: [i] });
				}
	            $( "#testresulttabs1" ).tabs();
	            $( "#testresulttabs2" ).tabs();
	            $( "#testresulttabs3" ).tabs();
	            $( "#testresulttabs4" ).tabs();
	            $( "#testresulttabs5" ).tabs();
	            $( "#testresulttabs6" ).tabs();
	            $( "#testresulttabs7" ).tabs();
	            $( "#testresulttabs8" ).tabs();
	            $( "#testresulttabs9" ).tabs();
	            $( "#testresulttabs10" ).tabs();
	            $( "#testresulttabs11" ).tabs();
	            $( "#testresulttabs12" ).tabs();
	            //PARTIAL RESET
	            if ($.jStorage.get(user + 'Reset', 0) == 1) {
	            	console.log('partial reset happened to TF: ' + currentTimeframe);
					//		            rebuildReports($.jStorage.get(user + 'currentTimeframe', 1), $.jStorage.get(user + 'Retain', 1));
		            $.jStorage.set(user + 'Reset', 0);
					if (currentTimeframe == 1) {
						for (var ii = 0; ii < 12; ii++) {
							$( "#historicalresulttabs" ).disableTab(ii, true);
						}
						load_initial_backlog();
						load_assisted_worksheet();
						reset_control_buttons();
						if ($.jStorage.get(myuser + 'Retain', 1)) {
						//	reload_student_input(1);
						}
					} else {
						for (var ii = 0; ii < 12; ii++) {
							if (ii < currentTimeframe - 1) {
								$( "#historicalresulttabs" ).tabs({enabled: [ii]});
							} else {
								$( "#historicalresulttabs" ).disableTab(ii, true);
							}
						}
						//$( "#historicalresulttabs" ).tabs( "option", "active", currentTimeframe - 2 );
						reload_backlog();
						check_for_impacts();
						reload_report_values();
						populate_daily_workload();
						reset_control_buttons();
						reload_assisted_worksheet();
						displayMessages();
			            rebuildReports(currentTimeframe - 1, $.jStorage.get(myuser + 'Retain', 0));
						document.getElementById('nav-student-performFinalRun').disabled = false;
					}
	            } else {
	            	console.log('NOT a partial reset, reloading at TF: ' + currentTimeframe);
					if (currentTimeframe == 1) {
						for (var ii = 0; ii < 12; ii++) {
							$( "#historicalresulttabs" ).disableTab(ii, true);
						}
						console.log('TF 1');
						load_initial_backlog();
						load_assisted_worksheet();
						reset_control_buttons();
						if ($.jStorage.get(myuser + 'timeframeStatus' + currentTimeframe, "start") == "start") {
							console.log('just started');
						} else if ($.jStorage.get(myuser + 'timeframeStatus' + currentTimeframe, "start") == "test") {
							console.log('testing');
							//rebuildReports(1, 0);
							document.getElementById('nav-student-displayWorkload').disabled = false;
							document.getElementById('nav-student-inputResourcePlan').disabled = false;
							document.getElementById('nav-student-performTestRun').disabled = false;
							if ($.jStorage.get(myuser + 'timeframeStatusTestNumber' + currentTimeframe, 0) > 0) {
								//REBUILD TESTS
								var testing = $.jStorage.get(myuser + 'timeframeStatusTestNumber' + currentTimeframe, 0);
								console.log('rebuilding tests up to test #' + testing);
								rebuildTestReports(testing);
								$( "#testrunresulttabs" ).enableTab(testing - 1);
								$( "#testrunresulttabs" ).tabs( "option", "active", testing - 1 );
							}
						} else if ($.jStorage.get(myuser + 'timeframeStatus' + currentTimeframe, "start") == "final") {
							console.log('TF was final');
							rebuildReports(1, 0);
							document.getElementById('nav-student-performFinalRun').disabled = false;
							$("#proceedToNextTimeframe").show();
						}
					//	$.jStorage.set(myuser + 'timeframeStatus' + currentTimeframe, "start");
					//	$.jStorage.set(myuser + 'timeframeStatusTestNumber' + currentTimeframe, 0);
					} else {
						for (var ii = 0; ii < 12; ii++) {
							if (ii < currentTimeframe - 1) {
								$( "#historicalresulttabs" ).tabs({enabled: [ii]});
							} else {
								$( "#historicalresulttabs" ).disableTab(ii, true);
							}
						}
						reload_backlog();
						check_for_impacts();
						reload_report_values();
						populate_daily_workload();
						reset_control_buttons();
					//	reload_assisted_worksheet();
						displayMessages();
						document.getElementById('nav-student-performFinalRun').disabled = false;
						if ($.jStorage.get(myuser + 'timeframeStatus' + currentTimeframe, "start") == "start") {
							console.log('TF was started');
							rebuildReports($.jStorage.get(myuser + 'currentTimeframe', 1) - 1, 1);
						} else if ($.jStorage.get(myuser + 'timeframeStatus' + currentTimeframe, "start") == "test") {
							console.log('tests had been run');
							rebuildReports($.jStorage.get(myuser + 'currentTimeframe', 1) - 1, 1);
							document.getElementById('nav-student-displayWorkload').disabled = false;
							document.getElementById('nav-student-inputResourcePlan').disabled = false;
							document.getElementById('nav-student-performTestRun').disabled = false;
							if ($.jStorage.get(myuser + 'timeframeStatusTestNumber' + currentTimeframe, 0) > 0) {
								var testing = $.jStorage.get(myuser + 'timeframeStatusTestNumber' + currentTimeframe, 0);
								console.log('rebuilding tests up to test #' + testing);
								rebuildTestReports(testing);
								$( "#testrunresulttabs" ).enableTab(testing - 1);
								$( "#testrunresulttabs" ).tabs( "option", "active", testing - 1 );
							}
						} else if ($.jStorage.get(myuser + 'timeframeStatus' + currentTimeframe, "start") == "final") {
							console.log('TF was final');
							rebuildReports($.jStorage.get(myuser + 'currentTimeframe', 1), 0);
							document.getElementById('nav-student-performFinalRun').disabled = false;
							$("#proceedToNextTimeframe").show();
						}


			            
						//document.getElementById('nav-student-performFinalRun').disabled = false;
						//add report value repopulation

						if (currentTimeframe == simParamsTimeframes) {
							document.getElementById('nav-student-reporting').disabled = false;
							document.getElementById('inputReport').disabled = true;
							document.getElementById('inputCheck').disabled = true;
							document.getElementById('nav-student-performTestRun').disabled = true;
							document.getElementById('testToFinal1').disabled = true;
							document.getElementById('testToFinal2').disabled = true;
							document.getElementById('testToFinal3').disabled = true;
							document.getElementById('testToFinal4').disabled = true;
							document.getElementById('testToFinal5').disabled = true;
						}

					}

	            }

			} else {
				$( "#content-student-warning" ).show ();
			}
			//pageLayout.addPane('west');

		}
	} else {
		alert("Wrong username/password combination. Please try again.");
	}
    }).fadeOut();
}

function instructorReview() {
	$( "#content-student-review").show ();
	$( "#final-graphs").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#message-center" ).hide();
	$( "#report-available-workload").hide ();
	$( "#content-parameters").hide();
}

function hideParametersFromReview() {
	$( "#content-parameters").hide();
	$( "#content-student-review").show();
}

function showParametersFromReview(p) {
	if (eye_sweep("INSTRUCT",p)) {
		$( "#content-parameters").show();
		$( "#content-student-review").hide();
	} else {
		alert("Incorrect password. Please try again.");
	}
}

function checkInstructorReviewPassword(p) {
	if (eye_sweep("INSTRUCT",p)) {
		instructorReviewComplete();
	} else {
		alert("Incorrect password. Please try again.");
	}
}

function instructorReviewComplete() {
	document.getElementById('nav-student-instructorReview').disabled = true;
	$( "#content-student-review").hide ();
	$( "#final-graphs").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#message-center" ).hide();
	$( "#report-available-workload").hide ();
	$("#instructor-review-message").hide();
	proceed_to_next_timeframe();
}

function depsim_logout () {
	$('#overlayLoading').fadeIn('fast', function () {
	$( "#content-welcome" ).hide ();
	$( "#nav-instructor" ).hide ();
	$( "#nav-student" ).hide ();
	$( "#instructor-restart" ).hide();
	$( "#content-parameters" ).hide ();
	$( "#content-scenario" ).hide ();
	$( "#user-group-init" ).hide ();
	$( "#content-workloaddata" ).hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#content-student-review").hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#message-center" ).hide();
	$( "#report-available-workload").hide ();
	$( "#final-graphs").hide ();
	//pageLayout.removePane('west');
	pageLayout.addPane('north');
	populate_logins();
	$( "#content-login" ).show();
	document.getElementById('password').value = "";
	}).fadeOut();
}

function populate_logins() {
	for (var i = 0; i < groupsActive.length - 1; i++) {
		if (groupsActive[i] == 0) {
			$("#user option[value='" + groups[i] + "']").remove();
		}
	}
	for (var i = 0; i < groupsActive.length - 1; i++) {
		if (groupsActive[i] == 1) {
			var exists = false;
			$("#user option").each(function() {
				if (this.value == groups[i]) {
					exists = true;
					return false;
				}
			});
			if (!exists) {
				$("#user").append($('<option>',{
					value: groups[i],
					text: groups[i]
				}));
			}
		}
	}
}
function reset_options() {
	$( "#content-welcome" ).hide();
	$( "#content-parameters" ).hide ();
	$( "#content-workloaddata" ).hide ();
	$( "#content-scenario" ).hide ();
	$( "#user-group-init" ).hide ();
	$( "#instructor-restart" ).show();
}

function scenarioDefine () {
	$( "#content-welcome" ).hide();
	$( "#content-parameters" ).hide ();
	$( "#content-workloaddata" ).hide ();
	$( "#instructor-restart" ).hide();
	$( "#content-scenario" ).show ();
	$( "#user-group-init" ).hide ();
}

function usergroupDefine () {
	$( "#content-welcome" ).hide();
	$( "#content-parameters" ).hide ();
	$( "#content-workloaddata" ).hide ();
	$( "#instructor-restart" ).hide();
	$( "#content-scenario" ).hide ();
	$( "#user-group-init" ).show ();
	load_user_groups ();
}

function parametersDefine () {
	$( "#content-scenario" ).hide();
	$( "#content-workloaddata" ).hide ();
	$( "#user-group-init" ).hide ();
	$( "#instructor-restart" ).hide();
	$( "#content-parameters" ).show ();
	$( "#paramtabs" ).tabs();
}

function workloadDatasetsDefine () {
	$( "#content-scenario" ).hide();
	$( "#content-parameters" ).hide ();
	$( "#user-group-init" ).hide ();
	$( "#instructor-restart" ).hide();
	$( "#content-workloaddata" ).show ();
	$( "#workloaddatatabs" ).tabs();
}

function displayReports() {
	$( "#report-available-workload").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#content-student-review").hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#message-center" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#final-graphs").show ();
	populateGraphs();
}

function displayMessages() {
	$( "#final-graphs").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#content-student-review").hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#report-available-workload").hide ();
	$( "#" + sPrefix + "-message-center" ).show();
	$( "#" + sPrefix + "-messagetabs" ).tabs( "option", "active", currentTimeframe - 1 );
	document.getElementById('nav-student-displayWorkload').disabled = false;
}
function displayAvailableWorkload() {

//	$("#report-available-workload").modal();
	$( "#final-graphs").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#content-student-review").hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#message-center" ).hide();
	$( "#report-available-workload").show ();
	document.getElementById('nav-student-inputResourcePlan').disabled = false;
}

function displayTestResults() {
//	calculate_work_accomplished ();
	$( "#final-graphs").hide ();
	$( "#report-available-workload").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#content-student-review").hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#message-center" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#report-test-work-accomplished" ).show();
}

function displayFinalRunResults() {
//	calculate_work_accomplished ();
	$( "#final-graphs").hide ();
	$( "#report-available-workload").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#content-input_resource_plan" ).hide ();
	$( "#content-student-review").hide ();
	$( "#report-test-work-accomplished" ).hide();
	$( "#message-center" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	$( "#report-work-accomplished" ).show();
}

function perform_test_run() {
	document.getElementById('inputReport').disabled = true;
	document.getElementById('inputCheck').disabled = true;
	calculate_work_accomplished (true);
}
function perform_final_run() {
	$("#testToFinal1").hide();
	$("#testToFinal2").hide();
	$("#testToFinal3").hide();
	$("#testToFinal4").hide();
	$("#testToFinal5").hide();
	$("#inputReport").hide();
	$("#inputCheck").hide();
	document.getElementById('inputReport').disabled = true;
	document.getElementById('inputCheck').disabled = true;
	calculate_work_accomplished (false);
}
function printMessages(s,t) {
	$("#" + s + "innermessagetabs" + t).printThis({base: true, loadCSS: "css/main.css"});
}
function printTestReport1() {
	$("#printTest1").printThis({base: true, loadCSS: "css/main.css"});
}
function printTestReport2() {
	$("#printTest2").printThis({base: true, loadCSS: "css/main.css"});
}
function printTestReport3() {
	$("#printTest3").printThis({base: true, loadCSS: "css/main.css"});
}
function printTestReport4() {
	$("#printTest4").printThis({base: true, loadCSS: "css/main.css"});
}
function printTestReport5() {
	$("#printTest5").printThis({base: true, loadCSS: "css/main.css"});
}
function printReportAvailableWorkload() {
	$("#report-available-workload").printThis({base: true, loadCSS: "css/main.css"});
}
function printWorkloadAccomplished(tf) {
	$("#testresulttabs" + tf + "-1").printThis({base: true, loadCSS: "css/main.css"});
}
function printResourceReport(tf) {
	$("#testresulttabs" + tf + "-2").printThis({base: true, loadCSS: "css/main.css"});
}
function printCostReport(tf) {
	$("#testresulttabs" + tf + "-3").printThis({base: true, loadCSS: "css/main.css"});
}
function printGraph() {
	//prepGraphsForPrint();
	$("#printGraph1").printThis({base: true, canvas: true, loadCSS: "css/main.css"});
}

function studentResourcePlanInput () {
	$('#overlayLoading').fadeIn('fast', function () {
	$( "#final-graphs").hide ();
	$( "#content-student-welcome" ).hide();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#report-available-workload").hide ();
	$( "#content-student-review").hide ();
	$( "#message-center" ).hide();
	$( "#" + sPrefix + "-message-center" ).hide();
	if ((currentTimeframe == 1 && simParamsUseWSinTF01 == 1) || (currentTimeframe == 2 && simParamsUseWSinTF02 == 1)  || (currentTimeframe == 3 && simParamsUseWSinTF03 == 1) || (currentTimeframe == 4 && simParamsUseWSinTF04 == 1) || (currentTimeframe == 5 && simParamsUseWSinTF05 == 1) || (currentTimeframe == 6 && simParamsUseWSinTF06 == 1) || (currentTimeframe == 7 && simParamsUseWSinTF07 == 1) || (currentTimeframe == 8 && simParamsUseWSinTF08 == 1) || (currentTimeframe == 9 && simParamsUseWSinTF09 == 1) || (currentTimeframe == 10 && simParamsUseWSinTF10 == 1) || (currentTimeframe == 11 && simParamsUseWSinTF11 == 1) || (currentTimeframe == 12 && simParamsUseWSinTF12 == 1))
	{
		$( "#tabsinput" ).tabs({ enabled: [1] });
	} else {
		$( "#tabsinput" ).disableTab(1, true);
	}
	$( "#content-input_resource_plan" ).show ();
	document.getElementById('nav-student-inputResourcePlan').disabled = false;
	showHideReserve();
	adjust_total_workforce();
	document.getElementById('inputReport').disabled = false;
	}).fadeOut();
}

function save_scenario(sType,sVersion,sLength) {
	document.getElementById('nav-instructor-params').disabled = false;
	document.getElementById('nav-instructor-workload').disabled = false;
	document.getElementById('nav-instructor-reset').disabled = false;
	$( "#nav-instructor-scenario" ).hide ();
	$( "#displayScenarioType" ).text(document.getElementById('scenarioType').value);
	$( "#displayScenarioVersion" ).text(document.getElementById('scenarioVersion').value);
	$( "#displayScenarioTimeframes" ).text(document.getElementById('scenarioLength').value);
	$( "#nav-instructor-scenarioFS" ).show ();
	$( "#nav-instructor-params" ).disabled = false;
	$( "#nav-instructor-workload" ).disabled = false;
	$( "#nav-instructor-reset" ).disabled = false;
	storeScenario(true);
}

function reset_scenario()
{
	localStorage.clear();
	document.getElementById('nav-instructor-params').disabled = true;
	document.getElementById('nav-instructor-workload').disabled = true;
	document.getElementById('nav-instructor-reset').disabled = true;
	$( "#nav-instructor-scenario" ).show ();
	document.getElementById('scenarioType').value = "M";
	$( "#displayScenarioType" ).text(document.getElementById('scenarioType').value);
	document.getElementById('scenarioVersion').value = "C";
	$( "#displayScenarioVersion" ).text(document.getElementById('scenarioVersion').value);
	document.getElementById('scenarioLength').value = "6";
	$( "#displayScenarioTimeframes" ).text(document.getElementById('scenarioLength').value);
	$( "#nav-instructor-scenarioFS" ).hide ();
	$( "#nav-instructor-params" ).disabled = true;
	$( "#nav-instructor-workload" ).disabled = true;
	$( "#nav-instructor-reset" ).disabled = true;
	scenarioType = $.jStorage.set('scenarioType',document.getElementById('scenarioType').value);
	scenarioVersion = $.jStorage.set('scenarioVersion',document.getElementById('scenarioVersion').value);
	scenarioLength = $.jStorage.set('scenarioLength',document.getElementById('scenarioLength').value);
	storeScenario(false);
	localStorage.clear();
	$.jStorage.flush();
	alert('Complete Simulation Restart Finished!');
}

function partial_restart (resetGroup, resetTF, resetRetain) {
	$.jStorage.set(resetGroup + 'Reset', 1);
	$.jStorage.set(resetGroup + 'Retain', 1);
	$.jStorage.set(resetGroup + 'currentTimeframe', resetTF);
//	document.getElementById(resetGroup + 'currentTimeframe' ).value = resetTF;
	alert(resetGroup + ' reset to Timeframe ' + resetTF + '!');
	$.jStorage.set(myuser + 'timeframeStatus' + resetTF, "start");
	$.jStorage.set(myuser + 'timeframeStatusTestNumber' + resetTF, 0);

}

function complete_restart() {
	reset_scenario();
}