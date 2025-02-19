// Imports
import { Fade, useTheme } from "@mui/material";
import { Button, Card, Stack } from "@chakra-ui/react"
import { SingUpForm } from "../layout/SingUpForm";
import { useRef, useState } from "react";
import { FormikProps } from "formik";
import { QRCodeForm } from "../layout/QRCodeForm";
import { LoginForm } from "../layout/LoginForm";

export type initialValuesType = { name: string, email: string, password: string, confirmPassword: string };
export const LoginSingUp = () => {
    const theme = useTheme()
    const formRef = useRef<FormikProps<initialValuesType> | null>(null);
    const loginRef = useRef<FormikProps<initialValuesType> | null>(null);
    const qrCodeRef = useRef<FormikProps<{ code: string }> | null>(null);
    const [disabledButton, setDisabledButton] = useState(false);

    // LoginSingUp
    const [loginSingUp, setLoginSingUp] = useState<"login" | "singup">("login");

    //QRCode
    const [qrCodeRead, setQrCodeRead] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState("");
    const [singUpValues, setSingUpValues] = useState<{ name?: string, email?: string }>({});
    return (
        <Fade in={true} style={{ transformOrigin: "0 0 0", marginTop: "81.19px" }} {...{ timeout: 1000 }} >
            <Stack>
                <Card.Root w="sm" h="full">
                    <Card.Header alignContent={"center"}>
                        <Card.Title font={'2em "Rubik" !important'} w={"100%!important"} textAlign={"center"} margin={"0 !important"} letterSpacing={"0px !important"} color={theme.palette.mode == "dark" ? "white !important" : "black!important"}>
                            {qrCodeRead ? qrCodeValue ? "Leia o QRCode!" : "Digite o código do autenticador" : loginSingUp == "login" ? "Login" : "Cadastre-se"}
                        </Card.Title>
                        <Card.Description font={'1em "Rubik", sans-serif'} textAlign={"center"}>
                            {qrCodeRead ? qrCodeValue && "Leia o QRCode em seu aplicativo autenticador para acessar o sistema!" : loginSingUp == "login" ? "Realize o login para acessar o CodeBan" : "Cria sua conta abaixo para ter acesso ao CodeBan"}
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        {qrCodeRead ?
                            <QRCodeForm singUpValues={singUpValues} qrCodeRef={qrCodeRef} qrCodeValue={qrCodeValue} />
                            : loginSingUp == "login" ?
                                <LoginForm
                                    formRef={loginRef}
                                    qrCodeReadCallback={() => setQrCodeRead(true)}
                                    setSingUpValuesCallback={(value) => setSingUpValues(value)} /> :
                                <SingUpForm
                                    formRef={formRef}
                                    qrCodeReadCallback={() => setQrCodeRead(true)}
                                    setQrCodeValueCallback={(value) => setQrCodeValue(value)}
                                    setQrCodeReadCallback={(value) => setQrCodeRead(value)}
                                    setSingUpValuesCallback={(value) => setSingUpValues(value)}
                                />
                        }
                    </Card.Body>
                    <Card.Footer justifyContent="space-between">
                        {!qrCodeRead && <Button disabled={disabledButton} color={"white"} background={theme.palette.mode == "dark" ? "cyan.800" : "purple.800"} variant="solid"
                            onClick={() => {
                                setLoginSingUp(loginSingUp == "login" ? "singup" : "login")
                            }}
                        >{loginSingUp == "login" ? "Realizar cadastro" : "Login"}</Button>}
                        {!qrCodeRead && <Button disabled={disabledButton} color={"white"} background={theme.palette.mode == "dark" ? "purple.800" : "cyan.800"} variant="solid"
                            onClick={() => {
                                setDisabledButton(true)
                                if (loginSingUp == "login")
                                    loginRef.current && loginRef.current.submitForm()
                                else
                                    formRef.current && formRef.current.submitForm()
                            }}
                        >{loginSingUp == "login" ? "Login" : "Cadastre-se"}</Button>}

                    </Card.Footer>
                </Card.Root>
            </Stack>
        </Fade >
    );
};
