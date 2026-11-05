import { useEffect, useState } from "react";

import { getAllUsers, updateUserStatus, deleteUser } from "../api/adminUserApi";

import styles from "./userList.module.css";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedStatus, setSelectedStatus] = useState({});

  const [updatingId, setUpdatingId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  // Fetch users when page opens

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsers();

      setUsers(data);

      // Initialize dropdown values
      const statusMap = {};

      data.forEach((user) => {
        statusMap[user.userId] = user.approvalStatus;
      });

      setSelectedStatus(statusMap);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle dropdown change

  const handleStatusChange = (userId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [userId]: status,
    }));
  };

  // Update status in database

  const handleUpdateStatus = async (userId) => {
    try {
      setUpdatingId(userId);
      setError("");

      const status = selectedStatus[userId];

      const updatedUser = await updateUserStatus(userId, status);

      setUsers((prev) =>
        prev.map((user) => (user.userId === userId ? updatedUser : user)),
      );

      alert("User status updated successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete user from database

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(userId);
      setError("");

      await deleteUser(userId);

      setUsers((prev) => prev.filter((user) => user.userId !== userId));

      alert("User deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>User Management</h2>
          <p>Manage registered users and their approvals.</p>
        </div>

        <button className={styles.refreshButton} onClick={fetchUsers}>
          Refresh
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.tableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.mobile}</td>

                  <td>
                    <select
                      value={selectedStatus[user.userId] ?? user.approvalStatus}
                      onChange={(e) =>
                        handleStatusChange(user.userId, e.target.value)
                      }
                      className={styles.statusSelect}
                    >
                      <option value="PENDING">PENDING</option>

                      <option value="APPROVED">APPROVED</option>

                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className={styles.updateButton}
                      onClick={() => handleUpdateStatus(user.userId)}
                      disabled={
                        updatingId === user.userId ||
                        selectedStatus[user.userId] === user.approvalStatus
                      }
                    >
                      {updatingId === user.userId
                        ? "Updating..."
                        : "Update Status"}
                    </button>
                  </td>

                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteUser(user.userId)}
                      disabled={deletingId === user.userId}
                    >
                      {deletingId === user.userId ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
