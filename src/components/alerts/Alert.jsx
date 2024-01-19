import "./Alert.scss"
const Alert = (props) => {
    const {message, type, close} = props;
  return (
    <label onClick={() => close('')}>
      <input type="checkbox" className="alertCheckbox"/>
      <div className={`alert ${type}`}>
        <span className="alertClose">X</span>
        <span className="alertText">
          <b>{message}</b>
          <br className="clear" />
        </span>
      </div>
    </label>
  );
};

export default Alert;
