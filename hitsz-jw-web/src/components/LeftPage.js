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
import Drawer from '@material-ui/core/Drawer';
import moment from "moment"
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Data from "./../data.ts"
import Config from './../config';


export default function LeftPage(props) {
  let data = new Data();


  let comp_user_info = () => {
    let user = data.get_user();
    if (!user)
      return undefined;
    return (
      <div>
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          用户{user.uid}
        </Typography>
      </div>
    )
  };

  let comp_operations = () => {
    return (
      <div>
        <List>
          <ListItem button onClick={() => { props.history.push('/login') }}>
            <ListItemText primary="重新登录" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="设置学期开始日期" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="关于" />
          </ListItem>
        </List>
      </div>
    )
  }

  return (
    <div>
      <div>
        {comp_user_info()}
      </div>
      <div>
        {comp_operations()}
      </div>
    </div>
  )

}