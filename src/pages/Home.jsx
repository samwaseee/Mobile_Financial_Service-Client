import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen">
            <h1 className="text-3xl text-center p-2">Welcome, to Your digital wallet</h1>
            <h3 className="text-center">Your one stop solution for cashless transections</h3>

            <div className="my-20">
                <h4 className="text-2xl text-center">Are you a?</h4>
                <div className="flex justify-center my-4 space-x-3">
                    <Link to='/login'><button className="btn btn-outline btn-lg">Log In</button></Link>
                    <Link to='/register'><button className="btn btn-outline btn-lg">Register</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;