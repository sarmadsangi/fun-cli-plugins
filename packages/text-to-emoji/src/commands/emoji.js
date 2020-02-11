const { Command, flags } = require('@oclif/command')
const got = require('got')
const cli = require('cli-ux')

const React = require('react')
const { render, Color } = require('ink')

class Counter extends React.Component {
	constructor() {
		super()

		this.state = {
			i: 0
		}
	}

	render() {
		return <Color green>{this.state.i} tests passed</Color>
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				i: this.state.i + 1
			})
		}, 100)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}
}

class TextToEmoji extends Command {
  async run() {
    const { flags } = this.parse(TextToEmoji)
    const text = flags.text
    const response = got(`https://emoji.getdango.com/api/emoji?q=${text}`)

    const emojis = await response.json()
    const limitEmojis = emojis.results.slice(0, 5)
    const emojiString = limitEmojis.reduce((result, next) => {
      result += ' ' + next.text
      return result
    }, '')
    this.log(emojiString)
    render(<Counter />)
  }
}

TextToEmoji.description = `Convert your text to emoji`

TextToEmoji.flags = {
  text: flags.string({char: 'n', description: 'text to use for emoji generation' }),
}

module.exports = TextToEmoji