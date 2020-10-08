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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import config from "./../config.ts"


export default class MyTimeLineItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  render() {
    let args = this.data;
    return (
      <div className="timeline-item-card">
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" style={{ fontWeight: '600' }}>
                {args.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <AccessTimeIcon style={{ height: 15, width: 15 }} /> {args.duration[0]}~{args.duration[1]}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <AccessTimeIcon style={{ height: 15, width: 15 }} /> {args.classroom}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    )
  }
}