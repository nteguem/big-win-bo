import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

const ActionBar = ({
  selectedRows,
  actions,
  onActionClick,
  onAddClick,
  isAdd = true
}) => {
  const theme = useTheme(); // Utiliser le thème pour récupérer les breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Vérifier si l'écran est petit

  const [show, setShow] = useState(false); // Gère l'animation
  const [shouldRender, setShouldRender] = useState(false); // Gère le rendu du composant

  // Filtrer les actions en fonction des lignes sélectionnées
  const filteredActions = useMemo(() => {
    if (selectedRows.length > 0) {
      return selectedRows.length > 1
        ? actions.filter((action) => action.multi)
        : actions;
    }
    return [];
  }, [selectedRows, actions]);

  useEffect(() => {
    if (selectedRows.length > 0) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 0); // Lancer l'animation fade-in
    } else {
      setShow(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); // Retirer du DOM après animation
      return () => clearTimeout(timeout);
    }
  }, [selectedRows]);

  // Si aucune ligne n'est sélectionnée, afficher uniquement le bouton "Ajouter"
  if (!shouldRender && isAdd) {
    return (
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mb={2}
      >
        {onAddClick &&
          <Button
            variant="contained"
            style={{ backgroundColor: "#008000", color: "#FFFFFF" }}
            onClick={onAddClick}
          >
            Ajouter
          </Button>
        }
      </Box>
    );
  }

  // Afficher la barre d'actions avec styles responsives
  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"} // Basculer entre colonne et ligne pour petits écrans
      justifyContent={isSmallScreen ? "center" : "space-between"}
      alignItems="center"
      gap={2}
      p={2}
      bgcolor="#f5f5f5"
      borderRadius="8px"
      mb={2}
      sx={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"} // Actions empilées sur petit écran
        gap={2}
        justifyContent={isSmallScreen ? "center" : "flex-start"}
        alignItems="center"
        width="100%"
      >
        {filteredActions.length > 0 ? (
          filteredActions.map((action, index) => (
            <Box
              key={index}
              onClick={() => onActionClick(action, selectedRows)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#ffffff"
              color="#000000"
              p={1}
              borderRadius="8px"
              sx={{
                cursor: "pointer",
                textAlign: "center",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
                width: isSmallScreen ? "100%" : "auto", // Boutons plus larges sur petit écran
              }}
            >
              <action.icon style={{ fontSize: "24px", marginRight: "8px" }} />
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {action.label}
              </span>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Aucune action multiple disponible pour les éléments sélectionnés.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ActionBar;
