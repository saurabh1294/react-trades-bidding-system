import styled from "styled-components";
import { Typography } from "@mui/material";

export default function Footer({ classes }: any) {
  const FooterContainer = styled.div`
    text-align: center;
    bottom: 0;
    width: 100% !important;
    height: 50px !important ;
    margin-top:16%;
    background: #1976d2;
    display: flex;
  flex-direction: column;
  `;

  const FormattedFooter = styled.div`
    color: white;
  `;

  return (
    <FooterContainer>
      <Typography variant="caption">
        <FormattedFooter>
          © TradesBidder Pty Ltd 2022. All rights reserved
        </FormattedFooter>
      </Typography>
    </FooterContainer>
  );
}
