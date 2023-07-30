export default function RadioButtonMaxWidth({
  logoName,
  title,
  description,
  value,
  selectedButton,
  handleClick,
}) {
  return (
    <div
      className={
        "flex flex-col btn-click-shrink border border-neutral-200 rounded-xl justify-center w-full" +
        (selectedButton === value
          ? " black-shadow-border bg-neutral-50"
          : " black-shadow-hover")
      }
    >
      <button
        role="radio"
        aria-checked={selectedButton === value}
        className="h-auto text-left w-full px-5 py-6 flex justify-between items-center"
        onClick={() => {
          handleClick(value);
        }}
      >
        <div className="pl-1 flex flex-col text-left">
          <div className="text-left text-lg font-semibold">{title}</div>
          <div className="text-left leading-tight text-neutral-500 max-w-[400px]">{description}</div>
        </div>
        <div>
          <img
            src={"/icons/" + logoName + ".png"}
            alt=""
            className="w-12 h-auto opacity-80"
          />
        </div>
      </button>
    </div>
  );
}
