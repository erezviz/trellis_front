import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink, Link } from "react-router-dom"



const _AppHeader = (props) => {
    const { user } = useSelector((state) => state.userModule)
    let status = 'Hero'
    const location = (props.location.pathname)
    const onGoBack = () => {
        props.history.push('/')
    }

    if(location.includes('board')){
        status = ''
    }

    return (
        <section className="app-header flex">

            <div onClick={onGoBack} className={`logo-container ${status}`}>
            
               <img src={require(`../assets/img/trellis${status}.png`)} alt="" /> <h3>Trellis</h3>
            </div>
            <nav>

                {/* <Link  to='/home'><p className="header-link">Boards</p></Link> */}
            </nav>
            {!user && <Link to={'/login'}>
                <div className="user-link">
                    <span className="login">Log in</span>
                    <span className="signup">Sign up</span>
                </div>
            </Link>}

        </section>
    )
}


export const AppHeader = withRouter(_AppHeader)