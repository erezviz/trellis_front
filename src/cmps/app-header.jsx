import { NavLink, Link } from "react-router-dom"


export const AppHeader = (props) => {


    return (
        <section className="app-header">
            <nav>
                <Link to='/'>Home</Link>| 
                <Link to='/board'>boards</Link>|
            </nav>
            <h1>Hello from Header</h1>
        </section>
    )
}