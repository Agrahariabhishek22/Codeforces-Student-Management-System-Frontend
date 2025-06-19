// pages/Profile.jsx
import { useParams } from 'react-router-dom';
import RatingChart from '../components/RatingChart';
import BarChart from '../components/BarChart';
import Heatmap from '../components/Heatmap';
import StudentProfile from '../components/StudentProfile';

const Profile = () => {
  const { id } = useParams();

  return (
    <div>
      {/* <h2>Contest History</h2>
      <RatingChart studentId={id} />
      <h2>Problem Solving</h2>
      <BarChart studentId={id} />
      <Heatmap studentId={id} /> */}
      <StudentProfile></StudentProfile>
    </div>
  );
};

export default Profile;
