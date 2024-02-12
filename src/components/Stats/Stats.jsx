import "./style.css";

const Stats = ({ tasks }) => {
  if (!tasks.length)
    return (
      <p className="stats">Start adding some tasks to your ToDo list 📄</p>
    );

  const numItems = tasks.length;
  const numPacked = tasks.filter((item) => item.completed).length;
  const percentage =
    numItems !== 0 ? Math.round((numPacked / numItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? (
          <>
            Business before pleasure! It's time to rest{" "}
            <span className="statsEmoji">🎮⚽⛳</span>
          </>
        ) : (
          `📃 You have ${numItems} task(-s) on your list, and you already done ${numPacked} (${percentage}%) `
        )}
      </em>
    </footer>
  );
};

export default Stats;
