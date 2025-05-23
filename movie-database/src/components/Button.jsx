function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer mt-10 px-4 py-2 rounded-md transition"
    >
      {children}
    </button>
  );
}

export default Button;
