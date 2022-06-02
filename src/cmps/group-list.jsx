import { GroupPreview } from "./group-preview"

export const GroupList = ({ groups, onDeleteGroup, boardId }) => {

    return (
        <section className="group-list">
            {groups.map(group => {
                return <GroupPreview boardId={boardId} onDeleteGroup={onDeleteGroup} key={group.id} group={group} />
            }
            )}
        </section>
    )
}
