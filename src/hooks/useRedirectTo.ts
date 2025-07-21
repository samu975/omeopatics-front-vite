import { useNavigate } from "react-router-dom";

export const useRedirectTo = () => {

  const navigate = useNavigate();

  const handleRedirect = (route: string) => {
    navigate(route)
  }

  return handleRedirect;
}