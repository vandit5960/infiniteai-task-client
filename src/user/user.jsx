import React from 'react'
import { useSearch } from '../components/stateProvider';
import AdminUser from './adminUser';
import Users from './users';

const User = () => {
  const { user, setUser } = useSearch();

  return (
    <>
    {
      user.role === "admin"?<AdminUser/> :<Users/>
    }
    </>
  )
}

export default User