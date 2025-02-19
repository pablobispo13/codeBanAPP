// Imports 
import { api } from "@/config/api";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Components
export const AdminPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<{ name: string, email: string }>();
    const getUserData = async () => {
        await api.get("/user/info", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('codeBan_token')}`
            }
        }).then((response) => {
            if (response.data.data.success == false) {
                toast.error(response.data.data.message)
            } else {
                setUserData(response.data.data)
            }
        })
            .catch((error) => {
                if (!error.response.data.detail.success) {
                    localStorage.removeItem('codeBan_token')
                    toast.error(error.response.data.detail.message)
                    navigate("/")
                }
            })
    };
    useEffect(() => {
        if (localStorage.getItem("codeBan_token")) {
            getUserData()
        }
        else {
            localStorage.removeItem('codeBan_token')
            toast.info("Área restrita")
            navigate("/")
        }
    }, []);

    return (
        <Stack id="home"        >
            <Stack className="row banner">
                Bem vindo a tela administrativa,  {userData?.name}.
            </Stack>
        </Stack >
    )
};

