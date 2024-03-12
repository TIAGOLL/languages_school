import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function Admin({ children }) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <div></div>
    )
  }
  if (user?.admin == false || !user) {
    return <Navigate to="/" />
  }

  return children;

}