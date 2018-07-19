var epsilon = 0.001;

var xbase = 0;
var xborrowed = 0;
var xloaned = 0;
var xhired = 0;
var xfired = 0;
var xovertime = 0;
var xseasonals = 0;
var xbodies = 0;
var xdenials = 0;
var xEquipment_Downtime_Percent = 0;
var xlost_to_blooddrive = 0;
var xon_leave = 0;

var xavail_work_limit = 0;
var xworkforce_limit = 0;
var xequipment_limit = 0;

var xworkload_to_accomplish = 0;
var xunfinished = 0;
var xdo_now = 0;

var xsum1 = 0;
var xsum2 = 0;
var xsum3 = 0;
var xsum4 = 0;
var xbonus_dollars = 0;
var xbonus_points = 0;
var xcosts_this_period = 0;
var xpersonnel_costs = 0;
var xequipment_costs = 0;
var xon_time_percentage = 0;
var xunit_cost_score = 0;
var xcum_cost = 0;
var xbudget = 0;
var xbudget_score = 0;
var xbacklog = 0;
var xbacklog_cost = 0;
var xbacklog_score = 0;
var xbacklog_divisor = 0;
var xplay_period_score = 0;
var xaverage_cost = 0;
var xprojected_budget_score = 0;
var Max_Days_Late = 0;
var iday = 0;
var itotal_late_lines = 0;

var iINV_backlog = 0;
var iSLS_backlog = 0;
var xINVdenials = 0;
var xSLSdenials = 0;
var xdenial_factor = 0;

var xEOP_TF_Factor = 0;
var xEOP_Penalty = 0;
var xEOP_Overtime_Hours = 0;
var xEOP_Regular_Hours = 0;
var xEOP_Overtime_Percent = 0;
var xEOP_OPPCT = 0;

var xBBL(17, 6) = 0;
var  xNBB_score = 0;
/*'
' xBBL is defined as follows for each function, i, from 1 to 16, and totals in 17:
'
'   (i,1) = Backlog Bonus Level (BBL) (in work units)
'   (i,2) = BBL work hours
'   (i,3) = Maximum backlog level (the maximum workload hour backlog (based on # of TFs)
'   (i,4) = Maximum backlog level work hours
'   (i,5) = Actual backlog level (for the given timeframe)
'   (i,6) = Actual backlog level work hours
' */
var isave = 0;

var xNBB_max_backlog_factor = 0;
var xNBB_max_backlog_hours = 0;

var cjobs = ["RBNP","RBKP","RBNR","RBKR","IBN1","IBK1","IBN2","IBK2","IBN3","IBK3","TBN1","TBK1","TBN2","TBK2","TBN3","TBK3","INV","SLS"];

function Accomplish_Work () 
{
	epsilon = 0.001;

	for (var i = 0; i < cjobs.length; i++) {
		//
	}
}