import React from 'react';

interface Props {
  mealTime: string;
  mealDescription: string;
  mealCalories: string;
}
const MealCard: React.FC<Props> = (props) => {
  return (
    <div className="m-2 border border-2 rounded p-4">
      <p className="card-text text-opacity-25">{props.mealTime}</p>
      <h5 className="card-title my-4">{props.mealDescription}</h5>
      <p> {props.mealCalories} kcal</p>
    </div>
  );
};

export default MealCard;