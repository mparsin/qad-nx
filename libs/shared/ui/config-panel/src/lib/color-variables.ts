export interface ColorVariable {
  light: string;
  default: string;
  contrast: string;
}

export const colorVariables: {[key: string]: ColorVariable} = {
  'Light-Turquoise': {
    light: 'rgba(118, 189, 197, .1)',
    default: 'rgb(118, 189, 197)',
    contrast: 'rgb(46, 106, 104)'
  },
  'Turquoise': {
    light: 'rgba(58, 130, 138, .1)',
    default: 'rgb(58, 130, 138)',
    contrast: 'rgb(255, 255, 255)',
  },
  'Dark-Turquoise': {
    light: 'rgba(46, 106, 104, .1)',
    default: 'rgb(46, 106, 104)',
    contrast: 'rgb(255, 255, 255)',
  },
  'Light-Purple': {
    light: 'rgba(194, 155, 209, 0.1)',
    default: 'rgb(194, 155, 209)',
    contrast: 'rgb(255, 255, 255)',
  },
  Purple: {
    light: 'rgba(153, 89, 179, 0.1)',
    default: 'rgb(153, 89, 179)',
    contrast: 'rgb(255, 255, 255)',
  },
  'Dark-Purple': {
    light: 'rgba(116, 63, 138, 0.1)',
    default: 'rgb(116, 63, 138)',
    contrast: 'rgb(255, 255, 255)',
  },
  'light-red': {
    light: 'rgba(239, 157, 156, 0.1)',
    default: 'rgb(239, 157, 156)',
    contrast: 'rgb(0, 0, 0)'
  },
  red: {
    light: 'rgba(193, 58, 43, 0.1)',
    default: 'rgb(193, 58, 43)',
    contrast: 'rgb(255, 255, 255)',
  },
  'dark-red': {
    light: 'rgba(145, 44, 32, 0.1)',
    default: 'rgb(145, 44, 32)',
    contrast: 'rgb(255, 255, 255)',
  },
  'light-orange': {
    light: 'rgba(240, 178, 123, 0.1)',
    default: 'rgb(240, 178, 123)',
    contrast: 'rgb(0, 0, 0)'
  },
  'orange': {
    light: 'rgba(230, 127, 35, 0.1)',
    default: 'rgb(230, 127, 35)',
    contrast: 'rgb(0, 0, 0)',
  },
  'dark-orange': {
    light: 'rgba(179, 95, 20, 0.1)',
    default: 'rgb(179, 95, 20)',
    contrast: 'rgb(255, 255, 255)'
  },
  'light-yellow': {
    light: 'rgba(247, 220, 112, 0.1)',
    default: 'rgb(247, 220, 112)',
    contrast: 'rgb(0, 0, 0)'
  },
  'yellow': {
    light: 'rgba(241, 196, 16, 0.1)',
    default: 'rgb(241, 196, 16)',
    contrast: 'rgb(0, 0, 0)',
  },
  'dark-yellow': {
    light: 'rgba(179, 95, 20, 0.1)',
    default: 'rgb(179, 95, 20)',
    contrast: 'rgb(255, 255, 255)'
  },
  'light-green': {
    light: 'rgba(176, 212, 152, 0.1)',
    default: 'rgb(176, 212, 152)',
    contrast: 'rgb(0, 0, 0)'
  },
  'green': {
    light: 'rgba(124, 184, 84, 0.1)',
    default: 'rgb(124, 184, 84)',
    contrast: 'rgb(0, 0, 0)',
  },
  'dark-green': {
    light: 'rgba(92, 142, 59, 0.1)',
    default: 'rgb(92, 142, 59)',
    contrast: 'rgb(255, 255, 255)'
  },
  'Magenta': {
    light: 'rgba(232, 69, 115, 0.1)',
    default: 'rgb(232, 69, 115)',
    contrast: 'rgb(255, 255, 255)'
  },
};
