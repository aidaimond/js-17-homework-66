import React, {PropsWithChildren} from 'react';
import {Eating} from "../../types";

interface Props extends PropsWithChildren {
  eating: Eating;
}
const MealCard: React.FC<Props> = ({eating, children}) => {
  return (
    <div className="m-2 border border-2 rounded p-4">
      <h5 className="card-text text-opacity-25">Meal Time: {eating.meal}</h5>
      <h5 className="card-title my-4">Meal Description: {eating.description}</h5>
      <p> Calories: {eating.calories} kcal</p>
      {children}
    </div>
  );
};

export default MealCard;