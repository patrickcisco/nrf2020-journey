
import React, { useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Bottles from './Bottles';
import { Event } from 'react-socket-io';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    position: "absolute",
  },
  floorPlan: {
    opacity: .7
  }
});
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
const Locations = {
  PRODUCTION: "PRODUCTION", 
  DISTRIBUTION: "DISTRIBUTION", 
  RETIAL: "RETAIL", 
  HOME: "HOME"
}

const productionLayout = {
  x: 27,
  y: 12,
}
const distributionLayout = {
  x: 70,
  y: 30,
}
const retailLayout = {
  x: 35,
  y: 80
}

const homeLayout = {
  x: 20,
  y: 57
}

const randomPlacement = (layout) => {
  let [x, y] = [layout.x, layout.y]
  // const plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
  // const plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
  // x = x + plusOrMinusX * (Math.floor(Math.random()*5))
  // y = y + plusOrMinusY * (Math.floor(Math.random()*5))
  return [x.toString() + "%", y.toString()+"%"]

}
export default function FloorPlan(props) {
  const classes = useStyles();
  const [bottleLayout, setBottleLayout] = useState(null)
  const onMessage = (items) => {
    const result = items.map((item) => {
      let x = "";
      let y = "";
      switch(item.location) {
        case Locations.HOME:
          [x, y] = randomPlacement(homeLayout)
          break;
        case Locations.DISTRIBUTION:
          [x, y] = randomPlacement(distributionLayout)
          break;
        case Locations.RETIAL:
          [x, y] = randomPlacement(retailLayout)
          break;
        case Locations.PRODUCTION:
          [x, y] = randomPlacement(productionLayout)
          break;
        default:
          return
      }
      return {
        name: item.name,
        x: x,
        y: y,
      }
    })
    setBottleLayout(result)
  }
  return ( 
    <Card className={classes.card}>
        <Event event='bottleEvent' handler={onMessage} />
        <CardMedia
          component="img"
          alt="Floor Plan"
          height={"100%"}
          image={props.image}
          className={classes.floorPlan}
          title="Floor Plan"
        />
        <Bottles
          bottles={bottleLayout || []}
        />
    </Card>
  );
}
