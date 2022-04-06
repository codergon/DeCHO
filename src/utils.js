import MyAlgoConnect from "@randlabs/myalgo-connect";

const myAlgoConnect = new MyAlgoConnect();

const humanizeAddr = (address) =>
  address.substring(0, 3) + "..." + address.substring(55, 58);

export { humanizeAddr, myAlgoConnect };
