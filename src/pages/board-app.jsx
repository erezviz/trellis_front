import React from "react";
import { GroupPreview } from "../cmps/group-preview";


export class BoardApp extends React.Component{



    render(){
        return (
            <section className="board-app">

                <h2>I am a board app</h2>
                <div className="list-container">
                    <GroupPreview/>
                    <GroupPreview/>
                    <GroupPreview/>
                </div>
            </section>
        )
    }
}