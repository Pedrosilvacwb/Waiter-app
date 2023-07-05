import { Container, Form } from "./styles";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/input";
import Button from "../../components/Button";
import SplashModal from "./components/SplashModal";
import { api } from "../../utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post("/login", loginForm)
      .then((res) => {
        localStorage.setItem("WAToken", res.data.token);
        localStorage.setItem("WAUserId", res.data.id);
        navigate("/");
        toast.success("Login realizado com sucesso!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <SplashModal />
      <Container>
        <div>
          {" "}
          <span>Bem vindo(a) ao</span>
          <h1>
            <strong>Waiter</strong> App
          </h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup htmlFor="email" error={false} label="E-mail">
              <Input
                type="email"
                placeholder="Seu email de acesso"
                error={false}
                id="email"
                name="email"
                value={loginForm.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup htmlFor="password" label="Senha">
              <Input
                error={false}
                id="password"
                type="password"
                placeholder="Informe sua senha"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
              />
            </FormGroup>
            <Button label="Fazer Login" />
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
