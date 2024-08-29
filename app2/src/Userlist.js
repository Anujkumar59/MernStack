import React, { useState } from 'react';

const UserList = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [users, setUsers] = useState([]);

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);

    axios.get(`https://reqres.in/api/users?page=${e.target.value}`)
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <select value={selectedPage} onChange={handlePageChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.first_name} {user.last_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
