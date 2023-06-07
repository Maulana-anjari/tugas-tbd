import { useState, useEffect } from "react";
import axios from "axios";
import { BookTable } from "../components/Table/Book.table";
import { Modal } from "../components/Modal/book.modal";
import Layout from '../components/Layout/Layout';
function Book() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex, ISBN) => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001",
    });
    adminApi.delete(`/books/${ISBN}`).then((res) => {
      alert(res.data.message);
    });
    setRows(rows.filter((_, index) => index !== targetIndex));
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);

    setModalOpen(true);
  };

  const handleSubmit = (newRow, mode) => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001",
    });
    if(mode === 'add'){
      adminApi.post(`/books`, newRow).then((res) => {
        alert(res.data.message);
        window.location.reload(true);
      });
    } else {
      adminApi.put(`/books`, newRow).then((res) => {
        alert(res.data.message);
        window.location.reload(true);
      });
    }
    // rowToEdit === null
    //   ? setRows([...rows, newRow])
    //   : setRows(
    //       rows.map((currRow, index) => {
    //         if (index !== rowToEdit) return currRow;

    //         return newRow;
    //       })
    //     );
    // console.log(newRow);
  };
  useEffect(() => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001",
    });
    adminApi.get("/books").then((res) => {
      setRows(res.data.data.rows);
    });
  }, []);
  return (
    <Layout>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h3 className="text-3xl sm:text-2xl font-bold mb-12 text-dark-blue text-center">
            Books Table
          </h3>
        </div>
        <div>
          <BookTable
            rows={rows}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
          >
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
              mode={rowToEdit !== null ? 'edit' : 'add'}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Book;