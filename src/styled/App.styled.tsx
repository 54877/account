import styled from "styled-components";

export const Body = styled.div(({ theme: { colors } }) => ({
  backgroundColor: colors.primary,
  margin: "0 auto",
  minHeight: "100vh",
}));

export const Container = styled.div(({ theme: { widths } }) => ({
  maxWidth: widths.lg,
  margin: "0 auto",
  padding: "20px 0",
}));

export const HeaderTitle = styled.h1(({ theme: { colors, fontSizes } }) => ({
  color: colors.fontColor,
  fontSize: fontSizes.header,
  textAlign: "center",
}));

export const FormTable = styled.form(
  ({ theme: { colors, fontSizes, spacing } }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    color: colors.fontColor,
    fontSize: fontSizes.lg,
    margin: `${spacing.lg} 0`,
  }),
);

export const CenterBox = styled.div(
  ({ theme: { colors, borderRadius, spacing } }) => ({
    gap: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    border: `${colors.fontColor} solid 1px`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  }),
);

export const BoxType = styled.div(({ theme: { spacing } }) => ({
  display: "flex",
  gap: spacing.md,
  alignItems: "center",
  justifyContent: "space-between",
}));

export const FromInput = styled.input(
  ({ theme: { colors, borderRadius } }) => ({
    backgroundColor: "white",
    border: `${colors.fontColor} solid 1px`,
    borderRadius: borderRadius.sm,
    margin: "4px 8px",
  }),
);

export const SelectLabel = styled.label(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

export const SelectInput = styled.select(
  ({ theme: { spacing, borderRadius } }) => ({
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
  }),
);

export const Button = styled.button(
  ({ theme: { fontSizes, colors, borderRadius, spacing } }) => ({
    backgroundColor: colors.button,
    fontSize: fontSizes.md,
    color: "black",
    border: "none",
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: colors.buttonHover,
    },
  }),
);

export const SectionTitle = styled.h2(({ theme: { colors, fontSizes } }) => ({
  color: colors.fontColor,
  fontSize: fontSizes.xxl,
  marginBottom: "16px",
}));

export const ThirdTitle = styled.h3(({ theme: { colors, fontSizes } }) => ({
  color: colors.fontColor,
  fontSize: fontSizes.lg,
  marginBottom: "8px",
}));

export const ButtonFlexContainer = styled.div(({ theme: { spacing } }) => ({
  display: "flex",
  gap: spacing.lg,
}));

export const TableBox = styled.div(() => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
}));

export const TableIcon = styled.div(({ theme: { colors } }) => ({
  color: colors.fontColor,
  marginLeft: "16px",
}));

export const TableColumn = styled.div(({ theme: { colors } }) => ({
  color: colors.fontColor,
  width: "100%",

  cursor: "pointer",
  "$:hover": {
    color: colors.buttonHover,
  },
}));
