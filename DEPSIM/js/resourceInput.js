var currentTimeframe = 1;
var currentTest = 1;
var lastTimeframeReached = 0;
var timeframeStatus = "start";
var currentlyOnLeave = 0;
var computerDown = false;
var transportationStrike = false;
var equipmentDown = false;
var equipmentDowntimeMultiplier = 1;
var denialsMulitplier = 1.0;
var denialsTriggered = 0;
var denialsMessageShown = 0;
var emptyVal = 0;
var testRunYet = 0;
var workloadTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var daysUntilLate = [3,3,8,8,1,1,1,1,1,1,1,1,4,4,4,4,6,6];
var jobs = ["RBNP","RBKP","RBNR","RBKR","IBN1","IBK1","TBN1","TBK1","IBN2","IBK2","TBN2","TBK2","IBN3","IBK3","TBN3","TBK3","INV","SLS"];
//hard coded--consider externalizing or exposing to parameters page/storage
var initialBacklog = [[0,25,0,0,0,0,0,0,0,0,0,0],[0,23,21,30,3,0,0,0,0,0,0,0],[0,47,0,0,0,0,0,0,0,0,0,0],[0,77,62,8,0,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0,0,0,0,0],[0,5,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0],[0,4,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,4,0,0,0,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,34,0,0,0,0,0,0,0,0,0,0],[0,34,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,40,0,0,0,0,0,0,0,0,0,0],[0,171,0,0,0,0,0,0,0,0,0,0],[0,21,0,0,0,0,0,0,0,0,0,0]];
var workingBacklog = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var backlogTest1 = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var backlogTest2 = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var backlogTest3 = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var backlogTest4 = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var backlogTest5 = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var runningBacklog = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var runningWorkload = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var runningWorkAccomplished = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var runningLateWork = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]];
var runningWorkAvailable = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var runningWorkOnTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var tfWorkOnTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var runningCostTotal = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
var furthestWorkOut = 0;
var onTimeScore = 0.00;
var onTimeScoreCumulative = 0.00;
var runningWorkAccomplishedTotal = 0;
var testWorkAccomplished = 0.0;
var tfWorkedLines = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var runningSpaceCost = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningSpacePerc = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningBacklogTotal = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningUnitCost = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningOvertimeCost = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningOverallCost = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningBacklogHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var runningBacklogHoursStandard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var runningScore = [0,0,0,0,0,0,0,0,0,0,0,0];
var runningBudget = [0,0,0,0,0,0,0,0,0,0,0,0];
var currentBudget = 286000;
var lastOntimeScore = 0.00;
var lastUnitCostScore = 0.00;
var lastBudgetScore = 0.00;
var lastBacklogScore = 0.00;
var lastCompletionScore = 0.00;
var lastUnitCostBonusScore = 0.00;
var costWF = 0.00;
var costOT = 0.00;
var costHF = 0.00;
var costEQ = 0.00;
var costTTL = 0.00;
var reportSpentActual = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
var reportSpentProjected = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
var reportAverageUnitCost = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
var reportActualWorkforce = [0,0,0,0,0,0,0,0,0,0,0,0];
var reportCurrentScore = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
var reportProjectedScore = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];


// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

/*
var myNamespace = {};

myNamespace.round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};
// myNamespace.round(1234.5678, 2); // 1234.57
// myNamespace.round(1234.5678, 1); // 1234.6
// myNamespace.round(1234.5678, -1); // 1230
*/

function calculate_work_accomplished (test) {
	$('#overlayLoading').fadeIn('fast', function () {

	furthestWorkOut = 0;
	if (test) {
		//
		//TEST TEST TEST
		//
		costWF = 0.00;
		costOT = 0.00;
		costHF = 0.00;
		costEQ = 0.00;
		costTTL = 0.00;

		var testRunningWorkOntime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var testRunningWorkAvailable = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for (var i = 0; i < jobs.length; i++) {

			//RESOURCE REPORT
			document.getElementById('reportRR_LH_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML;
			document.getElementById('reportRR_EH_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'equipHours').value;
			document.getElementById('reportRR_Bw_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'borrow').value;
			document.getElementById('reportRR_Ln_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'loan').value;
			document.getElementById('reportRR_Hr_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'hire').value;
			document.getElementById('reportRR_Fr_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'fire').value;
			document.getElementById('reportRR_SH_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'seasonal').value;
			document.getElementById('reportRR_Lv_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'leave').value;
			document.getElementById('reportRR_Rs_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'reserve').value;
			document.getElementById('reportRR_AWF_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML;
			document.getElementById('reportRR_OT_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('input' + jobs[i] + 'overtime').value;


			$.jStorage.set(myuser + 'reportRR_LH_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
			$.jStorage.set(myuser + 'reportRR_EH_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'equipHours').value);
			$.jStorage.set(myuser + 'reportRR_Bw_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'borrow').value);
			$.jStorage.set(myuser + 'reportRR_Ln_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'loan').value);
			$.jStorage.set(myuser + 'reportRR_Hr_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'hire').value);
			$.jStorage.set(myuser + 'reportRR_Fr_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'fire').value);
			$.jStorage.set(myuser + 'reportRR_SH_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'seasonal').value);
			$.jStorage.set(myuser + 'reportRR_Lv_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'leave').value);
			$.jStorage.set(myuser + 'reportRR_Rs_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'reserve').value);
			$.jStorage.set(myuser + 'reportRR_AWF_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			$.jStorage.set(myuser + 'reportRR_OT_' + jobs[i] + '_test' + currentTest, document.getElementById('input' + jobs[i] + 'overtime').value);


			//WORK ACCOMPLISHED REPORT
			//cache important values
			//get personnel assigned for function
			var startingWF = parseFloat(document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			startingWF = roundTo(startingWF, 2);
			//multiply by 8 for man-hours
			var manHours = startingWF * 8;
			manHours += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value);
			//cache manhrs std
			var manHoursMin = window['stdLabor' + jobs[i]];
			//get equipment hours assigned for function
			var equipHours = parseFloat(document.getElementById('input' + jobs[i] + 'equipHours').value);
			//cache equip std
			var equipHoursMin = parseFloat(window['stdEquip' + jobs[i]]);
			//cache available work
			var startingWL = get_workload_total(jobs[i]);
			workloadTotals[i] = get_workload_total(jobs[i]);
			console.log(jobs[i] + 'starting WL: ' + startingWL);
			//SAVE
			$.jStorage.set(myuser + 'workloadTotals' + jobs[i] + 'test' + currentTest, workloadTotals[i]);

			var seasonalAdjustment = 0.00;
			if (document.getElementById('input' + jobs[i] + 'seasonal').value != null) {
				seasonalAdjustment = parseFloat(document.getElementById('input' + jobs[i] + 'seasonal').value);
			}
			var seasonalAdjustmentHours = seasonalAdjustment * 8;
		//	runningWorkAvailable[i] += workloadTotals[i];

			var costTotal = 0.00;
			costTotal += parseFloat(manHours * costParamsRegularLaborCost);
			costTotal += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost);
			costTotal += parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost));
			costTotal += parseFloat(equipHours * costParamsEquipmentCost);
			//add seasonal adjustment
			costTotal += parseFloat(seasonalAdjustmentHours * 9);
			//for final run
		//	runningCostTotal [i] += costTotal;

			costWF += parseFloat(manHours * costParamsRegularLaborCost);
			costOT += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost);
			costHF += parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost));
			costEQ += parseFloat(equipHours * costParamsEquipmentCost);
			costTTL += costTotal;
//alert('costWF' + jobs[i] + ': ' + costWF + '\n' + 'costOT' + jobs[i] + ': ' + costOT + '\n' + 'costHF' + jobs[i] + ': ' + costHF + '\n' + 'costEQ' + jobs[i] + ': ' + costEQ + '\n' + 'costTTL' + jobs[i] + ': ' + costTTL);
			document.getElementById('reportCR_C4P_' + jobs[i] + '_test' + currentTest).innerHTML = parseFloat(manHours * costParamsRegularLaborCost).toFixed(2);
			document.getElementById('reportCR_C4O_' + jobs[i] + '_test' + currentTest).innerHTML = parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost).toFixed(2);
			document.getElementById('reportCR_C4H_' + jobs[i] + '_test' + currentTest).innerHTML = parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost)).toFixed(2);
			document.getElementById('reportCR_C4E_' + jobs[i] + '_test' + currentTest).innerHTML = parseFloat(equipHours * costParamsEquipmentCost).toFixed(2);
			document.getElementById('reportCR_TTL_' + jobs[i] + '_test' + currentTest).innerHTML = parseFloat(costTotal).toFixed(2);

			//SAVE COST REPORT
			$.jStorage.set(myuser + 'reportCR_C4P_' + jobs[i] + '_test' + currentTest, document.getElementById('reportCR_C4P_' + jobs[i] + '_test' + currentTest).innerHTML);
			$.jStorage.set(myuser + 'reportCR_C4O_' + jobs[i] + '_test' + currentTest, document.getElementById('reportCR_C4O_' + jobs[i] + '_test' + currentTest).innerHTML);
			$.jStorage.set(myuser + 'reportCR_C4H_' + jobs[i] + '_test' + currentTest, document.getElementById('reportCR_C4H_' + jobs[i] + '_test' + currentTest).innerHTML);
			$.jStorage.set(myuser + 'reportCR_C4E_' + jobs[i] + '_test' + currentTest, document.getElementById('reportCR_C4E_' + jobs[i] + '_test' + currentTest).innerHTML);
			$.jStorage.set(myuser + 'reportCR_TTL_' + jobs[i] + '_test' + currentTest, document.getElementById('reportCR_TTL_' + jobs[i] + '_test' + currentTest).innerHTML);

	/*******
		//TODO--ADD Equipment/manhour impacts based on scenario
	*****/


			var workToDo = true;

			//HERE GOES THE CHECK FOR COMPUTER DOWNTIME/ISSUES
			if (computerDown) {
				switch (jobs[i]) {
					case "IBN1":
					case "IBK1":
					case "IBN2":
					case "IBK2":
					case "IBN3":
					case "IBK3":
						workToDo = false;
						break;
					default:
						break;
				}
			}

			//HERE GOES THE CHECK FOR TRANSPORTATION STRIKE
			if (transportationStrike) {
				switch (jobs[i]) {
					case "TBN1":
					case "TBK1":
					case "TBN2":
					case "TBK2":
					case "TBN3":
					case "TBK3":
						workToDo = false;
						break;
					default:
						break;
				}
			}

			//add reserve workforce for job
			var reserveHrs = parseFloat(document.getElementById('input' + jobs[i] + 'reserve').value * 8);
			manHours += reserveHrs;

			//add miniscule amounts to manHours and equipHours avoid floating point error
			//manHours += 0.01;
			//equipHours += 0.01;
			manHours = roundTo(manHours, 2);
			equipHours = roundTo(equipHours, 2);
			manHoursMin = roundTo(manHoursMin, 2);
			equipHoursMin = roundTo(equipHoursMin, 2);
			console.log (jobs[i] + '\n' + '  workload:' + workloadTotals[i] + '\n' + 'planned work: ' + getPlannedWork(jobs[i], true) + '\n' + '  manHours: ' + manHours + '\n' + 'manHoursMin: ' + manHoursMin + '\n' + 'equipHours: ' + equipHours + '\n' + 'equipHoursMin: ' + equipHoursMin  + '\n' + 'startingWL: ' + startingWL);

			var planned = getPlannedWork(jobs[i], true);
			if (workToDo) {
				if (workloadTotals[i] >= planned) {
					workloadTotals[i] = workloadTotals[i] - planned;
				} else {
					workloadTotals[i] = 0;
				}
			}
			/*
			//while there are labor hours
			while (workToDo) { // && (manHours >= manHoursMin)) {
				if (manHours >= manHoursMin) {
					//if we have equip hrs
					if (equipHours >= equipHoursMin) {
						//if there is work
						if (workloadTotals[i] > 0) {
							if (jobs[i] == "TBK3") {
								console.log('TBK3 decrement manHours: ' + manHours + '  std: ' + manHoursMin + '\n' + '   equipHours: ' + equipHours + '  std: ' + equipHoursMin + '\n' + '  workloadTotals: ' + workloadTotals[i]);
							}
							//decrement work line
							manHours -= manHoursMin;
							equipHours -= equipHoursMin;
							manHours = roundTo(manHours, 2);
							equipHours = roundTo(equipHours, 2);
							workloadTotals[i] = workloadTotals[i] - 1;
						} else {
							//ran out of work
							console.log('ran out of work: ' + jobs[i] + ' work left: ' + workloadTotals[i]);
							workToDo = false;
						}
					} else {
						//ran out of equipment hours
						console.log('ran out of equipment hours: ' + jobs[i] + ' work left: ' + workloadTotals[i]);
						workToDo = false;
					}
				} else {
					//ran out of man hours
					console.log('ran out of man hours: ' + jobs[i] + ' work left: ' + workloadTotals[i]);
					workToDo = false;
				}
			} //ends when we run out of something
			*/
		//	console.log('ran out of man hours: ' + jobs[i] + ' work left: ' + workloadTotals[i]);
			//calculate work accomplished
			var workedLines = startingWL - workloadTotals [i];
			tfWorkedLines[i] = workedLines;
			console.log('workedLines ' + jobs[i] + ': ' + tfWorkedLines[i]);
			//save work accomplished for function in this tf
			runningWorkAccomplished [i][currentTimeframe - 1] = workedLines;

			//WORK BACKLOG
			//shift the backlog ahead a day first, then work backward through it
		//	window['backlog' + jobs[i]] = window['backlog' + jobs[i]].concat(window['backlog' + jobs[i]].splice(0,11));
			for (var pi = 11; pi >= 0; pi--) {
				if (pi != 0) {
					window['backlog' + jobs[i] + 'test' + currentTest + '[' + pi + ']'] = window['backlog' + jobs[i] + '[' + (pi - 1) + ']'];
				} else {
					window['backlog' + jobs[i] + 'test' + currentTest + '[' + pi + ']'] = 0;
				}
			};
			window['backlog' + jobs[i]].unshift(window['backlog' + jobs[i]].pop());
			dworked = workedLines;
			var currentWorkOnTime = 0;

			//roll backwards through the backlog
			for (var lateIndex = 11; lateIndex >= 0; lateIndex--) {
				//if late work, decrement lines worked from backlog while adding to on time accomplished work
				//check for backlog
				if (window['backlog' + jobs[i] + 'test' + currentTest + '[' + lateIndex + ']'] > 0) {
					//set this to collapse report columns in available workload report and work accomplished report
					furthestWorkOut = lateIndex > furthestWorkOut ? lateIndex : furthestWorkOut;
					//loop through available backlog
					for (var blIndex = 0, blMax = window['backlog' + jobs[i] + 'test' + currentTest + '[' + lateIndex + ']']; blIndex < blMax; blIndex++) {
						//if we have lines that got worked, decrement lines to remove from backlog/increment on time
						if (dworked > 0) {
							dworked--;
							window['backlog' + jobs[i] + 'test' + currentTest + '[' + lateIndex + ']']--;
							if (lateIndex >= daysUntilLate[i]) {
								currentWorkOnTime++;
							}
						}
						if (lateIndex < daysUntilLate[i]) {
							currentWorkOnTime++;
						}
					}
				}
			}

		//	alert('bl0: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 0 + ']'] + '\nbl1: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 1 + ']'] + '\nbl2: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 2 + ']'] + '\nbl3: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 3 + ']'] + '\nbl4: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 4 + ']'] + '\nbl5: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 5 + ']'] + '\nbl6: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 6 + ']'] + '\n ... on time ' + jobs [i] + ': ' + currentWorkOnTime);
			//backlog array should be worked, divide current work on time by total work availabe to get on time percentage, 
			//add both to rolling numbers and divide to get cumulative on time percentage
			var onTimePercentage = parseFloat(100 * (currentWorkOnTime / startingWL)).toFixed(2);
			testRunningWorkOntime[i] = runningWorkOnTime[i] + currentWorkOnTime;
			//runningWorkOnTime[i] += currentWorkOnTime;
			tfWorkOnTime[i] = currentWorkOnTime;
			testRunningWorkAvailable[i] = runningWorkAvailable[i] + startingWL;
			//runningWorkAvailable[i] += startingWL;
			var cumulativeOnTimePercentage = parseFloat(100 * (testRunningWorkOntime[i] / testRunningWorkAvailable[i])).toFixed(2);


			//total backlog
		//	runningBacklog [i][currentTimeframe] = window['backlog' + jobs[i]].reduce(function(a,b) {return a + b;}, 0);
		//	alert('bl ' + jobs [i] + ': ' + runningBacklog [i][currentTimeframe] + '... on time ' + jobs [i] + ': ' + currentWorkOnTime);

	/*******
		//TODO--ADD DENIALS LOGIC
	*****/

			//IF NOT A TEST RUN
			//push issues to trans
			switch (jobs[i]) {
				case "IBN1":
				case "IBK1":
				case "IBN2":
				case "IBK2":
				case "IBN3":
				case "IBK3":
					var nf = jobs[i];
					nf = nf.replace("I","T");
				//	window['simWLD' + simParamsUserWorkloadOption + nf + (currentTimeframe + 1)] = workedLines;
					break;
				default:
					break;
			}
			/*
			for (var war_index = 0; war_index < 12; war_index++) {
				document.getElementById('reportAWL_' + war_index + 'D_' + jobs[i] + '_final').innerHTML = window['backlog' + jobs[i] + '[' + war_index + ']'];
			} */

			//populate workload accomplished report
			//DWL
			document.getElementById('reportAWL_DWL_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML;
			$.jStorage.set(myuser + 'reportAWL_DWL_' + jobs[i] + '_test' + currentTest, document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML);
			//1D
			for (var war_indexT = 1; war_indexT <= 12; war_indexT++) {
				document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i]).innerHTML;
				$.jStorage.set(myuser + 'reportAWL_' + war_indexT + 'D_' + jobs[i] + '_test' + currentTest, document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i]).innerHTML);
			}
			// ~ 12D
			//TWA
			document.getElementById('reportAWL_TWA_' + jobs[i] + '_test' + currentTest).innerHTML = document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML;
			$.jStorage.set(myuser + 'reportAWL_TWA_' + jobs[i] + '_test' + currentTest, document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML);
			//WF (work accomplished)
			document.getElementById('reportAWL_WF_' + jobs[i] + '_test' + currentTest).innerHTML = workedLines;
			$.jStorage.set(myuser + 'reportAWL_WF_' + jobs[i] + '_test' + currentTest, workedLines);
			//On time
			document.getElementById('reportAWL_OnTime_' + jobs[i] + '_test' + currentTest).innerHTML = onTimePercentage;
			$.jStorage.set(myuser + 'reportAWL_OnTime_' + jobs[i] + '_test' + currentTest, onTimePercentage);
			//on time cumulative
			document.getElementById('reportAWL_OnTimeC_' + jobs[i] + '_test' + currentTest).innerHTML = cumulativeOnTimePercentage;
			$.jStorage.set(myuser + 'reportAWL_OnTimeC_' + jobs[i] + '_test' + currentTest, cumulativeOnTimePercentage);
		}
		//LOOP DONE


		//RESOURCE REPORT
		document.getElementById('reportRR_LH_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALworkforceStart').innerHTML;
		document.getElementById('reportRR_EH_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALequipHours').innerHTML;
		document.getElementById('reportRR_Bw_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALborrow').innerHTML;
		document.getElementById('reportRR_Ln_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALloan').innerHTML;
		document.getElementById('reportRR_Hr_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALhire').innerHTML;
		document.getElementById('reportRR_Fr_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALfire').innerHTML;
		document.getElementById('reportRR_SH_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALseasonal').innerHTML;
		document.getElementById('reportRR_Lv_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALleave').innerHTML;
		document.getElementById('reportRR_Rs_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALreserve').innerHTML;
		document.getElementById('reportRR_AWF_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALworkforceAdjust').innerHTML;
		document.getElementById('reportRR_OT_Total_test' + currentTest).innerHTML = document.getElementById('inputTOTALovertime').innerHTML;
		document.getElementById('reportRR_WFC_Total_test' + currentTest).innerHTML = simParamsWorkforceCeiling;
		document.getElementById('reportRR_AWF_final_test' + currentTest).innerHTML = parseInt(document.getElementById('inputTOTALworkforceAdjust').innerHTML + document.getElementById('inputTOTALleave').innerHTML);

		//SAVE RESOURCE REPORT TOTALS
		$.jStorage.set(myuser + 'reportRR_LH_Total_test' + currentTest, document.getElementById('inputTOTALworkforceStart').innerHTML);
		$.jStorage.set(myuser + 'reportRR_EH_Total_test' + currentTest, document.getElementById('inputTOTALequipHours').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Bw_Total_test' + currentTest, document.getElementById('inputTOTALborrow').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Ln_Total_test' + currentTest, document.getElementById('inputTOTALloan').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Hr_Total_test' + currentTest, document.getElementById('inputTOTALhire').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Fr_Total_test' + currentTest, document.getElementById('inputTOTALfire').innerHTML);
		$.jStorage.set(myuser + 'reportRR_SH_Total_test' + currentTest, document.getElementById('inputTOTALseasonal').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Lv_Total_test' + currentTest, document.getElementById('inputTOTALleave').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Rs_Total_test' + currentTest, document.getElementById('inputTOTALreserve').innerHTML);
		$.jStorage.set(myuser + 'reportRR_AWF_Total_test' + currentTest, document.getElementById('inputTOTALworkforceAdjust').innerHTML);
		$.jStorage.set(myuser + 'reportRR_OT_Total_test' + currentTest, document.getElementById('inputTOTALovertime').innerHTML);
		$.jStorage.set(myuser + 'reportRR_WFC_final_test' + currentTest, simParamsWorkforceCeiling);
		$.jStorage.set(myuser + 'reportRR_AWF_final_test' + currentTest, parseInt(document.getElementById('inputTOTALworkforceAdjust').innerHTML + document.getElementById('inputTOTALleave').innerHTML));

		//WORKLOAD ACCOMPLISHED
		var awlDWLTotal = 0;
		var awlTWATotal = 0;
		var awlWFTotal = 0;
		var awlWOTTotal = 0;
		var awlWOTCTotal = 0;
		var awlTWACumulative = 0;
		for (var war_indexTotal = 0; war_indexTotal < jobs.length; war_indexTotal++) {
			awlDWLTotal += parseFloat(document.getElementById('reportAWL_DWL_' + jobs[war_indexTotal] + '_test' + currentTest).innerHTML);
			awlTWATotal += parseFloat(document.getElementById('reportAWL_TWA_' + jobs[war_indexTotal] + '_test' + currentTest).innerHTML);
			awlWFTotal += parseFloat(document.getElementById('reportAWL_WF_' + jobs[war_indexTotal] + '_test' + currentTest).innerHTML);
			awlWOTTotal += tfWorkOnTime[war_indexTotal];
			awlWOTCTotal += testRunningWorkOntime[war_indexTotal];
			awlTWACumulative += testRunningWorkAvailable [war_indexTotal];
		}
		var rWorkAccomplished = runningWorkAccomplishedTotal + awlWFTotal;
		testWorkAccomplished = runningWorkAccomplishedTotal + awlWFTotal;
		//runningWorkAccomplishedTotal += awlWFTotal;

		//	reportAWL_DWL_Total
		document.getElementById('reportAWL_DWL_Total_test' + currentTest).innerHTML = awlDWLTotal;
		$.jStorage.set(myuser + 'reportAWL_DWL_Total_test' + currentTest, awlDWLTotal);
		//	reportAWL_TWA_Total
		document.getElementById('reportAWL_TWA_Total_test' + currentTest).innerHTML = awlTWATotal;
		$.jStorage.set(myuser + 'reportAWL_TWA_Total_test' + currentTest, awlTWATotal);
		//	reportAWL_WF_Total
		document.getElementById('reportAWL_WF_Total_test' + currentTest).innerHTML = awlWFTotal;
		$.jStorage.set(myuser + 'reportAWL_WF_Total_test' + currentTest, awlWFTotal);
		//	reportAWL_OnTime_Total
		onTimeScore = parseFloat(100 * (awlWOTTotal / awlTWATotal));
		document.getElementById('reportAWL_OnTime_Total_test' + currentTest).innerHTML = parseFloat(100 * (awlWOTTotal / awlTWATotal)).toFixed(2);
		$.jStorage.set(myuser + 'reportAWL_OnTime_Total_test' + currentTest, parseFloat(100 * (awlWOTTotal / awlTWATotal)).toFixed(2));
		//	reportAWL_OnTimeC_Total
		onTimeScoreCumulative = parseFloat(100 * (awlWOTCTotal / awlTWACumulative));
		document.getElementById('reportAWL_OnTimeC_Total_test' + currentTest).innerHTML = parseFloat(100 * (awlWOTCTotal / awlTWACumulative)).toFixed(2);
		$.jStorage.set(myuser + 'reportAWL_OnTimeC_Total_test' + currentTest, parseFloat(100 * (awlWOTCTotal / awlTWACumulative)).toFixed(2));
		//	reportAWL_TWAC_Total_final
		document.getElementById('reportAWL_TWAC_Total_test' + currentTest).innerHTML = awlWFTotal;
		$.jStorage.set(myuser + 'reportAWL_TWAC_Total_test' + currentTest, awlWFTotal);


		//calculate totals
		//COST REPORT
		//TF Totals
		document.getElementById('reportCR_C4P_Total' + '_test' + currentTest).innerHTML = formatter.format(costWF);
		$.jStorage.set(myuser + 'reportCR_C4P_Total' + '_test' + currentTest, formatter.format(costWF));
		document.getElementById('reportCR_C4O_Total' + '_test' + currentTest).innerHTML = formatter.format(costOT);
		$.jStorage.set(myuser + 'reportCR_C4O_Total' + '_test' + currentTest, formatter.format(costOT));
		runningOvertimeCost[currentTimeframe - 1] = costOT;
		document.getElementById('reportCR_C4H_Total' + '_test' + currentTest).innerHTML = formatter.format(costHF);
		$.jStorage.set(myuser + 'reportCR_C4H_Total' + '_test' + currentTest, formatter.format(costHF));
		document.getElementById('reportCR_C4E_Total' + '_test' + currentTest).innerHTML = formatter.format(costEQ);
		$.jStorage.set(myuser + 'reportCR_C4E_Total' + '_test' + currentTest, formatter.format(costEQ));
		document.getElementById('reportCR_TTL_Total' + '_test' + currentTest).innerHTML = formatter.format(costTTL);
		$.jStorage.set(myuser + 'reportCR_TTL_Total' + '_test' + currentTest, formatter.format(costTTL));
		runningOverallCost[currentTimeframe - 1] = costTTL;
		//TF Totals cont.
		document.getElementById('reportCR_TF_Backlog' + '_test' + currentTest).innerHTML = awlTWATotal - awlWFTotal;
		$.jStorage.set(myuser + 'reportCR_TF_Backlog' + '_test' + currentTest, awlTWATotal - awlWFTotal);
		runningUnitCost[currentTimeframe - 1] = parseFloat(costTTL / get_tf_totalLinesWorked());
		document.getElementById('reportCR_TF_UnitCost' + '_test' + currentTest).innerHTML = formatter.format(parseFloat(costTTL / awlWFTotal));
		$.jStorage.set(myuser + 'reportCR_TF_UnitCost' + '_test' + currentTest, formatter.format(parseFloat(costTTL / awlWFTotal)));
		runningSpaceCost[currentTimeframe - 1] = get_space_backlog_cost_test(currentTest);
		runningSpacePerc[currentTimeframe - 1] = get_space_backlog_percent_test(currentTest);
		document.getElementById('reportCR_TF_SpaceCost' + '_test' + currentTest).innerHTML = formatter.format(get_space_backlog_cost_test(currentTest));
		$.jStorage.set(myuser + 'reportCR_TF_SpaceCost' + '_test' + currentTest, formatter.format(get_space_backlog_cost_test(currentTest)));
		document.getElementById('reportCR_TF_SpacePerc' + '_test' + currentTest).innerHTML = parseFloat((get_space_backlog_percent_test(currentTest) * 100)).toFixed(1);
		$.jStorage.set(myuser + 'reportCR_TF_SpacePerc' + '_test' + currentTest, parseFloat((get_space_backlog_percent_test(currentTest) * 100)).toFixed(1));

		//Cumulative Totals
		document.getElementById('reportCR_Cum_SpaceCost' + '_test' + currentTest).innerHTML = formatter.format(get_space_cost_cumulative());
		$.jStorage.set(myuser + 'reportCR_Cum_SpaceCost' + '_test' + currentTest, formatter.format(get_space_cost_cumulative()));
		document.getElementById('reportCR_Cum_UnitCost' + '_test' + currentTest).innerHTML = formatter.format(get_cost_cumulative() / rWorkAccomplished);
		$.jStorage.set(myuser + 'reportCR_Cum_UnitCost' + '_test' + currentTest, formatter.format(get_cost_cumulative() / rWorkAccomplished));
		document.getElementById('reportCR_Cum_OvertimeCost' + '_test' + currentTest).innerHTML = formatter.format(get_overtime_cost_cumulative());
		$.jStorage.set(myuser + 'reportCR_Cum_OvertimeCost' + '_test' + currentTest, formatter.format(get_overtime_cost_cumulative()));
		document.getElementById('reportCR_Cum_Cost' + '_test' + currentTest).innerHTML = formatter.format(get_cost_cumulative());
		$.jStorage.set(myuser + 'reportCR_Cum_Cost' + '_test' + currentTest, formatter.format(get_cost_cumulative()));

		//Scores
		var scoretest = parseFloat(get_tf_score_test(currentTest));
		runningScore[currentTimeframe - 1] = scoretest;
		document.getElementById('reportCR_GroupScore' + '_test' + currentTest).innerHTML = scoretest.toFixed(2);
		$.jStorage.set(myuser + 'reportCR_GroupScore' + '_test' + currentTest, scoretest.toFixed(2));
		document.getElementById('reportCR_Budget' + '_test' + currentTest).innerHTML = formatter.format(currentBudget); // + budget_bonus());
	//	$.jStorage.set(myuser + 'reportCR_Budget' + '_test' + currentTest, formatter.format(runningBudget[currentTimeframe - 1]));
		document.getElementById('reportCR_ProjectedScore' + '_test' + currentTest).innerHTML = get_projected_score().toFixed(2);
		$.jStorage.set(myuser + 'reportCR_ProjectedScore' + '_test' + currentTest, get_projected_score().toFixed(2));
		document.getElementById('reportCR_ProjectedCost' + '_test' + currentTest).innerHTML = formatter.format(get_projected_cost());
		$.jStorage.set(myuser + 'reportCR_ProjectedCost' + '_test' + currentTest, formatter.format(get_projected_cost()));

		for (var j = 1; j < 12; j++) {
			var jj = j + 3;
			var jjj = j + 2;
			if (j <= furthestWorkOut + 2) {
				$('#reportAWL_test' + currentTest + ' th:nth-child(' + jj + ')').show();
				$('#reportAWL_test' + currentTest + ' td:nth-child(' + jj + ')').show();
			} else {
				$('#reportAWL_test' + currentTest + ' th:nth-child(' + jj + ')').hide();
				$('#reportAWL_test' + currentTest + ' td:nth-child(' + jj + ')').hide();
			}
		}
	//	$( "#testrunresulttabs" ).tabs({ enabled: [currentTest - 1] });
	//	$( "#testrunresulttabs" ).enableTab(currentTest - 1);
	//	$( "#testrunresulttabs" ).tabs( "option", "active", currentTest - 1 );

		$( "#testrunresulttabs" ).enableTab(currentTest - 1);
		$( "#testrunresulttabs" ).tabs( "option", "active", currentTest - 1 );

		document.getElementById('nav-student-performTestRun').disabled = false;
		document.getElementById('testToFinal' + currentTest).disabled = false;
		document.getElementById('testCount').innerHTML = currentTest;

		$.jStorage.set(myuser + 'timeframeStatus' + currentTimeframe, "test");
		$.jStorage.set(myuser + 'timeframeStatusTestNumber' + currentTimeframe, currentTest);

		currentTest++;
		if (currentTest > simParamsTestOption) {
			document.getElementById('inputReport').disabled = true;
		}
		document.getElementById('inputCheck').disabled = false;
//
//END TEST
//
	} else {
		$("#inputReport").hide();
		$("#inputCheck").hide();

//
//BEGIN FINAL
//
		costWF = 0.00;
		costOT = 0.00;
		costHF = 0.00;
		costEQ = 0.00;
		costTTL = 0.00;

		if (currentTimeframe > 1) {
			var invLeftover = get_workload_total("INV"); // - getPlannedWork("INV");
			var slsLeftover = get_workload_total("SLS"); // - getPlannedWork("SLS");
			if ((invLeftover > simParamsINVDenialTrigger) || (slsLeftover > simParamsSLSDenialTrigger)) {
				denialsTriggered = 1;
				var invPenalty = (invLeftover - simParamsINVDenialTrigger) / simParamsINVDenialTrigger;
				var slsPenalty = (slsLeftover - simParamsSLSDenialTrigger) / simParamsSLSDenialTrigger;
				var denialFactor = (invPenalty + slsPenalty) * 0.005;
				denialsMulitplier = roundTo(1 - denialFactor, 3);
				console.log("denialFactor: " + denialFactor + "   denialsMulitplier: " + denialsMulitplier);
				denialsMessageShown = $.jStorage.get(myuser + 'denialsMessageShown', 0);
				if (denialsMessageShown == 0) {
					alert("One or more areas have been impacted by Materiel Release Denials. See your Workload Accomplished Report for details.");
					denialsMessageShown = 1;
					$.jStorage.set(myuser + 'denialsMessageShown', 1);
					$('.denialsMessage').show();
					$('.denialsMesssageINV').text(simParamsINVDenialTrigger);
					$('.denialsMesssageSLS').text(simParamsSLSDenialTrigger);
				}
			}
		}
		if (equipmentDown) {
			alert("One or more areas have been impacted by Equipment Downtime. See the Resource Report and the Workload Accomplished Report for details.");
		}


		for (var i = 0; i < jobs.length; i++) {

			//RESOURCE REPORT
			document.getElementById('reportRR_LH_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML;
			document.getElementById('reportRR_EH_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'equipHours').value;
			document.getElementById('reportRR_Bw_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'borrow').value;
			document.getElementById('reportRR_Ln_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'loan').value;
			document.getElementById('reportRR_Hr_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'hire').value;
			document.getElementById('reportRR_Fr_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'fire').value;
			document.getElementById('reportRR_SH_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'seasonal').value;
			document.getElementById('reportRR_Lv_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'leave').value;
			document.getElementById('reportRR_Rs_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'reserve').value;
			document.getElementById('reportRR_AWF_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML;
			document.getElementById('reportRR_OT_' + jobs[i] + currentTimeframe).innerHTML = document.getElementById('input' + jobs[i] + 'overtime').value;
			//SAVE STUDENT INPUT VALUES
			$.jStorage.set(myuser + 'reportRR_LH_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
			$.jStorage.set(myuser + 'reportRR_EH_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'equipHours').value);
			$.jStorage.set(myuser + 'reportRR_Bw_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'borrow').value);
			$.jStorage.set(myuser + 'reportRR_Ln_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'loan').value);
			$.jStorage.set(myuser + 'reportRR_Hr_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'hire').value);
			$.jStorage.set(myuser + 'reportRR_Fr_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'fire').value);
			$.jStorage.set(myuser + 'reportRR_SH_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'seasonal').value);
			$.jStorage.set(myuser + 'reportRR_Lv_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'leave').value);
			$.jStorage.set(myuser + 'reportRR_Rs_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'reserve').value);
			$.jStorage.set(myuser + 'reportRR_AWF_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			$.jStorage.set(myuser + 'reportRR_OT_' + jobs[i] + currentTimeframe, document.getElementById('input' + jobs[i] + 'overtime').value);

			$.jStorage.set(myuser + 'input' + jobs[i] + 'workforceStart' + currentTimeframe, document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'equipHours' + currentTimeframe, document.getElementById('input' + jobs[i] + 'equipHours').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'borrow' + currentTimeframe, document.getElementById('input' + jobs[i] + 'borrow').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'loan' + currentTimeframe, document.getElementById('input' + jobs[i] + 'loan').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'hire' + currentTimeframe, document.getElementById('input' + jobs[i] + 'hire').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'fire' + currentTimeframe, document.getElementById('input' + jobs[i] + 'fire').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'seasonal' + currentTimeframe, document.getElementById('input' + jobs[i] + 'seasonal').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'leave' + currentTimeframe, document.getElementById('input' + jobs[i] + 'leave').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'reserve' + currentTimeframe, document.getElementById('input' + jobs[i] + 'reserve').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'workforceAdjust' + currentTimeframe, document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'overtime' + currentTimeframe, document.getElementById('input' + jobs[i] + 'overtime').value);
			$.jStorage.set(myuser + 'input' + jobs[i] + 'plannedWork' + currentTimeframe, document.getElementById(jobs[i] + 'userPlannedWork').value);


			window['reportAdjustedWorkforce' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML;
			$.jStorage.set(myuser + 'reportAdjustedWorkforce' + jobs[i] + '[' + (currentTimeframe - 1) + ']', document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			window['reportOvertime' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = document.getElementById('input' + jobs[i] + 'overtime').value;
			$.jStorage.set(myuser + 'reportOvertime' + jobs[i] + '[' + (currentTimeframe - 1) + ']', document.getElementById('input' + jobs[i] + 'overtime').innerHTML);


	/*******
		//Equipment/manhour impacts based on scenario
	*****/


			//WORK ACCOMPLISHED REPORT
			//cache important values
			//get personnel assigned for function
			var startingWF = parseFloat(document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			startingWF = roundTo(startingWF, 2);
			//multiply by 8 for man-hours
			var manHours = startingWF * 8;
			manHours += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value);
			//cache manhrs std
			var manHoursMin = window['stdLabor' + jobs[i]];
			//get equipment hours assigned for function
			var equipHours = parseFloat(document.getElementById('input' + jobs[i] + 'equipHours').value * equipmentDowntimeMultiplier);
			//cache equip std
			var equipHoursMin = window['stdEquip' + jobs[i]];
			//cache available work
			var startingWL = get_workload_total(jobs[i]);
			workloadTotals[i] = get_workload_total(jobs[i]);
			//*** SAVE
			$.jStorage.set(myuser + 'workloadTotals' + jobs[i], workloadTotals[i]);

			var seasonalAdjustment = 0.00;
			if (document.getElementById('input' + jobs[i] + 'seasonal').value != null) {
				seasonalAdjustment = parseFloat(document.getElementById('input' + jobs[i] + 'seasonal').value);
			}
			var seasonalAdjustmentHours = seasonalAdjustment * 8;
		//	runningWorkAvailable[i] += workloadTotals[i];


			var costTotal = 0.00;
			costTotal += parseFloat(manHours * costParamsRegularLaborCost);
			costTotal += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost);
			costTotal += parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost));
			costTotal += parseFloat(equipHours * costParamsEquipmentCost);
			//add seasonal adjustment
			costTotal += parseFloat(seasonalAdjustmentHours * 9);
			//for final run
			runningCostTotal [i] += costTotal;


			window['reportPersonnelCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = parseFloat(manHours * costParamsRegularLaborCost);
			$.jStorage.set(myuser + 'reportPersonnelCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']', window['reportPersonnelCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']']);
			costWF += parseFloat(manHours * costParamsRegularLaborCost);
			window['reportOvertimeCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost);
			$.jStorage.set(myuser + 'reportOvertimeCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']', window['reportOvertimeCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']']);
			costOT += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost);
			window['reportHiringCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost));
			$.jStorage.set(myuser + 'reportHiringCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']', window['reportHiringCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']']);
			costHF += parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost));
			window['reportEquipmentCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = parseFloat(equipHours * costParamsEquipmentCost);
			$.jStorage.set(myuser + 'reportEquipmentCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']', window['reportEquipmentCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']']);
			costEQ += parseFloat(equipHours * costParamsEquipmentCost);
			window['reportTotalCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = costTotal;
			$.jStorage.set(myuser + 'reportTotalCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']', window['reportTotalCost' + jobs[i] + '[' + (currentTimeframe - 1) + ']']);
			costTTL += costTotal;
//alert('costWF' + jobs[i] + ': ' + costWF + '\n' + 'costOT' + jobs[i] + ': ' + costOT + '\n' + 'costHF' + jobs[i] + ': ' + costHF + '\n' + 'costEQ' + jobs[i] + ': ' + costEQ + '\n' + 'costTTL' + jobs[i] + ': ' + costTTL);
			document.getElementById('reportCR_C4P_' + jobs[i] + currentTimeframe).innerHTML = parseFloat(manHours * costParamsRegularLaborCost).toFixed(2);
			document.getElementById('reportCR_C4O_' + jobs[i] + currentTimeframe).innerHTML = parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value * costParamsOvertimeLaborCost).toFixed(2);
			document.getElementById('reportCR_C4H_' + jobs[i] + currentTimeframe).innerHTML = parseFloat((document.getElementById('input' + jobs[i] + 'hire').value * costParamsHiringCost) + (document.getElementById('input' + jobs[i] + 'fire').value * costParamsFiringCost)).toFixed(2);
			document.getElementById('reportCR_C4E_' + jobs[i] + currentTimeframe).innerHTML = parseFloat(equipHours * costParamsEquipmentCost).toFixed(2);
			document.getElementById('reportCR_TTL_' + jobs[i] + currentTimeframe).innerHTML = parseFloat(costTotal).toFixed(2);
			//SAVE COST REPORT
			$.jStorage.set(myuser + 'reportCR_C4P_' + jobs[i] + currentTimeframe, document.getElementById('reportCR_C4P_' + jobs[i] + currentTimeframe).innerHTML);
			$.jStorage.set(myuser + 'reportCR_C4O_' + jobs[i] + currentTimeframe, document.getElementById('reportCR_C4O_' + jobs[i] + currentTimeframe).innerHTML);
			$.jStorage.set(myuser + 'reportCR_C4H_' + jobs[i] + currentTimeframe, document.getElementById('reportCR_C4H_' + jobs[i] + currentTimeframe).innerHTML);
			$.jStorage.set(myuser + 'reportCR_C4E_' + jobs[i] + currentTimeframe, document.getElementById('reportCR_C4E_' + jobs[i] + currentTimeframe).innerHTML);
			$.jStorage.set(myuser + 'reportCR_TTL_' + jobs[i] + currentTimeframe, document.getElementById('reportCR_TTL_' + jobs[i] + currentTimeframe).innerHTML);


			var workToDo = true;

			//HERE GOES THE CHECK FOR COMPUTER DOWNTIME/ISSUES
			if (computerDown) {
				switch (jobs[i]) {
					case "IBN1":
					case "IBK1":
					case "IBN2":
					case "IBK2":
					case "IBN3":
					case "IBK3":
						workToDo = false;
						break;
					default:
						break;
				}
			}

			//HERE GOES THE CHECK FOR TRANSPORTATION STRIKE
			if (transportationStrike) {
				switch (jobs[i]) {
					case "TBN1":
					case "TBK1":
					case "TBN2":
					case "TBK2":
					case "TBN3":
					case "TBK3":
						workToDo = false;
						break;
					default:
						break;
				}
			}

			//add reserve workforce for job
			var reserveHrs = parseFloat(document.getElementById('input' + jobs[i] + 'reserve').value * 8);
			manHours += reserveHrs;


			if (denialsTriggered == 1) {
				switch (jobs[i]) {
					case "IBN1":
					case "IBK1":
					case "IBN2":
					case "IBK2":
					case "IBN3":
					case "IBK3":
						manHours = manHours * denialsMulitplier;
						break;
					default:
						break;
				}
			}

			//add miniscule amounts to manHours and equipHours avoid floating point error
		//	manHours += 0.0001;
		//	equipHours += 0.0001;
			manHours = roundTo(manHours, 2);
			equipHours = roundTo(equipHours, 2);
			manHoursMin = roundTo(manHoursMin, 2);
			equipHoursMin = roundTo(equipHoursMin, 2);
			console.log (jobs[i] + '\n' + '  workload:' + workloadTotals[i] + '\n' + 'planned work: ' + getPlannedWork(jobs[i], false) + '\n' + '  manHours' + manHours + '\n' + 'manHoursMin' + manHoursMin + '\n' + 'equipHours' + equipHours + '\n' + 'equipHoursMin' + equipHoursMin);

			var planned = getPlannedWork(jobs[i], false);
			if (workToDo) {
				if (workloadTotals[i] >= planned) {
					workloadTotals[i] = workloadTotals[i] - planned;
				} else {
					workloadTotals[i] = 0;
				}
			}
			/*
			//while there are labor hours
			while (workToDo && manHours >= manHoursMin) {
				//if we have equip hrs
				if (equipHours >= equipHoursMin) {
					//if there is work
					if (workloadTotals[i] > 0) {
						//decrement work line
						manHours -= manHoursMin;
						equipHours -= equipHoursMin;
						manHours = roundTo(manHours, 2);
						equipHours = roundTo(equipHours, 2);
						workloadTotals[i] = workloadTotals[i] - 1;
					} else {
						//ran out of work
						console.log('ran out of work: ' + jobs[i] + ' work left: ' + workloadTotals[i]);
						workToDo = false;
					}
				} else {
					//ran out of equipment hours
					console.log('ran out of equipment hours: ' + jobs[i] + ' work left: ' + workloadTotals[i]);
					workToDo = false;
				}
			} //ends when we run out of man hours
			*/
			//calculate work accomplished
			var workedLines = startingWL - workloadTotals [i];
			tfWorkedLines[i] = workedLines;
			console.log('workedLines ' + jobs[i] + ': ' + tfWorkedLines[i]);
			//save work accomplished for function in this tf
			runningWorkAccomplished [i][currentTimeframe - 1] = workedLines;


			//WORK BACKLOG
			//shift the backlog ahead a day first, then work backward through it
		//	window['backlog' + jobs[i]] = window['backlog' + jobs[i]].concat(window['backlog' + jobs[i]].splice(0,11));
			for (var pi = 11; pi >= 0; pi--) {
				//SAVE BACKLOG FOR RESUMING/RESET
			//	$.jStorage.set(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + currentTimeframe, window['backlog' + jobs[i] + '[' + pi + ']']);
				//END SAVE BACKLOG
				if (pi != 0) {
					window['backlog' + jobs[i] + '[' + pi + ']'] = window['backlog' + jobs[i] + '[' + (pi - 1) + ']'];
				} else {
					window['backlog' + jobs[i] + '[' + pi + ']'] = 0;
				}
			//	$.jStorage.set(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + (currentTimeframe + 1), window['backlog' + jobs[i] + '[' + pi + ']']);
			}
			window['backlog' + jobs[i]].unshift(window['backlog' + jobs[i]].pop());
			dworked = workedLines;
			var currentWorkOnTime = 0;
			//roll backwards through the backlog
			for (var lateIndex = 11; lateIndex >= 0; lateIndex--) {
				//if late work, decrement lines worked from backlog while adding to on time accomplished work
				//check for backlog
				if (window['backlog' + jobs[i] + '[' + lateIndex + ']'] > 0) {
					//set this to collapse report columns in available workload report and work accomplished report
					furthestWorkOut = lateIndex > furthestWorkOut ? lateIndex : furthestWorkOut;
					//loop through available backlog
					for (var blIndex = 0, blMax = window['backlog' + jobs[i] + '[' + lateIndex + ']']; blIndex < blMax; blIndex++) {
						//if we have lines that got worked, decrement lines to remove from backlog/increment on time
						if (dworked > 0) {
							dworked--;
							window['backlog' + jobs[i] + '[' + lateIndex + ']']--;
							if (lateIndex >= daysUntilLate[i]) {
								currentWorkOnTime++;
							}
						}
						if (lateIndex < daysUntilLate[i]) {
							currentWorkOnTime++;
						}
					}
				}
			}
			//console.log('saving backlog ' + jobs[i] + ' ');
			//SAVE BACKLOG FOR RESUME/RESET
			for (var pi = 11; pi >= 0; pi--) {
				$.jStorage.set(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + currentTimeframe, window['backlog' + jobs[i] + '[' + pi + ']']);
				$.jStorage.set(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + (currentTimeframe + 1), window['backlog' + jobs[i] + '[' + pi + ']']);
			//	console.log(jobs[i] + pi + ': ' + window['backlog' + jobs[i] + '[' + pi + ']']);
			}
			
			window['reportTotalLateLines' + jobs[i] + '[' + (currentTimeframe - 1) + ']'] = startingWL - currentWorkOnTime;
			$.jStorage.set(myuser + 'reportTotalLateLines' + jobs[i] + '[' + (currentTimeframe - 1) + ']', window['reportTotalLateLines' + jobs[i] + '[' + (currentTimeframe - 1) + ']']);

		//	alert('bl0: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 0 + ']'] + '\nbl1: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 1 + ']'] + '\nbl2: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 2 + ']'] + '\nbl3: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 3 + ']'] + '\nbl4: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 4 + ']'] + '\nbl5: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 5 + ']'] + '\nbl6: ' + jobs [i] + ': ' + window['backlog' + jobs[i] + '[' + 6 + ']'] + '\n ... on time ' + jobs [i] + ': ' + currentWorkOnTime);
			//backlog array should be worked, divide current work on time by total work availabe to get on time percentage, 
			//add both to rolling numbers and divide to get cumulative on time percentage
			var onTimePercentage = parseFloat(100 * (currentWorkOnTime / startingWL)).toFixed(2);
			runningWorkOnTime[i] += currentWorkOnTime;
			//*** SAVE
			$.jStorage.set(myuser + 'runningWorkOnTime' + jobs[i] + (currentTimeframe - 1), runningWorkOnTime[i]);

			tfWorkOnTime[i] = currentWorkOnTime;
			//*** SAVE
			$.jStorage.set(myuser + 'tfWorkOnTime' + jobs[i], tfWorkOnTime[i]);

			runningWorkAvailable[i] += startingWL;
			//*** SAVE
			$.jStorage.set(myuser + 'runningWorkAvailable' + jobs[i] + (currentTimeframe - 1), runningWorkAvailable[i]);

			var cumulativeOnTimePercentage = parseFloat(100 * (runningWorkOnTime[i] / runningWorkAvailable[i])).toFixed(2);


			//total backlog
			runningBacklog [i][currentTimeframe] = window['backlog' + jobs[i]].reduce(function(a,b) {return a + b;}, 0);
			//*** SAVE
			$.jStorage.set(myuser + 'runningBacklog' + jobs[i] + currentTimeframe, runningBacklog [i][currentTimeframe]);


		//	alert('bl ' + jobs [i] + ': ' + runningBacklog [i][currentTimeframe] + '... on time ' + jobs [i] + ': ' + currentWorkOnTime);

	/*******
		//TODO--ADD DENIALS LOGIC
	*****/

			//IF NOT A TEST RUN
			//push issues to trans
			switch (jobs[i]) {
				case "IBN1":
				case "IBK1":
				case "IBN2":
				case "IBK2":
				case "IBN3":
				case "IBK3":
					var nf = jobs[i];
					nf = nf.replace("I","T");
					window['simWLD' + simParamsUserWorkloadOption + nf + (currentTimeframe + 1)] = workedLines;
					$.jStorage.set(myuser + 'simWLD' + simParamsUserWorkloadOption + nf + (currentTimeframe + 1), workedLines);
					break;
				default:
					break;
			}
			/*
			for (var war_index = 0; war_index < 12; war_index++) {
				document.getElementById('reportAWL_' + war_index + 'D_' + jobs[i] + '_final').innerHTML = window['backlog' + jobs[i] + '[' + war_index + ']'];
			} */

			//populate workload accomplished report
			//DWL
			document.getElementById('reportAWL_DWL_' + jobs[i] + '_final' + currentTimeframe).innerHTML = document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML;
			//SAVE WORKLOAD ACCOMPLISHED
			$.jStorage.set(myuser + 'reportAWL_DWL_' + jobs[i] + currentTimeframe, document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML);
			//1D
			for (var war_indexT = 1; war_indexT <= 12; war_indexT++) {
				document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i] + '_final' + currentTimeframe).innerHTML = document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i]).innerHTML;
				$.jStorage.set(myuser + 'reportAWL_' + war_indexT + 'D_' + jobs[i] + '_final' + currentTimeframe, document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i]).innerHTML);
			}
			// ~ 12D
			//TWA
			document.getElementById('reportAWL_TWA_' + jobs[i] + '_final' + currentTimeframe).innerHTML = document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML;
			$.jStorage.set(myuser + 'reportAWL_TWA_' + jobs[i] + currentTimeframe, document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML);
			//WF (work accomplished)
			document.getElementById('reportAWL_WF_' + jobs[i] + '_final' + currentTimeframe).innerHTML = workedLines;
			$.jStorage.set(myuser + 'reportAWL_WF_' + jobs[i] + currentTimeframe, workedLines);
			//On time
			document.getElementById('reportAWL_OnTime_' + jobs[i] + '_final' + currentTimeframe).innerHTML = onTimePercentage;
			$.jStorage.set(myuser + 'reportAWL_OnTime_' + jobs[i] + currentTimeframe, onTimePercentage);
			//on time cumulative
			document.getElementById('reportAWL_OnTimeC_' + jobs[i] + '_final' + currentTimeframe).innerHTML = cumulativeOnTimePercentage;
			$.jStorage.set(myuser + 'reportAWL_OnTimeC_' + jobs[i] + currentTimeframe, cumulativeOnTimePercentage);

		}
		//LOOP DONE


		//RESOURCE REPORT
		document.getElementById('reportRR_LH_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALworkforceStart').innerHTML;
		document.getElementById('reportRR_EH_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALequipHours').innerHTML;
		document.getElementById('reportRR_Bw_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALborrow').innerHTML;
		document.getElementById('reportRR_Ln_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALloan').innerHTML;
		document.getElementById('reportRR_Hr_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALhire').innerHTML;
		document.getElementById('reportRR_Fr_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALfire').innerHTML;
		document.getElementById('reportRR_SH_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALseasonal').innerHTML;
		document.getElementById('reportRR_Lv_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALleave').innerHTML;
		document.getElementById('reportRR_Rs_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALreserve').innerHTML;
		document.getElementById('reportRR_AWF_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALworkforceAdjust').innerHTML;
		document.getElementById('reportRR_OT_Total' + currentTimeframe).innerHTML = document.getElementById('inputTOTALovertime').innerHTML;

		document.getElementById('reportRR_WFC_final' + currentTimeframe).innerHTML = simParamsWorkforceCeiling;
		document.getElementById('reportRR_AWF_final' + currentTimeframe).innerHTML = parseInt(document.getElementById('inputTOTALworkforceAdjust').innerHTML + document.getElementById('inputTOTALleave').innerHTML);

		//SAVE RESOURCE REPORT TOTALS
		$.jStorage.set(myuser + 'reportRR_LH_Total' + currentTimeframe, document.getElementById('inputTOTALworkforceStart').innerHTML);
		$.jStorage.set(myuser + 'reportRR_EH_Total' + currentTimeframe, document.getElementById('inputTOTALequipHours').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Bw_Total' + currentTimeframe, document.getElementById('inputTOTALborrow').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Ln_Total' + currentTimeframe, document.getElementById('inputTOTALloan').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Hr_Total' + currentTimeframe, document.getElementById('inputTOTALhire').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Fr_Total' + currentTimeframe, document.getElementById('inputTOTALfire').innerHTML);
		$.jStorage.set(myuser + 'reportRR_SH_Total' + currentTimeframe, document.getElementById('inputTOTALseasonal').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Lv_Total' + currentTimeframe, document.getElementById('inputTOTALleave').innerHTML);
		$.jStorage.set(myuser + 'reportRR_Rs_Total' + currentTimeframe, document.getElementById('inputTOTALreserve').innerHTML);
		$.jStorage.set(myuser + 'reportRR_AWF_Total' + currentTimeframe, document.getElementById('inputTOTALworkforceAdjust').innerHTML);
		$.jStorage.set(myuser + 'reportRR_OT_Total' + currentTimeframe, document.getElementById('inputTOTALovertime').innerHTML);
		$.jStorage.set(myuser + 'reportRR_WFC_final' + currentTimeframe, simParamsWorkforceCeiling);
		$.jStorage.set(myuser + 'reportRR_AWF_final' + currentTimeframe, parseInt(document.getElementById('inputTOTALworkforceAdjust').innerHTML + document.getElementById('inputTOTALleave').innerHTML));

		//WORKLOAD ACCOMPLISHED
		var awlDWLTotal = 0;
		var awlTWATotal = 0;
		var awlWFTotal = 0;
		var awlWOTTotal = 0;
		var awlWOTCTotal = 0;
		var awlTWACumulative = 0;
		for (var war_indexTotal = 0; war_indexTotal < jobs.length; war_indexTotal++) {
			window['reportWorkloadAvailable' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']'] = document.getElementById('reportAWL_TWA_' + jobs[war_indexTotal] + '_final' + currentTimeframe).innerHTML;
			$.jStorage.set(myuser + 'reportWorkloadAvailable' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']', window['reportWorkloadAvailable' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']']);
			window['reportWorkloadAccomplished' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']'] = document.getElementById('reportAWL_WF_' + jobs[war_indexTotal] + '_final' + currentTimeframe).innerHTML;
			$.jStorage.set(myuser + 'reportWorkloadAccomplished' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']', window['reportWorkloadAccomplished' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']']);
			window['reportCumulativeOntime' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']'] = tfWorkOnTime[war_indexTotal];
			$.jStorage.set(myuser + 'reportCumulativeOntime' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']', window['reportCumulativeOntime' + jobs[war_indexTotal] + '[' + (currentTimeframe - 1) + ']']);
			awlDWLTotal += parseFloat(document.getElementById('reportAWL_DWL_' + jobs[war_indexTotal] + '_final' + currentTimeframe).innerHTML);
			awlTWATotal += parseFloat(document.getElementById('reportAWL_TWA_' + jobs[war_indexTotal] + '_final' + currentTimeframe).innerHTML);
			awlWFTotal += parseFloat(document.getElementById('reportAWL_WF_' + jobs[war_indexTotal] + '_final' + currentTimeframe).innerHTML);
			awlWOTTotal += tfWorkOnTime[war_indexTotal];
			awlWOTCTotal += runningWorkOnTime [war_indexTotal];
			awlTWACumulative += runningWorkAvailable [war_indexTotal];
		}
		runningWorkAccomplishedTotal += awlWFTotal;
		//*** SAVE
		$.jStorage.set(myuser + 'runningWorkAccomplishedTotal', runningWorkAccomplishedTotal);
		$.jStorage.set(myuser + 'runningWorkAccomplishedTotal' + (currentTimeframe), runningWorkAccomplishedTotal);

	//	reportAWL_DWL_Total
		document.getElementById('reportAWL_DWL_Total_final' + currentTimeframe).innerHTML = awlDWLTotal;
		$.jStorage.set(myuser + 'reportAWL_DWL_Total_final' + currentTimeframe, awlDWLTotal);
	//	reportAWL_TWA_Total
		document.getElementById('reportAWL_TWA_Total_final' + currentTimeframe).innerHTML = awlTWATotal;
		$.jStorage.set(myuser + 'reportAWL_TWA_Total_final' + currentTimeframe, awlTWATotal);
	//	reportAWL_WF_Total
		document.getElementById('reportAWL_WF_Total_final' + currentTimeframe).innerHTML = awlWFTotal;
		$.jStorage.set(myuser + 'reportAWL_WF_Total_final' + currentTimeframe, awlWFTotal);
	//	reportAWL_OnTime_Total
		onTimeScore = parseFloat(100 * (awlWOTTotal / awlTWATotal));
		document.getElementById('reportAWL_OnTime_Total_final' + currentTimeframe).innerHTML = parseFloat(100 * (awlWOTTotal / awlTWATotal)).toFixed(2);
		$.jStorage.set(myuser + 'reportAWL_OnTime_Total_final' + currentTimeframe, parseFloat(100 * (awlWOTTotal / awlTWATotal)).toFixed(2));
	//	reportAWL_OnTimeC_Total
		onTimeScoreCumulative = parseFloat(100 * (awlWOTCTotal / awlTWACumulative));
		document.getElementById('reportAWL_OnTimeC_Total_final' + currentTimeframe).innerHTML = parseFloat(100 * (awlWOTCTotal / awlTWACumulative)).toFixed(2);
		$.jStorage.set(myuser + 'reportAWL_OnTimeC_Total_final' + currentTimeframe, parseFloat(100 * (awlWOTCTotal / awlTWACumulative)).toFixed(2));
	//	reportAWL_TWAC_Total_final
		document.getElementById('reportAWL_TWAC_Total_final' + currentTimeframe).innerHTML = runningWorkAccomplishedTotal;
		$.jStorage.set(myuser + 'reportAWL_TWAC_Total_final' + currentTimeframe, runningWorkAccomplishedTotal);


		//calculate totals
		//COST REPORT
		//TF Totals
		document.getElementById('reportCR_C4P_Total' + currentTimeframe).innerHTML = formatter.format(costWF);
		$.jStorage.set(myuser + 'reportCR_C4P_Total' + currentTimeframe, formatter.format(costWF));
		document.getElementById('reportCR_C4O_Total' + currentTimeframe).innerHTML = formatter.format(costOT);
		$.jStorage.set(myuser + 'reportCR_C4O_Total' + currentTimeframe, formatter.format(costOT));
		runningOvertimeCost[currentTimeframe - 1] = costOT;
		$.jStorage.set(myuser + 'runningOvertimeCost' + (currentTimeframe - 1), costOT);
		document.getElementById('reportCR_C4H_Total' + currentTimeframe).innerHTML = formatter.format(costHF);
		$.jStorage.set(myuser + 'reportCR_C4H_Total' + currentTimeframe, formatter.format(costHF));
		document.getElementById('reportCR_C4E_Total' + currentTimeframe).innerHTML = formatter.format(costEQ);
		$.jStorage.set(myuser + 'reportCR_C4E_Total' + currentTimeframe, formatter.format(costEQ));
		document.getElementById('reportCR_TTL_Total' + currentTimeframe).innerHTML = formatter.format(costTTL);
		$.jStorage.set(myuser + 'reportCR_TTL_Total' + currentTimeframe, formatter.format(costTTL));
		runningOverallCost[currentTimeframe - 1] = costTTL;
		$.jStorage.set(myuser + 'runningOverallCost' + (currentTimeframe - 1), costTTL);

		//TF Totals cont.
		document.getElementById('reportCR_TF_Backlog' + currentTimeframe).innerHTML = get_backlog_total();
		$.jStorage.set(myuser + 'reportCR_TF_Backlog' + currentTimeframe, get_backlog_total());
		runningUnitCost[currentTimeframe - 1] = parseFloat(costTTL / get_tf_totalLinesWorked());
		$.jStorage.set(myuser + 'runningUnitCost' + (currentTimeframe - 1), parseFloat(costTTL / get_tf_totalLinesWorked()));
		document.getElementById('reportCR_TF_UnitCost' + currentTimeframe).innerHTML = formatter.format(parseFloat(costTTL / get_tf_totalLinesWorked()));
		$.jStorage.set(myuser + 'reportCR_TF_UnitCost' + currentTimeframe, formatter.format(parseFloat(costTTL / get_tf_totalLinesWorked())));
		runningSpaceCost[currentTimeframe - 1] = get_space_backlog_cost();
		$.jStorage.set(myuser + 'runningSpaceCost' + (currentTimeframe - 1), get_space_backlog_cost());
		runningSpacePerc[currentTimeframe - 1] = get_space_backlog_percent();
		$.jStorage.set(myuser + 'runningSpacePerc' + (currentTimeframe - 1), get_space_backlog_percent());
		document.getElementById('reportCR_TF_SpaceCost' + currentTimeframe).innerHTML = formatter.format(get_space_backlog_cost());
		$.jStorage.set(myuser + 'reportCR_TF_SpaceCost' + currentTimeframe, formatter.format(get_space_backlog_cost()));
		document.getElementById('reportCR_TF_SpacePerc' + currentTimeframe).innerHTML = parseFloat((get_space_backlog_percent() * 100)).toFixed(1);
		$.jStorage.set(myuser + 'reportCR_TF_SpacePerc' + currentTimeframe, parseFloat((get_space_backlog_percent() * 100)).toFixed(1));

		//Cumulative Totals
		document.getElementById('reportCR_Cum_SpaceCost' + currentTimeframe).innerHTML = formatter.format(get_space_cost_cumulative());
		$.jStorage.set(myuser + 'reportCR_Cum_SpaceCost' + currentTimeframe, formatter.format(get_space_cost_cumulative()));
		document.getElementById('reportCR_Cum_UnitCost' + currentTimeframe).innerHTML = formatter.format(get_average_unit_cost());
		$.jStorage.set(myuser + 'reportCR_Cum_UnitCost' + currentTimeframe, formatter.format(get_average_unit_cost()));
		document.getElementById('reportCR_Cum_OvertimeCost' + currentTimeframe).innerHTML = formatter.format(get_overtime_cost_cumulative());
		$.jStorage.set(myuser + 'reportCR_Cum_OvertimeCost' + currentTimeframe, formatter.format(get_overtime_cost_cumulative()));
		document.getElementById('reportCR_Cum_Cost' + currentTimeframe).innerHTML = formatter.format(get_cost_cumulative());
		$.jStorage.set(myuser + 'reportCR_Cum_Cost' + currentTimeframe, formatter.format(get_cost_cumulative()));

		//Scores
		runningScore[currentTimeframe - 1] = parseFloat(get_tf_score());
		$.jStorage.set(myuser + 'runningScore' + (currentTimeframe - 1), parseFloat(get_tf_score()));
		var bb = budget_bonus();
		runningBudget[currentTimeframe - 1] = currentBudget + bb;
		$.jStorage.set(myuser + 'runningBudget' + (currentTimeframe - 1), parseFloat(currentBudget + bb));

		document.getElementById('reportCR_GroupScore' + currentTimeframe).innerHTML = parseFloat(get_tf_score()).toFixed(2);
		$.jStorage.set(myuser + 'reportCR_GroupScore' + currentTimeframe, parseFloat(get_tf_score()).toFixed(2));
		document.getElementById('reportCR_Budget' + currentTimeframe).innerHTML = formatter.format(runningBudget[currentTimeframe - 1]);
		$.jStorage.set(myuser + 'reportCR_Budget' + currentTimeframe, formatter.format(runningBudget[currentTimeframe - 1]));
		document.getElementById('reportCR_ProjectedScore' + currentTimeframe).innerHTML = get_projected_score().toFixed(2);
		$.jStorage.set(myuser + 'reportCR_ProjectedScore' + currentTimeframe, get_projected_score().toFixed(2));
		document.getElementById('reportCR_ProjectedCost' + currentTimeframe).innerHTML = formatter.format(get_projected_cost());
		$.jStorage.set(myuser + 'reportCR_ProjectedCost' + currentTimeframe, formatter.format(get_projected_cost()));
		// reportSpentActual[currentTimeframe - 1] = costTTL;
		reportSpentActual[currentTimeframe - 1] = get_cost_cumulative();
		$.jStorage.set(myuser + 'reportSpentActual[' + (currentTimeframe - 1) + ']', window['reportSpentActual[' + (currentTimeframe - 1) + ']']);
		reportSpentProjected[currentTimeframe - 1] = get_projected_cost_at_timeframe();
		$.jStorage.set(myuser + 'reportSpentProjected[' + (currentTimeframe - 1) + ']', window['reportSpentProjected[' + (currentTimeframe - 1) + ']']);
		reportAverageUnitCost[currentTimeframe - 1] = get_average_unit_cost();
		$.jStorage.set(myuser + 'reportAverageUnitCost[' + (currentTimeframe - 1) + ']', window['reportAverageUnitCost[' + (currentTimeframe - 1) + ']']);
		reportActualWorkforce[currentTimeframe - 1] = parseInt(document.getElementById('inputTOTALworkforceAdjust').innerHTML + document.getElementById('inputTOTALleave').innerHTML);
		$.jStorage.set(myuser + 'reportActualWorkforce[' + (currentTimeframe - 1) + ']', window['reportActualWorkforce[' + (currentTimeframe - 1) + ']']);
		reportCurrentScore[currentTimeframe - 1] = get_tf_score();
		$.jStorage.set(myuser + 'reportCurrentScore[' + (currentTimeframe - 1) + ']', window['reportCurrentScore[' + (currentTimeframe - 1) + ']']);
		reportProjectedScore[currentTimeframe - 1] = get_projected_score();
		$.jStorage.set(myuser + 'reportProjectedScore[' + (currentTimeframe - 1) + ']', window['reportProjectedScore[' + (currentTimeframe - 1) + ']']);

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
		$.jStorage.set(myuser + 'timeframeStatus' + currentTimeframe, "final");

		for (var j = 1; j < 12; j++) {
			var jj = j + 3;
			var jjj = j + 2;
			if (j < furthestWorkOut) {
				$('#reportAWL_final' + currentTimeframe + ' th:nth-child(' + jj + ')').show();
				$('#reportAWL_final' + currentTimeframe + ' td:nth-child(' + jj + ')').show();
			} else {
				$('#reportAWL_final' + currentTimeframe + ' th:nth-child(' + jj + ')').hide();
				$('#reportAWL_final' + currentTimeframe + ' td:nth-child(' + jj + ')').hide();
			}
		}

	//	alert ('show workloadTotals: ' + workloadTotals);
		if (test == 'true') {
			$( "#testrunresulttabs" ).tabs({ enabled: [currentTest] });
			currentTest++;
			document.getElementById('nav-student-performTestRun').disabled = false;
		} else {
			$( "#historicalresulttabs" ).enableTab(currentTimeframe - 1);
			$( "#historicalresulttabs" ).tabs( "option", "active", currentTimeframe - 1 );
			document.getElementById('nav-student-performFinalRun').disabled = false;
			if (window['reviewsParamsReview' + zeroPad(currentTimeframe, 2)] == 1 || window['reviewsParamsReview' + zeroPad(currentTimeframe, 2)] == "1") {
				alert("Contact your instructor for review and analysis.");
				document.getElementById('nav-student-instructorReview').disabled = false;
				$("#instructor-review-message").show();
			} else {
				$("#proceedToNextTimeframe").show();
				if (currentTimeframe == simParamsTimeframes) {
					$("#proceedToNextTimeframe").hide();
				}
			}
		}
	}
	}).fadeOut();
}

function getPlannedWork(f, ignoreImpact) {
	var startingWF = parseFloat(document.getElementById('input' + f + 'workforceAdjust').innerHTML);
	startingWF = roundTo(startingWF, 2);
	//multiply by 8 for man-hours
	var manHours = startingWF * 8;
	manHours += parseFloat(document.getElementById('input' + f + 'overtime').value);
	//cache manhrs std
	var manHoursMin = window['stdLabor' + f];
	//get equipment hours assigned for function
	var equipHours = parseFloat(document.getElementById('input' + f + 'equipHours').value);
	//cache equip std
	var equipHoursMin = window['stdEquip' + f];
	//cache available work
	var startingWL = get_workload_total(f);

	var seasonalAdjustment = 0.00;
	if (document.getElementById('input' + f + 'seasonal').value != null) {
		seasonalAdjustment = parseFloat(document.getElementById('input' + f + 'seasonal').value);
	}
	var seasonalAdjustmentHours = seasonalAdjustment * 8;

	var reserveHrs = parseFloat(document.getElementById('input' + f + 'reserve').value * 8);
	manHours += reserveHrs;

	if (!ignoreImpact) {
		equipHours = equipHours * equipmentDowntimeMultiplier;
		if (denialsTriggered == 1) {
			switch (f) {
				case "IBN1":
				case "IBK1":
				case "IBN2":
				case "IBK2":
				case "IBN3":
				case "IBK3":
					manHours = manHours * 0.95;
					break;
				default:
					break;
			}
		}
	}

	manHours = roundTo(manHours, 2);
	equipHours = roundTo(equipHours, 2);

	var plannedWork = roundTo(manHours / manHoursMin, 2);
	console.log('get planned work ' + f + ': ' + plannedWork);
	plannedWork = Math.floor(plannedWork);
	console.log('get planned work ' + f + ' (floor):' + plannedWork);

	var plannedWorkEquip = roundTo(equipHours / equipHoursMin, 2);
	console.log('get planned equip ' + f + ': ' + plannedWorkEquip);

	if (plannedWorkEquip < plannedWork) {
		plannedWork = Math.floor(plannedWorkEquip);
	}
	return plannedWork;
}

function rebuildReports(tfMax, retain) {
	console.log("rebuilding reports. tfMax: " + tfMax + "   retain: " + retain);
	for (var t = 1; t <= tfMax; t++) {
		//FUNCTIONS
		for (var i = 0; i < jobs.length; i++) {
			//RESOURCE REPORT
		//	document.getElementById('reportRR_LH_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceStart' + t, window['workforceParams' + jobs[i]]);
		//	document.getElementById('reportRR_EH_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'equipHours' + t, 0);
		//	document.getElementById('reportRR_Bw_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'borrow' + t, 0);
		//	document.getElementById('reportRR_Ln_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'loan' + t, 0);
		//	document.getElementById('reportRR_Hr_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'hire' + t, 0);
		//	document.getElementById('reportRR_Fr_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'fire' + t, 0);
		//	document.getElementById('reportRR_SH_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'seasonal' + t, 0);
		//	document.getElementById('reportRR_Lv_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'leave' + t, 0);
		//	document.getElementById('reportRR_Rs_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'reserve' + t, 0);
		//	document.getElementById('reportRR_AWF_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceAdjust' + t, window['workforceParams' + jobs[i]]);
		//	document.getElementById('reportRR_OT_' + jobs[i] + t).value = $.jStorage.get(myuser + 'input' + jobs[i] + 'overtime' + t, 0);

			document.getElementById('reportRR_LH_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportRR_LH_' + jobs[i] + t, window['workforceParams' + jobs[i]]);
			document.getElementById('reportRR_EH_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_EH_' + jobs[i] + t, 0);
			document.getElementById('reportRR_Bw_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_Bw_' + jobs[i] + t, 0);
			document.getElementById('reportRR_Ln_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_Ln_' + jobs[i] + t, 0);
			document.getElementById('reportRR_Hr_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_Hr_' + jobs[i] + t, 0);
			document.getElementById('reportRR_Fr_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_Fr_' + jobs[i] + t, 0);
			document.getElementById('reportRR_SH_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_SH_' + jobs[i] + t, 0);
			document.getElementById('reportRR_Lv_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_Lv_' + jobs[i] + t, 0);
			document.getElementById('reportRR_Rs_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_Rs_' + jobs[i] + t, 0);
			document.getElementById('reportRR_AWF_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_' + jobs[i] + t, window['workforceParams' + jobs[i]]);
			document.getElementById('reportRR_OT_' + jobs[i] + t).value = $.jStorage.get(myuser + 'reportRR_OT_' + jobs[i] + t, 0);

			//FILL RESOURCE INPUT FIELDS
			if ((t == tfMax) && ((retain == 1) || (retain == "1"))) {
				document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceStart' + (t + 1), window['workforceParams' + jobs[i]]);
				document.getElementById('input' + jobs[i] + 'equipHours').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'equipHours' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'borrow').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'borrow' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'loan').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'loan' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'hire').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'hire' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'fire').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'fire' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'seasonal').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'seasonal' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'leave').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'leave' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'reserve').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'reserve' + (t + 1), 0);
				document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceAdjust' + (t + 1), window['workforceParams' + jobs[i]]);
				document.getElementById('input' + jobs[i] + 'overtime').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'overtime' + (t + 1), 0);

				document.getElementById(jobs[i] + 'equipHours').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'equipHours' + (t + 1), "0.0");
				document.getElementById(jobs[i] + 'availableWorkload').innerHTML = get_workload_total(jobs[i]);
				document.getElementById(jobs[i] + 'workforceStart').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceStart' + (t + 1), window['workforceParams' + jobs[i]]);
				document.getElementById(jobs[i] + 'workforceAdjust').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceAdjust' + (t + 1), window['workforceParams' + jobs[i]]);
				document.getElementById(jobs[i] + 'extraHours').innerHTML = "0.0";
				document.getElementById(jobs[i] + 'neededHours').innerHTML = "0.0";
				document.getElementById(jobs[i] + 'changesBorrow').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'borrow' + (t + 1), 0);
				document.getElementById(jobs[i] + 'changesLoan').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'loan' + (t + 1), 0);
				document.getElementById(jobs[i] + 'changesHire').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'hire' + (t + 1), 0);
				document.getElementById(jobs[i] + 'changesFire').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'fire' + (t + 1), 0);
				document.getElementById(jobs[i] + 'changesSeasonal').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'seasonal' + (t + 1), 0);
				document.getElementById(jobs[i] + 'changesLeave').value =  $.jStorage.get(myuser + 'input' + jobs[i] + 'leave' + (t + 1), 0);
				document.getElementById(jobs[i] + 'reserve').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'reserve' + (t + 1), 0);
				document.getElementById(jobs[i] + 'overtimeHours').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'overtime' + (t + 1), 0);
				document.getElementById(jobs[i] + 'userPlannedWork').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'plannedWork' + (t + 1), 0);

			}

			//COST REPORT
			document.getElementById('reportCR_C4P_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4P_' + jobs[i] + t, 0);
			document.getElementById('reportCR_C4O_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4O_' + jobs[i] + t, 0);
			document.getElementById('reportCR_C4H_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4H_' + jobs[i] + t, 0);
			document.getElementById('reportCR_C4E_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4E_' + jobs[i] + t, 0);
			document.getElementById('reportCR_TTL_' + jobs[i] + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TTL_' + jobs[i] + t, 0);

			//WORKLOAD ACCOMPLISHED REPORT
			//DWL
			document.getElementById('reportAWL_DWL_' + jobs[i] + '_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_DWL_' + jobs[i] + t, 0);
			//1D
			for (var war_indexT = 1; war_indexT <= 12; war_indexT++) {
				document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i] + '_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_' + war_indexT + 'D_' + jobs[i] + '_final' + t, 0);
			}
			// ~ 12D
			//TWA
			document.getElementById('reportAWL_TWA_' + jobs[i] + '_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_TWA_' + jobs[i] + t, 0);
			//WF (work accomplished)
			document.getElementById('reportAWL_WF_' + jobs[i] + '_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_WF_' + jobs[i] + t, 0);
			//On time
			document.getElementById('reportAWL_OnTime_' + jobs[i] + '_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTime_' + jobs[i] + t, 0);
			//on time cumulative
			document.getElementById('reportAWL_OnTimeC_' + jobs[i] + '_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTimeC_' + jobs[i] + t, 0);
		}
		adjust_total_workforce();
		adjust_total_workforce_assisted();
		//TOTALS
		//RESOURCE REPORT
		document.getElementById('reportRR_LH_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_LH_Total' + t, 0);
		document.getElementById('reportRR_EH_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_EH_Total' + t, 0);
		document.getElementById('reportRR_Bw_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Bw_Total' + t, 0);
		document.getElementById('reportRR_Ln_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Ln_Total' + t, 0);
		document.getElementById('reportRR_Hr_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Hr_Total' + t, 0);
		document.getElementById('reportRR_Fr_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Fr_Total' + t, 0);
		document.getElementById('reportRR_SH_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_SH_Total' + t, 0);
		document.getElementById('reportRR_Lv_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Lv_Total' + t, 0);
		document.getElementById('reportRR_Rs_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Rs_Total' + t, 0);
		document.getElementById('reportRR_AWF_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_Total' + t, 0);
		document.getElementById('reportRR_OT_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_OT_Total' + t, 0);

		document.getElementById('reportRR_WFC_final' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_WFC_final' + t, simParamsWorkforceCeiling);
		document.getElementById('reportRR_AWF_final' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_final' + t, 0);


		//WORKLOAD ACCOMPLISHED
		document.getElementById('reportAWL_DWL_Total_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_DWL_Total_final' + t, 0);
		document.getElementById('reportAWL_TWA_Total_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_TWA_Total_final' + t, 0);
		document.getElementById('reportAWL_WF_Total_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_WF_Total_final' + t, 0);
		document.getElementById('reportAWL_OnTime_Total_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTime_Total_final' + t, 0);
		document.getElementById('reportAWL_OnTimeC_Total_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTimeC_Total_final' + t, 0);
		document.getElementById('reportAWL_TWAC_Total_final' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_TWAC_Total_final' + t, 0);


		//COST REPORT
		document.getElementById('reportCR_C4P_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4P_Total' + t, 0);
		document.getElementById('reportCR_C4O_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4O_Total' + t, 0);
		runningOvertimeCost[t - 1] = $.jStorage.get(myuser + 'runningOvertimeCost' + (t - 1), 0);
		document.getElementById('reportCR_C4H_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4H_Total' + t, 0);
		document.getElementById('reportCR_C4E_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4E_Total' + t, 0);
		document.getElementById('reportCR_TTL_Total' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TTL_Total' + t, 0);
		runningOverallCost[t - 1] = $.jStorage.get(myuser + 'runningOverallCost' + (t - 1), 0);

		//TF Totals cont.
		document.getElementById('reportCR_TF_Backlog' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_Backlog' + t, 0);
		runningUnitCost[t - 1] = $.jStorage.get(myuser + 'runningUnitCost' + (t - 1), 0);
		document.getElementById('reportCR_TF_UnitCost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_UnitCost' + t, 0);
		runningSpaceCost[t - 1] = $.jStorage.get(myuser + 'runningSpaceCost' + (t - 1), 0);
		runningSpacePerc[t - 1] = $.jStorage.get(myuser + 'runningSpacePerc' + (t - 1), 0);
		document.getElementById('reportCR_TF_SpaceCost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_SpaceCost' + t, 0);
		document.getElementById('reportCR_TF_SpacePerc' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_SpacePerc' + t, 0);

		//Cumulative Totals
		document.getElementById('reportCR_Cum_SpaceCost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_SpaceCost' + t, 0);
		document.getElementById('reportCR_Cum_UnitCost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_UnitCost' + t, 0);
		document.getElementById('reportCR_Cum_OvertimeCost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_OvertimeCost' + t, 0);
		document.getElementById('reportCR_Cum_Cost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_Cost' + t, 0);

		//Scores
		runningScore[t -1] = $.jStorage.get(myuser + 'runningScore' + (t - 1), 0);
		runningBudget[t - 1] = $.jStorage.get(myuser + 'runningBudget' + (t - 1), 0);

		document.getElementById('reportCR_GroupScore' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_GroupScore' + t, 0);
		document.getElementById('reportCR_Budget' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Budget' + t, 0);
		document.getElementById('reportCR_ProjectedScore' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_ProjectedScore' + t, 0);
		document.getElementById('reportCR_ProjectedCost' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_ProjectedCost' + t, 0);

		reportSpentActual[t - 1] = $.jStorage.get(myuser + 'reportSpentActual[' + (t - 1) + ']', window['reportSpentActual[' + (t - 1) + ']']);
		reportSpentProjected[t - 1] = $.jStorage.get(myuser + 'reportSpentProjected[' + (t - 1) + ']', window['reportSpentProjected[' + (t - 1) + ']']);
		reportAverageUnitCost[t - 1] = $.jStorage.get(myuser + 'reportAverageUnitCost[' + (t - 1) + ']', window['reportAverageUnitCost[' + (t - 1) + ']']);
		reportActualWorkforce[t - 1] = $.jStorage.get(myuser + 'reportActualWorkforce[' + (t - 1) + ']', window['reportActualWorkforce[' + (t - 1) + ']']);
		reportCurrentScore[t - 1] = $.jStorage.get(myuser + 'reportCurrentScore[' + (t - 1) + ']', window['reportCurrentScore[' + (t - 1) + ']']);
		reportProjectedScore[t - 1] = $.jStorage.get(myuser + 'reportProjectedScore[' + (t - 1) + ']', window['reportProjectedScore[' + (t - 1) + ']']);
	}

}

function get_space_util_cost_final() {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += runningSpaceCost[i];
	}
	return count;
}

function get_cost_for_personnel(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportPersonnelCost' + f + '[' + i + ']']);
	}
	return count;
}
function get_cost_for_personnel_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_cost_for_personnel(jobs[i]);
	}
	return count;
}
function get_cost_for_overtime(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportOvertimeCost' + f + '[' + i + ']']);
	}
	return count;
}
function get_cost_for_overtime_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_cost_for_overtime(jobs[i]);
	}
	return count;
}
function get_cost_for_hiring(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportHiringCost' + f + '[' + i + ']']);
	}
	return count;
}
function get_cost_for_hiring_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_cost_for_hiring(jobs[i]);
	}
	return count;
}
function get_cost_for_equipment(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportEquipmentCost' + f + '[' + i + ']']);
	}
	return count;
}
function get_cost_for_equipment_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_cost_for_equipment(jobs[i]);
	}
	return count;
}
function get_cost_for_operations(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportTotalCost' + f + '[' + i + ']']);
	}
	return count;
}
function get_cost_for_operations_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_cost_for_operations(jobs[i]);
	}
	return count;
}

function get_adjusted_workforce_min(f) {
	var count = parseFloat(window['workforceParams' + f]);
	for (var i = 0; i < simParamsTimeframes; i++) {
		if (parseFloat(window['reportAdjustedWorkforce' + f + '[' + i + ']']) < count) {
			count = parseFloat(window['reportAdjustedWorkforce' + f + '[' + i + ']']);
		}
	}
	return count;
}
function get_adjusted_workforce_max(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		if (parseFloat(window['reportAdjustedWorkforce' + f + '[' + i + ']']) > count) {
			count = parseFloat(window['reportAdjustedWorkforce' + f + '[' + i + ']']);
		}
	}
	return count;
}
function get_adjusted_workforce_final(f) {
	return parseFloat(window['reportAdjustedWorkforce' + f + '[' + (simParamsTimeframes - 1) + ']']);
}
function get_adjusted_workforce_final_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_adjusted_workforce_final(jobs[i]);
	}
	return count;
}
function get_overtime_min(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		if (parseFloat(window['reportOvertime' + f + '[' + i + ']']) > count) {
			count = parseFloat(window['reportOvertime' + f + '[' + i + ']']);
		}
	}
	return count;
}
function get_overtime_max(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		if (parseFloat(window['reportOvertime' + f + '[' + i + ']']) > count) {
			count = parseFloat(window['reportOvertime' + f + '[' + i + ']']);
		}
	}
	return count;
}
function get_overtime_avg(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportOvertime' + f + '[' + i + ']']);
	}
	return parseFloat(count / simParamsTimeframes);
}
function get_total_workload_available_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_total_workload_available(jobs[i]);
	}
	return count;
}
function get_total_workload_available(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportWorkloadAvailable' + f + '[' + i + ']']);
	}
	return count;
}
function get_total_workload_accomplished_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_total_workload_accomplished(jobs[i]);
	}
	return count;
}
function get_total_workload_accomplished(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportWorkloadAccomplished' + f + '[' + i + ']']);
	}
	return count;
}
function get_total_late_lines_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_total_late_lines(jobs[i]);
	}
	return count;
}
function get_total_late_lines(f) {
	var count = 0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		count += parseFloat(window['reportTotalLateLines' + f + '[' + i + ']']);
	}
	return count;
}
function get_cumulative_ontime_total() {
	var ttl = get_total_workload_available_total();
	var ontime = ttl - get_total_late_lines_total();
	return parseFloat(100 * (ontime/ttl));
}
function get_cumulative_ontime(f) {
	var ttl = get_total_workload_available(f);
	var ontime = ttl - get_total_late_lines(f);
	return parseFloat(100 * (ontime/ttl));
}

function push_test_to_final(testNumber) {
	$("#testToFinal1").hide();
	$("#testToFinal2").hide();
	$("#testToFinal3").hide();
	$("#testToFinal4").hide();
	$("#testToFinal5").hide();
	$("#inputReport").hide();
	$("#inputCheck").hide();
	for (var i = 0; i < jobs.length; i++) {
		document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = document.getElementById('reportRR_LH_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'equipHours').value = document.getElementById('reportRR_EH_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'borrow').value = document.getElementById('reportRR_Bw_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'loan').value = document.getElementById('reportRR_Ln_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'hire').value = document.getElementById('reportRR_Hr_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'fire').value = document.getElementById('reportRR_Fr_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'seasonal').value = document.getElementById('reportRR_SH_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'leave').value = document.getElementById('reportRR_Lv_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'reserve').value = document.getElementById('reportRR_Rs_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML = document.getElementById('reportRR_AWF_' + jobs[i] + '_test' + testNumber).innerHTML;
		document.getElementById('input' + jobs[i] + 'overtime').value = document.getElementById('reportRR_OT_' + jobs[i] + '_test' + testNumber).innerHTML;
	}
	calculate_work_accomplished(false);
}

function clear_test_backlogs() {
	for (var i = 0; i < jobs.length; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 1; k < 6; k++) {
				window['backlog' + jobs[i] + 'test' + k + '[' + j + ']'] = 0;
			}
		}
	}
}

function check_for_impacts() {
	//check for impacts
	currentlyOnLeave = 0;
	computerDown = false;
	transportationStrike = false;
	equipmentDown = false;
	equipmentDowntimeMultiplier = 1;
	if (sPrefix == "mc06") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			computerDown = true;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mc08") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			computerDown = true;
		}
		if (currentTimeframe == 6) {
			computerDown = true;
		}
		if (currentTimeframe == 7) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mc10") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 5) {
			computerDown = true;
		}
		if (currentTimeframe == 6) {
			computerDown = true;
		}
		if (currentTimeframe == 9) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mc12") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 7) {
			computerDown = true;
		}
		if (currentTimeframe == 8) {
			computerDown = true;
		}
		if (currentTimeframe == 11) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mt06") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			transportationStrike = true;
		}
		if (currentTimeframe == 3) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mt08") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			transportationStrike = true;
		}
		if (currentTimeframe == 6) {
			transportationStrike = true;
		}
		if (currentTimeframe == 7) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mt10") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			transportationStrike = true;
		}
		if (currentTimeframe == 6) {
			transportationStrike = true;
		}
		if (currentTimeframe == 9) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "mt12") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 7) {
			transportationStrike = true;
		}
		if (currentTimeframe == 8) {
			transportationStrike = true;
		}
		if (currentTimeframe == 11) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "cc06") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			computerDown = true;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "cc08") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			computerDown = true;
		}
		if (currentTimeframe == 6) {
			computerDown = true;
		}
		if (currentTimeframe == 7) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "cc10") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 2) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			computerDown = true;
		}
		if (currentTimeframe == 6) {
			computerDown = true;
		}
		if (currentTimeframe == 9) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "cc12") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 7) {
			computerDown = true;
		}
		if (currentTimeframe == 8) {
			computerDown = true;
		}
		if (currentTimeframe == 11) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "ct06") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			transportationStrike = true;
		}
		if (currentTimeframe == 3) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "ct08") {
		if (currentTimeframe == 2) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 3) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			transportationStrike = true;
		}
		if (currentTimeframe == 6) {
			transportationStrike = true;
		}
		if (currentTimeframe == 7) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "ct10") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 5) {
			transportationStrike = true;
		}
		if (currentTimeframe == 6) {
			transportationStrike = true;
		}
		if (currentTimeframe == 9) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
	if (sPrefix == "ct12") {
		if (currentTimeframe == 3) {
			currentlyOnLeave = 13;
			maxOnLeave = 2;
		}
		if (currentTimeframe == 4) {
			equipmentDowntimeMultiplier = 0.97;
			equipmentDown = true;
		}
		if (currentTimeframe == 7) {
			transportationStrike = true;
		}
		if (currentTimeframe == 8) {
			transportationStrike = true;
		}
		if (currentTimeframe == 11) {
			currentlyOnLeave = 6;
			maxOnLeave = 6;
		}
	}
}

function reset_control_buttons() {
	/*
	$( "#content-student-welcome" ).hide();
	$( "#content-student_resource_plan" ).hide ();
	$( "#report-work-accomplished" ).hide();
	$( "#report-test-work-accomplished" ).hide();
	$( "#report-available-workload").hide ();
	$( "#" + sPrefix + "-message-center" ).show();
	*/
	document.getElementById('nav-student-inputResourcePlan').disabled = true;
	document.getElementById('nav-student-performTestRun').disabled = true;
//	document.getElementById('nav-student-performFinalRun').disabled = true;
	$("#proceedToNextTimeframe").hide();
	document.getElementById('testCount').innerHTML = "0";
	document.getElementById('currentTF').innerHTML = currentTimeframe;
	document.getElementById('inputReport').disabled = true;
	document.getElementById('inputCheck').disabled = true;
	$("#inputReport").hide();
	$("#inputCheck").hide();
}

function proceed_to_next_timeframe() {
	$('#overlayLoading').fadeIn('fast', function () {

	set_new_workforce_hire_fire();
	//increment timeframe
	currentTimeframe++;
	$.jStorage.set(myuser + 'currentTimeframe',currentTimeframe);
	$.jStorage.set(myuser + 'timeframeStatus' + currentTimeframe, "start");
	$.jStorage.set(myuser + 'timeframeStatusTestNumber' + currentTimeframe, 0);
	currentTest = 1;
	denialsTriggered = 0;
	//update TF spans
	$('.tfspan').text(" - TF #" + currentTimeframe);
	$('.tfspanNumber').text("TF #" + currentTimeframe);
	//
	for (var t = 0; t < 5; t++) {
		$( "#testrunresulttabs" ).tabs({ disabled: [t] });
		$( "#testrunresulttabs" ).disableTab(t, true);
	}
	check_for_impacts();
	//setup AWL report
	populate_daily_workload();
	load_assisted_worksheet();
	//move the message
	$( "#" + sPrefix + "-messagetabs" ).enableTab(currentTimeframe - 1);
	$( "#" + sPrefix + "-messagetabs" ).tabs( "option", "active", currentTimeframe - 1 );

	//clear_workforce_values();
	reset_control_buttons();
	displayMessages();
	clear_test_backlogs();
	$("#testToFinal1").show();
	$("#testToFinal2").show();
	$("#testToFinal3").show();
	$("#testToFinal4").show();
	$("#testToFinal5").show();
//	$("#inputReport").show();
//	$("#inputCheck").show();

	}).fadeOut();
}

function score_ontime() {
	var score = 0.0;
	var lowerLimit = simParamsOnTimeUpperLimit - 10;
//	score = parseFloat((onTimeScore - (simParamsOnTimeUpperLimit - 10) / 10) * bonusParamsMaxOnTime);
	score = parseFloat(((onTimeScore - lowerLimit) / 10) * bonusParamsMaxOnTime);
	if (onTimeScore < lowerLimit) {
		lastOntimeScore = 0.00;
		return 0.0;
	}
	if (score > bonusParamsMaxOnTime) {
		lastOntimeScore = bonusParamsMaxOnTime;
		return parseFloat(bonusParamsMaxOnTime);
	} else {
		if (score < 0.0) {
			lastOntimeScore = 0.00;
			return 0.0;
		} else {
			lastOntimeScore = score;
			return score;
		}
	}
}

function budget_bonus() {
	var bonus = 0;
	if ((simParamsTimeframes == 6 && currentTimeframe == 3) || (simParamsTimeframes == 12 && currentTimeframe == 4) || (simParamsTimeframes == 12 && currentTimeframe == 8)) {
		if (runningUnitCost[currentTimeframe - 1] < costParamsStandardUnitCost) {
			bonus = parseFloat(((costParamsStandardUnitCost - runningUnitCost[currentTimeframe - 1]) * get_tf_totalLinesWorked()) / bonusParamsDivisorRA);
		//	alert("Congratulations! Your average unit cost is below the standard threshold. You will receive a budget bonus of $" + bonus.toFixed(2));
			$("#dialog").html("<img src='js/img/money-bag.png' /><br /><br />Congratulations! Your average unit cost is below the standard threshold. You will receive a budget bonus of $" + bonus.toFixed(2));
			$("#dialog").modal();
		}
	}
	return bonus;
}

function score_unitcost_test() {
	var score = 0.0;
	score = parseFloat((costParamsStandardUnitCost / get_average_unit_cost_test()) * bonusParamsMaxForUnitCost);
	if (score > bonusParamsMaxForUnitCost) {
		lastUnitCostScore = bonusParamsMaxForUnitCost;
		return parseFloat(bonusParamsMaxForUnitCost);
	} else {
		if (score < 0.0) {
			lastUnitCostScore = 0.00;
			return 0.0;
		} else {
			lastUnitCostScore = score;
			return score;
		}
	}
}

function score_unitcost() {
	var score = 0.0;
	score = parseFloat((costParamsStandardUnitCost / runningUnitCost[currentTimeframe - 1]) * bonusParamsMaxForUnitCost);
	if (score > bonusParamsMaxForUnitCost) {
		lastUnitCostScore = bonusParamsMaxForUnitCost;
		return parseFloat(bonusParamsMaxForUnitCost);
	} else {
		if (score < 0.0) {
			lastUnitCostScore = 0.00;
			return 0.0;
		} else {
			lastUnitCostScore = score;
			return score;
		}
	}
}

function score_unitcost_bonus() {
	var score = 0.0;
	if (runningUnitCost[currentTimeframe - 1] > costParamsStandardUnitCost) {
		return 0.0;
	} else {
		score = parseFloat((((costParamsStandardUnitCost / runningUnitCost[currentTimeframe - 1]) - 1) * 100) * bonusParamsUnitCostMultiplier);
		if (score > bonusParamsFinalTFBonusCount) {
			return bonusParamsFinalTFBonusCount;
		} else {
			return score;
		}
	}
}


function score_budget() {
	var score = 0.0;
	score = parseFloat(bonusParamsMaxForBudget - ((runningOverallCost[currentTimeframe - 1] + ((runningOvertimeCost[currentTimeframe - 1] / currentTimeframe) * 1.25 * (scenarioLength - currentTimeframe)) - costParamsSimulationBudget) / 4000));
	if (score > bonusParamsMaxForBudget) {
		lastBudgetScore = bonusParamsMaxForBudget;
		return parseFloat(bonusParamsMaxForBudget);
	} else {
		if (score < 0.0) {
			lastBudgetScore = 0.00;
			return 0.0;
		} else {
			lastBudgetScore = score;
			return score;
		}
	}
}

function score_backlog_test(test) {
	var score = 0.0;
	score = parseFloat(bonusParamsMaxForFinalBacklog - ((get_backlog_total_test(test) - simParamsBacklogLimit) / 300.0));
//	score = parseFloat(bonusParamsMaxForFinalBacklog - ((get_backlog_total() - simParamsBacklogLimit) / ((15 / bonusParamsMaxForFinalBacklog) * 200)));
	if (score > bonusParamsMaxForFinalBacklog) {
		lastBacklogScore = bonusParamsMaxForFinalBacklog;
		return parseFloat(bonusParamsMaxForFinalBacklog);
	} else {
		if (score < 0.0) {
			lastBacklogScore = 0.00;
			return 0.0;
		} else {
			lastBacklogScore = score;
			return score;
		}
	}
}

function score_backlog() {
	var score = 0.0;
	score = parseFloat(bonusParamsMaxForFinalBacklog - ((get_backlog_total() - simParamsBacklogLimit) / 300.0));
//	score = parseFloat(bonusParamsMaxForFinalBacklog - ((get_backlog_total() - simParamsBacklogLimit) / ((15 / bonusParamsMaxForFinalBacklog) * 200)));
	if (score > bonusParamsMaxForFinalBacklog) {
		lastBacklogScore = bonusParamsMaxForFinalBacklog;
		return parseFloat(bonusParamsMaxForFinalBacklog);
	} else {
		if (score < 0.0) {
			lastBacklogScore = 0.00;
			return 0.0;
		} else {
			lastBacklogScore = score;
			return score;
		}
	}
}

function score_tfs() {
	var score = 0.0;
	score = parseFloat((bonusParamsMaxForTFs/bonusParamsFinalTFBonusCount) * (currentTimeframe - (scenarioLength - bonusParamsFinalTFBonusCount)));
	if (score > bonusParamsMaxForTFs) {
		lastCompletionScore = bonusParamsMaxForTFs;
		return parseFloat(bonusParamsMaxForTFs);
	} else {
		if (score < 0.0) {
			lastCompletionScore = 0.00;
			return 0.0;
		} else {
			lastCompletionScore = score;
			return score;
		}
	}
}

function get_avg_backlog_percentage() {
	var jobsLowPri = ["RBNP","RBKP","RBNR","RBKR","IBN3","IBK3","TBN3","TBK3","INV","SLS"];
	var total = 0.0;
	for (var i = 0; i < jobsLowPri.length; i++) {
		for (var j = 1; j <= scenarioLength; j++) {
			total += parseFloat(window['simWLD' + simParamsUserWorkloadOption + jobsLowPri[i] + j] * window['stdLabor' + jobsLowPri[i]]);
		}
	}
//	var percent = total / (scenarioLength * 18);
//	return parseFloat(percent * bonusParamsNormalBacklogBonusPercent);
	var avg = parseFloat(total / scenarioLength);
//	alert("backlog avg workload: " + ((avg * bonusParamsNormalBacklogBonusPercent) / 100));
	return ((avg * bonusParamsNormalBacklogBonusPercent) / 100);
}

function get_backlog_percentage() {
	var total = 0.0;
	for (var i = 0; i < jobs.length; i++) {
		for(var j=0; j < window['backlog' + jobs[i]].length; j++) {
			if (window['backlog' + i + '[' + j + ']'] != null && window['backlog' + i + '[' + j + ']'] != 0) {
				total += parseFloat(window['backlog' + i + '[' + j + ']'] * window['stdLabor' + jobs[i]]);
			}
		}
	}
	var percent = total / 18.0;
	return parseFloat(percent);
}

function get_actual_backlog_hours() {
	var total = 0.0;
	for (var i = 0; i < jobs.length; i++) {
		for(var j=0; j < window['backlog' + jobs[i]].length; j++) {
			if (window['backlog' + jobs[i] + '[' + j + ']'] != null && window['backlog' + jobs[i] + '[' + j + ']'] != 0) {
				total += parseFloat(window['backlog' + jobs[i] + '[' + j + ']'] * window['stdLabor' + jobs[i]]);
			}
		}
	}
	return parseFloat(total);
}

function get_actual_backlog_hours_test(test) {
	var total = 0.0;
	for (var i = 0; i < jobs.length; i++) {
		for(var j=0; j < window['backlog' + jobs[i]].length; j++) {
			if (window['backlog' + jobs[i] + 'test' + test + '[' + j + ']'] != null && window['backlog' + jobs[i] + 'test' + test + '[' + j + ']'] != 0) {
				total += parseFloat(window['backlog' + jobs[i] + 'test' + test + '[' + j + ']'] * window['stdLabor' + jobs[i]]);
			}
		}
	}
	return parseFloat(total);
}


function get_bbl_work_hours() {
	for (var i = 0; i < jobs.length; i++) {
		 parseFloat(document.getElementById('reportAWL_DWL_' + jobs[i] + '_final').innerHTML * window['stdLabor' + jobs[i]]);
	}
}

function score_backlog_workload_test(test) {
	var score = 0.0;
	score = parseFloat((1 - ((get_actual_backlog_hours_test(test) - 4423) / 833.0)) * bonusParamsMaxNormalBacklogBonus);
	if (score > bonusParamsMaxNormalBacklogBonus) {
		return bonusParamsMaxNormalBacklogBonus;
	} else {
		if (score < 0.0) {
			return 0.0;
		} else {
			return score;
		}
	}
}

function score_backlog_workload() {
	var score = 0.0;
	score = parseFloat((1 - (get_backlog_invsls_total() / 833.0)) * bonusParamsMaxNormalBacklogBonus);
//	score = parseFloat((get_avg_backlog_percentage() / get_backlog_percentage()) * bonusParamsMaxNormalBacklogBonus);
//	score = parseFloat((3475.05 / get_actual_backlog_hours()) * bonusParamsMaxNormalBacklogBonus);
//	score = parseFloat((get_avg_backlog_percentage() / get_actual_backlog_hours()) * bonusParamsMaxNormalBacklogBonus);
//	alert("actual backlog hours: " + get_actual_backlog_hours() + " \nbacklog workload score: " + score);
	if (score > bonusParamsMaxNormalBacklogBonus) {
		return bonusParamsMaxNormalBacklogBonus;
	} else {
		if (score < 0.0) {
			return 0.0;
		} else {
			return score;
		}
	}
}

function get_tf_score_test(test) {
	var score = 0.0;
	score += parseFloat(score_ontime());
	score += parseFloat(score_unitcost_test());
	score += parseFloat(score_budget());
	score += parseFloat(score_backlog_test(test));
	score += parseFloat(score_tfs());
	score += parseFloat(score_backlog_workload_test(test));

	console.log('TEST-- score_ontime: ' + score_ontime() + '\n' + 'score_unitcost: ' + score_unitcost_test() + '\n' + 'score_budget: ' + score_budget() + '\n' + 'score_backlog: ' + score_backlog_test(test) + '\n' + 'score_tfs: ' + score_tfs() + '\n' + 'score_backlog_workload: ' + score_backlog_workload_test(test) + '\n' + 'score_total: ' + score );

	return score;
}

function get_tf_score() {
	var score = 0.0;
	score += score_ontime();
	score += score_unitcost();
	score += score_budget();
	score += score_backlog();
	score += score_tfs();
	score += score_backlog_workload();
	if (currentTimeframe == simParamsTimeframes) {
		score += score_unitcost_bonus();
	}
	console.log('score_ontime: ' + score_ontime() + '\n' + 'score_unitcost: ' + score_unitcost() + '\n' + 'score_budget: ' + score_budget() + '\n' + 'score_backlog: ' + score_backlog() + '\n' + 'score_tfs: ' + score_tfs() + '\n' + 'score_backlog_workload: ' + score_backlog_workload() + '\n' + 'score_total: ' + score );

	return score;
}

function get_projected_score() {
	var score = 0.00;
	//for (var i = 0; i < currentTimeframe; i++) {
	//	score += runningScore[i];
	//}
	//var avg = (score / currentTimeframe);
	//var bonus = 15.0;
	for (var i = 0; i < simParamsTimeframes; i++) {
		if (i < currentTimeframe) {
			score += runningScore[i];
		} else {
			score += 100.0;
		}
	}
	var avg = (score / simParamsTimeframes);
	var bonus = 15.0 * (1 / currentTimeframe);
	if (currentTimeframe == simParamsTimeframes) {
		return runningScore[currentTimeframe - 1];
	}
	if (avg + bonus > 100) {
		return (avg + 100) * 0.5;
	} else {
		return avg + bonus;
	}
}

function get_projected_cost_at_timeframe() {
	var avg = parseFloat(get_projected_cost() / scenarioLength);
	return avg * currentTimeframe;
}

function get_projected_cost() {
	var count = 0.00;
	for (var i = 0; i < currentTimeframe; i++) {
		count += runningOverallCost[i];
	}
	return (count / currentTimeframe) * scenarioLength;
}

function get_space_cost_cumulative() {
	var count = 0.00;
	for (var i = 0; i < currentTimeframe; i++) {
		count += parseFloat(runningSpaceCost[i]);
	}
	return count;
}

function get_overtime_cost_cumulative() {
	var count = 0.00;
	for (var i = 0; i < currentTimeframe; i++) {
		count += runningOvertimeCost[i];
	}
	return count;
}

function get_average_unit_cost_test() {
	var countWork = testWorkAccomplished;
	var countCost = 0.0;
	for (var i = 0; i < currentTimeframe; i++) {
		countCost += runningOverallCost[i];
	}
	return countCost / countWork;
}

function get_average_unit_cost() {
	var countWork = runningWorkAccomplishedTotal;
	var countCost = 0.0;
	for (var i = 0; i < currentTimeframe; i++) {
		countCost += runningOverallCost[i];
	}
	return countCost / countWork;
}

function get_cost_cumulative() {
	var count = 0.00;
	for (var i = 0; i < currentTimeframe; i++) {
		count += runningOverallCost[i];
	}
	return count;
}


function get_space_backlog_cost_test(test) {
	var count = get_space_backlog_test(test);
	if (count > costParamsSpaceUtilizationLimit) {
		return (count - costParamsSpaceUtilizationLimit) * costParamsSpaceUtilizationCost;
	} else {
		return 0;
	}
}

function get_space_backlog_percent_test(test) {
	return get_space_backlog_test(test) / costParamsSpaceUtilizationLimit;
}

function get_space_backlog_test(test) {
	var count = 0;
	for (var i = 0; i < jobs.length - 2; i++) {
		for (var j = 0; j < 12; j++) {
			count += window['backlog' + jobs[i] + 'test' + test + '[' + j + ']'];
		}
	//	count += get_workload_total(jobs[i]);
	}
	return count;
}

function get_space_backlog_cost () {
	var count = get_space_backlog();
	if (count > costParamsSpaceUtilizationLimit) {
		return (count - costParamsSpaceUtilizationLimit) * costParamsSpaceUtilizationCost;
	} else {
		return 0;
	}
}

function get_space_backlog_percent() {
	return get_space_backlog() / costParamsSpaceUtilizationLimit;
}

function get_space_backlog() {
	var count = 0;
	for (var i = 0; i < jobs.length - 2; i++) {
		for (var j = 0; j < 12; j++) {
			count += window['backlog' + jobs[i] + '[' + j + ']'];
		}
	//	count += get_workload_total(jobs[i]);
	}
	return count;
}

function get_tf_totalLinesWorked() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += tfWorkedLines[i];
	}
	return count;
}
function total_starting_workforce() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += parseFloat(document.getElementById('reportAWL_WF_' + jobs[i]).innerHTML);
	}
	document.getElementById('reportAWL_WF_Total').innerHTML = count;
}

function total_starting_workload() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += parseInt(window['backlog' + jobs[i] + '[' + 0 + ']']);
	}
	document.getElementById('reportAWL_DWL_Total').innerHTML = count;
}

function total_available_workload () {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_workload_total(jobs[i]);
	}
	document.getElementById('reportAWL_TWA_Total').innerHTML = count;
}

function get_backlog_total() {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		count += get_workload_total(jobs[i]);
	}
	return count;
}

function get_backlog_total_test(test) {
	var count = 0;
	for (var i = 0; i < jobs.length; i++) {
		for (var j = 0; j < 12; j++) {
			count += parseFloat(window['backlog' + jobs[i] + 'test' + test + '[' + j + ']']);
		}
	}
	return count;
}

function get_backlog_invsls_total() {
	var count = 0;
	count += get_workload_total("INV");
	count += get_workload_total("SLS");
	return count;
}

function get_workload_total (f) {
	//grab TF starting workload and backlog values for work function 'f'
	var total = 0;
//	total += window['simWLD' + simParamsUserWorkloadOption + f + currentTimeframe];
	for(var i=0; i < window['backlog' + jobs[i]].length; i++) {
		if (window['backlog' + f + '[' + i + ']'] != null && window['backlog' + f + '[' + i + ']'] != 0) {
			total += parseInt(window['backlog' + f + '[' + i + ']']);
		}
	}
//	total += window['backlog' + f].reduce(function(a,b) {return a + b;}, 0);
	return total;
}

function reload_backlog() {
	window['simWLD' + simParamsUserWorkloadOption + 'TBN1' + currentTimeframe] = $.jStorage.get(myuser + 'simWLD' + simParamsUserWorkloadOption + 'TBN1' + currentTimeframe, 0);
	window['simWLD' + simParamsUserWorkloadOption + 'TBK1' + currentTimeframe] = $.jStorage.get(myuser + 'simWLD' + simParamsUserWorkloadOption + 'TBK1' + currentTimeframe, 0);
	window['simWLD' + simParamsUserWorkloadOption + 'TBN2' + currentTimeframe] = $.jStorage.get(myuser + 'simWLD' + simParamsUserWorkloadOption + 'TBN2' + currentTimeframe, 0);
	window['simWLD' + simParamsUserWorkloadOption + 'TBK2' + currentTimeframe] = $.jStorage.get(myuser + 'simWLD' + simParamsUserWorkloadOption + 'TBK2' + currentTimeframe, 0);
	window['simWLD' + simParamsUserWorkloadOption + 'TBN3' + currentTimeframe] = $.jStorage.get(myuser + 'simWLD' + simParamsUserWorkloadOption + 'TBN3' + currentTimeframe, 0);
	window['simWLD' + simParamsUserWorkloadOption + 'TBK3' + currentTimeframe] = $.jStorage.get(myuser + 'simWLD' + simParamsUserWorkloadOption + 'TBK3' + currentTimeframe, 0);
	for (var i = 0; i < jobs.length; i++) {
		//	console.log('retrieving backlog ' + jobs[i] + ' ');
		for (var pi = 0; pi < 12; pi++) {
		//	window['backlog' + jobs[i] + '[' + pi + ']'] = $.jStorage.get(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + currentTimeframe, initialBacklog[i][pi]);
			window['backlog' + jobs[i] + '[' + pi + ']'] = $.jStorage.get(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + (currentTimeframe - 1), 6);
		//	$.jStorage.set(myuser + 'backlog' + jobs[i] + '[' + pi + ']' + currentTimeframe, window['backlog' + jobs[i] + '[' + pi + ']']);
		//	console.log(jobs[i] + pi + ': ' + window['backlog' + jobs[i] + '[' + pi + ']']);
		}
	}
}

function reload_report_values() {
	for (var i = 0; i < jobs.length; i++) {
		document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceStart' + currentTimeframe, window['input' + jobs[i] + 'workforceStart']);
		for (var t = 0; t < 12; t++) {
			if (t < currentTimeframe) {
				//job and timeframe loops
				window['reportAdjustedWorkforce' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportAdjustedWorkforce' + jobs[i] + '[' + t + ']',0);
				window['reportOvertime' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportOvertime' + jobs[i] + '[' + t + ']',0);
				window['reportPersonnelCost' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportPersonnelCost' + jobs[i] + '[' + t + ']',0);
				window['reportOvertimeCost' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportOvertimeCost' + jobs[i] + '[' + t + ']',0);
				window['reportHiringCost' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportHiringCost' + jobs[i] + '[' + t + ']',0);
				window['reportEquipmentCost' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportEquipmentCost' + jobs[i] + '[' + t + ']',0);
				window['reportTotalCost' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportTotalCost' + jobs[i] + '[' + t + ']',0);
				window['reportTotalLateLines' + jobs[i] + '[' + t + ']'] = $.jStorage.get(myuser + 'reportTotalLateLines' + jobs[i] + '[' + t + ']',0);
				window['reportWorkloadAvailable' + jobs[i] + '[' + t + ']'] = $.jStorage.set(myuser + 'reportWorkloadAvailable' + jobs[i] + '[' + t + ']',0);
				window['reportWorkloadAccomplished' + jobs[i] + '[' + t + ']'] = $.jStorage.set(myuser + 'reportWorkloadAccomplished' + jobs[i] + '[' + t + ']',0);
				window['reportCumulativeOntime' + jobs[i] + '[' + t + ']'] = $.jStorage.set(myuser + 'reportCumulativeOntime' + jobs[i] + '[' + t + ']',0);
				runningWorkAvailable[i] = $.jStorage.get(myuser + 'runningWorkAvailable' + jobs[i] + t, runningWorkAvailable[i]);
				runningWorkOnTime[i] = $.jStorage.get(myuser + 'runningWorkOnTime' + jobs[i] + t, runningWorkOnTime[i]);
			} else {
				window['reportAdjustedWorkforce' + jobs[i] + '[' + t + ']'] = 0;
				window['reportOvertime' + jobs[i] + '[' + t + ']'] = 0;
				window['reportPersonnelCost' + jobs[i] + '[' + t + ']'] = 0;
				window['reportOvertimeCost' + jobs[i] + '[' + t + ']'] = 0;
				window['reportHiringCost' + jobs[i] + '[' + t + ']'] = 0;
				window['reportEquipmentCost' + jobs[i] + '[' + t + ']'] = 0;
				window['reportTotalCost' + jobs[i] + '[' + t + ']'] = 0;
				window['reportTotalLateLines' + jobs[i] + '[' + t + ']'] = 0;
				window['reportWorkloadAvailable' + jobs[i] + '[' + t + ']'] = 0;
				window['reportWorkloadAccomplished' + jobs[i] + '[' + t + ']'] = 0;
				window['reportCumulativeOntime' + jobs[i] + '[' + t + ']'] = 0;
			}
		}
	}
	runningWorkAccomplishedTotal = $.jStorage.get(myuser + 'runningWorkAccomplishedTotal' + (currentTimeframe - 1), 0);

	for (var tfs = 0; tfs < 12; tfs++) {
		//	$.jStorage.get(myuser + 'input' + jobs[i] + 'workforceStart' + (currentTimeframe + 1), startWorkforce);
		reportSpentActual[t] = $.jStorage.get(myuser + 'reportSpentActual[' + t + ']',0);
		reportSpentProjected[t] = $.jStorage.get(myuser + 'reportSpentProjected[' + t + ']',0);
		reportAverageUnitCost[t] = $.jStorage.get(myuser + 'reportAverageUnitCost[' + t + ']',0);
		reportActualWorkforce[t] = $.jStorage.get(myuser + 'reportActualWorkforce[' + t + ']',0);
		reportCurrentScore[t] = $.jStorage.get(myuser + 'reportCurrentScore[' + t + ']',0);
		reportProjectedScore[t] = $.jStorage.get(myuser + 'reportProjectedScore[' + t + ']',0);
		if (t < currentTimeframe) {
			runningOvertimeCost[t] = $.jStorage.get(myuser + 'runningOvertimeCost' + t, 0);
			runningOverallCost[t] = $.jStorage.get(myuser + 'runningOverallCost' + t, 0);
		//	runningWorkAccomplishedTotal = $.jStorage.get(myuser + 'runningWorkAccomplishedTotal' + t, 0);
			runningUnitCost[t] = $.jStorage.get(myuser + 'runningUnitCost' + t, 0);
			runningSpaceCost[t] = $.jStorage.get(myuser + 'runningSpaceCost' + t, 0);
			runningSpacePerc[t] = $.jStorage.get(myuser + 'runningSpacePerc' + t, 0);
			runningScore[t] = $.jStorage.get(myuser + 'runningScore' + t, 0);
			runningBudget[t] = $.jStorage.get(myuser + 'runningBudget' + t, 0);
		//	running[t] = $.jStorage.get(myuser + 'running' + t, running[t]);
		//	running[t] = $.jStorage.get(myuser + 'running' + t, running[t]);

		}
	/*	} else {
			reportSpentActual[t] = 0;
			reportSpentProjected[t] = 0;
			reportAverageUnitCost[t] = 0;
			reportActualWorkforce[t] = 0;
			reportCurrentScore[t] = 0;
			reportProjectedScore[t] = 0;
		} */
	}
}

function populate_daily_workload() {
	furthestWorkOut = 0;
	for (var i = 0; i < jobs.length; i++) {
		window['backlog' + jobs[i] + '[' + 0 + ']'] = window['simWLD' + simParamsUserWorkloadOption + jobs[i] + currentTimeframe];

		//loop through backlog
		document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML = window['backlog' + jobs[i] + '[' + 0 + ']'];
		for (var j = 1; j < 12; j++) {
			if (window['backlog' + jobs[i] + '[' + j + ']'] != null && window['backlog' + jobs[i] + '[' + j + ']'] != 0) {
				if (j > furthestWorkOut) {
					furthestWorkOut = j;
				}
				document.getElementById('reportAWL_' + j + 'D_' + jobs[i]).innerHTML = window['backlog' + jobs[i] + '[' + j + ']'];
			} else {
				document.getElementById('reportAWL_' + j + 'D_' + jobs[i]).innerHTML = '';
			}
		}
		document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML = get_workload_total(jobs[i]);
	}
	console.log('furthestWorkOut: ' + furthestWorkOut);
	total_starting_workforce();
	total_starting_workload();
	total_available_workload();
	for (var j = 1; j < 12; j++) {
		var jj = j + 4;
		var jjj = j + 2;
		if (j <= furthestWorkOut + 2) {
			$('#reportAWL th:nth-child(' + jj + ')').show();
			$('#reportAWL td:nth-child(' + jj + ')').show();
		//	$('#reportAWL_final th:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_final td:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test1 th:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test1 td:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test2 th:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test2 td:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test3 th:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test3 td:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test4 th:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test4 td:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test5 th:nth-child(' + jjj + ')').show();
		//	$('#reportAWL_test5 td:nth-child(' + jjj + ')').show();
		} else {
			$('#reportAWL th:nth-child(' + jj + ')').hide();
			$('#reportAWL td:nth-child(' + jj + ')').hide();
		//	$('#reportAWL_final th:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_final td:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test1 th:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test1 td:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test2 th:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test2 td:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test3 th:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test3 td:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test4 th:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test4 td:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test5 th:nth-child(' + jjj + ')').hide();
		//	$('#reportAWL_test5 td:nth-child(' + jjj + ')').hide();
		}
	}
}

function load_initial_backlog () {
	//pulls data from initialBacklog 2D array and populates the starting backlog values
	for (var i = 0; i < jobs.length; i++) {
		//populate the arrays
		for (var k = 0; k < 13; k++) {
			window['backlog' + jobs[i] + '[' + k + ']'] = 0;
		}
		//grab first DWL values from saved parameters
		initialBacklog[i][0] = window['simWLD' + simParamsUserWorkloadOption + jobs[i] + '1'];
		window['backlog' + jobs[i] + '[' + 0 + ']'] = initialBacklog[i][0];
		//push to available workload report DWL
		document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML = window['simWLD' + simParamsUserWorkloadOption + jobs[i] + 1];
		//loop through initial backlog values
		for (var j = 1; j < 7; j++) {
			if (initialBacklog[i][j] != null && initialBacklog[i][j] != 0) {
				//populate backlog arrays for each function from the 2D array
				window['backlog' + jobs[i] + '[' + j + ']'] = initialBacklog[i][j];
			//	alert('backlog ' + jobs[i] + ': ' + window['backlog' + jobs[i] + '[' + j + ']'] + ' \n initbacklog' + initialBacklog[i][j]);
				//push those values into the available workload report 
				document.getElementById('reportAWL_' + j + 'D_' + jobs[i]).innerHTML = window['backlog' + jobs[i] + '[' + j + ']'];
			}
		}
		document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML = get_workload_total(jobs[i]);
	}
	total_starting_workforce();
	total_starting_workload();
	total_available_workload();
	$("#reportAWL th:nth-child(10)").hide();
	$("#reportAWL td:nth-child(10)").hide();
	$("#reportAWL th:nth-child(11)").hide();
	$("#reportAWL td:nth-child(11)").hide();
	$("#reportAWL th:nth-child(12)").hide();
	$("#reportAWL td:nth-child(12)").hide();
	$("#reportAWL th:nth-child(13)").hide();
	$("#reportAWL td:nth-child(13)").hide();
	$("#reportAWL th:nth-child(14)").hide();
	$("#reportAWL td:nth-child(14)").hide();
	$("#reportAWL th:nth-child(15)").hide();
	$("#reportAWL td:nth-child(15)").hide();

	$("#reportAWL_final th:nth-child(9)").hide();
	$("#reportAWL_final td:nth-child(9)").hide();
	$("#reportAWL_final th:nth-child(10)").hide();
	$("#reportAWL_final td:nth-child(10)").hide();
	$("#reportAWL_final th:nth-child(11)").hide();
	$("#reportAWL_final td:nth-child(11)").hide();
	$("#reportAWL_final th:nth-child(12)").hide();
	$("#reportAWL_final td:nth-child(12)").hide();
	$("#reportAWL_final th:nth-child(13)").hide();
	$("#reportAWL_final td:nth-child(13)").hide();
	$("#reportAWL_final th:nth-child(14)").hide();
	$("#reportAWL_final td:nth-child(14)").hide();

}

function load_workforce_values(tf) {
	//populates variables from stored data
	for (var i = 0; i < jobs.length; i++) {
		window['input' + jobs[i] + 'equipHours' + tf] = $.jStorage.get('input' + jobs[i] + 'equipHours' + tf, emptyVal);
		window['input' + jobs[i] + 'workforceStart' + tf] = $.jStorage.get('input' + jobs[i] + 'workforceStart' + tf, emptyVal);
		window['input' + jobs[i] + 'borrow' + tf] = $.jStorage.get('input' + jobs[i] + 'borrow' + tf, emptyVal);
		window['input' + jobs[i] + 'loan' + tf] = $.jStorage.get('input' + jobs[i] + 'loan' + tf, emptyVal);
		window['input' + jobs[i] + 'hire' + tf] = $.jStorage.get('input' + jobs[i] + 'hire' + tf, emptyVal);
		window['input' + jobs[i] + 'fire' + tf] = $.jStorage.get('input' + jobs[i] + 'fire' + tf, emptyVal);
		window['input' + jobs[i] + 'seasonal' + tf] = $.jStorage.get('input' + jobs[i] + 'seasonal' + tf, emptyVal);
		window['input' + jobs[i] + 'leave' + tf] = $.jStorage.get('input' + jobs[i] + 'leave' + tf, emptyVal);
		window['input' + jobs[i] + 'workforceAdjust' + tf] = $.jStorage.get('input' + jobs[i] + 'workforceAdjust' + tf, emptyVal);
		window['input' + jobs[i] + 'reserve' + tf] = $.jStorage.get('input' + jobs[i] + 'reserve' + tf, emptyVal);
		window['input' + jobs[i] + 'overtime' + tf] = $.jStorage.get('input' + jobs[i] + 'overtime' + tf, emptyVal);
	}
}

function clear_workforce_values() {
	for (var i = 0; i < jobs.length; i++) {
		window['input' + jobs[i] + 'equipHours'] = emptyVal;
		if (document.getElementById('keepBorrowAndLoan').checked) {
		//	window['input' + jobs[i] + 'borrow'] = emptyVal;
		//	window['input' + jobs[i] + 'loan'] = emptyVal;
		} else {
			window['input' + jobs[i] + 'borrow'] = emptyVal;
			window['input' + jobs[i] + 'loan'] = emptyVal;
		}
		window['input' + jobs[i] + 'hire'] = emptyVal;
		window['input' + jobs[i] + 'fire'] = emptyVal;
		window['input' + jobs[i] + 'seasonal'] = emptyVal;
		window['input' + jobs[i] + 'leave'] = emptyVal;
		window['input' + jobs[i] + 'reserve'] = emptyVal;
		window['input' + jobs[i] + 'overtime'] = emptyVal;
		document.getElementById('input' + jobs[i] + 'equipHours').value = window['input' + jobs[i] + 'equipHours'];
		document.getElementById('input' + jobs[i] + 'borrow').value = window['input' + jobs[i] + 'borrow'];
		document.getElementById('input' + jobs[i] + 'loan').value = window['input' + jobs[i] + 'loan'];
		document.getElementById('input' + jobs[i] + 'hire').value = window['input' + jobs[i] + 'hire'];
		document.getElementById('input' + jobs[i] + 'fire').value = window['input' + jobs[i] + 'fire'];
		document.getElementById('input' + jobs[i] + 'seasonal').value = window['input' + jobs[i] + 'seasonal'];
		document.getElementById('input' + jobs[i] + 'leave').value = window['input' + jobs[i] + 'leave'];
		document.getElementById('input' + jobs[i] + 'reserve').value = window['input' + jobs[i] + 'reserve'];
		document.getElementById('input' + jobs[i] + 'overtime').value = window['input' + jobs[i] + 'overtime'];

	}
}

function rebuildTestReports(tIndex) {
	console.log("rebuilding TEST reports. tIndex: " + tIndex);
	//test loop
	for (var t = 1; t <= tIndex; t++) {
		//in jobs loop
		for (var i = 0; i < jobs.length; i++) {
			//REBUILD RESOURCE REPORT TEST
		//	document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = $.jStorage.get(myuser + 'reportRR_LH_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
		//	document.getElementById('input' + jobs[i] + 'equipHours').value = $.jStorage.get(myuser + 'reportRR_EH_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'equipHours').value);
		//	document.getElementById('input' + jobs[i] + 'borrow').value = $.jStorage.get(myuser + 'reportRR_Bw_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'borrow').value);
		//	document.getElementById('input' + jobs[i] + 'loan').value = $.jStorage.get(myuser + 'reportRR_Ln_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'loan').value);
		//	document.getElementById('input' + jobs[i] + 'hire').value = $.jStorage.get(myuser + 'reportRR_Hr_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'hire').value);
		//	document.getElementById('input' + jobs[i] + 'fire').value = $.jStorage.get(myuser + 'reportRR_Fr_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'fire').value);
		//	document.getElementById('input' + jobs[i] + 'seasonal').value = $.jStorage.get(myuser + 'reportRR_SH_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'seasonal').value);
		//	document.getElementById('input' + jobs[i] + 'leave').value = $.jStorage.get(myuser + 'reportRR_Lv_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'leave').value);
		//	document.getElementById('input' + jobs[i] + 'reserve').value = $.jStorage.get(myuser + 'reportRR_Rs_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'reserve').value);
		//	document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
		//	document.getElementById('input' + jobs[i] + 'overtime').value = $.jStorage.get(myuser + 'reportRR_OT_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'overtime').value);

			document.getElementById('reportRR_LH_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_LH_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
			document.getElementById('reportRR_EH_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_EH_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'equipHours').value);
			document.getElementById('reportRR_Bw_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Bw_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'borrow').value);
			document.getElementById('reportRR_Ln_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Ln_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'loan').value);
			document.getElementById('reportRR_Hr_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Hr_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'hire').value);

			document.getElementById('reportRR_Fr_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Fr_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'fire').value);
			document.getElementById('reportRR_SH_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_SH_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'seasonal').value);
			document.getElementById('reportRR_Lv_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Lv_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'leave').value);
			document.getElementById('reportRR_Rs_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Rs_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'reserve').value);
			document.getElementById('reportRR_AWF_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
			document.getElementById('reportRR_OT_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_OT_' + jobs[i] + '_test' + t, document.getElementById('input' + jobs[i] + 'overtime').value);

			//REBUILD COST REPORT
			document.getElementById('reportCR_C4P_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4P_' + jobs[i] + '_test' + t, document.getElementById('reportCR_C4P_' + jobs[i] + '_test' + t).innerHTML);
			document.getElementById('reportCR_C4O_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4O_' + jobs[i] + '_test' + t, document.getElementById('reportCR_C4O_' + jobs[i] + '_test' + t).innerHTML);
			document.getElementById('reportCR_C4H_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4H_' + jobs[i] + '_test' + t, document.getElementById('reportCR_C4H_' + jobs[i] + '_test' + t).innerHTML);
			document.getElementById('reportCR_C4E_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4E_' + jobs[i] + '_test' + t, document.getElementById('reportCR_C4E_' + jobs[i] + '_test' + t).innerHTML);
			document.getElementById('reportCR_TTL_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TTL_' + jobs[i] + '_test' + t, document.getElementById('reportCR_TTL_' + jobs[i] + '_test' + t).innerHTML);

			//REBUILD WORK ACCOMPLISHED REPORT
			document.getElementById('reportAWL_DWL_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_DWL_' + jobs[i] + '_test' + t, document.getElementById('reportAWL_DWL_' + jobs[i]).innerHTML);
			for (var war_indexT = 1; war_indexT <= 12; war_indexT++) {
				document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_' + war_indexT + 'D_' + jobs[i] + '_test' + t, document.getElementById('reportAWL_' + war_indexT + 'D_' + jobs[i]).innerHTML);
			}
			document.getElementById('reportAWL_TWA_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_TWA_' + jobs[i] + '_test' + t, document.getElementById('reportAWL_TWA_' + jobs[i]).innerHTML);
			document.getElementById('reportAWL_WF_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_WF_' + jobs[i] + '_test' + t, "0");
			document.getElementById('reportAWL_OnTime_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTime_' + jobs[i] + '_test' + t, "0");
			document.getElementById('reportAWL_OnTimeC_' + jobs[i] + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTimeC_' + jobs[i] + '_test' + t, "0");
		}

		//RESOURCE REPORT TOTALS
		document.getElementById('reportRR_LH_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_LH_Total_test' + t, document.getElementById('inputTOTALworkforceStart').innerHTML);
		document.getElementById('reportRR_EH_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_EH_Total_test' + t, document.getElementById('inputTOTALequipHours').innerHTML);
		document.getElementById('reportRR_Bw_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Bw_Total_test' + t, document.getElementById('inputTOTALborrow').innerHTML);
		document.getElementById('reportRR_Ln_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Ln_Total_test' + t, document.getElementById('inputTOTALloan').innerHTML);
		document.getElementById('reportRR_Hr_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Hr_Total_test' + t, document.getElementById('inputTOTALhire').innerHTML);
		document.getElementById('reportRR_Fr_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Fr_Total_test' + t, document.getElementById('inputTOTALfire').innerHTML);
		document.getElementById('reportRR_SH_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_SH_Total_test' + t, document.getElementById('inputTOTALseasonal').innerHTML);
		document.getElementById('reportRR_Lv_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Lv_Total_test' + t, document.getElementById('inputTOTALleave').innerHTML);
		document.getElementById('reportRR_Rs_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_Rs_Total_test' + t, document.getElementById('inputTOTALreserve').innerHTML);
		document.getElementById('reportRR_AWF_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_Total_test' + t, document.getElementById('inputTOTALworkforceAdjust').innerHTML);
		document.getElementById('reportRR_OT_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_OT_Total_test' + t, document.getElementById('inputTOTALovertime').innerHTML);
		document.getElementById('reportRR_WFC_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_WFC_final_test' + t, simParamsWorkforceCeiling);
		document.getElementById('reportRR_AWF_final_test' + t).innerHTML = $.jStorage.get(myuser + 'reportRR_AWF_final_test' + t, document.getElementById('inputTOTALworkforceAdjust').innerHTML);

		//WORK ACCOMPLISHED REPORT TOTALS
		document.getElementById('reportAWL_DWL_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_DWL_Total_test' + t, "0");
		document.getElementById('reportAWL_TWA_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_TWA_Total_test' + t, "0");
		document.getElementById('reportAWL_WF_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_WF_Total_test' + t, "0");
		document.getElementById('reportAWL_OnTime_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTime_Total_test' + t, "0");
		document.getElementById('reportAWL_OnTimeC_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_OnTimeC_Total_test' + t, "0");
		document.getElementById('reportAWL_TWAC_Total_test' + t).innerHTML = $.jStorage.get(myuser + 'reportAWL_TWAC_Total_test' + t, "0");

		//COST REPORT
		document.getElementById('reportCR_C4P_Total' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4P_Total' + '_test' + t, "0");
		document.getElementById('reportCR_C4O_Total' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4O_Total' + '_test' + t, "0");
		document.getElementById('reportCR_C4H_Total' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4H_Total' + '_test' + t, "0");
		document.getElementById('reportCR_C4E_Total' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_C4E_Total' + '_test' + t, "0");
		document.getElementById('reportCR_TTL_Total' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TTL_Total' + '_test' + t, "0");

		document.getElementById('reportCR_TF_Backlog' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_Backlog' + '_test' + t, 0);
		document.getElementById('reportCR_TF_UnitCost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_UnitCost' + '_test' + t, 0);
		document.getElementById('reportCR_TF_SpaceCost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_SpaceCost' + '_test' + t, 0);
		document.getElementById('reportCR_TF_SpacePerc' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_TF_SpacePerc' + '_test' + t, 0);

		//CUMULATIVE TOTALS
		document.getElementById('reportCR_Cum_SpaceCost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_SpaceCost' + '_test' + t, 0);
		document.getElementById('reportCR_Cum_UnitCost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_UnitCost' + '_test' + t, 0);
		document.getElementById('reportCR_Cum_OvertimeCost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_OvertimeCost' + '_test' + t, 0);
		document.getElementById('reportCR_Cum_Cost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Cum_Cost' + '_test' + t, 0);

		document.getElementById('reportCR_GroupScore' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_GroupScore' + '_test' + t, 0);
		document.getElementById('reportCR_Budget' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_Budget' + '_test' + t, 0);
		document.getElementById('reportCR_ProjectedScore' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_ProjectedScore' + '_test' + 0);
		document.getElementById('reportCR_ProjectedCost' + '_test' + t).innerHTML = $.jStorage.get(myuser + 'reportCR_ProjectedCost' + '_test' + 0);
	}
}

function reload_student_input(t) {
	load_workforce_values(t);
	for (var i = 0; i < jobs.length; i++) {
		document.getElementById('input' + jobs[i] + 'equipHours').value = window['input' + jobs[i] + 'equipHours' + t];
		document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = window['input' + jobs[i] + 'workforceStart' + t];
		document.getElementById('input' + jobs[i] + 'borrow').value = window['input' + jobs[i] + 'borrow' + t];
		document.getElementById('input' + jobs[i] + 'loan').value = window['input' + jobs[i] + 'loan' + t];
		document.getElementById('input' + jobs[i] + 'hire').value = window['input' + jobs[i] + 'hire' + t];
		document.getElementById('input' + jobs[i] + 'fire').value = window['input' + jobs[i] + 'fire' + t];
		document.getElementById('input' + jobs[i] + 'seasonal').value = window['input' + jobs[i] + 'seasonal' + t];
		document.getElementById('input' + jobs[i] + 'leave').value = window['input' + jobs[i] + 'leave' + t];
		document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML = window['input' + jobs[i] + 'workforceAdjust' + t];
		document.getElementById('input' + jobs[i] + 'reserve').value = window['input' + jobs[i] + 'reserve' + t];
		document.getElementById('input' + jobs[i] + 'overtime').value = window['input' + jobs[i] + 'overtime' + t];

		document.getElementById(jobs[i] + 'equipHours').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'equipHours' + t, "0.0");
		document.getElementById(jobs[i] + 'availableWorkload').innerHTML = get_workload_total(jobs[i]);
		document.getElementById(jobs[i] + 'workforceStart').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceStart' + t, window['workforceParams' + jobs[i]]);
		document.getElementById(jobs[i] + 'workforceAdjust').innerHTML = $.jStorage.get(myuser + 'input' + jobs[i] + 'workforceAdjust' + t, window['workforceParams' + jobs[i]]);
		document.getElementById(jobs[i] + 'extraHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'neededHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'changesBorrow').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'borrow' + t, 0);
		document.getElementById(jobs[i] + 'changesLoan').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'loan' + t, 0);
		document.getElementById(jobs[i] + 'changesHire').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'hire' + t, 0);
		document.getElementById(jobs[i] + 'changesFire').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'fire' + t, 0);
		document.getElementById(jobs[i] + 'changesSeasonal').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'seasonal' + t, 0);
		document.getElementById(jobs[i] + 'changesLeave').value =  $.jStorage.get(myuser + 'input' + jobs[i] + 'leave' + t, 0);
		document.getElementById(jobs[i] + 'reserve').value =  $.jStorage.get(myuser + 'input' + jobs[i] + 'reserve' + t, 0);
		document.getElementById(jobs[i] + 'overtimeHours').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'overtime' + t, 0);
		document.getElementById(jobs[i] + 'userPlannedWork').value = $.jStorage.get(myuser + 'input' + jobs[i] + 'plannedWork' + t, 0);

	}
}

function reload_workforce_values() {
	for (var t = 0; t <= lastTimeframeReached; t++) {
		//get stored values
		load_workforce_values(t);
		//when we hit the current timeframe, push stored values to the resource input page
		if (t == lastTimeframeReached) {
			for (var i = 0; i < jobs.length; i++) {
				document.getElementById('input' + jobs[i] + 'equipHours').value = window['input' + jobs[i] + 'equipHours' + t];
				document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = window['input' + jobs[i] + 'workforceStart' + t];
				document.getElementById('input' + jobs[i] + 'borrow').value = window['input' + jobs[i] + 'borrow' + t];
				document.getElementById('input' + jobs[i] + 'loan').value = window['input' + jobs[i] + 'loan' + t];
				document.getElementById('input' + jobs[i] + 'hire').value = window['input' + jobs[i] + 'hire' + t];
				document.getElementById('input' + jobs[i] + 'fire').value = window['input' + jobs[i] + 'fire' + t];
				document.getElementById('input' + jobs[i] + 'seasonal').value = window['input' + jobs[i] + 'seasonal' + t];
				document.getElementById('input' + jobs[i] + 'leave').value = window['input' + jobs[i] + 'leave' + t];
				document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML = window['input' + jobs[i] + 'workforceAdjust' + t];
				document.getElementById('input' + jobs[i] + 'reserve').value = window['input' + jobs[i] + 'reserve' + t];
				document.getElementById('input' + jobs[i] + 'overtime').value = window['input' + jobs[i] + 'overtime' + t];
			}
		}
	}
}

function save_group_progress() {

}

function load_group_progress() {

}

function partial_group_reset(newTF) {

}

function save_workforce_values() {
	//save input resources for later retrieval if required
	//TODO - save to vars
	for (var i = 0; i < jobs.length; i++) {
		$.jStorage.set('input' + jobs[i] + 'equipHours' + currentTimeframe,document.getElementById('input' + jobs[i] + 'equipHours').value);
		$.jStorage.set('input' + jobs[i] + 'workforceStart' + currentTimeframe,document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
		$.jStorage.set('input' + jobs[i] + 'borrow' + currentTimeframe,document.getElementById('input' + jobs[i] + 'borrow').value);
		$.jStorage.set('input' + jobs[i] + 'loan' + currentTimeframe,document.getElementById('input' + jobs[i] + 'loan').value);
		$.jStorage.set('input' + jobs[i] + 'hire' + currentTimeframe,document.getElementById('input' + jobs[i] + 'hire').value);
		$.jStorage.set('input' + jobs[i] + 'fire' + currentTimeframe,document.getElementById('input' + jobs[i] + 'fire').value);
		$.jStorage.set('input' + jobs[i] + 'seasonal' + currentTimeframe,document.getElementById('input' + jobs[i] + 'seasonal').value);
		$.jStorage.set('input' + jobs[i] + 'leave' + currentTimeframe,document.getElementById('input' + jobs[i] + 'leave').value);
		$.jStorage.set('input' + jobs[i] + 'workforceAdjust' + currentTimeframe,document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
		$.jStorage.set('input' + jobs[i] + 'reserve' + currentTimeframe,document.getElementById('input' + jobs[i] + 'reserve').value);
		$.jStorage.set('input' + jobs[i] + 'overtime' + currentTimeframe,document.getElementById('input' + jobs[i] + 'overtime').value);
	}
}

function adjust_reserve_value(f) {
	var reserve = 0;
	for (var i = 0; i < jobs.length; i++) {
		reserve += parseFloat(document.getElementById('input' + jobs[i] + 'reserve').value);
	}
	$( '#inputTOTALreserve' ).text(parseFloat(reserve).toFixed(2));
	$( '#TOTALreserve' ).text(parseFloat(reserve).toFixed(2));
}

function adjust_overtime_value(f) {
	var overtime = 0;
	for (var i = 0; i < jobs.length; i++) {
		overtime += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value);
	}
	$( '#inputTOTALovertime' ).text(parseFloat(overtime).toFixed(2));
}

function load_assisted_worksheet() {
	for (var i = 0; i < jobs.length; i++) {
		document.getElementById(jobs[i] + 'equipHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'availableWorkload').innerHTML = get_workload_total(jobs[i]);
		document.getElementById(jobs[i] + 'workforceStart').innerHTML = document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML;
		document.getElementById(jobs[i] + 'workforceAdjust').innerHTML = document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML;
		document.getElementById(jobs[i] + 'equipHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'extraHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'neededHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'changesBorrow').value = "0.0";
		document.getElementById(jobs[i] + 'changesLoan').value = "0.0";
		document.getElementById(jobs[i] + 'changesHire').value = "0";
		document.getElementById(jobs[i] + 'changesFire').value = "0";
		document.getElementById(jobs[i] + 'changesSeasonal').value = "0.0";
		document.getElementById(jobs[i] + 'changesLeave').value = "0.0";
		document.getElementById(jobs[i] + 'reserve').value = "0.0";
		document.getElementById(jobs[i] + 'overtimeHours').value = "0.0";
		document.getElementById(jobs[i] + 'userPlannedWork').value = "";
	}
	adjust_total_workforce_assisted();
}

function reload_assisted_worksheet() {
	for (var i = 0; i < jobs.length; i++) {
		document.getElementById(jobs[i] + 'availableWorkload').innerHTML = get_workload_total(jobs[i]);
		document.getElementById(jobs[i] + 'workforceStart').innerHTML = document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML;
		document.getElementById(jobs[i] + 'workforceAdjust').innerHTML = document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML;
		document.getElementById(jobs[i] + 'equipHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'extraHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'neededHours').innerHTML = "0.0";
		document.getElementById(jobs[i] + 'changesBorrow').value = "0.0";
		document.getElementById(jobs[i] + 'changesLoan').value = "0.0";
		document.getElementById(jobs[i] + 'changesHire').value = "0";
		document.getElementById(jobs[i] + 'changesFire').value = "0";
		document.getElementById(jobs[i] + 'changesSeasonal').value = "0.0";
		document.getElementById(jobs[i] + 'changesLeave').value = "0.0";
		document.getElementById(jobs[i] + 'reserve').value = "0.0";
		document.getElementById(jobs[i] + 'overtimeHours').value = "0.0";
		document.getElementById(jobs[i] + 'userPlannedWork').value = "0";
	}
	adjust_total_workforce_assisted();
}

function adjust_workforce_value_assisted(sel,f,v) {
	var awl = parseFloat(document.getElementById(f + 'availableWorkload').innerHTML);
	var needed = 0;
	var extra = 0;
	var hrsToWork = 0.0;
	var hrsPlanned = 0.0;
	/*
	window['stdLabor' + jobs[i]];
	window['stdEquip' + jobs[i]];
	*/
	if (v == "plannedWork") {
		var e = 0;
		if (sel.value != null && sel.value != 0) {
			e = sel.value * window['stdEquip' + f];
		}
		//adjust equip hours
		document.getElementById(f + 'equipHours').innerHTML = e.toFixed(2);
		document.getElementById('input' + f + 'equipHours').value = e.toFixed(2);
	} else {
		//adjust workforce
		var start = parseFloat(document.getElementById(f + 'workforceStart').innerHTML);
		var end = start + parseFloat(document.getElementById(f + 'changesBorrow').value) - parseFloat(document.getElementById(f + 'changesLoan').value) + parseFloat(document.getElementById(f + 'changesHire').value) - parseFloat(document.getElementById(f + 'changesFire').value) + parseFloat(document.getElementById(f + 'changesSeasonal').value) - parseFloat(document.getElementById(f + 'changesLeave').value) + parseFloat(document.getElementById(f + 'reserve').value);
		//var end = start + parseFloat(document.getElementById(f + 'changesBorrow').value) - parseFloat(document.getElementById(f + 'changesLoan').value) + parseFloat(document.getElementById(f + 'changesHire').value) - parseFloat(document.getElementById(f + 'changesFire').value) + parseFloat(document.getElementById(f + 'changesSeasonal').value);
		$( '#' + f + 'workforceAdjust' ).text(end);

		//adjust input screen
		document.getElementById('input' + f + v).value = sel.value;
	}
	//recalculate personnel needed/extra
	//console.log('adj' + document.getElementById(f + 'workforceAdjust').innerHTML  + '    adjust x8: ' + (document.getElementById(f + 'workforceAdjust').innerHTML * 8));
	hrsToWork = parseFloat(document.getElementById(f + 'userPlannedWork').value * window['stdLabor' + f]);
	hrsPlanned = (document.getElementById(f + 'workforceAdjust').innerHTML * 8) + parseFloat(document.getElementById(f + 'overtimeHours').value);
	//console.log('hrsToWork' + hrsToWork  + '    hrsPlanned: ' + hrsPlanned);
	extra = hrsPlanned - hrsToWork;
	needed = hrsToWork - hrsPlanned;

	if (extra > 0) {
		extra = extra / 8;
		document.getElementById(f + 'extraHours').innerHTML = extra.toFixed(2);
	} else {
		document.getElementById(f + 'extraHours').innerHTML = "0.00";
	}
	if (needed > 0) {
		needed = needed / 8;
		document.getElementById(f + 'neededHours').innerHTML = needed.toFixed(2);
	} else {
		document.getElementById(f + 'neededHours').innerHTML = "0.00";
	}

	adjust_workforce_value(f);
	adjust_total_workforce_assisted();
}

function adjust_workforce_value(f) {
	var start = parseFloat(document.getElementById('input' + f + 'workforceStart').innerHTML);
	var end = start + parseFloat(document.getElementById('input' + f + 'borrow').value) - parseFloat(document.getElementById('input' + f + 'loan').value) + parseFloat(document.getElementById('input' + f + 'hire').value) - parseFloat(document.getElementById('input' + f + 'fire').value) + parseFloat(document.getElementById('input' + f + 'seasonal').value) - parseFloat(document.getElementById('input' + f + 'leave').value);
	$( '#input' + f + 'workforceAdjust' ).text(end);
	adjust_total_workforce();
};

function change_timeframe(f) {
	$.jStorage.set(f + 'currentTimeframe', document.getElementById(f + 'currentTimeframe').value);
	alert("Moved " + f + " to timeframe #" + document.getElementById(f + 'currentTimeframe').value);
}

function set_new_workforce_hire_fire() {
	var startWorkforce = 0;
	var borrow = 0;
	var loan = 0;
	var hire = 0;
	var fire = 0;
	for (var i = 0; i < jobs.length; i++) {
		window['input' + jobs[i] + 'equipHours'] = emptyVal;
		if (document.getElementById('keepBorrowAndLoan').checked) {
		//	window['input' + jobs[i] + 'borrow'] = emptyVal;
		//	window['input' + jobs[i] + 'loan'] = emptyVal;
		} else {
			window['input' + jobs[i] + 'borrow'] = emptyVal;
			window['input' + jobs[i] + 'loan'] = emptyVal;
		}
		window['input' + jobs[i] + 'hire'] = emptyVal;
		window['input' + jobs[i] + 'fire'] = emptyVal;
		window['input' + jobs[i] + 'seasonal'] = emptyVal;
		window['input' + jobs[i] + 'leave'] = emptyVal;
		window['input' + jobs[i] + 'reserve'] = emptyVal;
		window['input' + jobs[i] + 'overtime'] = emptyVal;

		startWorkforce = parseFloat(document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
		borrow = parseFloat(document.getElementById('input' + jobs[i] + 'borrow').value);
		loan = parseFloat(document.getElementById('input' + jobs[i] + 'loan').value);
		hire = parseFloat(document.getElementById('input' + jobs[i] + 'hire').value);
		fire = parseFloat(document.getElementById('input' + jobs[i] + 'fire').value);
		startWorkforce += hire;
		startWorkforce -= fire;
		//adjust student input
		document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML = parseFloat(startWorkforce);
		//adjust AWL
		document.getElementById('reportAWL_WF_' + jobs[i]).innerHTML = parseFloat(startWorkforce);


		$.jStorage.set(myuser + 'input' + jobs[i] + 'workforceStart' + (currentTimeframe + 1), parseFloat(startWorkforce));
		if (document.getElementById('keepBorrowAndLoan').checked) {

		} else {
			document.getElementById('input' + jobs[i] + 'borrow').value = 0;
			document.getElementById('input' + jobs[i] + 'loan').value = 0;
		}
		document.getElementById('input' + jobs[i] + 'equipHours').value = 0;
		document.getElementById('input' + jobs[i] + 'hire').value = 0;
		document.getElementById('input' + jobs[i] + 'fire').value = 0;
		document.getElementById('input' + jobs[i] + 'seasonal').value = 0;
		document.getElementById('input' + jobs[i] + 'leave').value = 0;
		document.getElementById('input' + jobs[i] + 'overtime').value = 0;
		document.getElementById('input' + jobs[i] + 'reserve').value = 0;
		adjust_workforce_value(jobs[i]);
	}
}


function adjust_total_workforce() {
	var equipHours = 0;
	var startWorkforce = 0;
	var borrow = 0;
	var loan = 0;
	var hire = 0;
	var fire = 0;
	var seasonal = 0;
	var leave = 0;
	var adjustWorkforce = 0;
	var reserve = 0;
	var overtime = 0;
	for (var i = 0; i < jobs.length; i++) {
		equipHours += parseFloat(document.getElementById('input' + jobs[i] + 'equipHours').value);
		startWorkforce += parseFloat(document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
		borrow += parseFloat(document.getElementById('input' + jobs[i] + 'borrow').value);
		loan += parseFloat(document.getElementById('input' + jobs[i] + 'loan').value);
		hire += parseFloat(document.getElementById('input' + jobs[i] + 'hire').value);
		fire += parseFloat(document.getElementById('input' + jobs[i] + 'fire').value);
		seasonal += parseFloat(document.getElementById('input' + jobs[i] + 'seasonal').value);
		leave += parseFloat(document.getElementById('input' + jobs[i] + 'leave').value);
		adjustWorkforce += parseFloat(document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
		reserve += parseFloat(document.getElementById('input' + jobs[i] + 'reserve').value);
		overtime += parseFloat(document.getElementById('input' + jobs[i] + 'overtime').value);

		/*
		$.jStorage.set(myuser + 'input' + jobs[i] + 'workforceStart' + currentTimeframe, document.getElementById('input' + jobs[i] + 'workforceStart').innerHTML);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'equipHours' + currentTimeframe, document.getElementById('input' + jobs[i] + 'equipHours').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'borrow' + currentTimeframe, document.getElementById('input' + jobs[i] + 'borrow').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'loan' + currentTimeframe, document.getElementById('input' + jobs[i] + 'loan').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'hire' + currentTimeframe, document.getElementById('input' + jobs[i] + 'hire').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'fire' + currentTimeframe, document.getElementById('input' + jobs[i] + 'fire').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'seasonal' + currentTimeframe, document.getElementById('input' + jobs[i] + 'seasonal').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'leave' + currentTimeframe, document.getElementById('input' + jobs[i] + 'leave').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'reserve' + currentTimeframe, document.getElementById('input' + jobs[i] + 'reserve').value);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'workforceAdjust' + currentTimeframe, document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML);
		$.jStorage.set(myuser + 'input' + jobs[i] + 'overtime' + currentTimeframe, document.getElementById('input' + jobs[i] + 'overtime').value);
		*/

	}
	$( '#inputTOTALequipHours' ).text(parseFloat(equipHours).toFixed(2));
	document.getElementById('inputTOTALequipHours').value = equipHours;
	$( '#inputTOTALworkforceStart' ).text(parseFloat(startWorkforce).toFixed(2));
	$( '#inputTOTALborrow' ).text(parseFloat(borrow).toFixed(2));
	document.getElementById('inputTOTALborrow').value = borrow;
	$( '#inputTOTALloan' ).text(parseFloat(loan).toFixed(2));
	document.getElementById('inputTOTALloan').value = loan;
	$( '#inputTOTALhire' ).text(parseFloat(hire).toFixed(2));
	document.getElementById('inputTOTALhire').value = hire;
	$( '#inputTOTALfire' ).text(parseFloat(fire).toFixed(2));
	document.getElementById('inputTOTALfire').value = fire;
	$( '#inputTOTALseasonal' ).text(parseFloat(seasonal).toFixed(2));
	document.getElementById('inputTOTALseasonal').value = seasonal;
	$( '#inputTOTALleave' ).text(parseFloat(leave).toFixed(2));
	document.getElementById('inputTOTALleave').value = leave;
	$( '#inputTOTALworkforceAdjust' ).text(parseFloat(adjustWorkforce).toFixed(2));
	$( '#inputTOTALreserve' ).text(parseFloat(reserve).toFixed(2));
	document.getElementById('inputTOTALreserve').value = reserve;
	$( '#inputTOTALovertime' ).text(parseFloat(overtime).toFixed(2));
	document.getElementById('inputTOTALovertime').value = overtime;
}

function adjust_total_workforce_assisted() {
	var equipHours = 0;
	var startWorkforce = 0;
	var borrow = 0;
	var loan = 0;
	var hire = 0;
	var fire = 0;
	var seasonal = 0;
	var leave = 0;
	var adjustWorkforce = 0;
	var reserve = 0;
	var overtime = 0;
	var extra = 0;
	var needed = 0;
	var workload = 0;
	var planned = 0;
	for (var i = 0; i < jobs.length; i++) {
		workload += parseFloat(document.getElementById(jobs[i] + 'availableWorkload').innerHTML);
		equipHours += parseFloat(document.getElementById(jobs[i] + 'equipHours').innerHTML);
		startWorkforce += parseFloat(document.getElementById(jobs[i] + 'workforceStart').innerHTML);
		planned += parseFloat(document.getElementById(jobs[i] + 'userPlannedWork').value);
		borrow += parseFloat(document.getElementById(jobs[i] + 'changesBorrow').value);
		loan += parseFloat(document.getElementById(jobs[i] + 'changesLoan').value);
		hire += parseFloat(document.getElementById(jobs[i] + 'changesHire').value);
		fire += parseFloat(document.getElementById(jobs[i] + 'changesFire').value);
		seasonal += parseFloat(document.getElementById(jobs[i] + 'changesSeasonal').value);
		leave += parseFloat(document.getElementById(jobs[i] + 'changesLeave').value);
		adjustWorkforce += parseFloat(document.getElementById(jobs[i] + 'workforceAdjust').innerHTML);
		reserve += parseFloat(document.getElementById(jobs[i] + 'reserve').value);
		overtime += parseFloat(document.getElementById(jobs[i] + 'overtimeHours').value);
		extra += parseFloat(document.getElementById(jobs[i] + 'extraHours').innerHTML);
		needed += parseFloat(document.getElementById(jobs[i] + 'neededHours').innerHTML);

	//	$.jStorage.set(myuser + 'input' + jobs[i] + 'plannedWork' + currentTimeframe, document.getElementById(jobs[i] + 'userPlannedWork').value);
	}
	$( '#TOTALuserPlannedWork' ).text(parseFloat(planned));
	$( '#TOTALavailableWorkload' ).text(parseFloat(workload));
	$( '#TOTALequipHours' ).text(parseFloat(equipHours).toFixed(2));
//	document.getElementById('TOTALequipHours').value = equipHours;
	$( '#TOTALworkforceStart' ).text(parseFloat(startWorkforce).toFixed(2));
	$( '#TOTALchangesBorrow' ).text(parseFloat(borrow).toFixed(2));
//	document.getElementById('TOTALborrow').value = borrow;
	$( '#TOTALchangesLoan' ).text(parseFloat(loan).toFixed(2));
//	document.getElementById('TOTALloan').value = loan;
	$( '#TOTALchangesHire' ).text(parseFloat(hire).toFixed(2));
//	document.getElementById('TOTALhire').value = hire;
	$( '#TOTALchangesFire' ).text(parseFloat(fire).toFixed(2));
//	document.getElementById('TOTALfire').value = fire;
	$( '#TOTALchangesSeasonal' ).text(parseFloat(seasonal).toFixed(2));
//	document.getElementById('TOTALseasonal').value = seasonal;
	$( '#TOTALchangesLeave' ).text(parseFloat(leave).toFixed(2));
//	document.getElementById('TOTALleave').value = leave;
	$( '#TOTALworkforceAdjust' ).text(parseFloat(adjustWorkforce).toFixed(2));
	$( '#TOTALreserve' ).text(parseFloat(reserve).toFixed(2));
//	document.getElementById('TOTALreserve').value = reserve;
	$( '#TOTALovertimeHours' ).text(parseFloat(overtime).toFixed(2));
//	document.getElementById('TOTALovertime').value = overtime;
	$( '#TOTALextraHours' ).text(parseFloat(extra).toFixed(2));
	$( '#TOTALneededHours' ).text(parseFloat(needed).toFixed(2));
}


function showHideReserve() {
	if (simParamsReserveUnitScenarioFlag == 1 && simParamsReserveUnitTimeframe == currentTimeframe) {
		$('.reserve').show();
	} else {
		$('.reserve').hide();
	}
}

function validate_workforce()
{
	var goodtogo = true;
	var msg = "";
	//check borrow/loan balance
	if (document.getElementById('inputTOTALborrow').value != document.getElementById('inputTOTALloan').value) {
		msg += "\nAmount borrowed does not equal amount loaned. Balance total borrow & loan amounts.";
		goodtogo = false;
	}
	//check leave values
	//alert("inputTOTALleave: " + document.getElementById('inputTOTALleave').value + " \ncurrentlyOnLeave: " + currentlyOnLeave);
	if (document.getElementById('inputTOTALleave').value != currentlyOnLeave) {
		msg += "\nCheck messages for leave impacts and adjust leave amounts.";
		goodtogo = false;
	}
	var showMaxLeaveMsg = false;
	if(currentlyOnLeave > 0) {
		for (var ii = 0; ii < jobs.length; ii++) {
			var lv = parseFloat(document.getElementById('input' + jobs[ii] + 'leave').value);
			if(lv > maxOnLeave) {
				showMaxLeaveMsg = true;
				goodtogo = false;
			}
		}
	}
	if (showMaxLeaveMsg) {
		msg += "\nOne or more functions has exceeded the maximum personnel allowed on leave for this timeframe. Check the messages tab for more information.";
	}

	//check for hire/fire workforce whole integer values
	var showHireFireWFMsg = false;
	for (var i = 0; i < jobs.length; i++) {
		//console.log("checking int values " + jobs[i] + ", Hire: " + document.getElementById('input' + jobs[i] + 'hire').value + ", int? " + (parseInt(document.getElementById('input' + jobs[i] + 'hire').value) == document.getElementById('input' + jobs[i] + 'hire').value) + " -- fire: "  + document.getElementById('input' + jobs[i] + 'fire').value + ", int? " + (parseInt(document.getElementById('input' + jobs[i] + 'fire').value) == document.getElementById('input' + jobs[i] + 'fire').value) );
		if ((parseInt(document.getElementById('input' + jobs[i] + 'hire').value) == document.getElementById('input' + jobs[i] + 'hire').value) && (parseInt(document.getElementById('input' + jobs[i] + 'fire').value) == document.getElementById('input' + jobs[i] + 'fire').value)) {
		} else {
			showHireFireWFMsg = true;
			goodtogo = false;
		}
	}
	if (showHireFireWFMsg) {
		msg += "\nHiring and firing should be done in whole number values.";
	}


	//check for negative workforce values
	var showNegativeWFMsg = false;
	for (var i = 0; i < jobs.length; i++) {
		if(parseFloat(document.getElementById('input' + jobs[i] + 'workforceAdjust').innerHTML) < 0) {
			showNegativeWFMsg = true;
			goodtogo = false;
		}
	}
	if (showNegativeWFMsg) {
		msg += "\nAdjusted workforce is less than zero in one or more functions.";
	}
	//check for overtime limit
	var showOvertimeMsg = false;
	for (var ii = 0; ii < jobs.length; ii++) {
		var ot = parseFloat(document.getElementById('input' + jobs[ii] + 'overtime').value);
		if(ot > parseFloat(document.getElementById('input' + jobs[ii] + 'workforceAdjust').innerHTML) * 4) {
			showOvertimeMsg = true;
			goodtogo = false;
		}
	}
	if (showOvertimeMsg) {
		msg += "\nOvertime value is greater than allowed in one or more functions.";
	}

	//check reserve value
	if (simParamsReserveUnitScenarioFlag == 1 && simParamsReserveUnitTimeframe == currentTimeframe) {
		var reserveValueFloat = parseFloat(document.getElementById('inputTOTALreserve').value);
		var reserveValueInt = parseInt(reserveValueFloat.toFixed(0));
		if (reserveValueInt != simParamsReserveUnitWorkforceSize) {
			msg += "\nCheck messages for reserve unit augmentees and adjust Mil Reserve allocations.";
			goodtogo = false;
		}
	}



	if (goodtogo) {
		document.getElementById('inputReport').disabled = false;
		document.getElementById('inputCheck').disabled = false;
		$("#inputReport").show();
		$("#inputCheck").show();
	} else {
		document.getElementById('inputReport').disabled = true;
		document.getElementById('inputCheck').disabled = true;
		alert('One or more problems exists with your resource plan.\n' + msg);
	}

}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

 function roundTo(n, digits) {
 		var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
		if( n < 0) {
    	negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
    	n = (n * -1).toFixed(2);
    }
    return n;
}

(function ($) {
    $.fn.disableTab = function (tabIndex, hide) {

        // Get the array of disabled tabs, if any
        var disabledTabs = this.tabs("option", "disabled");

        if ($.isArray(disabledTabs)) {
            var pos = $.inArray(tabIndex, disabledTabs);

            if (pos < 0) {
                disabledTabs.push(tabIndex);
            }
        }
        else {
            disabledTabs = [tabIndex];
        }

        this.tabs("option", "disabled", disabledTabs);

        if (hide === true) {
            $(this).find('li:eq(' + tabIndex + ')').addClass('ui-state-hidden');
        }

        // Enable chaining
        return this;
    };

    $.fn.enableTab = function (tabIndex) {
                $(this).find('li:eq(' + tabIndex + ')').removeClass('ui-state-hidden');
        this.tabs("enable", tabIndex);
        return this;
        
    };


})(jQuery);