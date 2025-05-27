import { useState } from "react";
import "./Login.css";

type Props = {
  onSubmit: (username: string, password: string) => void;
};

const Login = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="login-button"
        onClick={() => onSubmit(username, password)}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
