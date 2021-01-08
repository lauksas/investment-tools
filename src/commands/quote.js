const { Command, flags } = require('@oclif/command')
const { util } = require('chai')
const client = require('../client/alpha-vantage')
const utils = require('./utils')

class QuoteCommand extends Command {
  static description = `Describe the command here
...
Gets the last working day price
`
  static flags = utils.mergeGlobalFlags({
    symbol: flags.string({
      char: 's',
      description: 'stock symbol',
      hidden: false,
      multiple: false,
      env: 'IT_SYMBOL',
      required: true,
    })
  })
  async run() {
    const { flags } = this.parse(QuoteCommand)
    let symbol = flags.symbol
    const isRawOutput = flags.raw
    const market = flags.market
    if (market) {
      symbol = `${symbol}.${market}`
    }
    const quote = await client.getQuote(symbol)
    if (isRawOutput) {
      this.log(quote)
    } else {
      this.log(`${symbol} current price: ${quote}`)
    }
  }
}

module.exports = QuoteCommand
