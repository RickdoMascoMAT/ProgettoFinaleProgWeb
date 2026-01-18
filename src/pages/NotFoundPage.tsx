import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/" className="form-button">
        Torna alla Home
      </Link>
    </div>
  );
}
