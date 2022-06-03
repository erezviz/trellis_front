import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink, Link } from "react-router-dom"



const _AppHeader = (props) => {
    const { user } = useSelector((state) => state.userModule)
    let status = 'Hero'
    let bgc = ''
    let txtClr = ''
    let logoTxt = ''
    const location = (props.location.pathname)
    const onGoBack = () => {
        props.history.push('/')
    }

    if(location.includes('board') || location.includes('home')){
        status = ''
        bgc = ''
        logoTxt='logoHero'
    }
    if(location.includes('home')){
        bgc = 'homeBgc'
        txtClr = 'homeTxtClr'
    }
    console.log('from header',user);
    return (
        <section className={`app-header flex ${status} ${bgc}`}>

            <div onClick={onGoBack} className='logo-container'>
            
               <img src={require(`../assets/img/trellis${status}.png`)} alt="" /> <h3 className={logoTxt}>Trellis</h3>
            </div>
            <nav>
            </nav>
            {!user && <Link to={'/login'}>
                <div className="user-link">
                    <span className={`login ${txtClr}`}>Log in</span>
                    <span className="signup">Sign up for free</span>
                </div>
            </Link>}
            
        { user &&   <div className="user-img">
                {user.imgUrl && <img src={require(`../assets/img/shabi.jpg`)} alt="" /> }
                {!user.imgUrl && <img src={require(`../assets/icon/member-icon.svg`)} alt="" /> }
            </div>
}
        </section>
    )
}


export const AppHeader = withRouter(_AppHeader)