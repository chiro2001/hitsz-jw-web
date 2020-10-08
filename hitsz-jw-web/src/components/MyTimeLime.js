import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import TelegramIcon from '@material-ui/icons/Telegram';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { fade, makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
import { teal, red, grey } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Divider from '@material-ui/core/Divider';
import MyTimeLineItem from "./MyTimeLineItem";
import moment from "moment"
import config from "./../config.ts";
import logo from "./../logo.svg";

export default function MyTimeLine(props) {
  const classes = useStyles();
  let data = props.data;
  let items = new Array();
  console.log('mytimeline:', props);
  if (data && data.length == 0)
    return (
      <div><br /></div>
    )
  let last_weekday = undefined;
  // let last_connector = true;
  // for (let d of data) {
  //   last_connector = last_weekday == d.weekday || last_weekday === undefined;
  //   d.show_connector = last_connector;
  //   last_weekday = d.weekday;
  //   items.push(<MyTimeLineItem data={d} key={data.indexOf(d)}></MyTimeLineItem>);
  // }
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    if (i < data.length - 1 && d.weekday !== data[i + 1].weekday)
      d.show_connector = false;
    else
      d.show_connector = true;
    if (i == data.length - 1)
      d.show_connector = false;
    if (last_weekday === undefined) {
      items.push(<Divider variant="middle" key={i + 10086} />)
      items.push(<div key={i + 10086 * 2}>
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          {moment().day(d.weekday).format('dddd')}
        </Typography>
      </div>)
      last_weekday = d.weekday;
    }
    items.push(<MyTimeLineItem data={d} key={i}></MyTimeLineItem>);
    if (!d.show_connector && i != data.length - 1) {
      items.push(<Divider variant="middle" key={i + 10086} />)
      items.push(<div key={i + 10086 * 2}>
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          {moment().day(d.weekday + 1).format('dddd')}
        </Typography>
      </div>)
    }
  }
  return (
    <div>
      <Timeline align="alternate">
        {items}
      </Timeline>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));