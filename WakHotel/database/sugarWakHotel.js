//NEW RELATIONS !
//leads>Account
model.leads.account = new Attribute("relatedEntity", "accounts", "accounts", { foreignKey : "account_id" });
model.accounts.leadsAccountCollection = new Attribute("relatedEntities", "leadsCollection", "account", {reversePath : true});

//leads>Contact
model.leads.contact = new Attribute("relatedEntity", "contacts", "contacts", { foreignKey : "contact_id" });
model.contacts.leadsContactCollection = new Attribute("relatedEntities", "leadsCollection", "contact", {reversePath : true});


//LEADS_IMAGE TABLE > IMAGE TYPE
 //model.leads_image.PHOTO.type = "image";
 

//NEW CALCULATED CALCULATED
model.leads.fullName=new Attribute("calculated","string") ;




include("./methods/leads/leads-events.js");
include("./methods/contacts/contacts-methods.js");
