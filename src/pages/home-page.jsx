import React from "react";
import { Link } from "react-router-dom";
import {BoardPreview} from '../cmps/board-preview'
import { boardService } from "../services/board.service";
export class HomePage extends React.Component {
    state = {
        boards: []
    }

    componentDidMount() { 
        (async ()=>{
            const boards = await boardService.query()
            this.setState({boards: [...boards]})
            

        })();
     }

    render(){
        const {boards} = this.state
        console.log('Boards from home',boards)
        return(
            <section className="home-page">
                <h1>This is the Home Page</h1>
               <section className="previews-container">
                {!boards && !boards.length  && <div>Loading...</div>}
                {boards && boards.map(board => <Link to={`/board/${board._id}`}><BoardPreview board={board}/></Link>)}
{/*                 
                <Link to='/board'><BoardPreview/></Link>
                <Link to='/board'><BoardPreview/></Link>
                 */}
                </section>
            </section>
        )
    }

}