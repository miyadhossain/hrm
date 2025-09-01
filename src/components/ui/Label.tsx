const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
      {children}
    </label>
  );
};

export default Label;
