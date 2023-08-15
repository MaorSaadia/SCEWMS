import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/ProductsScreen/?${keyword}`);
    } else {
      navigate('/');
    }
    searchInput.current.value = '';
    setKeyword('');
  };

  return (
    <Form onSubmit={submitHandler} inline="true">
      <InputGroup className="d-flex align-items-center">
        <FormControl
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="חפש מוצר"
          className="mr-sm-3 ml-sm-5"
          style={{
            textAlign: 'right',
            direction: 'rtl',
            height: '2.5rem',
          }}
          ref={searchInput}
        />
        <Button
          style={{ height: '2.5rem' }}
          type="submit"
          className="p-1 custom-button"
        >
          <i className="fas fa-search" aria-hidden="true"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
