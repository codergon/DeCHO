import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";

const Toggle = () => {
  const dispatch = useDispatch();

  const darkTheme = useSelector((state) => state.status.darkTheme);

  const handleChange = () => {
    if (!darkTheme) {
      dispatch({ type: "dark_mode" });
    } else {
      dispatch({ type: "light_mode" });
    }
  };

  return (
    <Switch
      checked={darkTheme}
      onChange={handleChange}
      handleDiameter={20}
      offColor="transparent"
      onColor="transparent"
      offHandleColor="#222"
      onHandleColor="#777"
      height={26}
      width={60}
      borderRadius={50}
      activeBoxShadow="0px 0px 1px 2px transparent"
      uncheckedIcon={<></>}
      checkedIcon={<></>}
      uncheckedHandleIcon={<> </>}
      checkedHandleIcon={<></>}
      className="react-switch"
      id="small-radius-switch"
    />
  );
};

export default Toggle;
