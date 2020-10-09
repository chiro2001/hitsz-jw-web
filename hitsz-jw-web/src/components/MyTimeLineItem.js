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
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import PoolIcon from '@material-ui/icons/Pool';
import PublicIcon from '@material-ui/icons/Public';
import RowingIcon from '@material-ui/icons/Rowing';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
// import TwoWheelerIcon from '@material-ui/icons/TwoWheeler';
import WcIcon from '@material-ui/icons/Wc';
import MyTimeLineItemCard from './MyTimeLineItemCard'
import moment from "moment"
import config from "./../config.ts"
import utils from "./../utils.js"
import logo from "./../logo.svg"
import Config from '../config';

export default function MyTimeLine(props) {
  const classes = useStyles();
  let data = props.data;
  // console.log(data.show_connector)
  const weekday_icons = [<LooksOneIcon />, <LooksTwoIcon />, <Looks3Icon />, <Looks4Icon />, <Looks5Icon />];
  const rand_icons = [
    <PoolIcon />, <PublicIcon />, <RowingIcon />, <SportsBasketballIcon />, <TransferWithinAStationIcon />, <WcIcon />
  ];


  return (
    <TimelineItem>
      <TimelineOppositeContent></TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot style={{
          background: utils.getDataTime(data) >= utils.getUnixNow() ?
          Config.bg : utils.getDataEndTime(data) >= utils.getUnixNow() ? 'purple' : undefined
        }}>
          {data.weekday >= 1 && data.weekday <= 5 ?
            weekday_icons[data.weekday - 1]
            : rand_icons[moment().daysInMonth() % rand_icons.length]}
        </TimelineDot>
        {data.show_connector ? <TimelineConnector /> : undefined}
      </TimelineSeparator>
      <TimelineContent>
        <MyTimeLineItemCard data={data}></MyTimeLineItemCard>
      </TimelineContent>
    </TimelineItem>
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