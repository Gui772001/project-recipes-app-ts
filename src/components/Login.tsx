function Login() {
  return (
    <div>
      <label htmlFor="email">
        <input
          placeholder="E-mail"
          title="email"
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
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
        />
      </label>
      <button
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
