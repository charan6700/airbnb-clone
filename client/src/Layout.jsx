import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <div className="mx-8">
            <Header />
            <Outlet/>
        </div>
    );

}