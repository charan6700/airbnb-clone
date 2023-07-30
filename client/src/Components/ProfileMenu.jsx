import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function ProfileMenu(props) {
  const { user } = useContext(UserContext);
  return user ? (
    <LoggedInMenu setOpenMenu={props.setOpenMenu} user={user} />
  ) : (
    <DefaultMenu {...props} />
  );
}

function DefaultMenu(props) {
  return (
    <div className="z-10 flex flex-col py-2 absolute top-20 right-20 bg-white border rounded-xl shadow-md shadow-gray-200">
      <MenuItemBold
        link={"/login"}
        text={"Login"}
        setOpenMenu={props.setOpenMenu}
        setShowLoginModal={props.setShowLoginModal}
      />
      <RegisterLink {...props} />
      <div className="border-b border-gray-200 my-2"></div>
      <MenuItem link={"/"} text={"Airbnb your home"} {...props} />
      <MenuItem link={"/"} text={"Help"} {...props} />
    </div>
  );
}

function LoggedInMenu(props) {
  return (
    <div className="z-10 flex flex-col py-2 absolute top-20 right-20 bg-white border rounded-xl shadow-md shadow-gray-200">
      <MenuItemBold
        link={"/"}
        text={"Messages"}
        setOpenMenu={props.setOpenMenu}
      />
      <MenuItemBold
        link={"/"}
        text={"Notifications"}
        setOpenMenu={props.setOpenMenu}
      />
      <MenuItemBold link={"/"} text={"Trips"} setOpenMenu={props.setOpenMenu} />
      <MenuItemBold
        link={"/"}
        text={"Wishlists"}
        setOpenMenu={props.setOpenMenu}
      />
      <div className="border-b border-gray-200 my-2"></div>
      {props.user.listings.length < 1 ? (
        <MenuItem
          link={"/become-a-host"}
          text={"Airbnb your home"}
          setOpenMenu={props.setOpenMenu}
        />
      ) : (
        <MenuItem
          link={"/hosting"}
          text={"Manage listings"}
          setOpenMenu={props.setOpenMenu}
        />
      )}

      <MenuItem link={"/"} text={"Account"} setOpenMenu={props.setOpenMenu} />
      <div className="border-b border-gray-200 my-2"></div>
      <MenuItem link={"/"} text={"Help"} setOpenMenu={props.setOpenMenu} />
      <MenuItem
        link={"/logout"}
        text={"Log out"}
        setOpenMenu={props.setOpenMenu}
      />
    </div>
  );
}

function RegisterLink(props) {
  return (
    <Link
      to={"/register"}
      className="py-2 pl-4 pr-24 hover:bg-gray-100"
      onClick={(ev) => {
        ev.preventDefault();
        props.setShowRegisterModal(true);
        props.setOpenMenu(false);
      }}
    >
      Sign up
    </Link>
  );
}

function MenuItem(props) {
  return (
    <Link
      to={props.link}
      className="py-2 pl-4 pr-24 hover:bg-gray-100"
      onClick={(ev) => {
        props.setOpenMenu(false);
      }}
    >
      {props.text}
    </Link>
  );
}

function MenuItemBold(props) {
  return (
    <Link
      to={props.link}
      className="py-2 pl-4 pr-24 hover:bg-gray-100 font-medium"
      onClick={(ev) => {
        ev.preventDefault();
        props.setShowLoginModal(true);
        props.setOpenMenu(false);
      }}
    >
      {props.text}
    </Link>
  );
}
