interface FormDueDateProps {
  date: string;
  handleDate: React.Dispatch<React.SetStateAction<string>>;
  time: string;
  handleTime: React.Dispatch<React.SetStateAction<string>>;
}

const FormDueDate = ({
  date,
  handleDate,
  time,
  handleTime,
}: FormDueDateProps) => {
  return (
    <div className="flex justify-between gap-8 w-full">
      <div className="w-full">
        <p className="text-lg">Select Due Date</p>
        <input
          type="date"
          value={date}
          className="bg-white border border-[#E2E2E2] rounded-[90px] px-6 py-4 w-full"
          onChange={(e) => handleDate(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="text-lg">Select Time</p>
        <input
          type="time"
          value={time}
          className="bg-white border border-[#E2E2E2] rounded-[90px] px-6 py-4 w-full"
          onChange={(e) => handleTime(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormDueDate;
