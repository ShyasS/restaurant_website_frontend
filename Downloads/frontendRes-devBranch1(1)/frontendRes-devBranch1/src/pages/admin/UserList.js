/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
// /* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import ReusableTable from '../../components/ReusableTable';
import './index.css';

const UsersList = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [resPerPage, setResPerPage] = useState(0);
  const [assignBranch, setAssignBranch] = useState('');
  const [assignBranchId, setAssignBranchId] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('');
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/admins?&page=${currentPage}`
      );
      // Other logic...

      setResPerPage(response.data.resPerPage);
      setProductsCount(response.data.count);
      setAllUsers(response.data.Users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    fetchUsers(pageNo);
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
  const handleRoleFilterChange = (e) => {
    setSelectedRoleFilter(e.target.value);
  };
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'superAdmin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      case 'user':
        return 'Customer';
      // Add more cases as needed
      default:
        return role; // Return the role as is if no match
    }
  };
  const filteredUsers = selectedRoleFilter
    ? allUsers.filter((user) => user.role === selectedRoleFilter)
    : allUsers.filter((user) => user.role === 'admin');

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
    'Name',
    'Email',
    'Phone',
    'Role',
    'Restaurant Branch',
    'Branch ID',
    'Actions'
  ];

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="container">
      <div className="row">
        <h5 className="mt-3" style={{ fontWeight: 'bold' }}>
          USERS - Admin
        </h5>
        <div
          className="col mt-4"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className="col-3" style={{ display: 'flex' }}>
            <label style={{ display: 'flex' }}>Filter by Role: </label>
            <div className="mx-4">
              <select
                value={selectedRoleFilter}
                onChange={handleRoleFilterChange}
                className="form-control"
              >
                <option value="">All</option>
                <option value="superAdmin">Super Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <input
                type="text"
                className={`form-control `}
                style={{ display: 'flex' }}
                placeholder="Enter User ID"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div>
              <button
                className="btn mx-1"
                style={{ display: 'flex', color: 'white' }}
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn"
              style={{ color: 'white' }}
              onClick={handleAdd}
            >
              Create Admin
            </button>
          </div>
        </div>
        <ReusableTable
          headers={headers}
          data={(searchResult.length > 0 ? searchResult : filteredUsers).map(
            (user) => ({
              ...user,
              role: getRoleDisplayName(user.role),
              actions: (
                <div style={{ display: 'flex' }}>
                  <Button
                    className="btn-custom with-border-radius"
                    onClick={() => handleShowEditModal(user)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                  <Button
                    className="btn-custom with-border-radius"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              )
            })
          )}
        />
        <div className="pagination-1">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={handlePageChange}
            nextPageText="Next"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
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
            Edit
          </Button>
          <Button className="btn-custom" onClick={handleEdit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersList;
