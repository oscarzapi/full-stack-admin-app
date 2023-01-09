import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/login" // redirects the top level app after logout
            });
        }
    }

    return (
        <Button variant="secondary" onClick={() => handleLogout("popup")}>Sign out</Button>
    );
}