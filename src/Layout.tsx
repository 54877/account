import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyle } from "./styled/global.styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Body, Button, HeaderTitle } from "./styled/App.styled";
import { Container } from "@mui/system";
import { Toaster } from "sonner";
export function Layout() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const theme = isDark ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("GSIMS_Token");
    navigate("/account/");
  };
  useEffect(() => {
    console.log(location);
  });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Body>
        <Container>
          <Toaster />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {location.pathname != "/account/" ? (
              <Button style={{ marginRight: "16px" }} onClick={logout}>
                登出
              </Button>
            ) : (
              ""
            )}
            <button onClick={() => setIsDark((v) => !v)}>
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#EAC452"
                >
                  <path d="M380-160q133 0 226.5-93.5T700-480q0-133-93.5-226.5T380-800h-21q-10 0-19 2 57 66 88.5 147.5T460-480q0 89-31.5 170.5T340-162q9 2 19 2h21Zm0 80q-53 0-103.5-13.5T180-134q93-54 146.5-146T380-480q0-108-53.5-200T180-826q46-27 96.5-40.5T380-880q83 0 156 31.5T663-763q54 54 85.5 127T780-480q0 83-31.5 156T663-197q-54 54-127 85.5T380-80Zm80-400Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#EAC452"
                >
                  <path d="M492-280q83 0 141.5-58.5T692-480q0-83-58.5-141.5T492-680q-22 0-43 4.5T408-662q54 25 85.5 74T525-480q0 59-31.5 108T408-298q20 9 41 13.5t43 4.5ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z" />
                </svg>
              )}
            </button>
          </div>
          <header
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="72px"
              viewBox="0 -960 960 960"
              width="72px"
              fill="#EAC452"
            >
              <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <HeaderTitle>Accounting Web</HeaderTitle>
          </header>
          <Outlet />
        </Container>
      </Body>
    </ThemeProvider>
  );
}
