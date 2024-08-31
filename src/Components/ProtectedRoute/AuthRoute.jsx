import { Navigate } from 'react-router-dom';

export function AuthRoute(props) {
  const userToken = localStorage.getItem('userToken');


  if (userToken) {
      return <Navigate to={'/home'}  />;
    }else {
      return props.children;
  }
}