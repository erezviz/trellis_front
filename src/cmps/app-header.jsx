import { NavLink, Link } from "react-router-dom"


export const AppHeader = (props) => {
    

    return (
        <section className="app-header flex">
         
            <div className="logo-container">
                <h3>Trellis</h3>
            </div>
            <nav>
            
                <Link  to='/home'><p className="header-link">Boards</p></Link>
            </nav>
            <div  className="user-link">
                <span>NI</span>
            
            </div>
           
        </section>
    )
}

