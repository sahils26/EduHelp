import { Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png"

function Navbar(){
    return(
        <div>
            <div>
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;


