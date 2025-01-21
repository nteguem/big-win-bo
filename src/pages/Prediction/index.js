import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Typography,
  Paper,
  Chip,
  Divider,
  Tooltip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate, useLocation } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { fetchPredictionsList } from "../../redux/prediction/actions";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Predictions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { groupedPredictions, loading, total, error } = useSelector(
    (state) => state.predictionsReducer
  );

  const [currentPredictions, setCurrentPredictions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(
      fetchPredictionsList(
        paginationModel.pageSize,
        paginationModel.page * paginationModel.pageSize
      )
    );
  }, [dispatch, paginationModel]);

  useEffect(() => {
    if (groupedPredictions.length > 0) {
      const firstGroup = groupedPredictions[0];
      setSelectedDate(firstGroup.date);
      setCurrentPredictions(firstGroup.predictions);
    }
  }, [groupedPredictions]);

  const handleAdd = () => {
    const currentPath = location.pathname.replace(/\/$/, "");
    navigate(`${currentPath}/add`);
  };

  const handlePageChange = (newPage) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
  };

  const handleDateClick = (date, predictions) => {
    setSelectedDate(date);
    setCurrentPredictions(predictions);
    setIsDateSelectorOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEEE d MMMM yyyy", { locale: fr }).split(' ').map(
      (word, index) => index === 0 
        ? word.charAt(0).toUpperCase() + word.slice(1) 
        : word
    ).join(' ');
  };

  const getMatchCount = (predictions) => {
    return predictions.length;
  };

  return (
    <Box className="container mx-auto p-4">
      <Paper elevation={0} className="mb-6">
        <Accordion 
          expanded={isDateSelectorOpen}
          onChange={() => setIsDateSelectorOpen(!isDateSelectorOpen)}
          className="shadow-none border rounded-lg hover:border-blue-200 transition-all duration-200"
        >
          <AccordionSummary 
            expandIcon={
              <ExpandMoreIcon 
                className={`
                  text-blue-600 transform transition-transform duration-200
                  ${isDateSelectorOpen ? 'rotate-180' : ''}
                `}
              />
            }
            className="bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
          >
            <Box className="flex items-center gap-3">
              <CalendarTodayIcon className="text-blue-600" />
              <Typography variant="subtitle1" className="font-medium">
                {selectedDate ? formatDate(selectedDate) : 'Sélectionner une date'}
              </Typography>
              <Chip 
                size="small" 
                color="primary" 
                label={`${getMatchCount(currentPredictions)} matches`}
                className="ml-2"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails className="p-0">
            <Box className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
              {groupedPredictions.map((group, index) => (
                <Tooltip 
                  key={group.date} 
                  title="Cliquez pour voir les prédictions de cette date"
                  placement="right"
                  arrow
                >
                  <Box>
                    <Box
                      onClick={() => handleDateClick(group.date, group.predictions)}
                      className={`
                        flex items-center justify-between px-6 py-3 cursor-pointer
                        hover:bg-blue-50 transition-all duration-200 group
                        ${selectedDate === group.date ? 'bg-blue-50' : ''}
                      `}
                    >
                      <Box className="flex items-center justify-between w-full">
                        <Typography 
                          className={`
                            font-medium transition-colors duration-200
                            ${selectedDate === group.date 
                              ? 'text-blue-600' 
                              : 'text-gray-700 group-hover:text-blue-600'
                            }
                          `}
                        >
                          {formatDate(group.date)}
                        </Typography>
                        <Chip 
                          size="small" 
                          variant={selectedDate === group.date ? "filled" : "outlined"}
                          color={selectedDate === group.date ? "primary" : "default"}
                          label={`${getMatchCount(group.predictions)} matches`}
                          className="transition-all duration-200 group-hover:border-blue-300"
                        />
                      </Box>
                    </Box>
                    {index < groupedPredictions.length - 1 && (
                      <Divider className="my-0" />
                    )}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <DataTable
        title={`Liste des Prédictions - ${selectedDate ? formatDate(selectedDate) : ''}`}
        rows={currentPredictions}
        onAddClick={handleAdd}
        loading={loading}
        error={error}
        pageSizeOptions={[10, 20, 50]}
        onPageChange={handlePageChange}
        total={total}
        paginationModel={paginationModel}
        displayColumns={{
          isVisible: "Visibilité",
          isVip: "VIP",
          fixture: "Match",
          prediction: "Prédiction",
          odd: "Cote",
          iswin:'Resultat'
        }}
        onVisibilityChange={(id, newValue) => {
            // Gérez ici le changement de visibilité
            console.log(`Row ${id} visibility changed to ${newValue}`);
            // Appelez votre API ou mettez à jour votre state
          }}
      />
    </Box>
  );
};

export default Predictions;