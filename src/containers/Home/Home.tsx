import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {EatingList, EatingMutation} from "../../types";
import MealCard from "../../components/MealCard/MealCard";
import {Link} from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<EatingMutation[] | null>(null);
  const [total, setTotal] = useState();
  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const mealsResponse = await axiosApi.get<EatingList>('/calories.json');
      let mealsList = null;
      if (mealsResponse.data !== null) {
        mealsList = Object.keys(mealsResponse.data).map(key => {
          const card = mealsResponse.data[key];
          card.id = key;
          return card;
        });
      }
        setMeals(mealsList);
    } finally {
     setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages().catch(console.error);
  }, [fetchPages]);

  console.log(meals);

  return (
    <div>
     <div className="m-4 row">
       <div className="col text-start">
         <h3>Total calories: {total ? total : 0} kcal</h3>
       </div>
       <div className="col text-end">
         <Link className='btn btn-secondary' to={'/meals/new'}>
           Add new meal
         </Link>
       </div>
     </div>
      {meals && meals.map(meal => (
        <MealCard key={meal.description} eating={meal}>
          <Link to={'/edit/meal'} className="btn btn-danger me-3">Edit</Link>
          <button className="btn btn-primary">Delete</button>
        </MealCard>
        )
      )
      }
    </div>
  );
};

export default Home;