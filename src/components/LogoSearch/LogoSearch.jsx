import './logoSearch.css';
import {BsSearch} from 'react-icons/bs';
import {Link} from 'react-router-dom';

import logo from '../../images/logo.png';

const LogoSearch = () => {
  return (
    <div className="logo-search">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <div className="search">
            <input type="text" placeholder="Nhập từ khoá"/>
            <div className="search_icon">
                <BsSearch size={20}/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch