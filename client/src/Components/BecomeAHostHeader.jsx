import axios from "axios";

export default function BecomeAHostHeader({ placeDoc }) {
  async function handleSaveAndExit() {
    try {
      console.log(placeDoc);
      await axios.put("/place/" + placeDoc._id, placeDoc);
      alert("Successfully updated place");
    } catch (err) {
      console.log(err);
      alert("Error updating the place");
    }
  }

  return (
    <div className="fixed z-10 w-[100vw]">
      <header className="relative flex justify-between items-center pt-8 pb-0 px-12">
        <a href="/" className="flex logo gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-9 -rotate-90 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </a>

        <div className="flex gap-5">
          <button className="border font-semibold border-neutral-300 rounded-full px-3 py-2 btn-click-shrink hover:border-black">
            Questions?
          </button>
          <button
            className="border font-semibold border-neutral-300 rounded-full px-3 py-2 btn-click-shrink hover:border-black"
            onClick={handleSaveAndExit}
          >
            Save & exit
          </button>
        </div>
      </header>
    </div>
  );
}
