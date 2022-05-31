import { withRouter } from "react-router-dom";
import { NavLink, Link } from "react-router-dom"



 const _AppHeader = (props) => {


    const onGoBack = () => {
        props.history.push('/')
        
    }

    
    return (
        <section className="app-header flex">
         
            <div onClick={onGoBack} className="logo-container">

            <img src={require('../assets/img/trellis.png')} alt=""  /> <h3>Trellis</h3>
            </div>
            <nav>
            
                {/* <Link  to='/home'><p className="header-link">Boards</p></Link> */}
            </nav>
           {!user && <Link to={'/login'}>
            <div  className="user-link">
                <span className="login">Log In</span>
                <span className="signup">Sign Up</span>
            </div>
            </Link>}
           
        </section>
    )
}


export const AppHeader = withRouter(_AppHeader)