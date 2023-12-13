// Display priority and complexity - (low = 1 - 4, moderate = 5 - 7, high = 8 - 10)

interface TaskLevelsProps {
  category: string;
  level: number;
}

const TaskLevels = ({ category, level }: TaskLevelsProps) => {
  const checkLevel = (level: number) => {
    if (level >= 0 && level <= 4) {
      return "Low";
    }
    if (level >= 5 && level <= 7) {
      return "Moderate";
    }
    if (level >= 8 && level <= 10) {
      return "High";
    }
    return "tf you do ._.";
  };

  return (
    <div>
      <p>
        {category}: {checkLevel(level)} ({level}/10)
      </p>
    </div>
  );
};

export default TaskLevels;
