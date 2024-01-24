import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  const validateForm = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    setFormValid(isEmailValid && isPasswordValid);
  };

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
    validateForm();
  };

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
    validateForm();
  };

  const handleSubmit = () => {
    if (isFormValid) {
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Formulário válido. Enviar dados:', { email, password });
    } else {
      console.log('Formulário inválido. Corrija os campos.');
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
    </div>
  );
}

export default Login;
