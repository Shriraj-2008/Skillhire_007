import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const emptyUserState = {
    name: '',
    email: '',
    phone: '',
    headline: '',
    location: '',
    gender: '',
    dob: '',
    languages: [],
    role: '',
    experienceLevel: '',
    totalExperience: '',
    company: '',
    noticePeriod: '',
    availability: '',
    about: '',
    qualification: '',
    university: '',
    passYear: '',
    cgpa: '',
    profileCompletion: 25,
    appliedJobsCount: 0,
    testsCompletedCount: 0,
    certificatesCount: 0,
    savedJobsCount: 0,
    skills: []
  };

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : emptyUserState;
    } catch {
      return emptyUserState;
    }
  });

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // Unified Registration Handler (Register.jsx se sync karne ke liye)
  const registerUser = async (formData) => {
    const newUser = {
      ...emptyUserState,
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      role: formData.role || 'candidate',
      companyName: formData.companyName || '',
      website: formData.website || '',
      profileCompletion: 25
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  };

  const updateUserProfile = (updatedData) => {
    setUser((prevUser) => {
      const mergedUser = { ...prevUser, ...updatedData };
      const fieldsToTrack = ['name', 'email', 'phone', 'headline', 'location', 'about', 'qualification', 'role'];
      const filledFields = fieldsToTrack.filter((field) => Boolean(mergedUser[field]));
      mergedUser.profileCompletion = Math.round((filledFields.length / fieldsToTrack.length) * 100);
      return mergedUser;
    });
  };

  const addSkill = (newSkill) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: [...(prevUser.skills || []), { ...newSkill, id: Date.now() }]
    }));
  };

  const deleteSkill = (skillId) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: (prevUser.skills || []).filter((skill) => skill.id !== skillId)
    }));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(emptyUserState);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: Boolean(user && user.email),
        registerUser, // Updated name so Register.jsx works smoothly
        registerCandidate: registerUser, // Backward compatibility
        updateUserProfile,
        addSkill,
        deleteSkill,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);