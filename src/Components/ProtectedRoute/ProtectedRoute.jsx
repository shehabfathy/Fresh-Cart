import { Navigate } from 'react-router-dom';

export function ProtectedRoute(props) {
  const userToken = localStorage.getItem('userToken');


  if (userToken) {
    return props.children;
  }else {
    return <Navigate to={'/Login'}  />;

  }


}
