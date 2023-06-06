import { useState } from "react";
import { StaffTable } from "../components/Table/Staff.table";
import { Modal } from "../components/Modal";
import Layout from '../components/Layout/Layout';
function Book() {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const handleDeleteRow = (targetIndex) => {
      setRows(rows.filter((_, index) => index !== targetIndex));
    };
  
    const handleEditRow = (index) => {
      setRowToEdit(index);
  
      setModalOpen(true);
    };
  
    const handleSubmit = (newRow) => {
      rowToEdit === null
        ? setRows([...rows, newRow])
        : setRows(
            rows.map((currRow, index) => {
              if (index !== rowToEdit) return currRow;
  
              return newRow;
            })
          );
    };
  
    return (
      <Layout>
        <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
          <div className="text-4xl font-bold text-blue my-12 mx-auto">
            <h3 className="text-3xl sm:text-2xl font-bold mb-12 text-dark-blue text-center">
              Staffs Table
            </h3>
          </div>
          <div>
            <StaffTable
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
              />
            )}
          </div>
        </div>
        </Layout>
    );
  }
  
  export default Book;