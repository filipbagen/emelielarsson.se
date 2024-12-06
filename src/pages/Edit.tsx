import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config.ts';
import { useNavigate } from 'react-router-dom';

const Edit = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const postsCollectionRef = collection(db, 'projects');

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(postsCollectionRef, {
        title,
        companyName,
        tags,
        description,
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputGp">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
              required
            />
          </div>
          <div className="inputGp">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              placeholder="Company Name..."
              required
            />
          </div>
          <div className="inputGp">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags..."
              required
            />
          </div>
          <div className="inputGp">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              required
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
