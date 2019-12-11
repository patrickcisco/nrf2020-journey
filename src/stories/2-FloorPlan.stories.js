import React from 'react';
import FloorPlan from '../components/FloorPlan';
import {StageApp} from '../components/FloorCanvas';
import FloorPlanImage from '../components/FloorPlan.jpg';

export default {
  title: 'Floor Plan',
};

export const FloorPlanStory = () => {
  return (
    <FloorPlan
        image={FloorPlanImage}
    />
  );
}