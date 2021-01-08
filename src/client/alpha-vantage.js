const axios = require('axios').default
const config = require('../config/config')
const logger = require('../log-manager/logManager').getLogger('AlphaVantageClient')
const apikey = config.getApiKey();
const protocol = 'https'
const host = 'www.alphavantage.co'
const baseURL = `${protocol}://${host}`
const flatted = require('flatted')

class AlphaVantageClient {
    transform(data) {
        return {
            symbol: data["1. symbol"],
            fullName: data["2. name"],
            type: data["3. type"],
            region: data["4. region"],
            marketOpen: data["5. marketOpen"],
            marketClose: data["6. marketClose"],
            timezone: data["7. timezone"],
            currency: data["8. currency"],
            matchScore: data["9. matchScore"]
          }
    }
    constructor() {
        logger.trace(`baseURL:${baseURL}`)
    }
    traceCall(req, res) {
        if (logger.isTrace()) {
            const reqStr = flatted.stringify(req)
            const resStr = flatted.stringify(res)
            logger.trace(`\nreq:${reqStr}\nres:${resStr}`)
        }
    }
    async getQuote(symbol) {
        logger.debug(`Getting quote for symbol: ${symbol}`);
        let result = {}
        const req = `${baseURL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
        try {
            const res = await axios.get(req)
            this.traceCall(req, res.data)
            const symbolDetails = this.transform(res.data)

            result = res.data['Global Quote']['05. price']
        } catch (error) {
            logger.error('error getting quote')
        }

        return result
    }
    async searchSymbol(keywords) {
        logger.debug(`Searching for ${keywords}`)
        let result = []
        const req = `${baseURL}/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apikey}`
        try {
            const res = await axios.get(req)
            this.traceCall(req, res.data)
            const data = res.data
            data.bestMatches.forEach(e => {
                let symbolDetails = this.transform(e)
                let symbolName = symbolDetails.symbol
                logger.trace(`Processing symbol: ${symbolName}`)
                result.push(symbolName)
            });
        } catch (error) {
            logger.error(`error on search request: ${error}`)
        }
        return result

    }
}
module.exports = new AlphaVantageClient()