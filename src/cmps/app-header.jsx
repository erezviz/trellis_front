import { withRouter } from "react-router-dom";
import { NavLink, Link } from "react-router-dom"



 const _AppHeader = (props) => {


    const onGoBack = () => {
        props.history.push('/')
        
    }

    
    return (
        <section className="app-header flex">
         
            <div onClick={onGoBack} className="logo-container">
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


export const AppHeader = withRouter(_AppHeader)