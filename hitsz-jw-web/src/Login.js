import React from 'react'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Data from "./data.ts"
import Config from './config';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.state = {
      username: props.user ? props.user.uid : undefined,
      password: undefined,
    }
    this.data = new Data();
  }
  async login(username, password) {
    let d = await this.data.api.login(username, password);
    if (d.code !== 0)
      throw "Login error."
    console.log('login', d);
    this.data.set_user(d.data)
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }
  render() {
    return (
      <Container>
        <br />
        <Typography variant="h3" style={{ textAlign: 'center' }}>
          用户登录
        </Typography>
        <br />
        <div style={{ width: '100%' }}>
          <TextField id="outlined-basic" label="用户名" variant="outlined" fullWidth onChange={this.handleUsernameChange.bind(this)}/>
        </div>
        <br />
        <div style={{ width: '100%' }}>
          <TextField id="outlined-basic" label="密码" variant="outlined" fullWidth type="password" onChange={this.handlePasswordChange.bind(this)}/>
        </div>
        <br />
        <Button variant="contained" color="primary" fullWidth onClick={() => {
          console.log(this.state.username, this.state.password);
          this.login(this.state.username, this.state.password).then(() => {
            console.log('OK')
            let data2 = new Data();
            data2.remove_weeks();
            this.history.go(-1);
          }).catch((err) => {
            console.log(err);
          })
        }}>登录</Button>
      </Container>
    )
  }
}