const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const issueSchema = new Schema({
    issueCode: {
        type: String,
        required: "Issue code cannot be blank"
    },
    response : {
        type: String,
        required: "Response cannot be blank"
    },
    description: {
        type: String,
        required: "Description cannot be blank"
    }
 },
 {collection : 'helpdesk-library' }
);

module.exports = moongoose.model('Issue', issueSchema);