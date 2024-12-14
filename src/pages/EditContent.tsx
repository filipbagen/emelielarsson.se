import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditContent = ({ isAuth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h1>Edit Content</h1>
      <p>Admin only</p>
    </div>
  );
};

export default EditContent;
