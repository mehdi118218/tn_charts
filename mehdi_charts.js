// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);      


function drawChart() {
   // grab the CSV
   $.get("final.csv", function(csvString) {
   
   // transform the CSV string into a 2-dimensional array
   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
   
   //$("#un").append("<option selected hidden disabled value='" + 999 + "'>" + "Parties Results" + "</option");

   $("#deux").append("<option selected hidden disabled value='" + 999 + "'>" + "Add an Election Data" + "</option");
   $("#trois").append("<option selected hidden disabled value='" + 999 + "'>" + "Add a Socio-economic Data" + "</option");

   
   $('<optGroup/>').attr('label',"Parties Results").appendTo($("#un"));
   $('<optGroup/>').attr('label',"Election Data").appendTo($("#deux"));
   $('<optGroup/>').attr('label',"Socio-economic Data").appendTo($("#trois"));

   $("#un").append("<option value='" + 999 + "'>" + "--------" + "</option");
   $("#deux").append("<option  value='" + 999 + "'>" + "--------" + "</option");
   $("#trois").append("<option  value='" + 999 + "'>" + "--------" + "</option");

   // use arrayData to load the select elements with the appropriate options
   for (var i = 1; i < 6; i++) {
      $("#un").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
   for (var i = 6; i < 14; i++) {
      $("#deux").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
   for (var i = 14; i < 21; i++) {
   $("#trois").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}

   $("#un option[value='1']").attr("selected","selected");
   
   /* set the default selection
   $("#un option[value='1']").attr("selected","selected");
   $("#deux option[value='6']").attr("selected","selected");
   $("#trois option[value='15']").attr("selected","selected");*/

   // this new DataTable object holds all the data
   var data = new google.visualization.arrayToDataTable(arrayData);

   //format data as percentages
   var formatter = new google.visualization.NumberFormat({pattern:'#.00%'});
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

   // set the default view
   var view = new google.visualization.DataView(data);

   var NewData = [0];

   view.setColumns([0,1]);

   //set the Charts options
   var options = {'title': data.getColumnLabel(1),
                  'width':'100%',
                  'height':'350',
                  'curveType': 'function',
                  'pointSize' : 5,
                  'vAxis':{gridlines:{count:-1},
                           baseline:0,
                           format:'#,###%'
                           }            
                  };

   //Create the chart
   var chart = new google.visualization.LineChart(document.getElementById('chart'));
   chart.draw(view, options);
    

   // set listener for the "select" changes
   $("select").change(function(){

      // determine selected domain and range
      var un = +$("#un option:selected").val();
      var deux = +$("#deux option:selected").val();
      var trois = +$("#trois option:selected").val();
      
      
      NewData=[0];

      if (un!=999) {
         NewData.push(un);
         //
      }
      if (deux!=999) {
         NewData.push(deux);
         
      }
      if (trois!=999) {
         NewData.push(trois);
         
         
      }
      view.setColumns(NewData);
      

      // update the chart
      //alert(NewData[2])
      var tit = "" + data.getColumnLabel(NewData[1]);
      if (NewData.length > 2)
      {
         
         for (var i = 2; i < NewData.length; i++) {
        tit += " Versus " + data.getColumnLabel(NewData[i]);
        }
      }

options.title = tit;

      //options.title = data.getColumnLabel(deux)+' Versus '+data.getColumnLabel(trois);
      chart.draw(view, options);
      });
   });
}