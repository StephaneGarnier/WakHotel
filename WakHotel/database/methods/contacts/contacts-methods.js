model.contacts.methods.updateCRM = function( email , fname , lname , street, city , country, mobile) {
	
	var	currentEmailID   = ds.email_addresses.find('email_address==:1',email).id;
	var currentBeanID = ds.email_addr_bean_rel.find('email_address_id = :1', currentEmailID).bean_id;
	var currentUser = ds.contacts.find('id =:1', currentBeanID);

	
	if (CurrentUser = null ) {
		return {
            error: 410,
            errorMessage: "You are not yet registered in our CRM"
        }
	}
	currentUser.first_name		= fname;
	currentUser.last_name		= lname;
	currentUser.primary_address_street	= street;
	currentUser.primary_address_city = city;
	currentUser.primary_address_country = country;
	currentUser.phone_mobile = mobile;
	currentUser.save();
			
};
			
	
model.contacts.methods.updateCRM.scope = 'public';

model.contacts.methods.getUserFromCRM = function(email) {
var	currentEmailID   = ds.email_addresses.find('email_address==:1',email).id;
var currentBeanID = ds.email_addr_bean_rel.find('email_address_id = :1', currentEmailID).bean_id;
var currentUser = ds.contacts.find('id =:1', currentBeanID);

	
	if (CurrentUseruser = null ) {
		return {
            error: 410,
            errorMessage: "You are not yet registered in our CRM"
        }
	}
		return currentUser;	
	};
			
	
model.contacts.methods.getUserFromCRM.scope = 'public';


















































