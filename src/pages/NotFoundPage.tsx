import { Link } from 'react-router-dom';

/**
 * 404 Not Found page component.
 * Displayed when the user navigates to a route that doesn't exist.
 * Provides a link to return to the home page.
 *
 * @returns {JSX.Element} The 404 error page UI
 */
export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="form-button">
        Back to Home
      </Link>
    </div>
  );
}
