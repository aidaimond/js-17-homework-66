import React, {useCallback, useEffect, useState} from 'react';
import {Eating} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const CaloriesForm: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [mealsForm, setMealsForm] = useState<Eating>({
    meal: '',
    description: '',
    calories: '',
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchMeal = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const mealResponse = await axiosApi.get<Eating>(`/calories/${id}.json`);
      setMealsForm(mealResponse.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void fetchMeal(id);
    }
  }, [id, fetchMeal]);

  const formChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMealsForm(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const meal = {
      ...mealsForm,
      calories: parseInt(mealsForm.calories),
      description: mealsForm.description.charAt(0).toUpperCase() + mealsForm.description.slice(1),
    };

    if (id) {
      try {
        setUpdating(true);
        await axiosApi.put<Eating>(`/calories/${id}.json`, meal);
      } finally {
        setUpdating(false);
      }

    } else {
      try {
        setUpdating(true);
        await axiosApi.post<Eating>('/calories.json', meal);
      } finally {
        setUpdating(false);
        navigate('/');
      }
    }
  };

  return (
    loading ? <Spinner/> :
      <form className="m-4" onSubmit={onFormSubmit}>
        <h4 className="my-4">Add new meal</h4>
        <div className="form-group">
          <label htmlFor="meal">Select meal</label>
          <select id="meal" name="meal" className="form-control"
                  onChange={formChanged}
                  value={mealsForm.meal}>
            <option disabled value=''>
              Select page category
            </option>
            <option>Breakfast</option>
            <option>Snack</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Meal description</label>
          <input
            id="description" type="text" name="description"
            className="form-control"
            onChange={formChanged}
            value={mealsForm.description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="calories">Calories</label>
          <input
            id="calories" type="number" name="calories"
            className="form-control"
            onChange={formChanged}
            value={mealsForm.calories}
          />
        </div>
        <button
          type="submit" className="btn btn-secondary my-4"
          disabled={mealsForm.calories === '' || mealsForm.meal === '' || mealsForm.description === ''}
        >
          {updating ? <ButtonSpinner/> : ' Save'}
        </button>
      </form>

  );
};

export default CaloriesForm;