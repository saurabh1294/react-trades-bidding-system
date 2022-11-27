import styled from "styled-components";
import { Typography } from "@mui/material";

export default function Footer({ classes }: any) {
  const FooterContainer = styled.div`
    text-align: center;
    bottom: 0;
    width: 100% !important;
    height: 50px !important ;
    background: #1976d2;
  `;

  const FormattedFooter = styled.div`
    margin-top: 15px;
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
