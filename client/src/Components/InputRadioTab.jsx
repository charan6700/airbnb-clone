export default function InputRadioTab(props) {
  const activeRadioClass = "border-black bg-neutral-100 ";
  const inactiveRadioClass = "border-neutral-200";

  return (
    <span className="mr-2">
      <label
        htmlFor={props.name}
        className={
          "border inline-flex rounded-full btn-click-shrink py-2 px-4 cursor-pointer " +
          (props.reservationList === props.name
            ? activeRadioClass
            : inactiveRadioClass)
        }
        onClick={() => {
          props.setReservationList(props.name);
        }}
      >
        <input
          type="radio"
          name={props.name}
          id={props.name}
          checked={props.reservationList === props.name}
          onChange={props.handleRadioChange}
          className="peer sr-only"
        />
        <span>{props.text} (0)</span>
      </label>
    </span>
  );
}
