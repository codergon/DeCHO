import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createTransaction, myAlgoConnect, algodClient } from "../utils";

const AppModal = () => {
  const dispatch = useDispatch();
  const [amountToSend, setAmountToSend] = useState(1);
  const [copyText, setCopyText] = useState("Copy");
  const { openModal, modalData } = useSelector(
    (state) => state.status.modalStatus
  );

  const connectedWalletAddr = localStorage.getItem("walletAddr");

  const CopyAddress = () => {
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  const onProceed = () => {
    const newAmountToSend = parseFloat(amountToSend);

    if (!connectedWalletAddr) {
      return alert("Your wallet needs to be connected!");
    }

    if (newAmountToSend < 1) {
      return alert(`You need to send a minimum of 1 $${modalData.currency}`);
    }

    const txnByte = createTransaction(
      newAmountToSend,
      modalData.decho_wallet.address,
      connectedWalletAddr,
      modalData.currency
    );

    myAlgoConnect.signTransaction(txnByte).then((signedTxn) => {
      algodClient
        .sendRawTransaction(signedTxn.blob)
        .do()
        .then((txnID) => {
          return alert(
            `Check donation status on https://algoexplorer.io/tx/${txnID}`
          );
        })
        .catch((err) => alert("An error occured"));
    });
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
              <p className="prj_title">{modalData?.title}</p>
              <p className="prj_description">{modalData?.short_description}</p>
            </div>

            <div className="prj_progress">
              <div className="prj_progress_num">
                <p>Target&nbsp;</p>
                <i className="ph-arrow-right-fill"></i>&nbsp;
                <span className="reached"> {modalData?.balance}/</span>
                <span className="target">
                  &nbsp;
                  {modalData.status === "Approved"
                    ? modalData?.donations.goal
                    : modalData?.cause_approval.goal}
                </span>
              </div>

              <div className="prj_range">
                <div
                  className="prj_range_reached"
                  style={{
                    width:
                      modalData.status === "Approved"
                        ? `calc(100% * ${
                            modalData?.balance / modalData?.donations.goal
                          })`
                        : `calc(100% * ${
                            modalData?.balance / modalData?.cause_approval.goal
                          })`,
                  }}
                ></div>
              </div>
            </div>

            <div className="vote_info">
              <p className="vote_info_hd">
                Send ${modalData?.currency} to this address to {modalData?.type}{" "}
                or scan the code below; ${modalData?.currency} sent will be
                refunded and rewarded!
              </p>
            </div>

            <div className="wallet_address">
              <p>{modalData?.decho_wallet.address}</p>
              <CopyToClipboard
                id="copy_address"
                text={modalData?.decho_wallet.address}
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
                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setAmountToSend(e.target.value)}
                  />
                </div>
                <button className="proceed_button" onClick={onProceed}>
                  Proceed
                </button>
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
