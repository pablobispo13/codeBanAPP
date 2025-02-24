import { api } from "@/config/api";
import { TextField, Container, Stack, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { QrCode, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Types
interface QRCodeFormType {
    qrCodeRef: any,
    qrCodeValue: string,
    copyQRCodeValue: string,
    singUpValues: { name?: string, email?: string }

}

export const QRCodeForm: React.FC<QRCodeFormType> = ({
    qrCodeRef,
    qrCodeValue,
    copyQRCodeValue,
    singUpValues
}) => {
    const navigate = useNavigate();
    const theme = useTheme()
    return (
        <Container>
            <Stack alignItems={"center"}>
                {qrCodeValue && <QrCode.Root value={qrCodeValue}>
                    <QrCode.Frame>
                        <QrCode.Pattern />
                    </QrCode.Frame>
                </QrCode.Root>}
                {copyQRCodeValue &&

                    <Button color={"white"} background={theme.palette.mode == "dark" ? "purple.800" : "cyan.800"} variant="solid"
                        onClick={() => {
                            toast.info("Código do autenticator copiado com sucesso!")
                            navigator.clipboard.writeText(copyQRCodeValue)
                        }
                        }>
                        Copiar código do autenticator
                    </Button>}
                <Formik
                    innerRef={qrCodeRef}
                    initialValues={{ code: "" }}
                    validationSchema={Yup.object({
                        code: Yup.string().required("Código é obrigatório"),
                    })}
                    onSubmit={(values) => {
                        let newValues = {
                            email: singUpValues.email,
                            totp_code: values.code,
                        }
                        api.post("/auth/totp", newValues)
                            .then(async (response) => {
                                if (response.data.success == false) {
                                    toast.error(response.data.message)
                                } else {
                                    toast.success(response.data.message)
                                    localStorage.setItem('codeBan_token', response.data.data.token)
                                    navigate("/restricted")
                                }
                            })
                    }}
                >
                    {({ errors, touched, values, submitForm, setFieldValue }) => (
                        <Form>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Código do Authenticator"
                                variant="outlined"
                                value={values.code}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    if (onlyNums.length !== 7) {
                                        setFieldValue("code", onlyNums)
                                    }

                                    if (onlyNums.length == 6)
                                        submitForm()
                                }}
                                inputProps={{ maxLength: 6 }}
                                autoFocus
                                error={touched.code && Boolean(errors.code)}
                                helperText={touched.code && errors.code}
                            />
                        </Form>
                    )}
                </Formik>
            </Stack>
        </Container >
    );
};
