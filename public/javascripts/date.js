//For Month
    var d = new Date();
    var monthArray = new Array();
    monthArray[1] = "January";
    monthArray[2] = "February";
    monthArray[3] = "March";
    monthArray[4] = "April";
    monthArray[5] = "May";
    monthArray[6] = "June";
    monthArray[7] = "July";
    monthArray[8] = "August";
    monthArray[9] = "September";
    monthArray[10] = "October";
    monthArray[11] = "November";
    monthArray[12] = "December";
    for (m = 1; m <= 12; m++) {
        var optn = document.createElement("OPTION");
        optn.text = monthArray[m];
        optn.value = (m);
        document.getElementById('month').options.add(optn);
        }
    
    for (y = 1960; y <= 2018; y++) {
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