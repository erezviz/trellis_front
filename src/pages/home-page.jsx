import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard,
} from '../store/board.action'

import { BoardPreview } from '../cmps/board/board-preview'
import { PopOver } from "../cmps/dynamic-cmps/pop-over";
import { CreateBoardModal } from "../cmps/board/create-board-modal";
import { ReactComponent as Clock } from '../assets/icon/dates-icon.svg'
import { ReactComponent as Star } from '../assets/icon/star.svg'

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

    onMarkStar=(ev, board)=>{
        ev.preventDefault()
        const newBoard = JSON.parse(JSON.stringify(board))
        
    }

    render() {
        const { boards } = this.props
        const { isModalShown } = this.state

        return (
            <section className="home-page">
                <div className="board-list-container">
                    <div className="flex">
                <Star/>
                <h1>Starred boards</h1>
                    </div>
                <div className="flex">
                    <Clock/>
                <h1> Recently viewed</h1>
                </div>
                <section className="previews-container">
                    {(!boards && !boards.length) && <div>Loading...</div>}
                    {boards && boards.map((board, idx) => 
                    <div className="board-preview" style={{ backgroundImage: `url(${board.style.imgUrl})` }}>
                    <Link  key={board._id + idx} to={`/board/${board._id}`}>
                        <BoardPreview board={board} />
                        <span onClick={(ev)=>this.onMarkStar(ev, board)} className="star">
                        <Star/>
                        </span>
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
    updateBoard,
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)