import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SurveyForm from './pages/SurveyForm';
import FeedbackList from './pages/FeedbackList/FeedbackList';
import AppNavigation from './AppNavigation';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppNavigation />
      <Routes>
        <Route path="/" element={<Navigate to="/survey" />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/feedback" element={<FeedbackList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
