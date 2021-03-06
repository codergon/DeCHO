import Slider from "../components/Slider";
import React, { useEffect, useState } from "react";
import ProjectDetailsSlider from "../components/ProjectDetailsSlider";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Vote = () => {
  // Current Slide Index
  const dispatch = useDispatch();
  const [current, update] = useState(1);

  // Toggle to show error component function
  const [isError, setIsError] = useState();
  const [approvals, setApprovals] = useState([]);

  // Fetching data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://decho-mainnet.herokuapp.com/api/v1/causes")
      .then((response) => response.json())
      .then((data) => {
        setIsError(false);
        setApprovals(data.data.filter((cause) => cause.status === "pending"));
        setLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setLoading(false);
      });
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

  const darkTheme = useSelector((state) => state.status.darkTheme);

  return (
    <div className="app_pages_container">
      <div
        className="vote_slider"
        style={{ paddingTop: isError === null ? "20px" : "50px" }}
      >
        <div
          className="error_component"
          style={{
            background:
              isError === true
                ? "rgba(255,0,0, 0.06)"
                : isError === false
                ? "rgba(0,255,0, 0.08)"
                : "transparent",

            border:
              isError === true || isError === false
                ? darkTheme
                  ? "1px solid #444"
                  : "1px solid #eee"
                : "",
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
              <p>Error fetching data!!</p>
            </>
          ) : isError === false ? (
            <>
              <span>
                <i
                  className="ph-check-circle-fill"
                  style={{ color: "#1fa647" }}
                ></i>
              </span>
              <p>Data fetched successfully ????</p>
            </>
          ) : null}
        </div>

        <Slider
          arr={approvals}
          type={"vote"}
          loading={loading}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />
      </div>

      <div
        className="vote_card"
        style={{
          display: !loading && approvals.length === 0 ? "none" : "flex",
        }}
      >
        <p className="hd_title">Project Details</p>
        <hr className="vert_line" />

        <ProjectDetailsSlider
          arr={approvals}
          current={current}
          PrevSlide={PrevSlide}
          NextSlide={NextSlide}
        />

        <div className="vote_button_website">
          {!!approvals[current - 1]?.id ? (
            <Link
              className="vote_button"
              to={`/preview/${approvals[current - 1]?.id}`}
            >
              View project
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Vote;
