/**
 * 
 * @param {{children: JSX, msg: String}} 
 */
const Tooltip = ({children, msg}) => {

    return (
        <div class="tooltip">
            {children}
            <span class="tooltiptext">{msg}</span>
        </div>
    );
}

module.exports = Tooltip