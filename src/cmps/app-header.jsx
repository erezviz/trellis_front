import { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"

import member from '../assets/icon/member.svg'
import { ReactComponent as Close } from '../assets/icon/close.svg'

const _AppHeader = (props) => {

    const { user } = useSelector((state) => state.userModule)
    let [toggleAccount, setToggleAccount] = useState(false)
    let status = 'Hero'
    let bgc = ''
    let txtClr = ''
    let logoTxt = ''
    const location = (props.location.pathname)
    const onGoBack = () => {
        props.history.push('/home')
    }
    if (!location.includes('board') || !location.includes('home')) {
        status = 'Hero'
    }
    if (location.includes('board') || location.includes('home')) {
        status = ''
        bgc = ''
        logoTxt = 'logoHero'
    }
    if (location.includes('home')) {
        bgc = 'homeBgc'
        txtClr = 'homeTxtClr'
    }

    const onToggleAccount = () => {
        setToggleAccount(!toggleAccount)
    }

    const deleteAllCookies = () => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const onLogout = () => {
        sessionStorage.clear();
        deleteAllCookies()
        onToggleAccount()
        onGoBack()
    }

    console.log('from header', user);
    return (
        <section className={`app-header flex ${status} ${bgc}`}>

            <div onClick={onGoBack} className='logo-container'>
                <img src={require(`../assets/img/trellis${status}.png`)} alt="" /> <h3 className={logoTxt}>Trellis</h3>
            </div>
            <nav>
            </nav>
            {(status === 'Hero' && !user) && <Link to={'/login'}>
                <div className="user-link">
                    <span className={`login ${txtClr}`}>Log in</span>
                    <span className="signup">Sign up for free</span>
                </div>
            </Link>}

            {user && <div className="user-img">
                {user.imgUrl && <img onClick={() => onToggleAccount()} src={user.imgUrl} alt="" />}
                {!user.imgUrl && <img onClick={() => onToggleAccount()} src={member} alt="" />}
            </div>
            }

            {toggleAccount && <div className="user-modal">
                <header>
                    <h2>Account</h2>
                    <button className="close-user" onClick={() => onToggleAccount(false)}>
                        <span>
                            <Close />
                        </span>
                    </button>
                </header>
                <div className="user-profile">
                    <div className="user-img">
                        {user.imgUrl && <img className="Account-img" src={user.imgUrl} alt="" />}
                        {!user.imgUrl && <img className="Account-img" src={member} alt="" />}
                    </div>
                    <h2>{user.fullname}</h2>
                </div>
                <h2 onClick={() => onLogout()} className="logout">Logout</h2>
            </div>}
        </section>
    )
}


export const AppHeader = withRouter(_AppHeader)