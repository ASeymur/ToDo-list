import "./style.css";
import PropTypes from "prop-types";

const ListItemDate = ({ isChecked, createdAt, completedAt }) => {
  return (
    <div className="listItemDateWrapper">
      <div>
        <span className="listItemCreationLabel">Created:</span>
        <span className="listItemDate">{createdAt}</span>
      </div>
      <div>
        {isChecked && <span className="listItemDoneLabel">Done:</span>}
        {isChecked && completedAt && (
          <span className="listItemDate">{completedAt}</span>
        )}
      </div>
    </div>
  );
};

ListItemDate.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  completedAt: PropTypes.string,
};

export default ListItemDate;
