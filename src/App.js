import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (user) => {
    try {
      await axios.post(API_URL, user);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await axios.put(`${API_URL}/${user.id}`, user);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User CRUD App</h1>
      </header>
      <div className="App-content">
        {/* User List */}
        <div className="user-list">
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        {/* User Details */}
        <div className="user-details">
          {selectedUser ? (
            <>
              <h2>Edit User</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      name: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleUpdateUser(selectedUser)}>
                  Save
                </button>
                <button onClick={() => handleDeleteUser(selectedUser.id)}>
                  Delete
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>Add User</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setSelectedUser({
                      id: users.length + 1,
                      name: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleAddUser(selectedUser)}>Add</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
