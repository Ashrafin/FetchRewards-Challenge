import { useState } from "react";
import {
  Button,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  Paper,
  TextField
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/SEO";
import "@/styles/login.styles.css";

interface ILoginForm {
  name: string;
  email: string;
  emailError: boolean;
  emailHelperText: string;
}

export default function Login() {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    name: "",
    email: "",
    emailError: false,
    emailHelperText: "Please enter a valid email address"
  });

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleLoginFormChange(event: React.ChangeEvent<HTMLInputElement>, formType: "name" | "email") {
    if (
      formType === "email" && event.target.value.length < 1 ||
      formType === "email" && !validateEmail(event.target.value)
    ) {
      setLoginForm({
        ...loginForm,
        [formType]: event.target.value,
        emailError: true
      });

      return;
    }

    setLoginForm({
      ...loginForm,
      [formType]: event.target.value,
      emailError: false,
    });
  }

  function handleSubmitLoginForm() {
    if (!validateEmail(loginForm.email)) {
      return;
    }

    login(loginForm.name, loginForm.email);
  }

  return (
    <div className="login__container">
      <SEO pageTitle="Fetch app login" pageDescription="Fetch app login page" />
      <Container>
        <Paper sx={{ maxWidth: 360 }} className="login__card">
          <CardContent>
            <FormControl fullWidth>
              <TextField
                autoComplete="off"
                fullWidth
                variant="outlined"
                margin="normal"
                label="Name"
                id="name"
                placeholder="Enter your name to get started"
                value={loginForm.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleLoginFormChange(event, "name")}
                type="text"
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                autoComplete="off"
                fullWidth
                variant="outlined"
                margin="normal"
                label="Email"
                id="email"
                placeholder="Enter your email to get started"
                value={loginForm.email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleLoginFormChange(event, "email")}
                type="email"
                required
              />
              {!validateEmail(loginForm.email) &&
                <FormHelperText error id="email-helper-text" sx={{ mx: 0 }}>
                  {loginForm.emailHelperText}
                </FormHelperText>
              }
            </FormControl>
            <Button
              sx={{ marginTop: 2, fontWeight: "bold" }}
              variant="contained"
              size="large"
              fullWidth
              disableElevation
              onClick={handleSubmitLoginForm}
              disabled={loginForm.email.length === 0 || loginForm.name.length === 0 || loginForm.emailError}
            >
              Login
            </Button>
          </CardContent>
        </Paper>
      </Container>
    </div>
  );
}
