import { combineReducers } from "redux";

const status = (
  state = {
    darkTheme: localStorage.getItem("mode") === "light" ? false : true,
    modalMenu: { openModal: false, modalType: "menu" },
    modalStatus: { openModal: false, modalData: null },
  },
  action
) => {
  switch (action.type) {
    //   Set Dark mode / Light mode
    case "light_mode":
      return { ...state, darkTheme: false };
    case "dark_mode":
      return { ...state, darkTheme: true };

    // Use Modal
    case "use_modal":
      return {
        ...state,
        modalStatus: { openModal: true, modalData: action.modalData },
      };
    case "close_modal":
      return { ...state, modalStatus: { openModal: false, modalData: null } };

    default:
      return state;
  }
};

export default combineReducers({ status });
