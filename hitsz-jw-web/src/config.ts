import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal, red, grey, deepOrange } from '@material-ui/core/colors';

export default class Config {
  public static default_config = {
    theme: {
      // primary: {
      //   main: '#FFFFFF',
      // },
      // secondary: {
      //   main: red[500],
      // },
      // info: {
      //   main: grey[50],
      // }
      primary: { main: red[500] },
      secondary: { main: deepOrange[500] },
      info: { main: grey[50] },
      type: 'dark',
    },
    bg: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    start_time: '2020-08-31',
  };

  public static theme = createMuiTheme({
    palette: {
      primary: {
        main: Config.default_config.theme.primary.main
      },
      secondary: {
        main: Config.default_config.theme.secondary.main
      },
      info: {
        main: Config.default_config.theme.info.main
      }
    },
  })

  public static bg = Config.default_config.bg;
  public static start_time = Config.default_config.start_time;

  public static load() {
    let got = localStorage.getItem('config');
    if (!got) {
      Config.save();
      return Config.default_config;
    }
    let obj = Config.default_config;
    try {
      obj = JSON.parse(got);
    } catch (err) {
      Config.save();
      return Config.default_config;
    }
    return obj;
  }

  public static save(obj: any = undefined) {
    if (!obj)
      localStorage.setItem('config', JSON.stringify({
        theme: {
          primary: Config.theme.palette.primary,
          secondary: Config.theme.palette.secondary,
          info: Config.theme.palette.info,
        },
        bg: Config.bg,
        start_time: Config.start_time,
      }));
    else
      try {
        localStorage.setItem('config', JSON.stringify(obj));
      } catch (err) { console.log('warning', err) }
  }
}