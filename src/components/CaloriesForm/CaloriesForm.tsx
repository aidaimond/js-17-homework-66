import React, {useState} from 'react';
import {Eating} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";

const CaloriesForm = () => {
  const navigate = useNavigate();
  const [mealsForm, setMealsForm] = useState<Eating>({
    meal: '',
    description: '',
    calories: '',
  });
  const formChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMealsForm(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosApi.post<Eating>('/calories.json', mealsForm);
    navigate('/');
  };

  return (
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
      >
        Save
      </button>
    </form>
  );
};

export default CaloriesForm;