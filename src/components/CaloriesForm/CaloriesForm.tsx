import React from 'react';

const CaloriesForm = () => {
  return (
    <form className="m-4">
      <div className="form-group">
        <label htmlFor="eating">Select meal</label>
        <select id="eating" name="eating" className="form-control" value=''
        >
          <option disabled value=''>
            Select page category
          </option>
          <option>
            Breakfast
          </option>
          <option>
            Snack
          </option>
          <option>
            Lunch
          </option>
          <option>
            Dinner
          </option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="meal">Meal description</label>
        <input
          id="meal" type="text" name="meal"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="calories">Calories</label>
        <input
          id="calories" type="number" name="calories"
          className="form-control"
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