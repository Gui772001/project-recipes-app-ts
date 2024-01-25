import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Context from '../context/Context';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
    setFormValid,
  } = useContext(Context);

  const validateForm = useCallback(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    setFormValid(isEmailValid && isPasswordValid);
  }, [email, password, setFormValid]);

  useEffect(() => {
    validateForm();
  }, [email, password, validateForm]);

  const navigate = useNavigate();

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/meals', { replace: true });
    }
  };

  return (
    <div>
      <label
        htmlFor="email"
      >
        <input
          placeholder="E-mail"
          title="email"
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="Digite sua senha"
          title="password"
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !isFormValid }
      >
        Enter
      </button>
      <br />
      {!isFormValid && (
        <>
          <span>Email ou senha inválidos.</span>
          <span>Senha mínima 6 caracteres.</span>
        </>
      )}
    </div>
  );
}

export default Login;
