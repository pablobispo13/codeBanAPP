import { api } from "@/config/api";
import { TextField, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import sha256 from 'crypto-js/sha256';
import { toast } from "react-toastify";

// Types
interface LoginFormType {
    formRef: any,
    qrCodeReadCallback?: () => void;
    setSingUpValuesCallback?: (value: { name?: string, email?: string }) => void;
    setLoadingCallback?: (value: boolean) => void;
}

export const LoginForm: React.FC<LoginFormType> = ({
    formRef,
    qrCodeReadCallback = () => { },
    setSingUpValuesCallback = () => { },
    setLoadingCallback = () => { }
}) => {
    return (
        <Container>
            <Formik
                innerRef={formRef}
                initialValues={{ email: "", password: "", }}
                validationSchema={Yup.object({
                    email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
                    password: Yup.string()
                        .min(6, "A senha deve ter pelo menos 6 caracteres")
                        .required("Senha é obrigatória"),

                })}
                onSubmit={(values) => {
                    setLoadingCallback(true)
                    let newValues = {
                        email: values.email,
                        password: sha256(values.password).toString()
                    }
                    api.post("/auth/login", newValues)
                        .then((response) => {
                            if (response.data.success == false) {
                                toast.error(response.data.message)
                                setLoadingCallback(false)
                            } else {
                                toast.info(response.data.message)
                                setSingUpValuesCallback({
                                    email: values.email,
                                })
                                qrCodeReadCallback()
                                setLoadingCallback(false)
                            }
                        })
                }}
            >
                {({ errors, touched }) => (
                    <Form
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                formRef.current.submitForm();
                            }
                        }}
                    >
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
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
