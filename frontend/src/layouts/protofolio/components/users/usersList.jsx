
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import AddUserModal from './AddUserModal';
import'./userslist.css'
function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  useEffect(() => {
    // Fetch user data as before
    axios.get('http://localhost:8000/api/users/')
      .then((response) => {
        console.log('Data from the API:', response.data); // Add this line to log the data

        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // const handleEditUser = (user) => {
  //   setSelectedUser(user);
  //   setShowEditUserModal(true);
  // };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };
  
  const handleUserUpdated = (updatedUser) => {
    const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    setShowEditUserModal(false);
    setSelectedUser(null);
  };
//  

  const handleCloseEditUserModal = () => {
    setShowEditUserModal(false);
    setSelectedUser(null);
  };




  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserModalClose = () => {
    setShowAddUserModal(false);
  };
  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };


  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleUserDeleted = (deletedUserId) => {
    const updatedUsers = users.filter((user) => user.id !== deletedUserId);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
  };
  
  return (
    <div className='m-5'>
    <h2 style={{ color: '#566787' }}>Admin Dashboard</h2>

      <div className='d-flex justify-content-between'>
      <h2 style={{ color: '#566787' }}>users</h2>
      <button  className='btn btn-primary btn-sm  mx-5 my-2' onClick={handleAddUser}> 
      <i class="fa-solid fa-user-plus" ><span>add  User</span></i></button>

    </div>


      {/* Apply the custom table style to your user list */}
      <table className="table  align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th className=''>Name</th>
            <th>Is Active</th>
            <th>Is staff</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            
            <tr key={user.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={user.avatar} // Assuming 'avatar' is the URL to the user's profile image
                    alt=""
                    style={{ width: '45px', height: '45px',objectFit: "cover" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{user.first_name} {user.last_name}</p>
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
              </td>
              <td>
              
              <span
              className={`status ${user.is_active ? 'text-success' : 'text-warning'}`}
               >
              &bull;
            </span> {user.is_active ? 'active' : 'inactive'}
            </td>
            <td>
            <td>
            {user.is_staff? "Staff" : "not_staff"}
          </td>

            </td>
                <td>
                <button onClick={() => handleEditUser(user)} className="btn btn-link btn-sm btn-rounded">
                <i class="fa-solid fa-gear "></i>                </button>
              </td>
              <td>
              <button onClick={() => handleDeleteUser(user)} className="btn btn-link btn-sm btn-rounded">
              <i class="fa-solid fa-xmark"></i>        </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* End of custom table style */}

      {showEditUserModal&&selectedUser && (
        <EditUserModal user={selectedUser} onUpdate={handleUserUpdated} onClose={() => handleCloseEditUserModal()} />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal user={selectedUser} onClose={handleDeleteModalClose} onDelete={handleUserDeleted} />
      )}

      {showAddUserModal && (
        <AddUserModal show={showAddUserModal} handleClose={handleAddUserModalClose} onUserAdded={handleUserAdded} />
     )}
    </div>
  );
}

export default UserList;



