// src/components/Home.js
import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-modal';
//import 'react-modal/css/react-modal.css'; // Import the default styles for react-modal

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      modalIsOpen: false,
      selectedGrocery: {
        id: null,
        name: '',
        qty: 0,
        price: 0.0,
        description: '',
        image: ''
      },
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/groceries?_page=${this.state.page}&_limit=5`
      );
      this.setState({ groceries: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleEdit = (grocery) => {
    this.setState({ selectedGrocery: { ...grocery }, modalIsOpen: true });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/groceries/${id}`);
      this.fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  handlePageChange = (newPage) => {
    this.setState({ page: newPage });
  };

  handleInputChange = (e, field) => {
    const { selectedGrocery } = this.state;
    this.setState({
      selectedGrocery: {
        ...selectedGrocery,
        [field]: e.target.value
      }
    });
  };

  handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/groceries/${this.state.selectedGrocery.id}`, this.state.selectedGrocery);
      this.setState({ modalIsOpen: false });
      this.fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  render() {
    const { groceries, modalIsOpen, selectedGrocery, page } = this.state;

    return (
      <div>
        {/* Grocery List */}
        {groceries.map((grocery) => (
          <div key={grocery.id}>
            <p>{grocery.name}</p>
            {/* Display other grocery details */}
            <button onClick={() => this.handleEdit(grocery)}>Edit</button>
            <button onClick={() => this.handleDelete(grocery.id)}>Delete</button>
          </div>
        ))}

        {/* Pagination */}
        <button onClick={() => this.handlePageChange(page - 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => this.handlePageChange(page + 1)}>Next</button>

        {/* Edit Modal */}
        <Modal isOpen={modalIsOpen} onRequestClose={() => this.setState({ modalIsOpen: false })}>
          {/* Modal Content */}
          <p>Edit Grocery</p>
          <label>Name:</label>
          <input type="text" value={selectedGrocery.name} onChange={(e) => this.handleInputChange(e, 'name')} />
          <label>Quantity:</label>
          <input type="number" value={selectedGrocery.qty} onChange={(e) => this.handleInputChange(e, 'qty')} />
          <label>Price:</label>
          <input type="number" value={selectedGrocery.price} onChange={(e) => this.handleInputChange(e, 'price')} />
          <label>Description:</label>
          <input type="text" value={selectedGrocery.description} onChange={(e) => this.handleInputChange(e, 'description')} />
          <label>Image URL:</label>
          <input type="text" value={selectedGrocery.image} onChange={(e) => this.handleInputChange(e, 'image')} />
          <button onClick={this.handleEditSubmit}>Save Changes</button>
          <button onClick={() => this.setState({ modalIsOpen: false })}>Cancel</button>
        </Modal>
      </div>
    );
  }
}
