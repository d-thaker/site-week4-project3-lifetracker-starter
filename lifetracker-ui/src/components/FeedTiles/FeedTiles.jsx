import React from "react";
import Tile from "../Tile/Tile";
import alarmImage from "../../assets/alarm.jpg";
import athleteImage from "../../assets/athlete.jpg";
import calendarImage from "../../assets/calendar.jpg";
import foodImage from "../../assets/food.jpg";
import {
  IoFitnessSharp,
  IoCalendarSharp,
  IoFastFoodOutline,
} from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";
import "./FeedTiles.css";

const tileData = [
  { label: "Fitness", image: athleteImage, icon: <IoFitnessSharp />, id: 1 },
  { label: "Food", image: foodImage, icon: <IoFastFoodOutline />, id: 2 },
  { label: "Rest", image: alarmImage, icon: <GiNightSleep />, id: 3 },
  { label: "Planner", image: calendarImage, icon: <IoCalendarSharp />, id: 4 },
];

export default function FeedTiles() {
  return (
    <div className="feed-tiles">
      {tileData.map(({ label, image, icon, id }) => (
        <div className="tile" key={id}>
          <div className="tile-header">
            <h2 className="tile-label">
              {label}
              <span className="tile-icon">{icon}</span>
            </h2>
          </div>
          <div
            className="tile-image"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      ))}
    </div>
  );
}
