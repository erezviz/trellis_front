import React from "react";
import { Link } from "react-router-dom";
import {BoardPreview} from '../cmps/board-preview'

export class HomePage extends React.Component {
    state = {}



    render(){
        return(
            <section className="home-page">
                <h1>This is the Home Page</h1>
               <section className="previews-container">
                <Link to='/board'><BoardPreview/></Link>
                <Link to='/board'><BoardPreview/></Link>
                <Link to='/board'><BoardPreview/></Link>
                
                </section>
            </section>
        )
    }

}