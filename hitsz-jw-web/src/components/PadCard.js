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

import config from "./../config.ts"
import logo from "./../logo.svg"


export default function PadCard(props) {
  let args = {}
  args.left = props.left
  args.right = props.right
  args.logo = props.logo
  if (!args.left)
    args.left = '今日空闲'
  if (!args.right)
    args.right = '享受当下！'

  let classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.root2}>
        <CardContent>
          <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" style={{ fontWeight: '600' }}>
                {args.left}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {args.right}
              </Typography>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img alt='' src={logo} style={{ height: '150px' }} />
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
