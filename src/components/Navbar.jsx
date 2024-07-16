const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <label htmlFor="my-drawer">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>

                        </div>
                    </div>
                </label>
            </div>
            <div className="navbar-center lg:flex">
                <h1>Pocket Cash</h1>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    );
};

export default Navbar;
