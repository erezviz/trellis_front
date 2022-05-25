import { GroupHeader } from "./group-header"
import { TaskList } from "./task-list"
import { GroupFooter } from "./group-footer"

export const GroupPreview = (props) => {

    return (
        <section className="group-preview">
            <div className="header-container">
            <GroupHeader/>
            </div>
            <div className="task-list-container">
            <TaskList/>
            </div>
            <div className="task-footer-container">
            <GroupFooter/>
            </div>
        </section>
    )
}