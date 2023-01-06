const mongoose = require('mongoose');

export  const ConnectDb = (DB_URL: string) =>{
  mongoose.set("strictQuery", false)

  return mongoose.connect(DB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    

  }).then(() => {
    console.log("Successfully connected to Database!");
  })
  .catch((error: any) => {
    console.log("Unable to connect to Database!");
    console.error(error);
  });

}

