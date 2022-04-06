import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";

const myAlgoConnect = new MyAlgoConnect();
const algodClient = new algosdk.Algodv2(
  { "X-API-Key": "" },
  "https://node.algoexplorerapi.io",
  ""
);

const humanizeAddr = (address) =>
  address.substring(0, 3) + "..." + address.substring(55, 58);

const createTransaction = (amount, recipientAddr, senderAddr, currency) => {
  let returnData;

  algodClient
    .getTransactionParams()
    .do()
    .then((suggestedParams) => {
      if (currency === "ALGO") {
        const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject(
          {
            from: senderAddr,
            to: recipientAddr,
            amount: amount * 1000000,
            suggestedParams,
          }
        );

        returnData = transaction;
      } else if (currency === "CHOICE") {
        const transaction =
          algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: senderAddr,
            to: recipientAddr,
            amount: amount * 100,
            assetIndex: 297995609,
            suggestedParams,
          });

        returnData = transaction;
      }
    });

  returnData.toByte();
};

const checkOptedInAssets = (address) => {};

export { humanizeAddr, myAlgoConnect, algodClient, createTransaction };
