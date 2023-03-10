import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();
        const navigate = useNavigate()

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        }
        //navigate('/dashboard')
    }
    return (
        <Button variant="secondary" onClick={() => handleLogin("popup")}>Sign in</Button>
    );
}