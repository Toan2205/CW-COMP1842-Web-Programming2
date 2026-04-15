const helpdeskLibrary = require('../controllers/helpdeskController');
module.exports = (app) => { 
    app
   .route('/helpdesk')
   .get(helpdeskLibrary.list_all_issues)
   .post(helpdeskLibrary.create_an_issue);   
    app
    .route('/helpdesk/:issueId')
    .get(helpdeskLibrary.read_an_issue)
    .put(helpdeskLibrary.update_an_issue)
    .delete(helpdeskLibrary.delete_an_issue);
};