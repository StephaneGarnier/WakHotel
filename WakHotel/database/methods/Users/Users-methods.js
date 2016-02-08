model.Users.methods.create = function( email , password , fname , lname, role) {
	
	var	user		= ds.Users.find('email==:1',email);
	if ( user != null ) {
		return {
            error: 409,
            errorMessage: "email already exists"
        }
	}
	
	ds.startTransaction();
	
	try{
		var	user		= ds.Users.createEntity();
		
		user.email			= email;
		user.firstname		= fname;
		user.lastname		= lname;
		user.password		= password;
		user.role			= role;
		
		user.save();
		
	} catch( e ) {
	
		ds.rollBack();
		
		return e;
	
	};
	
	ds.commit();
	
	return true;
	
};

model.Users.methods.create.scope = 'public';
