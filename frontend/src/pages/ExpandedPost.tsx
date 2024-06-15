import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ExpandedPost = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const state = useSelector((state: RootState) => state.postWithId);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 place-content-center w-screen h-full mt-10 px-4'>
      <div className='flex flex-col w-full col-span-1 md:col-start-2 md:col-end-4 p-4 md:p-8'>
        {loading ? (
          <>
            <h1 className='text-2xl md:text-4xl font-bold'>
              <Skeleton width={'100%'} height={40} />
            </h1>
            <p className='text-lg md:text-xl mt-4 text-gray-500'>
              <Skeleton count={3} />
            </p>
            <div className='text-lg md:text-xl mt-4 max-w-full overflow-x-auto'>
              <Skeleton height={200} />
            </div>
          </>
        ) : (
          <>
            <h1 className='text-2xl md:text-4xl font-bold'>{state.data?.title}</h1>
            <p className='text-lg md:text-xl mt-4 text-gray-500'>
              {state.data?.description}
            </p>
            <div className='text-lg md:text-xl mt-4 max-w-full overflow-x-auto'>
              <div className='w-full'>
                <MDEditor.Markdown source={state.data?.content || ''} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandedPost;
