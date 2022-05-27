import { Link } from "react-router-dom"


export const Hero = () => {

    return (
        <section className="hero">
            <div className="hero-container">
                <h1 className="hero-h1">Trellis helps teams move work forward.</h1>
                <p className="hero-p">Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trellis.</p>
                <Link to='/home'><div className="enter-link">Enter Demo</div></Link>
            </div>
            <div className="hero-img-container">
                <img className="hero-img" src={`https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png`} alt="" />
            </div>
        </section>
    )

}