const moongoose = require('mongoose');

const Helpdesk = moongoose.model('Issue');

exports.list_all_issues = (req, res) => {
    Helpdesk.find({}, (err, issues) => {
        if (err) res.send(err);
        res.json(issues);
        });
}

exports.create_an_issue = (req, res) => {
    const new_issue = new Helpdesk(req.body);
    new_issue.save((err, issue) => {
        if (err) res.send(err);
        res.json(issue);
    });
}

exports.read_an_issue = (req, res) => {
    Helpdesk.findById(req.params.issueId, (err, issue) => {
        if (err) res.send(err);
        res.json(issue);
    }); 
}

exports.update_an_issue = (req, res) => {
    Helpdesk.findOneAndUpdate({_id: req.params.issueId}, 
        req.body, 
        {new: true}, 
        (err, issue) => {
        if (err) res.send(err);
        res.json(issue);
    });
}
exports.delete_an_issue = (req, res) => {
    Helpdesk.deleteOne({_id: req.params.issueId}, 
        err => {
        if (err) res.send(err);
        res.json({
            message: 'Issue successfully deleted',
            _id: req.params.issueId
        });
    });     
}