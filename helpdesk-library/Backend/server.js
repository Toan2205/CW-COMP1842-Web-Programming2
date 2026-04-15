require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Issue = require('./api/models/helpdeskModels');
const routes = require('./api/routes/helpdeskRoute');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://userid:Toan1321@fgwweb2.gddk9da.mongodb.net/?appName=FGWWeb2',
    { useNewUrlParser: true }
);
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
console.log(`Server started on port ${port}`);
