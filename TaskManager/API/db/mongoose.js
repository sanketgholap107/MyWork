//file will handle connection logic to mongodb
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://sanket:Messineymarjr107@cluster0.t88cszb.mongodb.net/MEAN?retryWrites=true&w=majority").then(()=>{
    console.log("connection successfull");
}).catch((Error)=>{
    console.log(`there is some error${Error}`);
}); 

module.exports={mongoose};