import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

const AppModal = () => {
  const dispatch = useDispatch();

  const { openModal, modalData } = useSelector(
    (state) => state.status.modalStatus
  );

  const [copyText, setCopyText] = useState("Copy");
  const CopyAddress = () => {
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  return (
    modalData && (
      <div
        className="app_modal"
        style={{ display: `${!!openModal ? "flex" : "none"}` }}
      >
        <div className="app_modal_inn">
          <div className="app_modal_main">
            <div className="prj_name">
              <p className="prj_title">{modalData?.name}</p>
              <p className="prj_description">{modalData?.description}</p>
            </div>

            <div className="prj_progress">
              <div className="prj_progress_num">
                <p>Target&nbsp;</p>
                <i className="ph-arrow-right-fill"></i>&nbsp;
                <span className="reached">{modalData?.reached} /</span>
                <span className="target">&nbsp;{modalData?.target}</span>
              </div>

              <div className="prj_range">
                <div
                  className="prj_range_reached"
                  style={{
                    width: `calc(100% * ${
                      modalData?.reached / modalData?.target
                    })`,
                  }}
                ></div>
              </div>
            </div>

            <div className="vote_info">
              <p className="vote_info_hd">
                Send $CHOICE to this address to {modalData?.type} or scan the
                code below; $CHOICE sent will be refunded and rewarded!
              </p>
            </div>

            <div className="wallet_address">
              <p>{modalData?.walletAddress}</p>
              <CopyToClipboard
                id="copy_address"
                text={modalData?.walletAddress}
                onCopy={CopyAddress}
                className={
                  copyText === "Copied"
                    ? "copy_address copied_address"
                    : "copy_address"
                }
              >
                <button>
                  <span>
                    <i class="ph-copy-fill"></i>
                  </span>
                  <p>{copyText}</p>
                </button>
              </CopyToClipboard>
            </div>

            <div className="qr_code_input">
              <div className="qr_code">
                <img src="https://i.postimg.cc/3R0QPd6x/frame.png" alt="" />
              </div>

              <div className="input_amt_submit">
                <div className="input_amt">
                  <p>Amount to vote</p>
                  <input type="number" min={1} />
                </div>
                <button className="proceed_button">Proceed</button>
              </div>
            </div>

            {/*  */}
          </div>
          <div
            onClick={() => dispatch({ type: "close_modal" })}
            className="close_modal"
          >
            Close Modal
          </div>
        </div>
      </div>
    )
  );
};

export default AppModal;
