import * as React from "react";
import { useState, useEffect } from "react";
import ProfileCard from '../components/profileCard';

interface User {
  name: { first: string; last: string };
  email: string;
  gender: string;
  location: { city: string; state: string; country: string };
  registered: { date: string };
  dob: { age: number };
  picture: { large: string }
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      console.log(storedUser, "storedUser");
      
      setUser(storedUser)
    }
  }, []);

  return (
    <div>
      {user && (
        <ProfileCard
          title={`${user.name.first} ${user.name.last}`}
          description="Hi! My name is"
          image={user.picture.large ? user.picture.large : "https://source.unsplash.com/random"}
          location={`${user.location.city ?? ""}, ${user.location.state ?? ""}, ${user.location.country ?? ""}`}
        />
      )}
      
    </div>
  );
};

export default ProfilePage;