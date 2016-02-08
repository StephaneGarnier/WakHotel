

//=====generateUUID
model.leads.events.init = function(event) {
	return this.id = generateUUID()
}	
	
	
//ATTRIBUT LASTNAME NOT NULL ON VALIDATE
model.leads.last_name.events.validate = function() {
    if (this.last_name == null)  {
        return {error: 7, errorMessage: 'last_name must be declared'};
    }
    else {
        return {error: 0}; //Same as no error
    } 
}

	
//FULLNAME	
model.leads.fullName.onGet = function() {
	return this.first_name + ' ' + this.last_name;
}



model.leads.fullName.onSet = function(value) {
    var names = value.split(' '); //split value into an array 
    this.first_name = names[0];  
    this.last_name = names[1];
}



model.leads.fullName.onSort = function(ascending) {
	 if (ascending) 
        return 'last_name, first_name'; 
    else 
        return 'last_name desc, first_name desc'; 
}	 


model.leads.fullName.onQuery = function(compOp, valueToCompare) {
	
	
	var result = null;
    var pieces = valueToCompare.split(' ');     //break into array
    var fname = pieces[0];
    var lname = ''; //not sure they provided a full name
    if (pieces.length > 1)     //so check
        lname = pieces[1];     //2nd piece provided
    if (lname == '') {     //only one piece was supplied
        if (compOp == '=') {      //we will take to mean special case
           //indicating very broad query
            result = '(first_name = "' + fname + "%"+ '"';
            result += ' or last_name = "' + fname + '")';
        }     //if
        else      //we will take this to mean comparison to last_name
            result = 'last_name ' + compOp + '"' + fname + "%"+ '"';
    }
    else {     //two pieces were supplied
        switch (compOp) {
            case '=':         //since no break runs next case
            case '==':
                result = 'first_name ' + compOp + '"'+ fname + "%"+ '"';
                result += ' and last_name ' + compOp +'"'+lname + "%" + '"';
                break;
            case '!=':     //since no break runs next case
            case '!==':
                    /* could use this but not as fast
                    result = "(first_name "+ compOp +"'"+fname+"'";
                    result += "and last_name "+ compOp +"'"+lname+"')";
                    instead use the code below */
                result = 'not (';
                result += 'first_name '+compOp.substr(1)+ '"'+fname+ "%"+ '"';
                result += 'and last_name '+compOp.substr(1)+ '"'+lname+ "%"+ '")';
                break;
            case '>':         //all 4 handled in the case below
            case '>=': 
            case '<': 
            case '<=': 
                var compOper2 = compOp[0]; // get the first char
                result = '(last_name = "' + lname + "%"+ '" and first_name '
                result += compOp + '"' + fname + "%"+ '")';
                result += 'or (last_name ' + compOper2 + '"' + lname+ "%"+ '")';
                break;
        }     //switch
    }     //else
    return result;
}	 
























