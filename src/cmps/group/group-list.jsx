import { GroupPreview } from "./group-preview"

export const GroupList = ({ groups, onDeleteGroup, boardId, onToggleDetails }) => {
    
    return (
        <section className="group-list">
            {groups.map(group => {
                const props = {
                    key: group._id,
                    boardId,
                    onToggleDetails,
                    onDeleteGroup,
                    group
                }
                return <GroupPreview {...props} />
                // return <GroupPreview key={group._id} boardId={boardId} onToggleDetails={onToggleDetails} onDeleteGroup={onDeleteGroup}  group={group} />
            }
            // }
            )}
        </section>
    )
}
