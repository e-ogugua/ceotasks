export default function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-sm px-2 py-1 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      Toggle Theme
    </button>
  );
}
