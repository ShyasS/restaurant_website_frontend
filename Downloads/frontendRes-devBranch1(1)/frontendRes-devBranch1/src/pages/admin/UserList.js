/* eslint-disable no-underscore-dangle */
// /* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';
// import Sidebar from './Sidebar';

const UsersList = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');
  const [assignBranch, setAssignBranch] = useState('');
  const [assignBranchId, setAssignBranchId] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/users');
      setAllUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };
  const handleAdd = () => {
    navigate('/admin/create');
  };
  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/admin/user/${selectedUser._id}`,
        {
          role,
          assignBranch,
          assignBranchId
        }
      );

      console.log('User updated successfully');
      fetchUsers();
      setRole('');
      setAssignBranch('');
      setAssignBranchId('');
      handleCloseEditModal();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/myprofile/${searchInput}`
      );
      const { user } = response.data.data;
      console.log('User details:', user);
      setSearchResult([user]);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setSearchResult([]);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/user/${userId}`);
      console.log(`User with ID ${userId} deleted successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const headers = [
    'Sl No',
    'User ID',
    'Name',
    'Email',
    'Phone',
    'Role',
    'Restaurant Branch',
    'Branch ID',
    'Actions'
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div>
            <input
              type="text"
              placeholder="Enter User ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button className="btn-custom" type="button" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <Button className="btn-custom" onClick={handleAdd}>
            Create Admin
          </Button>

          <ReusableTable
            headers={headers}
            data={(searchResult.length > 0 ? searchResult : allUsers).map(
              (user) => ({
                ...user,
                actions: (
                  <>
                    <Button
                      className="btn-custom"
                      onClick={() => handleShowEditModal(user)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      className="btn-custom"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </>
                )
              })
            )}
          />
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="user">user</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="assignBranch">
              <Form.Label>Assign Branch Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter branch name"
                value={assignBranch}
                onChange={(e) => setAssignBranch(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="assignBranchId">
              <Form.Label>Assign Branch Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter branch name"
                value={assignBranchId}
                onChange={(e) => setAssignBranchId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-custom" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button className="btn-custom" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersList;
