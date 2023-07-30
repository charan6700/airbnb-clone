export default function MultiRadioButton({
  Icon,
  name,
  value,
  selectedButtons,
  handleClick,
}) {
  return (
    <div
      className={
        "flex flex-co min-h-[6rem]  btn-click-shrink border border-neutral-300 rounded-xl justify-center w-[31.5%]" +
        (selectedButtons.includes(value)
          ? " black-shadow-border bg-neutral-50"
          : " black-shadow-hover")
      }
    >
      <button
        role="radio"
        aria-checked={selectedButtons.includes(value)}
        className="flex flex-col justify-between text-left w-full p-4"
        onClick={() => {
          handleClick(value);
        }}
      >
        <div className="w-12">{Icon}</div>

        <div className="font-semibold pl-1 flex flex-col text-left ">
          <div className="text-left leading-5">{name}</div>
        </div>
      </button>
    </div>
  );
}
