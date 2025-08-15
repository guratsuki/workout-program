import './toDoList.css'

function ToDoList() {

    return (
        <div>
            <table className="table-main">
                <thead className='table-header'>
                    <tr>
                        <th>Время</th>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    <tr>
                        <td>12:00</td>
                        <td>Абоба</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default ToDoList