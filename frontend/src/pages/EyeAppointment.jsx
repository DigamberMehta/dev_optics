import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

export default function EyeAppointment({ closeModal }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeOpen, setTimeOpen] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL + '/api';

  const generateTimeSlots = () => {
    const slots = [];
    let hour = 9;
    let minute = 0;
    while (hour < 18 || (hour === 18 && minute === 0)) {
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const formattedMinute = minute === 0 ? "00" : minute;
      slots.push(`${formattedHour}:${formattedMinute} ${period}`);
      minute += 30;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      toast.error("Please select both date and time.");
      return;
    }

    const appointmentData = {
      date: format(date, "yyyy-MM-dd"),
      time: time,
      name: name,
      email: email,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${backendURL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message || "Appointment booked successfully!");
        closeModal();
      } else {
        toast.error(responseData.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full md:w-[50%] h-[90vh] flex items-center justify-center">
      <Card className="w-full p-5 shadow-xl bg-white rounded-2xl relative">
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
            <div>
              <Label>Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
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
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

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

            <Button type="submit" className="w-full bg-[#46BAC8] hover:bg-[#46BAC8] whitespace-nowrap">
              Book Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}