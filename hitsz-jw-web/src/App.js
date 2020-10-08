import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import TelegramIcon from '@material-ui/icons/Telegram';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PadCard from './components/PadCard'
import moment from "moment"
import MyTimeLine from "./components/MyTimeLime"
import Data from "./data.ts"
import config from "./config.ts"
import Config from './config';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.get_week_now = this.get_week_now.bind(this);
    this.update_week_data = this.update_week_data.bind(this);
    this.state = {
      timeLineData: new Array(),
    };
    Config.load();
    this.data = new Data();
    this.login('200110619', '1352040930lxr').then(this.update_week_data);
    // this.update_week_data();
  }

  get_week_now() {
    let duration = Number(moment().format('X')) - Number(moment(Config.start_time).format('X'));
    // console.log('duration', duration)
    let week = parseInt(String(duration / 60 / 60 / 24 / 7 + 1));
    return week;
  }

  async login(username, password) {
    let d = await this.data.api.login(username, password);
    if (d.code !== 0)
      throw "Login error."
    console.log('login', d);
    this.data.set_user(d.data)
  }

  async update_week_data() {
    let week = this.get_week_now();
    // console.log('week', week);
    let d = await this.data.get_by_week(week);
    console.log(this.data.token, d);
    this.setState({
      timeLineData: d.data,
    })
  }

  render() {
    return (
      <div className="App">
        {/* <AppBar style={{ background: config.bg }}> */}
        {/* <AppBar style={{ background: '#FFFFFF' }}>
        <Toolbar id="back-to-top-anchor">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            便携教务系统
          </Typography>
        </Toolbar>
      </AppBar> */}
        <div style={{ width: '100%', height: '64px' }}>
          <Toolbar id="back-to-top-anchor">
            {/* <Typography variant="h6" style={{ flexGrow: 1 }}>
            便携教务系统
          </Typography> */}
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>

        {/* 一个AppBar高度 */}
        {/* <div style={{ marginTop: 64 + 'px' }}></div> */}

        <br />

        <div className="container-main">
          <Container>
            <PadCard></PadCard>
            <MyTimeLine data={this.state.timeLineData}></MyTimeLine>
          </Container>
        </div>
      </div>
    );
  }
}

