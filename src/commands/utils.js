const { Command, flags } = require('@oclif/command')
class Utils {
    static globalFlags = {
        market: flags.boolean({
            char: 'm',
            hidden: false,
            env: 'IT_DEFAULT_MARKET',
            multiple: false,
            required: false,
        }),
        raw: flags.boolean({
            char: 'r',
            hidden: false,
            env: 'IT_RAW_OUTPUT',
            multiple: false,
            required: false,
            default: false,
        })
    }
    mergeGlobalFlags(flags) {
        const result = Object.assign(flags, Utils.globalFlags)
        return result
    }
}

module.exports = new Utils()