import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ExpandedPost = () => {  
  const state = useSelector((state : RootState) => state.postWithId);
  console.log(state.data);

  return (
    <div className="flex flex-col">
      <h1>{state.data?.title}</h1>
    </div>
  );
};
export default ExpandedPost;
