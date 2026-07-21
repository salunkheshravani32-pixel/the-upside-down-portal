function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-red-500 rounded-full opacity-40 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default BackgroundEffects;