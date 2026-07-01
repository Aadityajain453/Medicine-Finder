import React from 'react';
import { Link } from 'react-router-dom';

const AuthError = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div 
        className="card shadow-sm border-0 rounded-4 p-5 text-center" 
        style={{ maxWidth: '420px', backgroundColor: '#ffffff' }}
      >
        <div className="mb-4">
          {/* Lock icon indicating an authentication/security issue */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="72" 
            height="72" 
            fill="#0d6efd" 
            className="bi bi-lock" 
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
          </svg>
        </div>
        
        <h3 className="fw-bold mb-3" style={{ color: '#1a1d20' }}>
          Authentication Failed
        </h3>
        
        <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
          We couldn't verify your access. Your session may have expired, or you do not have the required permissions to view this page.
        </p>
        
        <div className="d-grid gap-3 mt-2">
          <button 
            className="btn btn-primary btn-lg rounded-3 shadow-sm" 
            style={{ fontWeight: '500' }}
          ><Link className='text-white text-decoration-none' to={'/login'}>
            Back to Login
            </Link>
          </button>
          
          {/* Optional secondary link */}
          <a 
            href="/" 
            className="text-decoration-none text-secondary mt-2" 
            style={{ fontSize: '14px', fontWeight: '500' }}
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthError;