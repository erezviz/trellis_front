import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"
import { GroupFooter } from "./group-footer"

export const GroupPreview = (props) => {

    const { group } = props

    return (
        <section className="group-preview">
            <div className="header-container">
                <GroupHeader title={group.title} />
            </div>
            <div className="task-list-container">
                <TaskList tasks={group.tasks} />
            </div>
            <div className="task-footer-container">
                <GroupFooter />
            </div>
        </section>
    )
}