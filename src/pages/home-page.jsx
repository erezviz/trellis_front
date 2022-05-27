import React from "react";
import { Link } from "react-router-dom";
import { BoardPreview } from '../cmps/board/board-preview'
import { boardService } from "../services/board.service";
import { connect } from "react-redux";
import {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard,
} from '../store/board.action'

class _HomePage extends React.Component {
    // state = {
    //     boards: []
    // }


    componentDidMount() {
        this.onLoadBoards();
    }

    onLoadBoards = async () => {

        
        const boards = await this.props.loadBoards()
        console.log('onloadboards', boards);
    }

    render() {
        const { boards } = this.props
        console.log('Boards from home', boards)
        return (
            <section className="home-page">
                <h1><img src={require('../assets/img/templates.png')} alt="" /> Most popular templates</h1>
               <section className="previews-container">
                {(!boards && !boards.length)  && <div>Loading...</div>}
                {boards && boards.map(board => <Link key={board._id} to={`/board/${board._id}`}><BoardPreview  board={board}/></Link>)}
{/*                 
                <Link to='/board'><BoardPreview/></Link>
                <Link to='/board'><BoardPreview/></Link>
                 */}
                </section>
            </section>
        )
    }

}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard,
}


export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)