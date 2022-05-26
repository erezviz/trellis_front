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
                <h1>This is the Home Page</h1>
                <section className="previews-container">
                    {(!boards && !boards.length) && <div>Loading...</div>}
                    {boards && boards.map(board => <Link to={`/board/${board._id}`}><BoardPreview key={board._id} board={board} /></Link>)}
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