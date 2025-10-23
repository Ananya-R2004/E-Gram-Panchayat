'use client';

import { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { Toaster } from "@/components/ui/toaster";


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

    const {user}=useUser();
    const client = useStreamVideoClient();
    const[values,setValues]=useState({
      dateTime:new Date(),
      description:"",
      link:"",
    })
    const [callDetails, setCallDetails] = useState()<Call>()
    const {toast} =useToast();
    const createMeeting = async () => {
      if(!client || !user) return;
      try{
        const id = crypto.randomUUID();
        const call = client.call('default',id);
        if(!call) throw new Error('Call creation failed');

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description=values.description ||"Instant meeting";
        await call.getOrCreate({
          data:{
            starts_at: startsAt,
            custom:{
              description,
            }
          }
        });
      }
      setCallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }
      catch(error){
        console.log("Error creating meeting:", error);
      }

    }     

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setmeetingState('isInstantMeeting')}
        className="bg-orange-1"
        />
        <HomeCard 
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setmeetingState('isScheduleMeeting')}
        className="bg-blue-1"
        />
        <HomeCard 
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => setmeetingState('isJoiningMeeting')}
        className="bg-purple-1"
        />
        <HomeCard 
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via Invitation Link"
        handleClick={() => setmeetingState('isJoiningMeeting')}
        className="bg-yellow-1"
        />
        
      <MeetingModal
       isOpen={meetingState ==='isInstantMeeting'}
       onClose={() => setmeetingState(undefined)}
       title="Start Instant Meeting"
       className="text-center"
      />

        
    </section>
  )
}

export default MeetingTypeList