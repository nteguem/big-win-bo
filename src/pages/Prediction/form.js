import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Stack,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Typography
} from '@mui/material';
import ReactSelect from 'react-select';
import LayoutForm from '../../components/Layout/LayoutForm';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  fetchAvailableDays,
  fetchCountries,
  fetchLeagues,
  fetchMatches,
} from '../../redux/fixture/actions';
import { fetchEvents } from '../../redux/event/actions';
import { addPrediction } from '../../redux/prediction/actions';

const customStyles = {
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0'
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '2px solid #1976d2' : '1px solid #e0e0e0',
    boxShadow: 'none',
    '&:hover': {
      border: state.isFocused ? '2px solid #1976d2' : '1px solid #1976d2'
    },
    borderRadius: '4px',
    backgroundColor: '#ffffff'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#757575'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#212121'
  }),
};

export default function FormPrediction() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    selectedDay: '',
    country: '',
    championship: '',
    fixture: '',
    prediction: '',
    coast: '',
    isVip: false,
    isVisible: true,
    
  });

  const { availableDays, countries, leagues, matches, events } = useSelector(state => ({
    availableDays: state.FixtureReducer.availableDays,
    countries: state.FixtureReducer.countries,
    leagues: state.FixtureReducer.leagues,
    matches: state.FixtureReducer.matches,
    events: state.EventReducer.events,
  }));

  useEffect(() => {
    dispatch(fetchAvailableDays());
  }, [dispatch]);

  useEffect(() => {
    if (formData.selectedDay) {
      dispatch(fetchCountries({ date: formData.selectedDay }));
    }
  }, [formData.selectedDay, dispatch]);

  useEffect(() => {
    if (formData.selectedDay && formData.country) {
      dispatch(fetchLeagues({
        date: formData.selectedDay,
        country: formData.country.name
      }));
    }
  }, [formData.selectedDay, formData.country, dispatch]);

  useEffect(() => {
    if (formData.selectedDay && formData.championship) {
      dispatch(fetchMatches({
        date: formData.selectedDay,
        league: formData.championship?.name,
        logo: formData.championship?.logo
      }));
    }
  }, [formData.selectedDay, formData.championship, dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const daysOptions = availableDays ?
    Object.entries(availableDays).map(([key, value]) => ({
      label: key,
      value: value,
    })) : [];

  const countryOptions = countries ?
    countries.map((country) => ({
      value: country,
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={country.logo}
            alt={country.name}
            style={{ height: '30px', width: '30px', marginRight: '10px' }}
          />
          {country.name}
        </div>
      ),
    })) : [];

  const leagueOptions = leagues ?
    leagues?.map((league) => ({
      value: league,
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={league.logo}
            alt={league.name}
            style={{ height: '30px', width: '30px', marginRight: '10px' }}
          />
          {league.name}
        </div>
      ),
    })) : [];

  const matchOptions = matches ?
    matches.map((match) => ({
      value: match,
      label: (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <img src={match.homeTeam.logo} alt={match.homeTeam.team_name} style={{ height: '30px', width: '30px', marginRight: '10px' }} />
            {match.homeTeam.team_name}
          </Box>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            {moment(match.event_date).format('HH:mm')} GMT
          </Box>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            {match.awayTeam.team_name}
            <img src={match.awayTeam.logo} alt={match.awayTeam.team_name} style={{ height: '30px', width: '30px', marginLeft: '10px' }} />
          </Box>
        </Box>
      ),
    })) : [];

  const eventOptions = events ?
    events.map((event) => ({
      value: event.title,
      label: event.title,
    })) : [];

  const handleFormDataChange = (name) => (selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = () => {
    setFormData(prevData => ({
      ...prevData,
      isVip: !prevData.isVip,
    }));
  };

  const handleSubmit = () => {
    dispatch(addPrediction(formData));
  };

  return (
    <LayoutForm title="Ajouter une prédiction">
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2
      }}>
        <FormControl sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
            Date
          </Typography>
          <ReactSelect
            value={daysOptions.find(option => option.value === formData.selectedDay)}
            onChange={handleFormDataChange('selectedDay')}
            options={daysOptions}
            styles={customStyles}
            isSearchable={true}
            isClearable={true}
            placeholder="Choisir Date"
          />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
            Pays
          </Typography>
          <ReactSelect
            value={countryOptions.find(option => option.value === formData.country)}
            onChange={handleFormDataChange('country')}
            options={countryOptions}
            styles={customStyles}
            isSearchable={true}
            isClearable={true}
            placeholder="Choisir Pays"
          />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
            Championnat
          </Typography>
          <ReactSelect
            value={leagueOptions.find(option => option.value === formData.championship)}
            onChange={handleFormDataChange('championship')}
            options={leagueOptions}
            styles={customStyles}
            isSearchable={true}
            isClearable={true}
            placeholder="Choisir Championnat"
          />
        </FormControl>
      </Box>

      <Box>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
          Rencontre
        </Typography>
        <FormControl fullWidth>
          <ReactSelect
            value={matchOptions.find(option => option.value === formData.fixture)}
            onChange={handleFormDataChange('fixture')}
            options={matchOptions}
            styles={{
              ...customStyles,
              option: (provided) => ({
                ...provided,
                padding: '12px'
              })
            }}
            isSearchable={true}
            isClearable={true}
            placeholder="Choisir Rencontre"
          />
        </FormControl>
      </Box>


      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 1,
        '& > *': {
          mt: { md: '10px' }
        }
      }}>
<FormControl sx={{ flex: 1 }}>
  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
    Prédiction
  </Typography>
  <ReactSelect
    value={eventOptions.find(option => option.value === formData.prediction)}
    onChange={handleFormDataChange('prediction')}
    options={eventOptions}
    menuPlacement="top"  // Ajout de cette ligne pour forcer l'ouverture vers le haut
    styles={{
      ...customStyles,
      control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? '2px solid #1976d2' : '1px solid #e0e0e0',
        boxShadow: 'none',
        '&:hover': {
          border: state.isFocused ? '2px solid #1976d2' : '1px solid #1976d2'
        }
      }),
      menu: (provided) => ({
        ...provided,
        zIndex: 10,
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',  // Ombre ajustée pour le menu vers le haut
        border: '1px solid #e0e0e0',
        bottom: '100%',  // Position le menu au-dessus du select
        top: 'auto'  // Désactive le positionnement par défaut
      })
    }}
    isSearchable={true}
    isClearable={true}
    placeholder="Choisir Prédiction"
  />
</FormControl>

        <FormControl sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
            Côte
          </Typography>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '38px',
                backgroundColor: '#ffffff',
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                  borderWidth: '2px',
                }
              }
            }}
            name="coast"
            value={formData.coast}
            onChange={handleInputChange}
            type="number"
            placeholder="Ex: 1.5"
            inputProps={{ min: 0, step: 0.01 }}
          />
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#424242' }}>
            VIP
          </Typography>
          <Box sx={{
            height: '50px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isVip}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              }
              label=""
              sx={{ m: 0 }}
            />
          </Box>
        </FormControl>
      </Box>


      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          width: '100%', // Ajout de cette ligne
          height: '48px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#1565c0'
          }
        }}
      >
        Soumettre
      </Button>
    </LayoutForm>
  );
}