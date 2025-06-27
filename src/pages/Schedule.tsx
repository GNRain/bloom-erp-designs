
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Schedule = () => {
  const departments = [
    { name: "IT Department", color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-100" },
    { name: "HR Department", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-100" },
    { name: "Operations", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-100" },
  ];

  const timeSlots = [
    "00:00-08:00", "08:00-16:00", "16:00-24:00"
  ];

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Mock schedule data - rotating departments across different shifts
  const getScheduleForDay = (dayIndex: number) => {
    const schedules = [
      // Monday
      ["IT Department", "HR Department", "Operations"],
      // Tuesday
      ["HR Department", "Operations", "IT Department"],
      // Wednesday
      ["Operations", "IT Department", "HR Department"],
      // Thursday
      ["IT Department", "HR Department", "Operations"],
      // Friday
      ["HR Department", "Operations", "IT Department"],
      // Saturday
      ["Operations", "IT Department", "HR Department"],
      // Sunday
      ["IT Department", "Operations", "HR Department"],
    ];
    return schedules[dayIndex];
  };

  const getDepartmentStyle = (departmentName: string) => {
    const dept = departments.find(d => d.name === departmentName);
    return dept ? { textColor: dept.textColor, bgColor: dept.bgColor } : { textColor: "text-gray-700", bgColor: "bg-gray-100" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Department Schedule</h2>
        <p className="text-gray-600">Weekly schedule showing which department works at each time slot</p>
      </div>

      {/* Department Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {departments.map((dept) => (
              <div key={dept.name} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${dept.color}`}></div>
                <span className="text-sm font-medium">{dept.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 py-3 px-4 text-left font-semibold text-gray-900">
                    Time Slot
                  </th>
                  {weekdays.map((day) => (
                    <th key={day} className="border border-gray-200 py-3 px-4 text-center font-semibold text-gray-900">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, timeIndex) => (
                  <tr key={timeSlot} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-4 px-4 font-medium text-gray-900 bg-gray-50">
                      {timeSlot}
                    </td>
                    {weekdays.map((day, dayIndex) => {
                      const departmentName = getScheduleForDay(dayIndex)[timeIndex];
                      const style = getDepartmentStyle(departmentName);
                      return (
                        <td key={`${day}-${timeSlot}`} className="border border-gray-200 py-4 px-4 text-center">
                          <Badge 
                            variant="secondary" 
                            className={`${style.bgColor} ${style.textColor} font-medium px-3 py-1`}
                          >
                            {departmentName}
                          </Badge>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.name}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${dept.color}`}></div>
                <span>{dept.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Weekly Hours:</span>
                  <span className="font-medium">56 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Employees:</span>
                  <span className="font-medium">
                    {dept.name === "IT Department" ? "45" : dept.name === "HR Department" ? "32" : "65"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shift Pattern:</span>
                  <span className="font-medium">8-hour shifts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
