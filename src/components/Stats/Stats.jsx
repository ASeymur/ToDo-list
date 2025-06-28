import "./style.css";
import PropTypes from "prop-types";

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
    <div className="stats">
      <em>
        {percentage === 100 ? (
          <>
            Business before pleasure! It is time to rest{" "}
            <span className="statsEmoji">🎮⚽⛳</span>
          </>
        ) : (
          `📃 You have ${numItems} task(-s) on your list, and you already done ${numPacked} (${percentage}%) `
        )}
      </em>
    </div>
  );
};

Stats.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
      completedAt: PropTypes.string,
    })
  ).isRequired,
};

export default Stats;
