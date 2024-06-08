import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ExpandedPost = () => {
  const state = useSelector((state: RootState) => state.postWithId);
  console.log(state.data);

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 place-content-center w-screen h-full mt-10 px-4'>
      <div className='flex flex-col w-full col-span-1 md:col-start-2 md:col-end-4 bg-red-300 p-4 md:p-8'>
        <h1 className='text-2xl md:text-4xl font-bold'>{state.data?.title}</h1>
        <p className='text-lg md:text-2xl mt-4'>
          Description
        </p>
        <div className='text-base md:text-lg mt-4'>
          profile modification bookmark like readmins
        </div>
        <div className='text-lg md:text-xl mt-4'>
          {/* {state.data?.content} */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nisi odio eius voluptatum quod. Totam neque, sed animi libero expedita adipisci minus ratione consequuntur dicta, at omnis nisi nostrum officia.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, tempora dolor delectus, alias, voluptatibus omnis sint minus fugiat quis quae eaque vero dolores nam non. Repudiandae fugiat officia repellendus quasi.
        </div>
      </div>
    </div>
  );
};

export default ExpandedPost;
