import {
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { signInEndpoint } from "../api/apiRequests";
import { IUser } from "../Interfaces/backend";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253,236,234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginScreen(props: ILoginScreenProps) {
  const classes = useStyles();
  const [email, setEmail] = useState("danilo@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, (e) => {
      setError("E-mail não encontrado ou senha incorreta");
    });
  }

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail
        <kbd> danilo@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // error={!!errors.desc}
          // helperText={errors.desc}
        />
        <TextField
          margin="normal"
          label="Senha"
          fullWidth
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // error={!!errors.desc}
          // helperText={errors.desc}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
