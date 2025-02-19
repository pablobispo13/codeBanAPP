import { api } from "@/config/api";
import { TextField, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import sha256 from 'crypto-js/sha256';
import { toast } from "react-toastify";

// Types
interface SingUpFormType {
    formRef: any,
    qrCodeReadCallback?: () => void;
    setQrCodeReadCallback?: (value: boolean) => void;
    setQrCodeValueCallback?: (value: string) => void;
    setSingUpValuesCallback?: (value: { name?: string, email?: string }) => void;
}

export const SingUpForm: React.FC<SingUpFormType> = ({
    formRef,
    qrCodeReadCallback = () => { },
    setQrCodeReadCallback = () => { },
    setQrCodeValueCallback = () => { },
    setSingUpValuesCallback = () => { }
}) => {
    return (
        <Container>
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
                    api.post("/auth/register", newValues)
                        .then((response) => {
                            if (response.data.success == false) {
                                toast.error(response.data.message)
                            } else {
                                setSingUpValuesCallback({
                                    name: values.name,
                                    email: values.email,
                                })
                                toast.success(response.data.message)
                                setQrCodeValueCallback(response.data.data.qr_code_url)
                                setQrCodeReadCallback(true)
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
            </Formik>
        </Container>
    );
};
