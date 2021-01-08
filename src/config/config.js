require('dotenv').config();
class Config{
    getApiKey(){
        return process.env.ALPHA_VANTAGE_APIKEY
    }
    getLogLevel(){
        return process.env.IT_LOG_LEVEL || 'error'
    }
    getDefaultMarket(){
        let result = process.env.IT_DEFAULT_MARKET || ''
        if(result){
            result = '.' + result
        }
        return result
    }
}
module.exports = new Config()