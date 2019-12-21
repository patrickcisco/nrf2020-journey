import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import  PickList  from '../components/PickList';
import adTags from '../components/ad_tags_final.json';
import SimpleCard from '../components/SimpleCard';
import { Divider, Typography, Container, Grid } from '@material-ui/core';
import WineLogo from '../components/francisco-wine.png';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  center: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  half: {
      width: '50%'
  }
});
export default {
  title: 'Pick List',
};


export const toStorybook = () => {
    const classes = useStyles();
    const goodTags = adTags.filter(item => {
        console.log(item);
        const validItems = ["shipping good"]
        return validItems.includes(item["Image (Ref only not for printing)"]);
    })
    const badTags = adTags.filter(item => {
        console.log(item);
        const validItems = ["shipping bad"]
        return validItems.includes(item["Image (Ref only not for printing)"]);
    })

    const goodRows = goodTags.map(k => {
        return {
            "name": k["MFG -NAME"], 
            "product": k["PRODUCT_NAME"],
            "eur": k["Sale_Price_EUR"],
            "usd": k["Sale_Price_USD"],
            "upc": k["PRODUCT_ID/UPC"],
            "epc": k["EPC"],
            "inlay": k["Inlay"],
            "good":  true,
        }
    }) 

    const badRows = goodTags.map(k => {
        return {
            "name": k["MFG -NAME"], 
            "product": k["PRODUCT_NAME"],
            "eur": k["Sale_Price_EUR"],
            "usd": k["Sale_Price_USD"],
            "upc": k["PRODUCT_ID/UPC"],
            "epc": k["EPC"],
            "inlay": k["Inlay"],
            "good":  true,
        }
    })


    return (  
        <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <img className={classes.center}src={WineLogo}></img>
            </Grid>
            <Grid item xs={6}>
                <PickList isPickList={true} tags={goodRows}/>
            </Grid>
            <Grid item xs={6}>
                <PickList tags={badRows}/>
            </Grid>
        </Grid>
        <Divider/>
        </div>
    )
}
toStorybook.story = {
  name: 'to Storybook',
};
