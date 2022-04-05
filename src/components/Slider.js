import $ from "jquery";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Slider = ({ arr, type, current, PrevSlide, NextSlide }) => {
  // Slider transform divisor and multiplier
  const divisor = `calc(100% / (${arr.length}))`;
  const multiplier = `calc(100% * (${arr.length}))`;
  const divisorNext = `calc((-100% / (${arr.length})) * ${current - 1})`;

  useEffect(() => {
    $("#slider_inn").css({
      transform: `translate3d(${divisorNext}, 0px, 0px)`,
    });
  }, [current]);

  return (
    <>
      <div className="slider_container">
        <div className="slider_cover">
          <div
            id="slider_inn"
            className="slider_inn"
            style={{ width: multiplier }}
          >
            {arr.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    current - 1 == index
                      ? "slide_item slide_item_current"
                      : "slide_item"
                  }
                  style={{ width: divisor }}
                >
                  <div className="image_cover">
                    <div
                      className="item_img"
                      style={{ backgroundImage: `url(${item?.imageUrl})` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="slider_nav">
          <Link
            to={`/${type == "vote" ? "donate" : "vote"}`}
            className="donate_link_button"
          >
            {type == "vote" ? "Donate" : "Vote"} here
          </Link>

          <div>
            <div
              className={current == 1 ? "nav_button_fade" : "nav_button"}
              onClick={PrevSlide}
              style={{
                opacity: current == 1 ? 0.4 : 1,
                cursor: current == 1 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </div>
            <div
              className={
                current == arr.length ? "nav_button_fade" : "nav_button"
              }
              onClick={NextSlide}
              style={{
                opacity: current == arr.length ? 0.4 : 1,
                cursor: current == arr.length ? "not-allowed" : "pointer",
              }}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;