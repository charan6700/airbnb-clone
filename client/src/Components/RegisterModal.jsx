import Register from "./Register";

export default function RegisterModal(props) {
  return (
    <div className="fixed w-auto h-full inset-0 flex flex-col items-center justify-center">
      <div
        className="fixed h-full w-full bg-neutral-600 opacity-70"
        onClick={() => props.setShowRegisterModal(false)}
      ></div>
      <div
        className="relative bg-white z-20 rounded-xl shadow-lg popup-animation"
        style={{ width: "450px" }}
      >
        <Register
          showCloseButton={true}
          setShowRegisterModal={props.setShowRegisterModal}
        />
      </div>
    </div>
  );
}