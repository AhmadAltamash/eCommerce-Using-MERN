import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState'; // Assuming you have GlobalState for storing the auth token

const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user information
  const { token } = useContext(GlobalState); // Using the token from GlobalState

  useEffect(() => {
    if (token) {
      // Make API call to fetch user information using the token
      axios
        .get('user/information', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        })
        .then((response) => {
          setUser(response.data); // Set the response data in the user state
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [token]); // Re-run the effect if the token changes

  if (!token) {
    return <div>Please login to view your profile</div>; // Prompt to login if there's no token
  }

  if (!user) {
    return <div>Loading...</div>; // Show loading if user data is not yet fetched
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        {/* Display any other relevant user info */}
      </div>
      <div className="profile-actions">
        <button>Edit Profile</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
