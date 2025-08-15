import { useEffect, useState } from 'react'
import axios from 'axios';
import './toDoList.css'

function ToDoList() {
    const [items, setItems] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/items')
            .then(res => {
                setItems(res.data)
            })
    }, [])

    const DisplayData = items.map((item: any, index: number) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
            </tr>
        )
    })


    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    console.log(items)

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const res = await axios.post("http://localhost:8000/api/olympiada", inputData);
    //     alert(res.data.valid ? "Данные добавлены" : "Неправильно введены данные");
    //     if (res.data.valid) {
    //         handleModalToggle();
    //     }
    // };

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

            {/* <div>
                <input type="text" id="myInput" placeholder="Enter text here" />
                <button type="button" onClick={handleSubmit}>Click Me</button>
            </div> */}
        </>


    )
}

export default ToDoList