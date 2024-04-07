import { useEffect, useState } from "react";
import EditRow from "./EditRow";

export interface IBorrowInstance {
    name: string,
    surname: string,
    title: string,
    id: number,
    borrowed_date: string,
    return_date: string
}

const Table = () => {
    const [borrowed, setBorrowed] = useState<Array<IBorrowInstance>>([]);
    const [borrowedTable, setBorrowedTable] = useState<Array<JSX.Element>>([]);
    const [alreadyAdding, setAlreadyAdding] = useState<boolean>(false);

    useEffect(() => {
        getBorrowedBooks();
    }, []);

    useEffect(() => {
        createBorrowedTable();
    }, [borrowed]);

    const createBorrowedTable = () => {
        const tmp: Array<JSX.Element> = borrowed.map((borrowInstance: IBorrowInstance) => {
            return (
                <tr key={borrowInstance.id}>
                    <td>{borrowInstance.name + " " + borrowInstance.surname}</td>
                    <td>{borrowInstance.title}</td>
                    <td>{borrowInstance.borrowed_date}</td>
                    <td>{borrowInstance.return_date}</td>
                    <td><button onClick={() => { handleDelete(borrowInstance.id) }}>Delete</button></td>
                    <td><button onClick={() => { handleEdit(borrowInstance) }}>Edit</button></td>
                </tr>
            )
        });

        setAlreadyAdding(false);
        setBorrowedTable(tmp);
    }

    const getBorrowedBooks = async () => {
        const response: Response = await fetch("http://localhost/bookstore/read.php", {
            method: "GET", headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setBorrowed(data);
    }

    const handleDelete = async (id: number) => {
        const response: Response = await fetch("http://localhost/bookstore/delete.php", {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.result == "SUCCESS") {
            getBorrowedBooks();
        } else {
            console.error("Deleting error");
        }
    }

    const handleEdit = (borrowInstance: IBorrowInstance) => {
        const tmp: Array<JSX.Element> = borrowed.map((e: IBorrowInstance) => {
            if (e.id == borrowInstance.id) {
                return <EditRow {...borrowInstance} handleCloseEdit={handleCloseEdit} key={borrowInstance.id} />;
            } else {
                return (
                    <tr key={e.id}>
                        <td>{e.name + " " + e.surname}</td>
                        <td>{e.title}</td>
                        <td>{e.borrowed_date}</td>
                        <td>{e.return_date}</td>
                        <td><button onClick={() => { handleDelete(e.id) }}>Delete</button></td>
                        <td><button onClick={() => { handleEdit(e) }}>Edit</button></td>
                    </tr>
                );
            }
        });

        setAlreadyAdding(true);
        setBorrowedTable(tmp);
    }

    const handleAdd = () => {
        if (alreadyAdding) return;

        const tmp: Array<JSX.Element> = [...borrowedTable, <EditRow handleCloseEdit={handleCloseEdit} key={-1} name="" surname="" title="" id={-1} borrowed_date="" return_date="" />];

        setAlreadyAdding(true);
        setBorrowedTable(tmp);
    }

    const handleCloseEdit = () => {
        getBorrowedBooks();
    }



    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Book title</th>
                        <th>Date borrowed</th>
                        <th>Date return</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody>
                    {borrowedTable}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}></td>
                        <td colSpan={2}><button onClick={handleAdd} style={{ width: "100%" }}>Add</button></td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default Table;