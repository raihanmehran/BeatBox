import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const apiUrl = "http://localhost:3001/users";

export default function Dashboard() {
  // const accessToken = useAuth(code);
  const [users, setUsers] = useState(null);
  const [showAddUserFor, setShowAddUserFor] = useState(false);

  const handleToggleForm = () => {
    setShowAddUserFor(!showAddUserFor);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const formData = new FormData(event.tartget);
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");

    const data = {
      name: name,
      username: username,
      password: password,
    };

    try {
      axios
        .post(apiUrl + "/add", data)
        .then((response) => {
          console.log("Data sent");
          console.log(response);

          // setUsers([...users, response.data]);
          handleToggleForm();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
    event.target.reset();
  };

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (!users) return null;

  return (
    <div>
      <h3>Welcome to Dashboard</h3>
      <button onClick={handleToggleForm} className="btn btn-primary fw-bold">
        Add User
      </button>
      {users.length > 0 ? (
        <table className="table table-response table-hover table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <button className="btn btn-success">Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h4>No Users Found</h4>
        </div>
      )}

      {/* Add User */}

      {showAddUserFor ? (
        <div>
          <h4>Add User</h4>
          <form onSubmit={handleSubmitForm}>
            <div className="form-group">
              <h4 htmlFor="name">Name</h4>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
