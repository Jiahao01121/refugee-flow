const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const ENV_INFO = require('./helpers/envInfo');
const dataRoutes = require('./routes/dataRoute');

const app = express();

// Printf env
console.info(ENV_INFO);
// Security
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
// Gzipping
app.use(compression());

// API routing
app.use('/data', dataRoutes);
// Serve react app
app.use(express.static(path.join(__dirname, '../dist')));
app.use((req, res) => { res.sendFile(path.join(__dirname, '../dist/index.html')); });

app.listen(process.env.PORT);
