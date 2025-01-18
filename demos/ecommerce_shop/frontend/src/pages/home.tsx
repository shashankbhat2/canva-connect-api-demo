import { Box, Card, CardContent, Typography } from "@mui/material";
import { ConnectButton, DeveloperNote } from "src/components";

export const ConnectToCanvaCta = () => {
  return (
    <Box>
      <Card sx={{ maxWidth: 500, width: "100%", paddingX: 5, paddingY: 2 }}>
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom={true}>
            Connect to Canva
          </Typography>
          <Box paddingY={6}>
            <Typography
              variant="caption"
              align="center"
              paragraph={true}
              gutterBottom={true}
            >
              Connect the Canva for <b>Nourish</b> integration to seamlessly
              manage existing assets, edit product images, and create designs at
              scale.
            </Typography>
            <Box display="flex" justifyContent="center">
              <ConnectButton />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <DeveloperNote info="Set up an integration in the developer portal before connecting to Canva" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export const HomePage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom={true}>
        Welcome to the Canva Demo
      </Typography>
      <ConnectToCanvaCta />
    </>
  );
};
