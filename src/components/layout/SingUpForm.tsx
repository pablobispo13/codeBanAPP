import { api } from "@/config/api";
import { TextField, Container, Stack } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import sha256 from 'crypto-js/sha256';
import { toast } from "react-toastify";
import { useState } from "react";
import { QrCode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Types
interface SingUpFormType {
    formRef: any,
    qrCodeRef: any,
    qrCodeReadCallback?: () => void;
}

export const SingUpForm: React.FC<SingUpFormType> = ({
    formRef,
    qrCodeRef,
    qrCodeReadCallback = () => { },
}) => {

    const [qrCodeRead, setQrCodeRead] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState();
    const [code, setCode] = useState('');
    const [singUpValues, setSingUpValues] = useState<{ name?: string, email?: string }>({});
    const navigate = useNavigate();
    return (
        <Container>
            {qrCodeRead ?
                <Stack alignItems={"center"}>
                    <QrCode.Root value={qrCodeValue}>
                        <QrCode.Frame>
                            <QrCode.Pattern />
                        </QrCode.Frame>
                    </QrCode.Root>
                    <Formik
                        innerRef={qrCodeRef}
                        initialValues={{ code: "" }}
                        validationSchema={Yup.object({
                            code: Yup.string().required("Código é obrigatório"),
                        })}
                        onSubmit={(values) => {
                            let newValues = {
                                name: singUpValues.name,
                                email: singUpValues.email,
                                totp_code: values.code,
                            }
                            api.post("/totp", newValues)
                                .then((response) => {
                                    if (response.data.success == false) {
                                        toast.error(response.data.message)
                                    } else {
                                        toast.success(response.data.message)
                                        navigate("/restricted");
                                        localStorage.setItem("codeBan_token", response.data.token)
                                    }
                                })
                        }}
                    >
                        {({ errors, touched, submitForm, setFieldValue }) => (
                            <Form>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Código do Authenticator"
                                    variant="outlined"
                                    value={code}
                                    onChange={(e) => {
                                        if (e.target.value.length !== 7) {
                                            setCode(e.target.value)
                                            setFieldValue("code", e.target.value)
                                        }

                                        if (e.target.value.length == 6)
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
                </Stack> :
                <Formik
                    innerRef={formRef}
                    initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Nome é obrigatório"),
                        email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
                        password: Yup.string()
                            .min(6, "A senha deve ter pelo menos 6 caracteres")
                            .required("Senha é obrigatória"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref("password")], "As senhas devem coincidir")
                            .required("Confirmação de senha é obrigatória"),
                    })}
                    onSubmit={(values) => {
                        let newValues = {
                            name: values.name,
                            email: values.email,
                            password: sha256(values.password).toString()
                        }
                        api.post("/register", newValues)
                            .then((response) => {
                                if (response.data.success == false) {
                                    toast.error(response.data.message)
                                } else {
                                    setSingUpValues({
                                        name: values.name,
                                        email: values.email,
                                    })
                                    toast.success(response.data.message)
                                    setQrCodeValue(response.data.qr_code_url)
                                    setQrCodeRead(true)
                                    qrCodeReadCallback()

                                }
                            })
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                as={TextField}
                                label="Nome"
                                name="name"
                                fullWidth
                                margin="normal"
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <Field
                                as={TextField}
                                label="E-mail"
                                name="email"
                                type="email"
                                fullWidth
                                margin="normal"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <Field
                                as={TextField}
                                label="Senha"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <Field
                                as={TextField}
                                label="Confirme a Senha"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />
                        </Form>
                    )}
                </Formik>}
        </Container>
    );
};
