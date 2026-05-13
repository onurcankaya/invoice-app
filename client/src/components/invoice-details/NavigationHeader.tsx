import { Link } from 'react-router-dom';
import iconArrowLeft from '@/assets/icon-arrow-left.svg';

export default function NavigationHeader() {
  return (
    <Link to="/" className="h-6 flex items-center gap-4">
      <img src={iconArrowLeft} alt="" />
      <span className="body-1 font-bold">Go back</span>
    </Link>
  );
}
