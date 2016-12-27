/// <amd-dependency path='external/dimple.v2.3.0.min.js'>

function loadTrellis(element, dataView, config) {
	console.log(config);
    var trellis = element;

	trellis.style('width', config.viewport.width)
  		.style('height',config.viewport.height);
    
	// var x = convert(dataView);
	var data = convert(dataView);//loadData(); //load data from here
	//d3.tsv("/data/example_data.tsv", function (data) {

 	// Get a unique list of dates
    var months = dimple.getUniqueValues(data.rows, data.date.Date);

      // Set the bounds for the charts
      var row = 0,
          col = 0,
          top = 25,
          left = 60,
          inMarg = 15,
          width = 115,
          height = 90,
          totalWidth = config.viewport.width*.9;//;parseFloat(trellis.attr("width"));

      // Pick the latest 12 dates
      months = months.slice(months.length - 12);

      // Draw a chart for each of the 12 dates
      months.forEach(function (month) {
          
          // Wrap to the row above
          if (left + ((col + 1) * (width + inMarg)) > totalWidth) {
            row += 1;
            col = 0;
          }
          
          // Filter for the month in the iteration
          var chartData = dimple.filterData(data.rows, data.date.Date, month);
          
          // Use d3 to draw a text label for the month
          trellis
            .append("text")
                .attr("x", left + (col * (width + inMarg)) + (width / 2))
                .attr("y", top + (row * (height + inMarg)) + (height / 2) + 12)
                .style("font-family", "sans-serif")
                .style("text-anchor", "middle")
                .style("font-size", "28px")
                .style("opacity", 0.2)
                .text(chartData[0].Month.substring(0, 3));
          
          // Create a chart at the correct point in the trellis
          var myChart = new dimple.chart(trellis, chartData);
          myChart.setBounds(
            left + (col * (width + inMarg)),
            top + (row * (height + inMarg)),
            width,
            height);
          
          // Add x and fix ordering so that all charts are the same
          var x = myChart.addCategoryAxis("x", data.axis.x);
          x.addOrderRule(data.axis.x);
          
          // Add y and fix scale so that all charts are the same
          var y = myChart.addMeasureAxis("y", data.axis.y);
          y.overrideMax = 1500;
          
          // Draw the bars.  Passing null here would draw all bars with
          // the same color.  Passing owner second colors by owner, which
          // is normally bad practice in a bar chart but works in a trellis.
          // Month is only passed here so that it shows in the tooltip.
          myChart.addSeries([data.date.Month, data.axis.x], dimple.plot.bar);

          // Draw the chart
          myChart.draw();

          // Once drawn we can access the shapes
          // If this is not in the first column remove the y text
          if (col > 0) {
            y.shapes.selectAll("text").remove();
          }
          // If this is not in the last row remove the x text
          if (row < 2) {
             x.shapes.selectAll("text").remove();
          }
          // Remove the axis labels
          y.titleShape.remove();
          x.titleShape.remove();

          // Move to the next column
          col += 1;

      }, this);
}


function convert(dataView)
{

	var DateCol = -1, MonthCol = -1, CategoryCol = -1, ValueCol = -1, ret = []; 

	if (dataView && dataView.categorical && dataView.metadata && dataView.metadata.columns) { //&& dataView.categorical.categories
		var metadataColumns = dataView.metadata.columns;
		//step 1: 1)find correct column index in meta data
		for (var i = 0; i < metadataColumns.length; i++) {
			var col = metadataColumns[i];
			if (col.roles) {
				if (col.roles['Date'])
					DateCol = i;
				else if (col.roles['Month'])
					MonthCol = i;
				else if (col.roles['Category'])
					CategoryCol = i;
				else if (col.roles['Value'])
					ValueCol = i;
			}
		}
		function getMonth(d)
		{
			function pad(s) { return (s < 10) ? '0' + s : s; }
			return [pad("1"), pad(d.getMonth() + 1), d.getFullYear()].join('/')
		}
		if (dataView && dataView.table) {
			//step 2: convert table row by row into correct columns of graph
			dataView.table.rows.forEach(function (item) {
				ret.push({"Date":getMonth(item[DateCol]),"Month":item[MonthCol], "Category":item[CategoryCol], "Value":item[ValueCol]});
			});
        }
		
	}//if
	return {axis:{ x: "Category", y: "Value"}
			, date:{ Date:"Date", Month:"Month"}
			, rows: ret
		};
}
