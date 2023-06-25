
import { useEffect } from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';

const Navigator:React.FC<{navItem:string[][]}> = (nav) => {

    const  navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        let index = nav.navItem.findIndex(r => r[0] == location.pathname);
        if(index < 0){
          index = 0;
        }
        navigate(nav.navItem[index][0]);
    },[nav])

   
    return  <div>
              <nav>
                <ul className='navigator-list'>
                    { nav.navItem.map((item) => {
                        return <li key = {item[1]} className='navigator-item' >
                                    <NavLink className = "link-item" to = {item[0]}>{item[1]}</NavLink>
                                </li>
                        })
                    }
                </ul>
                </nav>  
              <Outlet></Outlet>
            </div>
}

export default Navigator;

