import { useEffect, useState } from "react";
import { IBorrowInstance } from "./Table";

interface IEditRowProps extends IBorrowInstance {
    handleCloseEdit: () => void
}
interface IBook {
    id: number,
    title: string
}

interface ICustomer {
    id: number,
    name: string,
    surname: string
}

interface IBody {
    customerId: number,
    bookId: number,
    id: number,
    borrowedDate: string,
    returnDate: string
}

const EditRow = ({ name, surname, title, id, borrowed_date, return_date, handleCloseEdit }: IEditRowProps) => {
    const [books, setBooks] = useState<Array<JSX.Element>>([]);
    const [customers, setCustomers] = useState<Array<JSX.Element>>([]);
    const [customerId, setCustomerId] = useState<number>(-1);
    const [bookId, setBookId] = useState<number>(-1);
    const [borrowedDate, setBorrowedDate] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("");

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
            return <option value={e.id} key={e.id}>{e.title}</option>;
        });

        const customerOptions: Array<JSX.Element> = data.customers.map((e: ICustomer) => {
            return <option value={e.id} key={e.id}>{e.name + " " + e.surname}</option>;
        });

        setBookId(title == "" ? 1 : data.books.find((e: IBook) => { return e.title == title }).id);
        setCustomerId((name == "" || surname == "") ? 1 : data.customers.find((e: ICustomer) => { return e.name == name && e.surname == surname }).id);
        setBorrowedDate(borrowed_date == "" ? getTodaysDate() : borrowed_date);
        setReturnDate(return_date == "" ? getTodaysDate() : return_date);
        setBooks(bookOptions);
        setCustomers(customerOptions);
    }

    const getTodaysDate = () => {
        const date = new Date();
        return date.toISOString().split("T")[0];
    }

    const handleSave = async () => {

        const body: IBody = {
            customerId,
            bookId,
            id,
            borrowedDate,
            returnDate
        }

        const response: Response = await fetch("http://localhost/bookstore/update.php", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        if (data.result == "SUCCESS") {
            handleCloseEdit();
        } else {
            console.error("Save error");
        }
    }

    return (
        <tr>
            <td colSpan={2}>
                <select onChange={(event) => { setCustomerId(+event.target.value) }} value={customerId}>
                    {customers}
                </select>
            </td>
            <td>
                <select onChange={(event) => { setBookId(+event.target.value) }} value={bookId}>
                    {books}
                </select>
            </td>
            <td><input type="date" value={borrowedDate} onChange={(event) => { setBorrowedDate(event.target.value) }} /></td>
            <td><input type="date" value={returnDate} onChange={(event) => { setReturnDate(event.target.value) }} /></td>
            <td><button onClick={handleSave}>Save</button></td>
            <td><button onClick={handleCloseEdit}>Cancel</button></td>
        </tr>
    );
}

export default EditRow;