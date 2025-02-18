// Imports 
import AnimatedCursor from "react-animated-cursor";
import { useTheme } from "@mui/material";

// Components
import { NavBar } from "../layout/NavBar";

const AdminPage = () => {
    const theme = useTheme()
    return (
        <>
            {/* Navbar */}
            <NavBar />
            {/* Body */}
            ADMIN
            <AnimatedCursor
                key={"cursor"}
                color={theme.palette.mode == "dark" ? "60,147,186" : "90,27,47"}
                outerStyle={{
                    mixBlendMode: "exclusion",
                }}
            />

        </>
    )
};

export default AdminPage;
