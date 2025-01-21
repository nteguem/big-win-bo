import {
  People as UsersIcon,
  SportsSoccer as PredictionsIcon,
} from '@mui/icons-material';
import User from '../pages/User';
import FormUser from '../pages/User/form';
import Predictions from '../pages/Prediction';
import FormPrediction from '../pages/Prediction/form';

export const menuItems = [
  {
    icon: <PredictionsIcon />,
    label: 'Predictions',
    path: '/predictions',
    component: <Predictions/>, 
    actions: {
      add: {
        component: <FormPrediction />,
        requiresId: false
      }
    },
    subMenu: [],
  },
  {
    icon: <UsersIcon />,
    label: 'Utilisateurs',
    path: '/utilisateurs',
    component: <User />,
    actions: {
      edit: {
        component: <FormUser />,
        requiresId: true
      },
      add: {
        component: <FormUser />,
        requiresId: false
      }
    },
    subMenu: [],
  },
];