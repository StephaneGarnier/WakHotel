function loginFunc(email, password) {
	
	
    var u = ds.Users.find("email=:1",email);
    
    if (!u) {
        return false;
    }
    else {    	
        if (u.password == password) {
        	
           	var theGroups = [];
            switch (u.role){
                case 'Admin': 
                    theGroups.push('Admin');
                    break;
                case 'Users': 
                    theGroups.push('Users');
                    break;
                case 'Managers': 
                    theGroups.push('Managers');
                    break;
            }
            var connectTime = new Date();
            
            return {
                ID: u.ID,
                name: u.email,
                fullName: u.fullname,
				belongsTo: theGroups,
                storage: {
                    time: connectTime
                }
            };
        }
        else
        {
        	return {
	            error: 1024,
	            errorMessage: "invalid login"
	        }
	    }
    }
};
