import './NavBar.css'
import { SiConvertio } from 'react-icons/si'
import { Link } from 'react-router-dom';
import Button
 from '../Converter/Button';
function NavBar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link className="details-btn" to={`/`}>
            <SiConvertio />
          </Link>
        </div>
        <div className="nav-links">
          <Link className="details-btn" to={`/details-page/EUR/USD/0/0`}>
            <Button>
              EUR to USD Details
            </Button> 
          </Link>
          <Link className="details-btn" to={`/details-page/EUR/GBP/0/0`}>
            <Button>
              EUR to GBP Details
            </Button> 
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;