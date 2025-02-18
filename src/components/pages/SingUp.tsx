// Imports
import { Fade, useTheme } from "@mui/material";
import { Button, Card, Stack } from "@chakra-ui/react"
import { SingUpForm } from "../layout/SingUpForm";
import { useRef, useState } from "react";
import { FormikProps } from "formik";

export type initialValuesType = { name: string, email: string, password: string, confirmPassword: string };
export const SingUp = () => {
    const theme = useTheme()
    const formRef = useRef<FormikProps<initialValuesType> | null>(null);
    const qrCodeRef = useRef<FormikProps<{ code: string }> | null>(null);
    const [qrCodeRead, setQrCodeRead] = useState(false);
    return (
        <Fade in={true} style={{ transformOrigin: "0 0 0", marginTop: "81.19px" }} {...{ timeout: 1000 }} >
            <Stack>
                <Card.Root w="md" h="full">
                    <Card.Header alignContent={"center"}>
                        <Card.Title font={'2em "Rubik" !important'} w={"100%!important"}
                            textAlign={"center"} margin={"0 !important"} letterSpacing={"0px !important"}>
                            {qrCodeRead ? "Leia o QRCode!" : "Cadastre-se"}
                        </Card.Title>
                        <Card.Description font={'1em "Rubik", sans-serif'}>
                            {qrCodeRead ? "Leia o QRCode em seu aplicativo auutenticador para acessar o sistema!" : "Cria sua conta abaixo para ter acesso ao CodeBan"}
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <SingUpForm formRef={formRef} qrCodeRef={qrCodeRef} qrCodeReadCallback={() => setQrCodeRead(true)} />
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        {!qrCodeRead && <Button color={"white"} background={theme.palette.mode == "dark" ? "purple.800" : "cyan.800"} variant="solid" onClick={() => formRef.current && formRef.current.submitForm()}>Cadastre-se</Button>}
                    </Card.Footer>
                </Card.Root>
            </Stack>
        </Fade >
    );
};
