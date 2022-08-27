const express = require("express");
const rest = require('./routes/rest');
const cookieParser = require('cookie-parser');
// const graphql = require('./routes/graphql')
const PORT = 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/rest', rest);
// app.use('/graphql', graphql);

app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log("Gateway listening on port " + PORT));