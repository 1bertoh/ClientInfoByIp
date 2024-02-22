/**
 * 
 * @param {{children: JSX, msg: String}} 
 */
const Tooltip = ({children, msg}) => {

    return (
        <div className="tooltip">
            {children}
            <span className="tooltiptext sm:text-lg text-sm">{msg}</span>
        </div>
    );
}

module.exports = Tooltip