import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const initialUser = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialUser);
  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
    const isPasswordValid = user.password.length > 6;
    if (isEmailValid && isPasswordValid) {
      return true;
    }
  };

  const navigate = useNavigate();

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setFormValid(true);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    navigate('/meals', { replace: true });
  };

  const validate = validateForm();
  useEffect(() => {

  }, []);

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
          value={ user.email }
          onChange={ handleChange }
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
          value={ user.password }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !validate }
      >
        Enter
      </button>
      <br />
      {!formValid && (
        <>
          <span>Email ou senha inválidos.</span>
          <span>Senha mínima 7 caracteres.</span>
        </>
      )}
    </div>
  );
}

export default Login;
