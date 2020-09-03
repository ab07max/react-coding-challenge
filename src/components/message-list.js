import React from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import './styles.css'

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
    }
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => {
      // Included to support initial direction. Please remove upon completion
      console.log(messages)
    })
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  clearAllMessages = () => {
    this.setState({messages: []});
  }

  clearMessage = (id) => {
    this.setState({ messages: this.state.messages.filter(m => m.id !== id)});   
  }

  render() {
    const isApiStarted = this.api.isStarted();
    const errorMessages = this.state.messages.filter(message => message.priority === 1);
    const warningMessages = this.state.messages.filter(message => message.priority === 2);
    const infoMessages = this.state.messages.filter(message => message.priority === 3);
    console.log("error messages:", errorMessages);
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={0.5}>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >
          {isApiStarted ? 'Stop' : 'Start'}
        </Button>
        </Grid>
        <Grid item xs={0.5}>
        <Button
          variant="contained"
          onClick={this.clearAllMessages}
        >
          Clear
        </Button>
        </Grid>
        </Grid>        
          <Grid container spacing={3}>
            <Grid item xs={2}>
    <h3>Error Messages: {errorMessages.length}</h3>
        {errorMessages.map(errorMessage => {
          return (
          <Paper key={errorMessage.id} id="error">{errorMessage.message} <Button
          id="clear"
          onClick={() => this.clearMessage(errorMessage.id)}
        >
          Clear
        </Button></Paper>
          )
        })}
          </Grid>
          <Grid item xs={2}>
          <h3>Warning Messages: {warningMessages.length}</h3>
        {warningMessages.map(warningMessage => {
          return (
          <Paper key={warningMessage.id} id="warning">{warningMessage.message} <Button
          id="clear"
          onClick={() => this.clearMessage(warningMessage.id)}
        >
          Clear
        </Button></Paper>
          )
        })}
          </Grid>
          <Grid item xs={2}>
      <h3>Info Messages: {infoMessages.length}</h3>
        {infoMessages.map(infoMessage => {
          return (
            <Paper key={infoMessage.id} id="info"> {infoMessage.message} <Button
            id="clear"
            onClick={() => this.clearMessage(infoMessage.id)}
          >
            Clear
          </Button></Paper>
          )
        })}
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default MessageList;
