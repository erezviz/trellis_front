import { GroupPreview } from "./group-preview"

export const GroupList = ({ groups, onDeleteGroup, boardId, onToggleDetails }) => {
   

    if(!groups) return <>Loading...</>
    return (
        <section className="group-list">
            {groups.map((group,idx) => {
                const props = {
                    // key: idx,
                    boardId,
                    onToggleDetails,
                    onDeleteGroup,
                    group
                }
                return <GroupPreview {...props} key={group.id}/>
                // return <GroupPreview key={group._id} boardId={boardId} onToggleDetails={onToggleDetails} onDeleteGroup={onDeleteGroup}  group={group} />
            }
            )}
          
        </section>
    )
    
}
