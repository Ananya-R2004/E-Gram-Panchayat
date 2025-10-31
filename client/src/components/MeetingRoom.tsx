import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const upcomingMeetings = [
  {
    title: "Monthly Village Council Meeting",
    date: "Feb 15, 2025",
    time: "10:00 AM",
    participants: 45,
  },
  {
    title: "Agricultural Development Discussion",
    date: "Feb 20, 2025",
    time: "2:00 PM",
    participants: 28,
  },
];

export default function MeetingRoom() {
  const { toast } = useToast();

  const handleJoinMeeting = () => {
    console.log("Join meeting clicked");
    toast({
      title: "Joining Meeting",
      description: "Connecting to virtual meeting room...",
    });
  };

  const handleScheduleMeeting = () => {
    console.log("Schedule meeting clicked");
    toast({
      title: "Schedule Meeting",
      description: "Meeting scheduler will be available soon.",
    });
  };

  return (
    <section id="meeting-room" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Virtual Meeting Room
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with your panchayat members and participate in important discussions from anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground text-center mb-4">
              Join a Meeting
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Have a meeting code? Join an ongoing panchayat meeting instantly with video and audio.
            </p>
            <Button
              className="w-full"
              size="lg"
              onClick={handleJoinMeeting}
              data-testid="button-join-meeting"
            >
              <Video className="h-5 w-5 mr-2" />
              Join Meeting
            </Button>
          </Card>

          <Card className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground text-center mb-4">
              Schedule a Meeting
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Plan ahead and schedule panchayat meetings with automated reminders for all participants.
            </p>
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              onClick={handleScheduleMeeting}
              data-testid="button-schedule-meeting"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Meeting
            </Button>
          </Card>
        </div>

        <div>
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
            Upcoming Meetings
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingMeetings.map((meeting, index) => (
              <Card key={index} className="p-6 hover-elevate transition-all">
                <h4 className="font-semibold text-foreground mb-3">
                  {meeting.title}
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{meeting.participants} participants</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  size="sm"
                  onClick={() => {
                    console.log(`Set reminder for: ${meeting.title}`);
                    toast({ title: "Reminder Set", description: `You'll be notified before ${meeting.title}` });
                  }}
                  data-testid={`button-reminder-${index}`}
                >
                  Set Reminder
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
