// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);      

var cste = { 
'District_NAME':0,
'NAHDHA':1,
'ARIDHA':2,
'ETTAKATOL':3,
'CPR':4,
'PDP':5,
'Eligible':6,
'Blank':7,
'Cancelled':8,
'Wasted':9,
'Actively_Registered ':10,
'Passively_Registered ':11,
'Actively_Turnout':12,
'Passively_Turnout':13,
'Youth':14,
'Mobile':15,
'Computer':16,
'Internet':17,
'Unemployment ':18,
'Illiteracy':19,
'Higher Education':20,
'Secondary_Education':21,
'Unemployment_Education':22,
'District_ID':23,
'isGovernorate':24,

'lineChart':1,
'barChart':2,

'ord_desc':3,
'ord_asc':2,
'ord_regi':1,

'lvl_gov':1,
'lvl_circ':2

 };


var selected = cste.Eligible;
var line = cste.barChart;
var order = cste.ord_regi;
var lvl= cste.lvl_circ;

var data;
var chart;
var options;

var viewGov;
var viewCirc;

var dataGov;
var dataCirc;

var file = "data.csv";
var notice = "You cannot display these data on the electoral level, you will be redirected to the administrative level.\n\nPS: Remove all the selected socio-economic data to get back to the electoral level.";
var append_results = "Party Results";
var append_electoral = "Electoral Data";
var append_socio = "Socio-Economic Data";





function formatData()
{
	//format data as percentages
	var formatter = new google.visualization.NumberFormat({pattern:'0.00%'});
	formatter.format(data, 1);
	formatter.format(data, 2);
	formatter.format(data, 3);
	formatter.format(data, 4);
	formatter.format(data, 5);
	formatter.format(data, 6);
	formatter.format(data, 7);
	formatter.format(data, 8);
	formatter.format(data, 9);
	formatter.format(data, 10);
	formatter.format(data, 11);
	formatter.format(data, 12);
	formatter.format(data, 13);
	formatter.format(data, 14);
	formatter.format(data, 15);
	formatter.format(data, 16);
	formatter.format(data, 17);
	formatter.format(data, 18);
	formatter.format(data, 19);
	formatter.format(data, 20);
	formatter.format(data, 21);
	formatter.format(data, 22);
	formatter.format(data, 25);
	formatter.format(data, 26);
	formatter.format(data, 27);
	formatter.format(data, 28);
	formatter.format(data, 29);
	formatter.format(data, 30);
	formatter.format(data, 31);
	formatter.format(data, 32);
	formatter.format(data, 33);
	formatter.format(data, 34);
	formatter.format(data, 35);
	formatter.format(data, 36);
	formatter.format(data, 37);
	formatter.format(data, 38);
}



function check()
{
	lvl = +$("#level option:selected").val();

	NewColumns = [0,selected];

      var Choices = document.getElementById("first_select");
      if (Choices != null) {NewColumns = [0];} 
      
      for(i=0;i<Choices.options.length;i++)
      { 
         if (Choices.options[i].selected)
         { 
            NewColumns.push(parseInt(Choices.options[i].value));
         }
      }

      //check 2nd
      Choices = document.getElementById("second_select");

      
      for(i=0;i<Choices.options.length;i++)
      { 
         if (Choices.options[i].selected)
         { 
            NewColumns.push(parseInt(Choices.options[i].value));
         }
      }

      //check 3rd
      Choices = document.getElementById("third_select");
      $("#level").show();
      
      for(i=0;i<Choices.options.length;i++)
      { 
         if (Choices.options[i].selected)
         { 
            NewColumns.push(parseInt(Choices.options[i].value));
            if (lvl !=1)
            {
            	lvl = 1;
            	document.getElementById('level').value=1;
            	alert(notice);
            }
            $("#level").hide();


         }
      }

		updateChart(NewColumns);
}


function changeChartType()
{
	if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	else chart = new google.visualization.LineChart(document.getElementById('chart'));
	
	if (lvl == 1) chart.draw(viewGov, options);
	else chart.draw(viewCirc, options);
}

function updateChart(NewColumn)
{
		
	// update the views
	viewGov.setColumns(NewColumn);
	viewCirc.setColumns(NewColumn);

	viewGov.setRows(dataGov.getSortedRows({column: 1}));
	viewCirc.setRows(dataCirc.getSortedRows({column: 1}));
		

	if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	else chart = new google.visualization.LineChart(document.getElementById('chart'));

	if (lvl == 1) chart.draw(viewGov, options);
	else chart.draw(viewCirc, options);
}


function drawChart() {
   

   // grab the CSV
   $.get(file, function(csvString) {
   
   // transform the CSV string into a 2-dimensional array
   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
   
   // this new DataTable object holds all the data
   data = new google.visualization.arrayToDataTable(arrayData);

   //format the Data to human-readable percentages :)
   formatData();
   
   //append the default options to the selects menus
   //defaultAppendOptions(arrayData);

   // set the default view
   var view = new google.visualization.DataView(data);
   
   view.setRows(data.getFilteredRows([{column: 2, minValue: 1}]));
   dataGov = view.toDataTable();

   view.setRows(data.getFilteredRows([{column: 2, maxValue: 1}]));
   dataCirc = view.toDataTable();

   viewGov = new google.visualization.DataView(dataGov);
   viewCirc = new google.visualization.DataView(dataCirc);
     

   var NewColumns = [0,3];
   viewGov.setColumns(NewColumns);
   viewCirc.setColumns(NewColumns);
   

   //set the Charts options
   options = {'title': "",
                  'width':'100%',
                  'height':'400',
                  'curveType': 'function',
                  'pointSize' : 5,
                  'vAxis':{gridlines:{count:-1},
                           baseline:0,
                           format:'#,###%'
                           }          
                  };

   //Create the chart
	updateChart(NewColumns);

   
 



	//listener on select change
   $("#first_select").change(function(){
     check();
      });

   // set listener for the "second select" changes
   $("#second_select").change(function(){
   			check();
      });

   // set listener for the "third select" changes
   $("#third_select").change(function(){
   			check();
      });


   

	$("#chart_type").change(function()
	{
		line = +$("#chart_type option:selected").val();
		changeChartType();
	});


	


	$("#level").change(function()
	{
		lvl = +$("#level option:selected").val();

		changeChartType();
	});

   
  });
}