const { Command, flags } = require('@oclif/command')
const client = require('../client/alpha-vantage')
const utils = require('./utils')

class SearchCommand extends Command {
  static description = `Describe the command here
...
Gets the last working day price
`
  static flags = utils.mergeGlobalFlags(
    {
      query: flags.string({
        char: 'q',
        description: 'search query',
        hidden: false,
        multiple: false,
        env: 'IT_SEARCH_QUERY',
        required: true,
      })
    })

  async run() {
    const { flags } = this.parse(SearchCommand)
    const query = flags.query
    const isRawOutput = flags.raw
    const searchResult = await client.searchSymbol(query)
    let textOutput = ''
    searchResult.forEach(e => {
      textOutput += e + '\n'
    })
    if (textOutput.endsWith('\n')) {
      textOutput = textOutput.slice(0, -1)
    }
    if (isRawOutput) {
      this.log(textOutput)
    } else {
      this.log(`Result for query: ${query} result:\n${textOutput}`)
    }
  }
}

module.exports = SearchCommand
