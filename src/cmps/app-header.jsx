import { NavLink, Link } from "react-router-dom"


export const AppHeader = (props) => {


    return (
        <section className="app-header">
            <nav>
                <Link to='/'>Trellis</Link>| 
                <Link to='/home'>boards</Link>|
            </nav>
            <h1>Hello from Header</h1>
        </section>
    )
}