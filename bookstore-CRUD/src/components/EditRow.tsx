import { useEffect, useState } from "react";
import { IBorrowInstance } from "./Table";

interface IBook {
    id: number,
    title: string
}

interface ICustomer {
    id: number,
    name: string,
    surname: string
}

const EditRow = ({ name, surname, title, id, borrowed_date, return_date }: IBorrowInstance) => {
    const [books, setBooks] = useState<Array<JSX.Element>>([]);
    const [customers, setCustomers] = useState<Array<JSX.Element>>([]);
    const [customerId, setCustomerId] = useState<number>(-1);
    const [bookId, setBookId] = useState<number>(-1);

    useEffect(() => {
        getOptions();
    }, []);

    const getOptions = async () => {
        const response: Response = await fetch("http://localhost/bookstore/getOptions.php", {
            method: "GET", headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        const bookOptions: Array<JSX.Element> = data.books.map((e: IBook) => {
            return <option value={e.id} key={e.id} selected={e.title == title}>{e.title}</option>;
        });

        const customerOptions: Array<JSX.Element> = data.customers.map((e: ICustomer) => {
            return <option value={e.id} key={e.id} selected={e.name == name && e.surname == surname}>{e.name + " " + e.surname}</option>;
        });

        setBookId(data.books.find((e: IBook) => { return e.title == title }).id);
        setCustomerId(data.customers.find((e: ICustomer) => { return e.name == name && e.surname == surname }).id);
        setBooks(bookOptions);
        setCustomers(customerOptions);
    }

    return (
        <tr>
            <td colSpan={2}>
                <select onChange={(event) => { setCustomerId(+event.target.value) }}>
                    {customers}
                </select>
            </td>
            <td>
                <select onChange={(event) => { setBookId(+event.target.value) }}>
                    {books}
                </select>
            </td>
            <td><input type="date" defaultValue={borrowed_date} /></td>
            <td><input type="date" defaultValue={return_date} /></td>
            <td><button>Save</button></td>
            <td><button>Cancel</button></td>
        </tr>
    );
}

export default EditRow;