const {expect, test} = require('@oclif/test')

describe('search', () => {
  let command = ['search', '-q', 'IBM']
  let message = 'runs: ';
  command.forEach(e =>{
    message += e.toString() + ' ';
  })
  test
  .stdout()
  .command(command)
  .it(message, ctx => {
    expect(ctx.stdout).to.contain('IBM')
  })
})
