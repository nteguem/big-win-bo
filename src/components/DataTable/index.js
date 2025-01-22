import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, CircularProgress, Switch, Tooltip,useMediaQuery,useTheme } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ActionBar from "./ActionBar";

export default function DataTable({
  title,
  rows,
  actions = [],
  onAddClick,
  loading,
  error,
  pageSizeOptions,
  onPageChange,
  total,
  paginationModel,
  displayColumns,
  onVisibilityChange,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const generateColumns = (rows) => {
    if (rows.length === 0) return [];

    const keys = Object.keys(rows[0]);

    if (!displayColumns) {
      return keys.map((key) => {
        if (key === "isVisible") {
          return {
            field: key,
            headerName: "Visible",
            flex: 1,
            minWidth: 100,
            editable: false,
            renderCell: (params) => (
              <Box onClick={(e) => e.stopPropagation()}>
                <Switch
                  checked={params.value}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    if (onVisibilityChange) {
                      onVisibilityChange(params.row._id, newValue);
                    }
                  }}
                />
              </Box>
            ),
          };
        }

        if (key === "fixture") {
          return {
            field: key,
            headerName: "Match",
            flex: 2,
            minWidth: 200,
            renderCell: (params) => {
              const { homeTeam, awayTeam, event_date, venue, score, status } = params.value;
              return (
                <Tooltip
                  title={
                    <Box sx={{ p: 1, textAlign: "left" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold",fontSize:1 }}>
                        {homeTeam.team_name} vs {awayTeam.team_name}
                      </Typography>
                      <Typography variant="body2">
                        Date : {new Date(event_date).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">Stade : {venue}</Typography>
                      <Typography variant="body2">Score : {score.fulltime || "N/A"}</Typography>
                      <Typography variant="body2">Statut : {status}</Typography>
                    </Box>
                  }
                  placement="right"
                >
                  <SportsSoccerIcon sx={{ cursor: "pointer", color: "#30CCEB" }} />
                </Tooltip>
              );
            },
          };
        }

        return {
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          flex: 1,
          minWidth: 150,
        };
      });
    }

    const normalizedColumns = keys
      .map((key) => {
        const columnConfig = displayColumns[key];

        if (displayColumns && !columnConfig && !Object.keys(displayColumns).includes(key)) {
          return null;
        }

        if (key === "isVisible") {
          return {
            field: key,
            headerName: columnConfig?.headerName || "Visible",
            flex: 1,
            minWidth: 100,
            editable: false,
            ...columnConfig,
            renderCell: (params) => (
              <Box onClick={(e) => e.stopPropagation()}>
                <Switch
                  checked={params.value}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    if (onVisibilityChange) {
                      onVisibilityChange(params.row._id, newValue);
                    }
                  }}
                />
              </Box>
            ),
          };
        }
        if (key === "fixture") {
          return {
            field: key,
            headerName: "Match",
            flex: 2,
            minWidth: 300,
            renderCell: (params) => {
              const { homeTeam, awayTeam, event_date, score, status } = params.value;
        
              return (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 1 }}>
                  {/* Ligne pour les équipes avec logos */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src={homeTeam.logo}
                      alt={`${homeTeam.team_name} logo`}
                      style={{ width: 13, height: 13, objectFit: "contain", marginRight: 5 }}
                    />
                    <Typography variant="body2" component="span" sx={{ fontWeight: "bold",fontSize:11}}>
                      {homeTeam.team_name}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                      vs
                    </Typography>
                    <img
                      src={awayTeam.logo}
                      alt={`${awayTeam.team_name} logo`}
                      style={{ width: 13, height: 13, objectFit: "contain", marginRight: 5 }}
                    />
                    <Typography variant="body2" component="span" sx={{ fontWeight: "bold",fontSize:11 }}>
                      {awayTeam.team_name}
                    </Typography>
                  </Box>
        
                  {/* Informations supplémentaires : heure, score et statut */}
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    {/* Heure */}
                    <Typography variant="caption" color="textSecondary">
                      {new Date(event_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                    {/* Score */}
                    {score?.fulltime && (
                      <Typography variant="caption" color="textSecondary">
                        Score: {score.fulltime}
                      </Typography>
                    )}
                    {/* Statut */}
                    {status && (
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{
                          color: status === "Match Finished" ? "green" : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {status}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            },
          };
        }
        
        
        return {
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          flex: 1,
          minWidth: 150,
          ...(columnConfig || {}),
        };
      })
      .filter(Boolean);

    return normalizedColumns;
  };

  const columns = generateColumns(rows);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const handleSelectionChange = (ids) => {
    setSelectedRows(ids);
  };

  const handleActionClick = (action, selectedRows) => {
    action.callback(selectedRows);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
      p={2}
    >
      {title && !isMobile && (
        <Typography
          variant="h6"
          sx={{ color: "#333", fontWeight: "bold", mb: 2 }}
        >
          {title}
        </Typography>
      )}

      <ActionBar
        selectedRows={selectedRows}
        actions={actions}
        onActionClick={handleActionClick}
        onAddClick={onAddClick}
      />

      {rows.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <InboxIcon sx={{ fontSize: 80, color: "#ccc" }} />
          <Typography variant="h6" color="textSecondary">
            Aucune donnée disponible
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row._id}
            columns={columns}
            pageSizeOptions={pageSizeOptions}
            paginationMode="server"
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={(params) => onPageChange(params.page)}
            rowCount={total}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              const selectedObjects = rows.filter((row) => ids.includes(row._id));
              handleSelectionChange(selectedObjects);
            }}
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.6)",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#30CCEB",
                opacity: 0.85,
                fontWeight: "bold",
                fontSize: 14,
                color: "black",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "rgb(11 87 208 / 10%)",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "hidden",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
