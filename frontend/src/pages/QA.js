import React, {useState, useEffect }from 'react';

import  PickList  from '../components/PickList';
import adTags from '../components/ad_tags_final.json';

import { Divider, Typography, Container, Grid } from '@material-ui/core';
import WineLogo from '../components/francisco-wine.png';
import { makeStyles } from '@material-ui/core/styles';
import { Event } from 'react-socket-io';
import axios from 'axios';
import { tag, string } from 'postcss-selector-parser';

const useStyles = makeStyles(theme => ({
  whiteBackground: {
      backgroundColor: "#FFFFFF"
  },
  title: {
      textAlign: "center",
      margin: '15px',
  },
  center: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  half: {
      width: '50%'
  }
}));

export default function QA(props) {
    const classes = useStyles();
    const [pickList, setPickList] = useState([]);
    const [tags, setTags] = useState([]);

    const onTagsEvent = (items) => {
        console.log(items);
        getQAList();
    }

    const onPickListEvent = (items) => {
        console.log("pickList event!!!");
        getPickList();
    }
    const getPickList = () => {
        axios.get('/api/picklist')
        .then(res => {
            setPickList(res.data)
        }, error => {
            console.log(error.response.status);
        });
    }
    const getQAList = () => {
        axios.get('/api/qa')
        .then(res => {
            setTags(res.data)
        }, error => {
            console.log(error.response.status);
        });
    }
    useEffect(() => {
        getPickList();
        getQAList();
    },[]);

    return (  
        <div >
        <Event event='event/qa' handler={onTagsEvent} />
        <Event event='event/picklist' handler={onPickListEvent} />

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <img className={classes.center}src={WineLogo}></img>
            </Grid>
            <Grid item xs={6}>
            {pickList.length > 0 &&
                <div>
                <span className={classes.title}>Pick List</span>
                <PickList isPickList={true} tags={pickList}/>
                </div>
            }
            </Grid>
            <Grid item xs={6}>
            {tags.length > 0 &&
                <div>
                <span className={classes.title}>Selected Package</span>
                <PickList tags={tags}/>
                </div>
            }
            </Grid>
        </Grid>
        <Divider/>
        </div>
    )
}