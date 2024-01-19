const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());
app.use(cookieParser());


const userRoutes = require('./routes/userRoutes');
const venderRoutes = require('./routes/venderRoutes');
const adminRoutes = require('./routes/adminRoutes');

mongoose.connect('mongodb+srv://dblink725:dblink@cluster0.ugpzobw.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Success');
  })
  .catch((err) => console.log('Error:', err));

  app.get('/app', (req,res) => {
    res.json({msg:"Running"});
})

app.listen(8000);

app.use('/api/user', userRoutes);
app.use('/api/vender', venderRoutes);
// app.use('/api/admin', adminRoutes);
