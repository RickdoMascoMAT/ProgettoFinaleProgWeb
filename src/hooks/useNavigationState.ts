import { useNavigate } from 'react-router-dom';

export function useNavigationState() {
  const navigate = useNavigate();

  const navigateToProfile = (username: string, state?: any) => {
    navigate(`/profile/${username}`, { state });
  };

  return { navigateToProfile };
}
