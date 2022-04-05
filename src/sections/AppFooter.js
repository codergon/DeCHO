import React from "react";

const AppFooter = () => {
  return (
    <footer className="app_footer">
      <ul className="socials">
        <a target="_blank" href="https://www.twitter.com/AlgoDeCHO/">
          <i className="uil uil-twitter"></i>&nbsp;Twitter
        </a>
        <a target="_blank" href="https://www.linkedin.com/company/xcadecho">
          <i className="uil uil-linkedin"></i>&nbsp;Linkedin
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCyTgP56jmR6Pal5UY1xdFWg"
        >
          <i className="uil uil-youtube"></i>&nbsp;Youtube
        </a>
        <a target="_blank" href="https://decho.finance">
          <i
            className="ph-arrow-circle-up-right-fill"
            style={{ marginBottom: "3px" }}
          ></i>
          &nbsp;DeCHO
        </a>
      </ul>

      <a
        href="https://play.google.com/store/apps/details?id=com.redecho"
        target="_blank"
      >
        <img src="/assets/icons/play-store.svg" alt="" />
      </a>
    </footer>
  );
};

export default AppFooter;
