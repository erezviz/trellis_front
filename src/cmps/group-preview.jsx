import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"
import { GroupFooter } from "./group-footer"
import { boardService } from "../services/board.service"
import { useState } from "react"

export const GroupPreview = (props) => {
    const [group, setGroup] = useState(props.group)

    const { boardId } = props

    const onChangeName = async () => {
        const newName = prompt('new Name?')
        try {
            const newGroup = await boardService.updateGroup(boardId, group.id, newName)
            setGroup(newGroup)
        } catch (err) {
            throw err
        }
    }



    return (
        <section className="group-preview">
            <button onClick={() => props.onDeleteGroup(group.id)}>X</button>
            <div onClick={onChangeName} className="header-container">
                <GroupHeader title={group.title} />
            </div>
            <div className="task-list-container">
                <TaskList tasks={group.tasks} />
            </div>
            <div className="task-footer-container">
                <GroupFooter boardId={boardId} groupId={props.group.id} />
            </div>
        </section>
    )
}