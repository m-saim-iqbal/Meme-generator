import React from "react"
import trollface from "../trollface.png"


export default function Header() {
    return (
        <nav className="navbar">
            <img src={trollface} alt="trolllface.png" className="navbar--image"/>
            <h2 className="navbar--heading">MemeGenerator</h2>
        </nav>
    );
}
