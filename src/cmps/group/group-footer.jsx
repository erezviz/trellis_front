import { TextField } from "@mui/material"
import React from "react"
import { boardService } from "../../services/board.service"
import { connect } from "react-redux"

class _GroupFooter extends React.Component {
    state = {
        task: boardService.getEmptyTask(),
        isShown: true
    }


    onHandleChange = ({ target }) => {
        const field = target.name
        this.setState((prevState) => ({
            task: { ...prevState.task, [field]: target.value },
        }))
    }

    onSaveTask = (ev) => {
        ev.preventDefault()
        const taskToSave = { ...this.state.task }
        const boardId = this.props.boardId
        const groupId = this.props.groupId
        boardService.saveTask(boardId, groupId, taskToSave)
        this.setState({ isShown: true })
    }

   

    onToggle = () => {
        this.setState({ isShown: false })
    }


    render() {
        console.log(this.props.board);
        const { isShown } = this.state
        return (
            <section className="group-footer">
                {isShown && <div onClick={this.onToggle} className="add-task">
                    <span className="plus-task">+</span>
                    <span>Add a card</span>
                </div>}
                {!isShown && <form onSubmit={(ev)=>this.onSaveTask(ev)}>
                    <TextField name="title" id="outlined-basic" onChange={this.onHandleChange}
                        size="small" placeholder="Enter a title for this card..." variant="outlined" />
                    <button className='btn-save'>+</button>
                </form>}

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule
    }
}

export const GroupFooter = connect(mapStateToProps)(_GroupFooter)