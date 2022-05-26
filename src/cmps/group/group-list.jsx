import { GroupPreview } from "./group-preview"

export const GroupList = ({ groups, onDeleteGroup, boardId, onToggleDetails }) => {

    return (
        <section className="group-list">
            {groups.map(group => {
                return <GroupPreview boardId={boardId} onToggleDetails={onToggleDetails} onDeleteGroup={onDeleteGroup} key={group._id} group={group} />
            }
            )}
        </section>
    )
}
