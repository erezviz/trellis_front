import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Clock } from '../assets/icon/dates-icon.svg'
import {
    loadBoards,
    removeBoard,
    addBoard,
    updateWholeBoard,
} from '../store/board.action'

import { BoardPreview } from '../cmps/board/board-preview'
import { PopOver } from "../cmps/dynamic-cmps/pop-over";
import { CreateBoardModal } from "../cmps/board/create-board-modal";
import { ReactComponent as Star } from '../assets/icon/star.svg'
import { socketService, SOCKET_EMIT_SET_BOARD } from "../services/socket.service";

class _HomePage extends React.Component {
    state = {
        isModalShown: false
    }

    componentDidMount() {
        this.onLoadBoards();
    }

    onLoadBoards = () => {
        this.props.loadBoards()
    }

    onToggleModal = () => {
        const { isModalShown } = this.state
        this.setState(prevState => ({ ...prevState, isModalShown: !isModalShown }))
    }

    onMarkStar = (ev, board) => {
        ev.preventDefault()
        const newBoard = JSON.parse(JSON.stringify(board))
        if (!newBoard.starred) newBoard.starred = true
        else newBoard.starred = false
        console.log(newBoard)
        this.props.updateWholeBoard(newBoard)
    }

    onSendBoard = (boardId) => {
        socketService.emit(SOCKET_EMIT_SET_BOARD, boardId)
    } 

    render() {
        const { boards } = this.props
        const { isModalShown } = this.state

        if (!boards && !boards.length) return <div>Loading...</div>
        return (
            <section className="home-page">
                <div className="board-list-container">
                    <div className="flex">
                        <Star />
                        <h1>Starred boards</h1>
                    </div>
                    <section className="previews-container">
                        {boards && boards.map((board, idx) =>
                            
                                {board.starred &&
                                    <div key={board._id} className="board-preview" style={{ backgroundImage: `url(${board.style.imgUrl})` }}>
                                        <Link onClick={()=> this.onSendBoard(board._id)} key={board._id + idx} to={`/board/${board._id}`}>
                                            <BoardPreview board={board} />

                                            <span onClick={(ev) => this.onMarkStar(ev, board)} className="starred">
                                                <Star />
                                            </span>
                                        </Link>
                                    </div>
                                }
                            
                        )}
                    </section>
                    <div className="flex">
                        <Clock />
                        <h1> Recently viewed</h1>
                    </div>
                    <section className="previews-container">
                        {boards && boards.map((board, idx) =>

                            <div key={board._id} className="board-preview" style={{ backgroundImage: `url(${board.style.imgUrl})` }}>
                                <Link key={board._id + idx} to={`/board/${board._id}`}>
                                    <BoardPreview board={board} />
                                    {!board.starred && <span onClick={(ev) => this.onMarkStar(ev, board)} className="star">
                                        <Star />
                                    </span>}
                                    {board.starred && <span onClick={(ev) => this.onMarkStar(ev, board)} className="starred">
                                        <Star />
                                    </span>}
                                </Link>
                            </div>
                        )}

                        <div onClick={() => this.onToggleModal()} className="create-board flex">
                            <p>Create new board</p>
                        </div>
                    </section>
                    <PopOver cb={this.onToggleModal} isShown={isModalShown} title={'Create board'}>
                        <CreateBoardModal isShown={isModalShown} />
                    </PopOver>
                </div>
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
    updateWholeBoard,
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)