import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";  
import DataTable from "../../components/DataTable";
import { fetchUsersList, deleteUser } from "../../redux/user/actions"; // Importez deleteUser

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const location = useLocation(); 
  const { users, loading, total, error } = useSelector((state) => state.usersReducer);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(fetchUsersList(paginationModel.pageSize, paginationModel.page * paginationModel.pageSize));
  }, [dispatch, paginationModel]);

  const handleActionClick = (rows) => {
    setSelectedRows(rows);
    if (rows.length === 1) {
      const userId = rows[0].phoneNumber;
      const currentPath = location.pathname.replace(/\/$/, '');
      navigate(`${currentPath}/edit/${userId}`);
    }
  };

  const handleAdd = () => {
    const currentPath = location.pathname.replace(/\/$/, '');
    navigate(`${currentPath}/add`);
  };

  const handleDelete = (rows) => {
    setSelectedRows(rows);  
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer ${rows.length} utilisateur(s) ?`
    );
  
    if (confirmDelete) {
      rows.forEach((row) => {
        const userId = row.phoneNumber; 
        dispatch(deleteUser(userId)); 
      });
        setSelectedRows([]);
    }
  };
  

  const actions = [
    {
      label: "Modifier",
      icon: CheckIcon,
      multi: false,
      callback: handleActionClick,
    },
    {
      label: "Supprimer",
      icon: DeleteIcon,
      multi: true,
      callback: handleDelete,
    },
  ];

  const handlePageChange = (newPage) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
  };

  return (
    <Box>
      <DataTable
        title="Liste des Utilisateurs"
        rows={users}
        onAddClick={handleAdd}
        actions={actions}
        loading={loading}
        error={error}
        pageSizeOptions={[10, 20, 50]}
        onPageChange={handlePageChange}
        total={total}
        paginationModel={paginationModel}
        displayColumns={{
          pseudo: true,
          phoneNumber: "Numéro de téléphone",
          role: true,
          createdAt: "Date de création",
        }} 
      />
    </Box>
  );
};

export default User;
