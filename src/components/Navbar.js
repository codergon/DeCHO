import React, { useState } from "react";
import { humanizeAddr, myAlgoConnect } from "../utils";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const [walletAddr, setWalletAddr] = useState(
    localStorage.getItem("walletAddr")
  );
  const [walletProvider, setWalletProvider] = useState(
    localStorage.getItem("walletProvider")
  );

  const onConnectWallet = async () => {
    if (!walletAddr || !walletProvider) {
      dispatch({
        type: "open_connect_wallet_modal",
        connectWalletModal: { openModal: true },
      });
    }
  };

  const onDisconnectWallet = () => {
    localStorage.removeItem("walletAddr");
    localStorage.removeItem("walletProvider");

    setWalletAddr("");
  };

  console.log(walletAddr, walletProvider);

  return (
    <nav className="header">
      <div className="navbar_inn">
        <div className="nav_logo">
          <img
            src="/assets/decho-logo-bw.png"
            alt=""
            style={{ maxWidth: "150px" }}
          />
        </div>

        <div className="settings">
          <div className="connect_wallet">
            {walletAddr ? (
              <>
                <button
                  style={{
                    border: "1px solid black",
                    borderRadius: "8px",
                    padding: "12px 6px",
                  }}
                  onClick={onConnectWallet}
                >
                  {walletAddr ? humanizeAddr(walletAddr) : "Connect Wallet"}
                </button>

                <button
                  style={{
                    border: "1px solid black",
                    marginLeft: "4px",
                    borderRadius: "8px",
                    padding: "12px 6px",
                  }}
                  onClick={onDisconnectWallet}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                style={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  padding: "12px 6px",
                }}
                onClick={onConnectWallet}
              >
                {walletAddr ? humanizeAddr(walletAddr) : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
