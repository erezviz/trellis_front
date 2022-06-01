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
import { PopOver } from "../cmps/dynamic-cmps/pop-over";
import { CreateBoardModal } from "../cmps/board/create-board-modal";


class _HomePage extends React.Component {
    state = {
        isModalShown: false
    }


    componentDidMount() {
        this.onLoadBoards();
    }

    onLoadBoards = async () => {
        this.props.loadBoards()
    }

    onToggleModal = () => {
        const { isModalShown } = this.state
        this.setState(prevState => ({ ...prevState, isModalShown: !isModalShown }))
    }

    render() {
        const { boards } = this.props
        const { isModalShown } = this.state

        return (
            <section className="home-page">
                <h1>Our most popular templates</h1>
                <section className="previews-container bci1">
                    {(!boards && !boards.length) && <div>Loading...</div>}
                    {boards && boards.map((board, idx) => <Link className={`bci${idx + 1}`} key={board._id + idx} to={`/board/${board._id}`}><BoardPreview board={board} /></Link>)}
                    {/*                 
                <h1><img src={require('../assets/img/templates.png')} alt="" /> Most popular templates</h1>
               <section className="previews-container">
                {(!boards && !boards.length)  && <div>Loading...</div>}
                {boards && boards.map(board => <Link key={board._id + 1} to={`/board/${board._id}`}><BoardPreview  board={board}/></Link>)}
{/*                 
                <Link to='/board'><BoardPreview/></Link>
                <Link to='/board'><BoardPreview/></Link>
                 */}
                    <div onClick={() => this.onToggleModal()} className="create-board flex">
                        <span className="create-board-icon" ></span>
                    </div>
                </section>
                <PopOver cb={this.onToggleModal} isShown={isModalShown} title={'Create board'}>
                    <CreateBoardModal isShown={isModalShown} />
                </PopOver>
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