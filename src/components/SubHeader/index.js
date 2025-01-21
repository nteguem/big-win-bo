import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

const SubHeader = ({ breadcrumbs }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fafafa', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25px',
      }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '13px' }}>
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            underline="hover"
            color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
            href={breadcrumb.href || '#'}
            sx={{
              fontWeight: index === breadcrumbs.length - 1 ? 'bold' : 'normal',
              fontSize: '13px',
            }}
          >
            {breadcrumb.label}
          </Link>
        ))}
      </Breadcrumbs>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#424242',
        }}
      >
        {breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'}
      </Typography>
    </Box>
  );
};

export default SubHeader;
