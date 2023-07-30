import Login from "./Login";

export default function LoginModal(props) {
  return (
    <div className="fixed flex items-center justify-center w-auto h-full inset-0">
      <div
        className="fixed h-full w-full bg-neutral-600 opacity-70"
        onClick={() => props.setShowLoginModal(false)}
      ></div>
      <div className={"fixed bg-white z-20 w-[450px] rounded-xl shadow-lg popup-animation"}>
        <Login
          showCloseButton={true}
          setShowLoginModal={props.setShowLoginModal}
        />
      </div>
    </div>
  );
}
