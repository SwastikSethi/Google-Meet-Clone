import { cn } from "@/lib/utils";
import { CallControls, CallParticipantListing, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User, Users, Users2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const router = useRouter();
    const [layout, setlayout] = useState<CallLayoutType>('speaker-left');
    const [showParicipants, setshowParicipants] = useState(false);

    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');

    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();

    if(callingState !== CallingState.JOINED)return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
                break;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
                break;

            default:
                return <SpeakerLayout participantsBarPosition='right' />
                break;
        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className="relative flex size-full items-center justify-center">
                <div className='flex size-full max-w-[1100px] items-center'>
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)]  ml-2', {
                    'hidden': !showParicipants,
                })}>
                    <CallParticipantsList onClose={() => setshowParicipants(true)} />
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">

                <CallControls onLeave={()=>{router.push('/')}} />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    onClick={() =>
                                        setlayout(item.toLowerCase() as CallLayoutType)
                                    }
                                >
                                    {item}
                                </DropdownMenuItem>
                                {/* <DropdownMenuSeparator className="border-dark-1" /> */}
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />
                <button onClick={() => { setshowParicipants((prev) => !prev) }}>
                    <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] ">
                        <Users2 size={20} className="text-white" />
                    </div>
                </button>

                {!isPersonalRoom && <EndCallButton />}
            </div>

        </section>
    )
}

export default MeetingRoom