import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './ReusableTable.css';

const SearchBar = (handleSearch) => {
  return (
    <div className="container-sm">
      <Form inline className="my-2 my-lg-0 d-flex align-items-center">
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button className="btn-custom" onClick={handleSearch}>
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
