

export function Screen({ children, cb, isOpen}) {

    return <div className={`screen ${isOpen ? 'overlay-up' : ''}`} onClick={cb}>
        {children}
    </div>
}