//For Month
    var d = new Date();
    var monthArray = new Array();
    monthArray[0] = "January";
    monthArray[1] = "February";
    monthArray[2] = "March";
    monthArray[3] = "April";
    monthArray[4] = "May";
    monthArray[5] = "June";
    monthArray[6] = "July";
    monthArray[7] = "August";
    monthArray[8] = "September";
    monthArray[9] = "October";
    monthArray[10] = "November";
    monthArray[11] = "December";
    for (m = 0; m <= 11; m++) {
        var optn = document.createElement("OPTION");
        optn.text = monthArray[m];
        optn.value = (m + 1);
        document.getElementById('month').options.add(optn);
        }
    
    for (y = 1940; y <= 2018; y++) {
        var optn = document.createElement("OPTION");
        optn.text = y;
        optn.value = y;
        document.getElementById('year').options.add(optn);
    }
    
    for (d = 1; d <= 31; d++) {
        var optn = document.createElement("OPTION");
        optn.text = d;
        optn.value = d;
        document.getElementById('date').options.add(optn);
    }