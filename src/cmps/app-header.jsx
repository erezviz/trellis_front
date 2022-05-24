import { NavLink } from "react-router-dom"


export const AppHeader = (props) => {


    return (
        <section className="app-header">
            <nav>
                <NavLink to='/'>Home</NavLink>| 
                <NavLink to='/board'>boards</NavLink>|
            </nav>
            <h1>Hello from Header</h1>
        </section>
    )
}