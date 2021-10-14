import React from 'react'

export default function Navbar() {
    return (
        <div >
            <nav className="navbar navbar-expand-lg  bg-dark navbar-dark p-2">
                <a className="navbar-brand" href="/">Cafe Delivery</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Menu </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Order">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )


}