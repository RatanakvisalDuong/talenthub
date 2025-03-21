import Image from 'next/image';
import WorkingStatusBar from '../workingStatus/workingStatusBar';
import '@fortawesome/fontawesome-free/css/all.css';


interface Portfolio {
    id: number;
    name: string;
    contact: string;
    major: number | null;
    workingStatus: number | null;
    role: number;
}

export default function Card({ portfolio }: { portfolio: Portfolio }) {

    return (
        <div className="w-53 h-64 rounded-sm shadow-md p-4 bg-white shadow-sm p-4 text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer">
            <div className="flex justify-between items-center">
                <div></div>
                {portfolio.role === 1 ? (
                    portfolio.workingStatus != null ? (
                        <WorkingStatusBar status={portfolio.workingStatus} />
                    ) : (
                        <div
                            className="h-6 flex justify-center items-center text-white text-[12px] rounded-md bg-[#0277B6] w-24"
                        >

                            No Status
                        </div>
                    )
                ) : (
                    <div className="h-6 flex justify-center items-center text-white text-[12px] rounded-md bg-[#5086ed] w-24">
                        <i className="fas fa-check-circle mr-1"></i> 
                        Endorser
                    </div>

                )}


            </div>
            <Image
                src="https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-sm m-auto mx-auto mt-2"
            />
            <div className='w-full mt-2'>
                <p className="text-sm mx-auto w-max">{portfolio.name}</p>
                <div className='flex mt-2'>
                    <p className='font-bold text-[12px]'>
                        Contact:
                    </p>
                    <p className='text-[12px] ml-2'>
                        {portfolio.contact}
                    </p>
                </div>
                {portfolio.role == 1 ? <div className='flex mt-2'>
                    <p className='font-bold text-[12px]'>
                        Major:
                    </p>
                    <p className='text-[12px] ml-2 break-words overflow-hidden text-ellipsis 
        -webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical w-full'>
                        {portfolio.major == 1 ? 'Computer Science' : 'Management of Information System'}
                    </p>
                    {/* </div> : <div className='flex mt-2 text-md items-center justify-center flex bg-[#5086ed] py-2 rounded-md text-white'> 
                    Endorser
                    </div>} */}
                </div> : null
                }


            </div>
        </div>
    );

}

