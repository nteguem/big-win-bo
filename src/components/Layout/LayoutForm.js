import React from 'react';
import { Box, Container, Paper, Stack, Typography, Button, ButtonGroup, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { createSvgIcon } from '@mui/material/utils';
import { useNavigate } from 'react-router-dom';

const LayoutForm = ({
  title,
  children,
  submit,
  backRoute,
  showDownloadCsv,
  handleDownloadCsv,
  showDownloadPdf,
  handleDownloadPdf,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backRoute) {
      navigate(backRoute);
    } else {
      navigate(-1);
    }
  };

  const FileDownloadIcon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24">
      <path d="M14,2H6C4.89,2 4,2.89 4,4V20C4,21.11 4.89,22 6,22H18C19.11,22 20,21.11 20,20V8L14,2M12,19L8,15H10.5V12H13.5V15H16L12,19M13,9V3.5L18.5,9H13Z" />
    </svg>
  );

  return (
    <Container maxWidth="md"   sx={{ 
      marginTop: 0, 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
    }}>
      <form onSubmit={submit}>
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginBottom: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Stack direction="row" alignItems="center">
                  <IconButton
                    size="small"
                    sx={{ marginRight: 2 }}
                    onClick={handleBackClick}
                    color="primary"
                    aria-label="back button"
                  >
                    <ArrowBackIcon fontSize="inherit" />
                  </IconButton>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {title}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <ButtonGroup disableElevation variant="contained">
                    {showDownloadCsv && (
                      <Button
                        startIcon={<FileDownloadIcon />}
                        sx={{
                          textTransform: 'none',
                          backgroundColor: '#008000',
                          '&:hover': { backgroundColor: '#005f00' },
                        }}
                        onClick={handleDownloadCsv}
                      >
                        Télécharger CSV
                      </Button>
                    )}
                    {showDownloadPdf && (
                      <Button
                        endIcon={<FileDownloadIcon />}
                        sx={{
                          textTransform: 'none',
                          backgroundColor: '#f44336',
                          '&:hover': { backgroundColor: '#ba000d' },
                        }}
                        onClick={handleDownloadPdf}
                      >
                        Télécharger PDF
                      </Button>
                    )}
                  </ButtonGroup>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Box>{children}</Box>
        </Paper>
      </form>
    </Container>
  );
};

export default LayoutForm;
