import React, { useState, useEffect } from 'react';
import { login, register, logout } from '../utils/api'; // Assure-toi que les fonctions sont bien définies
import '../WeatherApp.css'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const LoginModal = () => {
    // État local
  const [showModal, setShowModal] = useState(false); // Affichage de la modal
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext); // Accès au contexte utilisateur

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Vérifie si un token est déjà présent au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Réinitialise tous les champs du formulaire
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  // Gère l’envoi du formulaire de connexion ou d’inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ username, email, password });
        await login({ email, password });  // Connexion auto après inscription
      }
      setShowModal(false);
      setIsLoggedIn(true);
      resetForm();
    } catch (err) {
      setError(err.message || 'Erreur lors de l’opération');
    }
  };

  // Déconnexion de l’utilisateur
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.reload(); // Recharge l’app pour rafraîchir l'état
  };

  return (
    <>
      {/* Bouton principal de connexion/déconnexion */}
      <button
        onClick={isLoggedIn ? handleLogout : () => setShowModal(true)}
        className="glass-button"
      >
        {isLoggedIn ? 'Déconnexion' : 'Connexion'}
      </button>

      {/* Modal d’authentification */}
      {showModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <h2>{mode === 'login' ? 'Connexion' : 'Inscription'}</h2>

            {/* Formulaire login/register */}
            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="login-input"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="login-input"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="login-input"
              />

              {/* Message d'erreur si besoin */}
              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="login-submit-button">
                {mode === 'login' ? 'Se connecter' : "S'inscrire"}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="login-cancel-button"
              >
                Annuler
              </button>
            </form>

            {/* Lien pour basculer entre les modes */}
            <p className="login-toggle-text">
              {mode === 'login' ? "Pas encore de compte ?" : "Déjà inscrit ?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="login-switch"
              >
                {mode === 'login' ? "S'inscrire" : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
