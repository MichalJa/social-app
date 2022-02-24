import { NavLink, Outlet, useSearchParams, useLocation } from "react-router-dom";
import { getInvoices } from "../data";
import "./Home.css";
import Popup from "../Popup";
import { useState } from "react";
import Login from "./Login";
import { useEffect } from "react";

function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
}



export default function Home(props) {
    let invoices = getInvoices();
    let [searchParams, setSearchParams] = useSearchParams();

    const [visibility, setVisibility] = useState(false);

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };


    useEffect(() => {
        if (localStorage.length === 0) {
            setTimeout(function () {
                setVisibility(true);
            }.bind(this), 10000)
        }
    }, []);


    return (
        <div className="homeDisplay">
            <nav className="homeNav">
                <input
                    value={searchParams.get("filter") || ""}
                    onChange={event => {
                        let filter = event.target.value;
                        if (filter) {
                            setSearchParams({ filter });
                        } else {
                            setSearchParams({});
                        }
                    }}
                />
                {invoices
                    .filter(invoice => {
                        let filter = searchParams.get("filter");
                        if (!filter) return true;
                        let name = invoice.name.toLowerCase();
                        return name.startsWith(filter.toLowerCase());
                    })
                    .map(invoice => (
                        <QueryNavLink className={({ isActive }) => isActive ? "red" : "blue"}
                            style={({ isActive }) => {
                                return {
                                    display: "block",
                                    margin: "1rem 0",
                                    color: isActive ? "red" : ""
                                };
                            }}
                            to={`/home/${invoice.number}`}
                            key={invoice.number}
                        >
                            {invoice.name}
                        </QueryNavLink>
                    ))}
            </nav>
            <Outlet />
            <div className="App">
                <Popup
                    onClose={popupCloseHandler}
                    show={visibility}
                    title="Log In"
                >
                    <Login setCurrentUser={props.setCurrentUser} setVisibility={setVisibility}/>
                </Popup>
            </div>
        </div>
    );
}