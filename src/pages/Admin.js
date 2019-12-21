import React, {useState, useEffect }from 'react';

import  PickList  from '../components/PickList';
import adTags from '../components/ad_tags_final.json';

import { Divider, Typography, Container, Grid } from '@material-ui/core';
import WineLogo from '../components/francisco-wine.png';
import { makeStyles } from '@material-ui/core/styles';
import { Event } from 'react-socket-io';
import axios from 'axios';
import { tag, string } from 'postcss-selector-parser';
import TagList from '../components/TagList';

const useStyles = makeStyles(theme => ({
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

export default function Admin(props) {
    const [tags, setTags] = useState([]);
    const getTags = () => {
        axios.get('/tags')
        .then(res => {
            setTags(res.data)
        }, error => {
            console.log(error.response.status);
        });
    }
    useEffect(() => {
        getTags();        
    },[]);

    return (  
        <TagList reload={getTags} tags={tags}/>
    )
}

