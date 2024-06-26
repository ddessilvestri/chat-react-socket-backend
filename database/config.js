const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN_STRING,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error in the database - check logs');
    }
}

module.exports = {
    dbConnection
}