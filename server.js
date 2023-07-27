const express = require('express');
const htmlRoutes = require('./routes');
const apiRoutes = require('./routes/api/apiRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
