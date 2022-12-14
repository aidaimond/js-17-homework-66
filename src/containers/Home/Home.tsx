import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {EatingList, EatingMutation} from "../../types";
import MealCard from "../../components/MealCard/MealCard";
import {Link} from "react-router-dom";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [meals, setMeals] = useState<EatingMutation[] | null>(null);
  const fetchMeals = useCallback(async () => {
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

  const total = meals?.reduce((sum, meal) => {
    return sum + meal.calories;
  }, 0);

  useEffect(() => {
    fetchMeals().catch(console.error);
  }, [fetchMeals]);

  const remove = async (id: string) => {
    try {
      setUpdating(true);
      await axiosApi.delete('/calories/' + id + '.json');
    } finally {
      setUpdating(false);
      void fetchMeals();
    }
  };

  return (
    <div>
      <div className="m-4 row">
        <div className="col text-start">
          <h3>{meals ? ('Total calories: ' + total + ' kcal') : 'Your meals is empty'}</h3>
        </div>
        <div className="col text-end">
          <Link className='btn btn-secondary' to={'/meals/new'}>
            Add new meal
          </Link>
        </div>
      </div>
      {loading ? <Spinner/> :
        <div className="m-4 row">
          {meals && meals.map(meal => (
              <MealCard key={meal.id} eating={meal}>
                <Link to={'/edit/meal/' + meal.id}
                      className="btn btn-danger me-3">Edit
                </Link>
                <button className="btn btn-primary"
                        onClick={() => remove(meal.id)}>{updating ?
                  <ButtonSpinner/> : 'Delete'}
                </button>
              </MealCard>
            )
          )
          }
        </div>}
    </div>
  );
};

export default Home;