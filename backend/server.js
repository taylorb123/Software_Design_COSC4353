const express           = require('express');
const bodyParser        = require('body-parser');
const fuelRoutes        = require('./routes/fuel-routes');
const userRoutes        = require('./routes/users-routes');
const app               = express();
const HttpError         = require('./models/http-error');

app.use(bodyParser.json());

//middleware
app.use('/api/fuelquote', fuelRoutes); // api/fuelquote/...
app.use('/api/users', userRoutes);


app.use((req,res,next)=>{
    const error = new HttpError('Route not found', 404);
    return next(error);
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);