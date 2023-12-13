import React, {useState} from 'react';
import status_list from "../data/status_list";

const Problem1 = () => {
    const [show, setShow] = useState("all");

    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const [taskList, setTaskList] = useState([]);
    const [filteredTaskList, setFilteredTaskList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === "" || taskStatus.trim() === "") {
            alert("Task name and Task status required!");
        } else {
            const validStatus = status_list.find(
                (ts) => ts.toLowerCase() === taskStatus.toLowerCase()
            );
            console.log(validStatus);
            if (validStatus === undefined) {
                alert("Task status is not valid!");
            } else {
                const exist = taskList.find(
                    (t) => t.task_name === taskName.trim()
                );
                if (exist === undefined) {
                    const formatedTaskStatus = taskStatus
                        .trim()
                        .substring(0, 1)
                        .toUpperCase()
                        .concat(taskStatus.substring(1).toLowerCase());
                    const newTask = {
                        task_name: taskName.trim(),
                        task_status: formatedTaskStatus,
                    };
                    setTaskList((tl) => [...tl, newTask]);
                    if (show === "all") {
                        setFilteredTaskList((prevList) => [
                            ...prevList,
                            newTask,
                        ]);
                    } else if (show.trim() === taskName.trim().toLowerCase()) {
                        setFilteredTaskList((prevList) => [
                            ...prevList,
                            newTask,
                        ]);
                    }
                    setTaskName("");
                    setTaskStatus("");
                } else {
                    alert(
                        `Task already exist with status ${exist.task_status}`
                    );
                }
            }
        }
    };

    const handleClick = (type) => {
        setShow(type);
        if (type.toLowerCase() === "all") {
            let allActiveTask = [];
            let allCompletedTask = [];
            let restOfTheTask = [];
            taskList.map((task) => {
                if (task.task_status === "Active") {
                    allActiveTask.push(task);
                } else if (task.task_status === "Completed") {
                    allCompletedTask.push(task);
                } else {
                    restOfTheTask.push(task);
                }
            });
            setFilteredTaskList([
                ...allActiveTask,
                ...allCompletedTask,
                ...restOfTheTask,
            ]);
        } else {
            let newList = [];
            taskList.map((task) => {
                if (task.task_status.toLowerCase() === type.toLowerCase()) {
                    newList.push(task);
                }
            });
            setFilteredTaskList(newList);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "all" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("all")}
                            >
                                All
                            </button>
                        </li>
                        {status_list.map((ts, i) => (
                            <li className="nav-item" key={i}>
                                <button
                                    className={`nav-link ${
                                        show === ts && "active"
                                    }`}
                                    type="button"
                                    onClick={() => handleClick(ts)}
                                >
                                    {ts}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTaskList.length > 0 &&
                                filteredTaskList.map((task, i) => (
                                    <tr key={i}>
                                        <td>{task.task_name}</td>
                                        <td>{task.task_status}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;