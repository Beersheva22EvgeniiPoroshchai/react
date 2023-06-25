
import {NavLink, Outlet} from 'react-router-dom';

const Navigator:React.FC<{navItem:string[][]}> = (nav) => {
    
   
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

