const ENV_INFO = require('./envInfo')(); // printenv
const express = require('express');
const path = require('path');
const cors = require('cors')

const dataRoutes = require('./routes/dataRoute');
const app = express();

if (process.env.NODE_ENV === 'development') app.use(cors());

// API routing
app.use('/data',dataRoutes);

app.use(express.static(path.join(__dirname, '../build')));
app.use((req, res) => { res.sendFile(path.join(__dirname, '../build/index.html')) });

app.listen(process.env.PORT);
