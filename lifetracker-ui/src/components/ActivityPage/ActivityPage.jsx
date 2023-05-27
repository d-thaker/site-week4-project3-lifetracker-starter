import React from "react";
import Card from "../Card/Card";

import "./ActivityPage.css";

const Actions = ({ title = "Activity Feed" }) => {
  return (
    <>
      <div className="stack">
        <h1 className="heading-lg">{title}</h1>
        <div className="stack button-group">
          <button
            className="button button-teal"
            onClick={() => console.log("/exercise/create")}
          >
            Add Exercise
          </button>
          <button
            className="button button-cyan"
            onClick={() => console.log("/sleep/create")}
          >
            Log Sleep
          </button>
          <button
            className="button button-blue"
            onClick={() => console.log("/nutrition/create")}
          >
            Record Nutrition
          </button>
        </div>
      </div>
    </>
  );
};

export default function ActivityPage({ appState }) {
  if (!appState.isAuthenticated) {
    return (
      <div className="ActivityPage">
        <div className="container">
          <h1 className="heading">Log in to see your data.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="ActivityPage">
      <div className="container">
        <Actions />
        <div className="simple-grid">
          <Card
            title="Total Exercise Minutes"
            className="card"
            style={{ backgroundColor: "teal", color: "white" }}
          >
            <div className="flex">
              <p className="text">
                {Number(appState.totalExerciseMinutes).toFixed(1)}
              </p>
              <div className="stack-icons">
                <i className="icon">▲</i>
                <span className="badge">+2.5%</span>
              </div>
            </div>
          </Card>
          <Card
            title="Average Hours of Sleep"
            className="card"
            style={{ backgroundColor: "cyan", color: "white" }}
          >
            <div className="flex">
              <p className="text">
                {Number(appState.averageHoursSleep).toFixed(1)}
              </p>
              <div className="stack-icons">
                <i className="icon">▼</i>
                <span className="badge badge-red">-2.5%</span>
              </div>
            </div>
          </Card>
          <Card
            title="Average Daily Calories"
            className="card"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            <div className="flex">
              <p className="text">
                {Number(appState.averageDailyCalories).toFixed(2)}
              </p>
              <div className="stack-icons">
                <i className="icon">▲</i>
                <span className="badge">+5.5%</span>
              </div>
            </div>
          </Card>
          <Card title="More Stats" className="card">
            <div className="stat-group">
              <div className="stat">
                <p className="stat-label">Max Calories In One Meal</p>
                <p className="stat-number">
                  {Number(appState.maxCaloriesInOneMeal).toFixed(1)}
                </p>
              </div>
              <div className="stat">
                <p className="stat-label">Average Exercise Intensity</p>
                <p className="stat-number">
                  {Number(appState.averageExerciseIntensity).toFixed(1)}
                </p>
              </div>
              <div className="stat">
                <p className="stat-label">Total Number of Hours Slept</p>
                <p className="stat-number">
                  {Number(appState.totalHoursSlept).toFixed(1)}
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="box"></div>
      </div>
    </div>
  );
}
