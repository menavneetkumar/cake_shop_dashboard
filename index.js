const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
mongoose.set('strictQuery', false);

const campaignsRoutes = require('./routes/campaigns');

app.use(express.json());
app.use(cors());
app.use('/api/campaigns', campaignsRoutes);

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});
mongoose
  .connect(process.env.MONGO_URI)
  

  .then(() => {
    app.listen(process.env.PORT || 3000 , () => {
      console.log('database connected');
      console.log('Listening on port 4000...');
    });
  })
  .catch((err) => {
    console.log(err);
  });
