import { useEffect, useState } from 'react'
import axios from 'axios';
import './toDoList.css'

function ToDoList() {
    const [items, setItems] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [inputData, setInputData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/getitems')
            .then(res => {
                setItems(res.data)
            })
    }, [])

    console.log(items)

    const DisplayData = items.map((item: any, index: number) => {
        return (
            <tr>
                <td>{item.descr}</td>
                <td>{item.todo_name}</td>
            </tr>
        )
    })

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };


    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const res = await axios.post("http://localhost:5000/additem", inputData);
        alert(res.data.valid ? "Данные добавлены" : "Неправильно введены данные");
        console.log(inputData)
        console.log('clicked')
        if (res.data.valid) {
            handleModalToggle();
        }
    };

    // const handleCreateItem = async() => {
    //     try{
    //         await 
    //     }
    // }

    return (
        <>
            <div className="AddButton">
                <button onClick={() => handleModalToggle()}>
                    Добавить
                </button>
            </div>

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
                        {DisplayData}
                    </tbody>
                </table>
            </div>

            <div>
                <input type="text" id="myInput" placeholder="Enter text here" onChange={(e) => setInputData({ ...inputData, olymp_time: e.target.value })} />
                <button type="button" onClick={handleSubmit}>Click Me</button>
            </div>
        </>


    )
}

export default ToDoList