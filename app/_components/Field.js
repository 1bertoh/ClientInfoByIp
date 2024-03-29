/**
 * @param {{label?: String, prefix: String | JSX, value?: String, isDisabled: boolean, id: String}}
 * @returns jsx
 */
const Field = ({ label, prefix, value, isDisabled, id }) => {
    return (
        <div className="">
            {
                label && (
                    <label htmlFor={id} className="block ps-1 font-bold">
                        {label}
                    </label>

                )
            }
            <div className="relative w-" style={{width: 'initial'}}>
                <div className="absolute inset-y-0 start-0 font-medium flex items-center ps-3.5 pointer-events-none">
                    {prefix}
                </div>
                <input
                    type="text"
                    disabled={isDisabled}
                    id={id}
                    className="rounded-lg cursor-not-allowed font-medium block w-full ps-20 p-3  "
                    value={value}
                />
            </div>
        </div>
    );
};

export default Field;
