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
import Box from '@material-ui/core/Box';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import config from "./../config.ts";
import utils from "./../utils.js";
// import logo from "./../logo.svg";


export default function PadCard(props) {
  const right_str = {
    eat: '去哪吃？',
    ongoing: '正在进行',
    goingsoon: '就要开始了！',
    done: '享受生活吧！',
  }
  const left_str = {
    none: '今日无事',
    free: '暂时无事',
    eat: '到饭点了',
    done: '全部结束',
  }
  const center_icons = {
    free: <WbSunnyIcon style={{ height: 150, width: 150 }} />,
    eat: <FreeBreakfastIcon style={{ height: 150, width: 150 }} />,
    goingsoon: <DirectionsRunIcon style={{ height: 150, width: 150 }} />,
    done: <AssignmentTurnedInIcon style={{ height: 150, width: 150 }} />,
  }
  let left = left_str.none;
  let right = right_str.done;
  let center = center_icons.done;

  let make_center_progress = function (d) {
    let percent = (utils.getUnixNow() - utils.getDataTime(d)) / (utils.getDataEndTime(d) - utils.getDataTime(d));
    return (<Box position="relative" display="inline-flex">
      <CircularProgress variant="static" color="primary" value={parseInt(String(percent * 100))} style={{ width: 150, height: 150 }} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="primary" style={{ fontWeight: 600, fontSize: 35 }}>{`${Math.round(
          percent * 100,
        )}%`}</Typography>
      </Box>
    </Box>)
  }

  let duration_min = 60 * 60 * 24 * 3;

  // console.log('PadCard', props);
  let no_class_today = true;
  let data = props.data;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    if (d.weekday == moment().day() && d.available)
      no_class_today = false;
    if (utils.getDataTime(d) <= utils.getUnixNow() && utils.getUnixNow() <= utils.getDataEndTime(d)) {
      left = d.name;
      right = right_str.ongoing;
      console.log("on going", d.name);
      center = make_center_progress(d);
      break;
    }
    // if (utils.getDataTime(d) - utils.getUnixNow() <= 60 * 5) {
    //   left = d.name;
    //   right = right_str.goingsoon;
    //   center = center_icons.goingsoon;
    //   break;
    // }
    let duration = utils.getDataTime(d) - utils.getUnixNow();
    if (moment().day() == d.weekday && duration > 0 && duration <= duration_min) {
      duration_min = duration;
      left = left_str.free;
      right = d.name + duration_min + '秒' + '后开始';
      center = center_icons.free;
      console.log(right, utils.getUnixNow() - utils.getDataTime(d));
    }
  }
  // if (no_class_today) {
  //   left = left_str.none;
  //   right = right_str.done;
  //   center = center_icons.done;
  // }

  let classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.root2}>
        <CardContent>
          <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" style={{ fontWeight: '600' }}>
                {left}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {right}
              </Typography>
            </div>
            <div style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center' }}>
              {/* <img alt='' src={logo}/> */}
              {center}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <div></div>
              <div>
                <IconButton className={classes.button}>
                  <ArrowDropDownIcon />
                </IconButton>
                <IconButton className={classes.button}>
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>)
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    // width: '100%',
    // padding: '2%',
    // background: theme.palette.primary.main,
    background: config.bg,
    color: theme.palette.info.main
  },
  root2: {
    borderRadius: 20,
    // width: '100%',
    // padding: '2%',
    // background: theme.palette.primary.main,
    // background: config.bg,
    // color: theme.palette.info.main
  },
  headers: {
    color: theme.palette.primary.main
  },
  button: {
    color: theme.palette.info.main
  }
}))
