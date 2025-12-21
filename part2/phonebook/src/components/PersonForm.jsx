const PersonForm = ({submissionHandler, nameValue, nameHandler, phoneValue, phoneHandler}) => {
    return (
        <form onSubmit={submissionHandler}>
            <div>
            name: <input value={nameValue} onChange={nameHandler} />
            </div>
            <div>
            number: <input value={phoneValue} onChange={phoneHandler} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm