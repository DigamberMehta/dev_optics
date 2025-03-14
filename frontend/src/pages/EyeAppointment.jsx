import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function EyeAppointment({ closeModal }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeOpen, setTimeOpen] = useState(false);

  // Generate time slots from 9:00 AM to 6:00 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 9;
    let minute = 0;
    while (hour < 18 || (hour === 18 && minute === 0)) {
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
      const formattedMinute = minute === 0 ? "00" : minute;
      slots.push(`${formattedHour}:${formattedMinute} ${period}`);
      minute += 60;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
    setTimeOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked for ${name} on ${format(date, "PPP")} at ${time}`);
  };

  return (
    <div className="w-[50%] h-[90vh] flex items-center justify-center">
      <Card className="w-full p-5 shadow-xl bg-white rounded-2xl relative">
        {/* Close Button */}
        <Button
          onClick={closeModal}
          variant="ghost"
          className="absolute top-2 right-2 rounded-full h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-4">Book an Eye Appointment</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <Label>Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            {/* Email Field */}
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {/* Date and Time Selection - Flexbox Layout */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Picker */}
              <div className="flex-1">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      {date ? format(date, "PPP") : "Pick a date"}
                      <CalendarIcon className="w-5 h-5 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <Calendar selected={date} onSelect={setDate} />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker (Popover) */}
              <div className="flex-1">
                <Label>Select Time</Label>
                <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      {time || "Pick a time"}
                      <Clock className="w-5 h-5 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2 max-h-[300px] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {timeSlots.map((t) => (
                        <Button key={t} variant="ghost" onClick={() => handleTimeSelect(t)}>
                          {t}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-[#46BAC8] hover:bg-[#46BAC8]">Book Appointment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
