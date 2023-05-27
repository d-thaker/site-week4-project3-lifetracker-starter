import { useState } from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import emptyFridge from "../../assets/empty-fridge.jpg";
import apiClient from "../../services/apiClient";
import Empty from "../Empty/Empty";
import moment from "moment";

import "./nutritionPage.css";

export default function NutritionPage({ appState, setAppState }) {
  if (!appState.isAuthenticated) {
    return (
      <div className="flex-container">
        <div className="container">
          <h2>Log in to see your data.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="nutrition-page">
      <div className="max-width-container">
        <Routes>
          <Route
            path="/"
            element={
              <NutritionPageHome
                appState={appState}
                setAppState={setAppState}
              />
            }
          />
          <Route
            path="/create"
            element={
              <NutritionPageCreate
                appState={appState}
                setAppState={setAppState}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function NutritionPageHome({ appState, setAppState }) {
  const nutritionItems = appState.nutrition || [];
  return (
    <div className="flex-container mt-16">
      <div className="flex-item mx-auto">
        <div className="nutrition-feed">
          {nutritionItems.length === 0 ? (
            <>
              <Empty>
                <Link to="/nutrition/create" className="button">
                  <button className="button">
                    <>Record Nutrition</>
                  </button>
                </Link>

                <img
                  className="empty-fridge-image"
                  src={emptyFridge}
                  alt="Empty Fridge"
                />
              </Empty>
            </>
          ) : (
            <>
              <Link to="/nutrition/create" className="button">
                <button className="button">
                  <>Record Nutrition</>
                </button>
              </Link>
              {nutritionItems.map((nutrition) => (
                <NutritionItem nutrition={nutrition} key={nutrition.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const NutritionItem = ({ nutrition }) => {
  if (!nutrition) return null;
  const { category, timestamp, name, calories, quantity, imageUrl } = nutrition;

  return (
    <div className="nutrition-item">
      <span className="timestamp">{moment(timestamp).calendar()}</span>
      <div className="nutrition-details">
        <div className="avatar">
          <img className="avatar-image" src={imageUrl} alt={name} />
        </div>
        <div className="name">
          <h3>
            {name}
            <span className="category">{category}</span>
          </h3>
        </div>
      </div>
      <div className="nutrition-stats">
        <div className="stat">
          <span className="label">Calories</span>
          <span className="value">{calories}</span>
        </div>
        <div className="stat">
          <span className="label">Quantity</span>
          <span className="value">{quantity}</span>
        </div>
      </div>
    </div>
  );
};

function NutritionPageCreate({ setAppState, appState }) {
  return (
    <div className="nutrition-page-create">
      <div className="max-width-container">
        <div className="flex-container mt-16">
          <div className="flex-item mx-auto">
            <div className="create-form-container">
              <div className="create-form">
                <div className="empty-column"></div>
                <NutritionPageCreateForm
                  appState={appState}
                  setAppState={setAppState}
                />
                <div className="empty-column"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NutritionPageCreateForm({ setAppState, appState }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 1,
    calories: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error, message } = await apiClient.createNutrition(form);

      if (error) {
        setErrors((e) => ({ ...e, form: message }));
        setIsLoading(false);
        return;
      }
      if (data) {
        setAppState((s) => ({
          ...s,
          nutrition: [data.nutrition, ...s.nutrition],
        }));
        navigate("/nutrition");
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleOnNumberInputChange = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="create-form-container">
      <div className="create-form">
        <form onSubmit={handleOnSubmit}>
          <div className="form-field">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleOnChange(e)}
              className={errors.name ? "is-invalid" : ""}
            />
          </div>
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleOnChange}
            >
              <option value="snack">Snack</option>
              <option value="beverage">Beverage</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              type="number"
              step="1"
              min="1"
              max="100"
              value={form.quantity}
              onChange={(e) =>
                handleOnNumberInputChange("quantity", e.target.value)
              }
            />
          </div>
          <div className="form-field">
            <label htmlFor="calories">Calories</label>
            <input
              name="calories"
              type="number"
              step="10"
              min="0"
              max="100000"
              value={form.calories}
              onChange={(e) =>
                handleOnNumberInputChange("calories", e.target.value)
              }
            />
          </div>
          <div className="form-field">
            <input
              name="imageUrl"
              type="text"
              placeholder="URL for image"
              value={form.imageUrl}
              onChange={(e) => handleOnChange(e)}
              className={errors.imageUrl ? "is-invalid" : ""}
            />
          </div>

          <button
            type="submit"
            className={`button-primary ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
