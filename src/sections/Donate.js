import arr from "./data";
import { useDispatch } from "react-redux";
import Slider from "../components/Slider";
import React, { useEffect, useState } from "react";
import ProjectDetailsSlider from "../components/ProjectDetailsSlider";

const Donate = () => {
  // Current Slide Index
  const dispatch = useDispatch();
  const [current, update] = useState(2);

  // Slide Controls
  const PrevSlide = () => {
    if (current !== 1) {
      update((prev) => prev - 1);
    }
  };
  const NextSlide = () => {
    if (current !== arr.length) {
      update((prev) => prev + 1);
    }
  };

  // Toggle to show error component function
  const [isError, toggleStatus] = useState(false);
  const ToggleError = () =>
    toggleStatus((prev) => {
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
      <div className="vote_slider">
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
          arr={arr}
          type={"donate"}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />
      </div>

      <div className="vote_card">
        <p className="hd_title">Project Details</p>
        <hr className="vert_line" />

        <ProjectDetailsSlider
          arr={arr}
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
                modalData: { ...arr[current - 1], type: "donate" },
              })
            }
          >
            Donate towards project
          </button>
          <a
            target="_blank"
            href={`${arr[current - 1]?.website}`}
            className="prj_website"
          >
            <i className="ph-arrow-square-out-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Donate;
