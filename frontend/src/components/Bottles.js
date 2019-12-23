import React from 'react';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSVG } from 'react-svg'
import WineSVG from './wine.svg';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(3),
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  shapeContainer: {
    margin: theme.spacing(2),
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
  overlay: {
      zIndex: 4,
      top: 0,
      left: 0,
      position: "absolute",
      height: "100%",
      width: "100%",
  },
  wine: {
    width: '3%',
    position: 'relative',
    display: "inline-block",
    margin: '5',
  }
}));

export default function Bottles(props) {
    const classes = useStyles();
    const bottleList = props.bottles.map((item, key) => {
        return (
            <div style={{left: item.x,top: item.y}} className={classes.wine}>
                <Badge color="primary"  badgeContent={item.name}>
                    <ReactSVG
                        src={WineSVG}
                    />
                </Badge>
            </div>
        )
    })
    return (
        <div className={classes.overlay}>
            {bottleList}
        </div>
    );
}