import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MDEditor from '@uiw/react-md-editor';

const ExpandedPost = () => {
  const state = useSelector((state: RootState) => state.postWithId);
  console.log(state.data);

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 place-content-center w-screen h-full mt-10 px-4'>
      <div className='flex flex-col w-full col-span-1 md:col-start-2 md:col-end-4 p-4 md:p-8'>
        <h1 className='text-2xl md:text-4xl font-bold'>{state.data?.title}</h1>
        <p className='text-lg md:text-xl mt-4 text-gray-500'>
          {state.data?.description}
        </p>
        <div className='text-lg md:text-xl mt-4'>
          <MDEditor.Markdown source={state.data?.content || ''} />
        </div>
      </div>
    </div>
  );
};

export default ExpandedPost;
