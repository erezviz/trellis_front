import { TextField } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { boardService } from "../services/board.service"


export class GroupFooter extends React.Component {
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
        const boardId = this.getBoardId()
        boardService.saveTask(boardId, taskToSave)
        this.setState({ isShown: true })
    }

    getBoardId = () => {
        const { boardId } = this.props.match.params
        console.log(boardId);
        return boardId
    }

    onToggle = () => {
        this.setState({ isShown: false })
    }


    render() {
        console.log('Noyyyyyyyyyyyyya', props);
        const { isShown } = this.state
        return (
            <section className="group-footer">
                <h3>Im a group footer</h3>
                {isShown && <div onClick={this.onToggle} className="add-task">
                    <span className="plus-task">+</span>
                    <span>Add a card</span>
                </div>}
                {!isShown && <form onSubmit={(ev)=>this.onSaveTask(ev)}>
                    <TextField id="outlined-basic" onChange={this.onHandleChange}
                        size="small" placeholder="Enter a title for this card..." variant="outlined" />
                    <button className='btn-save'>Save card</button>
                </form>}

            </section>
        )
    }
}