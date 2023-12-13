interface FormInputContainerProps {
  heading: string;
  value: string;
  handleChange: (val: string) => void;
  placeholder: string;
}

const FormInputContainer = ({
  heading,
  value,
  handleChange,
  placeholder,
}: FormInputContainerProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-lg">{heading}</h1>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-white border border-[#E2E2E2] rounded-[90px] px-6 py-4"
      />
    </div>
  );
};

export default FormInputContainer;
