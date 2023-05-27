import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Routes,
  Route,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import apiClient from "../../services/apiClient";
import Empty from "../Empty/Empty";
import bikepath from "../../assets/bikepath.jpg";
import moment from "moment";
import "./ExercisePage.css";

export default function ExercisePage({ appState, setAppState }) {
  if (!appState.isAuthenticated) {
    return (
      <div className="exercise-page">
        <div className="exercise-page-container">
          <h1>Log in to see your data.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-page">
      <div className="exercise-page-container">
        <Routes>
          <Route
            path="/"
            element={
              <ExercisePageHome appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/create"
            element={
              <ExercisePageCreate
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

function ExercisePageHome({ appState, setAppState }) {
  const exerciseItems = appState.exercises || [];

  const addButton = (
    <Link to="/exercise/create" as={ReactRouterLink} className="button">
      <button>Add Exercise</button>
    </Link>
  );

  return (
    <div className="exercise-page-home">
      <div className="exercise-page-container">
        <div className="exercise-feed">
          {exerciseItems.length === 0 ? (
            <>
              <Empty>
                {addButton}
                <img className="exercise-image" src={bikepath} alt="bikepath" />
              </Empty>
            </>
          ) : (
            <>
              {addButton}
              {exerciseItems.map((exercise) => (
                <ExerciseItem exercise={exercise} key={exercise.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const ExerciseItem = ({ exercise }) => {
  if (!exercise) return null;
  const { category, timestamp, name, duration, intensity, imageUrl } = exercise;

  return (
    <div className="exercise-item">
      <span className="exercise-item-timestamp">
        {moment(timestamp).calendar()}
      </span>
      <div className="exercise-item-card">
        <div className="exercise-item-header">
          <img className="exercise-item-avatar" src={imageUrl} alt={name} />
          <div className="exercise-item-details">
            <h2 className="exercise-item-name">{name}</h2>
            <span className="exercise-item-category">{category}</span>
          </div>
        </div>
        <div className="exercise-item-stats">
          <div className="exercise-item-stat">
            <label>Duration</label>
            <span>{duration}</span>
          </div>
          <div className="exercise-item-stat">
            <label>Intensity</label>
            <span>{intensity}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ExercisePageCreate({ setAppState, appState }) {
  return (
    <div className="exercise-page-create">
      <div className="exercise-page-container">
        <div className="exercise-page-create-form">
          <ExercisePageCreateForm
            appState={appState}
            setAppState={setAppState}
          />
        </div>
      </div>
    </div>
  );
}

function ExercisePageCreateForm({ setAppState, appState }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    intensity: 1,
    category: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error, message } = await apiClient.createExercise(form);

      if (error) {
        setErrors((e) => ({ ...e, form: message }));
        setIsLoading(false);
        return;
      }

      if (data) {
        setAppState((s) => ({
          ...s,
          exercises: [data.exercise, ...s.exercises],
        }));
        navigate("/exercise");
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }));
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
    <div className="exercise-page-create-form-container">
      <form onSubmit={handleOnSubmit}>
        <div className="exercise-page-create-form-field">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleOnChange(e)}
            className={errors.name ? "error" : ""}
          />
        </div>
        <div className="exercise-page-create-form-field">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleOnChange}
          >
            <option value="run">Run</option>
            <option value="bike">Bike</option>
            <option value="lift">Lift</option>
            <option value="swim">Swim</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="exercise-page-create-form-field">
          <div className="exercise-page-create-form-field-group">
            <label>Duration (min)</label>
            <input
              name="duration"
              type="number"
              min={1}
              max={100}
              value={form.duration}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="exercise-page-create-form-field-group">
            <label>Intensity</label>
            <input
              name="intensity"
              type="number"
              min={1}
              max={10}
              value={form.intensity}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
