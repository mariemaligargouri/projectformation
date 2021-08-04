const bodyParser = require('body-parser');
const express = require('express');
const connectDB = require('./config/connectDB');
const doctor = require("./routes/doctorroute");
const patient = require("./routes/patientroute");

const app = express();
app.use(express.json());
// app.use(bodyParser.json());

// routers
// add users to the database 
app.use("/registerDoc",doctor );
app.use("/registerPat",patient );
app.use("/loginDoc",doctor);
app.use("/loginPat",patient);
app.use("/authDoc", doctor);
app.use("/authPat", patient);


connectDB();



const PORT = process.env.PORT || 5000;
app.listen (PORT, (err)=> err? console.log(err): console.log(`server is running on port ${PORT}`));
