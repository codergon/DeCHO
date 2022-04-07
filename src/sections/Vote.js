import Slider from "../components/Slider";
import React, { useEffect, useState } from "react";
import ProjectDetailsSlider from "../components/ProjectDetailsSlider";
import { useDispatch } from "react-redux";

const Vote = () => {
  // Current Slide Index
  const dispatch = useDispatch();
  const [current, update] = useState(2);

  // Toggle to show error component function
  const [isError, setIsError] = useState();
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    fetch("https://decho-staging.herokuapp.com/api/v1/causes")
      .then((response) => response.json())
      .then((data) => {
        setIsError(false);
        setApprovals(data.data.filter((cause) => cause.status === "pending"));
      })
      .catch((err) => setIsError(true));
  }, []);

  // Slide Controls
  const PrevSlide = () => {
    if (current !== 1) {
      update((prev) => prev - 1);
    }
  };
  const NextSlide = () => {
    if (current !== approvals.length) {
      update((prev) => prev + 1);
    }
  };

  const ToggleError = () =>
    setIsError((prev) => {
      if (prev === null) {
        return false;
      }
      if (prev === false) {
        return true;
      }
      if (prev === true) {
        return null;
      }
    });

  return (
    <div className="app_pages_container">
      <div
        className="vote_slider"
        style={{ paddingTop: isError === null ? "20px" : "50px" }}
      >
        <div
          onClick={ToggleError}
          className="error_component"
          style={{
            background:
              isError === true
                ? "rgba(255,0,0, 0.06)"
                : isError === false
                ? "rgba(0,255,0, 0.08)"
                : "transparent",

            border: isError === true || (isError === false && "1px solid #eee"),
          }}
        >
          {isError === true ? (
            <>
              <span>
                <i
                  className="ph-x-circle-fill"
                  style={{ color: "#e84e4e" }}
                ></i>
              </span>
              <p>Error loading data from the server!!</p>
            </>
          ) : isError === false ? (
            <>
              <span>
                <i
                  className="ph-check-circle-fill"
                  style={{ color: "#1fa647" }}
                ></i>
              </span>
              <p>Success fetching data from server 🤙</p>
            </>
          ) : null}
        </div>

        <Slider
          arr={approvals}
          type={"vote"}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />
      </div>

      <div className="vote_card">
        <p className="hd_title">Project Details</p>
        <hr className="vert_line" />

        <ProjectDetailsSlider
          arr={approvals}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />

        <div className="vote_button_website">
          <button
            className="vote_button"
            onClick={() =>
              dispatch({
                type: "use_modal",
                modalData: {
                  ...approvals[current - 1],
                  type: "vote",
                  currency: "CHOICE",
                },
              })
            }
          >
            Vote for project
          </button>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://${approvals[current - 1]?.long_description}`}
            className="prj_website"
          >
            <i className="ph-arrow-square-out-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Vote;
