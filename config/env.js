module.exports = {
    PORT: process.env.PORT || 3000,
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'VO6CrykAAoFY0GIBqqswOdAkLAHQSqWwyGSohhn43mUUcdk3ujTuevA9U4p6bOZ4',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'poke_api'

};