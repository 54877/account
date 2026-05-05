import { createGlobalStyle } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    widths: {
      lg: string;
      md: string;
      sm: string;
    };
    colors: {
      primary: string;
      secondary: string;
      button: string;
      buttonHover: string;
      fontColor: string;
    };
    fontSizes: {
      header: string;
      xxl: string;
      lg: string;
      md: string;
      sm: string;
    };
    spacing: {
      lg: string;
      md: string;
      sm: string;
    };
    borderRadius: {
      lg: string;
      md: string;
      sm: string;
    };
  }
}
export const darkTheme = {
  widths: {
    lg: "1200px",
    md: "992px",
    sm: "768px",
  },
  colors: {
    primary: "black",
    secondary: "gray",
    button: "#EAC452",
    buttonHover: "#C49A2E",
    fontColor: "white",
  },
  fontSizes: {
    header: "48px",
    xxl: "32px",
    lg: "24px",
    md: "16px",
    sm: "12px",
  },
  spacing: {
    lg: "24px",
    md: "16px",
    sm: "8px",
  },
  borderRadius: {
    lg: "20px",
    md: "16px",
    sm: "4px",
  },
};

export const lightTheme = {
  widths: {
    lg: "1200px",
    md: "992px",
    sm: "768px",
  },
  colors: {
    primary: "#FFFFFF", // 主背景（白）
    secondary: "#F5F5F5", // 區塊背景（淡灰）
    button: "#D4A017", // 金色稍微壓暗（白底更好看）
    buttonHover: "#B88A12",
    fontColor: "#1A1A1A", // 主文字（深灰，避免純黑刺眼）
    subText: "#666666", // 次文字
    border: "#E0E0E0", // 邊框
  },
  fontSizes: {
    header: "48px",
    xxl: "32px",
    lg: "24px",
    md: "16px",
    sm: "12px",
  },
  spacing: {
    lg: "24px",
    md: "16px",
    sm: "8px",
  },
  borderRadius: {
    lg: "20px",
    md: "16px",
    sm: "4px",
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    font-weight: normal;
  }


  ul, ol {
    list-style: none;
  }


  a {
    text-decoration: none;
    color: inherit;
  }


  button, input, textarea {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    background: none;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
