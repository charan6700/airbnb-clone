export default function RadioButton({
  logoName,
  name,
  value,
  selectedButton,
  handleClick,
}) {
  return (
    <div
      className={
        "flex flex-col btn-click-shrink border border-neutral-200 rounded-xl justify-center w-[30%]" +
        (selectedButton === value ? " black-shadow-border bg-neutral-50" : " black-shadow-hover")
      }
    >
      <button
        role="radio"
        aria-checked={selectedButton === value}
        className="min-h-[6rem] text-left w-full p-3 break-words"
        onClick={() => {
          handleClick(value);
        }}
      >
        <div>
          <img
            src={"/icons/" + logoName + ".png"}
            alt=""
            className="w-12 h-auto opacity-80"
          />
        </div>
        <div className="font-semibold pl-1 flex flex-col text-left ">
          <div className="text-left">{name}</div>
        </div>
      </button>
    </div>
  );
}
