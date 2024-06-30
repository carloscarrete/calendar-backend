const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log('Database connected');

    }catch(error){
        console.log('Error', error);
        throw new Error('Database not connected', error);
    }
}

module.exports = {
    dbConnection
}