import { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Empty from "../Empty/Empty";
import emptyBed from "../../assets/empty-bed.jpg";
import moment from "moment";

import "./SleepPage.css";

export default function SleepPage({ appState, setAppState }) {
  if (!appState.isAuthenticated) {
    return (
      <div className="Flex ActivityPage" style={{ paddingTop: "30px" }}>
        <div className="Container" style={{ maxWidth: "960px" }}>
          <h1>Log in to see your data.</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="SleepPage" style={{ marginTop: "10px" }}>
      <div style={{ maxWidth: "1680px", margin: "0 auto" }}>
        <Routes>
          <Route
            path="/"
            element={
              <SleepPageHome appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/create"
            element={
              <SleepPageCreate appState={appState} setAppState={setAppState} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function SleepPageHome({ appState, setAppState }) {
  const sleepItems = appState.sleep || [];

  const addButton = (
    <NavLink to="/sleep/create" className="button">
      <button>
        <>Add Sleep</>
      </button>
    </NavLink>
  );

  return (
    <div
      className="Flex"
      style={{
        marginTop: "16px",
        maxWidth: "1680px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        className="Flex"
        style={{
          margin: "0 auto",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="sleep-feed">
          {sleepItems.length === 0 ? (
            <>
              <Empty>
                {addButton}

                <img
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src={emptyBed}
                  alt="Empty Bed"
                />
              </Empty>
            </>
          ) : (
            <>
              {addButton}
              {sleepItems.map((sleep) => (
                <SleepItem sleep={sleep} key={sleep.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const SleepItem = ({ sleep }) => {
  if (!sleep) return null;
  const { startTime, endTime } = sleep;
  const name = moment(startTime).format("MMM Do, YYYY");

  const hours = moment(endTime).diff(moment(startTime), "hours", true);

  return (
    <div
      style={{
        marginTop: "5px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div className="sleep-item">
        <div style={{ marginBottom: "10px" }}>
          <div className="Avatar" style={{ marginRight: "3px" }}>
            <span className="name">{String(hours) + "hr"}</span>
          </div>
          <div style={{ marginLeft: "3px" }}>
            <h2 style={{ color: "white" }}>
              <>{name}</>
            </h2>
          </div>
        </div>

        <div
          className="Flex white"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div className="Stat">
            <div className="StatLabel">Start Time</div>
            <div className="StatNumber">{moment(startTime).format("LT")}</div>
          </div>
          <div className="Stat">
            <div className="StatLabel">End Time</div>
            <div className="StatNumber">{moment(endTime).format("LT")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SleepPageCreate({ setAppState, appState }) {
  return (
    <div>
      <div style={{ marginTop: "16px", maxWidth: "1680px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flex: "1",
            margin: "0 40px",
            marginBottom: "32px",
          }}
        >
          <div style={{ flex: "1", marginRight: "16px" }}>
            <SleepPageCreateForm
              appState={appState}
              setAppState={setAppState}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SleepPageCreateForm({ setAppState, appState }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error, message } = await apiClient.createSleep(form);

      if (error) {
        setErrors((e) => ({ ...e, form: message }));
        setIsLoading(false);
        return;
      }
      if (data) {
        setAppState((s) => ({ ...s, sleep: [data.sleep, ...s.sleep] }));
        navigate("/sleep");
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }));
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="Flex"
      style={{
        flexDirection: "column",
        width: "100wh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="Stack"
        style={{
          flexDirection: "column",
          marginBottom: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "cyan.500" }}>Record Sleep</h2>

        <div style={{ minWidth: "90%", maxWidth: "468px" }}>
          <form onSubmit={handleOnSubmit}>
            <div className="form-container">
              <div>
                <label>Start Time</label>
                <div>
                  <input
                    name="startTime"
                    type="datetime-local"
                    placeholder="Start Time"
                    value={form.startTime}
                    onChange={(e) => handleOnChange(e)}
                    className={errors.startTime ? "invalid" : ""}
                  />
                </div>
              </div>
              <div>
                <label>End Time</label>
                <div>
                  <input
                    name="endTime"
                    type="datetime-local"
                    placeholder="End Time"
                    value={form.endTime}
                    onChange={(e) => handleOnChange(e)}
                    className={errors.endTime ? "invalid" : ""}
                  />
                </div>
              </div>
              <div>
                {errors.form && (
                  <span style={{ color: "red", marginBottom: "10px" }}>
                    {errors.form}
                  </span>
                )}
              </div>
              <div>
                <button type="submit" className="button" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
