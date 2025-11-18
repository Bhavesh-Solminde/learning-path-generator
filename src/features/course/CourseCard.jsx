import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";

const CourseCard = ({
  course,
  variant = "grid",
  difficultyBadgeClass,
  onAddToPath,
}) => {
  const renderAction = (options) => {
    if (course.enrolled) {
      return (
        <Link to={`/course/${course.id}`} className={options.linkClasses}>
          Continue Learning →
        </Link>
      );
    }

    return (
      <button
        onClick={() => onAddToPath(course.id)}
        className={options.buttonClasses}
      >
        + Add to {variant === "list" ? "Path" : "Learning Path"}
      </button>
    );
  };

  if (variant === "list") {
    return (
      <div className="card p-6 flex items-center gap-6 card-hover-glow">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-text-primary">
              {course.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyBadgeClass}`}
            >
              {course.difficulty}
            </span>
          </div>

          <p className="text-text-secondary mb-2">
            {course.category} • {course.duration} •{" "}
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />{" "}
            {course.rating}
          </p>
          <p className="text-sm text-text-secondary">
            Instructor: {course.instructor}
          </p>

          {course.enrolled && (
            <div className="mt-3 max-w-xs">
              <div className="flex justify-between text-sm text-text-secondary mb-1">
                <span>Progress</span>
                <span className="font-semibold text-text-primary">
                  {course.progress}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {renderAction({
          linkClasses:
            "py-2 px-6 rounded-lg font-medium transition-all duration-300 bg-primary hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/30 text-white text-center",
          buttonClasses:
            "py-2 px-6 rounded-lg font-medium transition-all duration-300 btn-primary",
        })}
      </div>
    );
  }

  return (
    <div className="card p-6 card-hover-glow hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-text-primary">
          {course.name}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyBadgeClass}`}
        >
          {course.difficulty}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-3">{course.category}</p>

      <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
        <span>
          <FontAwesomeIcon icon={faClock} className="mr-1" /> {course.duration}
        </span>
        <span>•</span>
        <span>
          <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />{" "}
          {course.rating}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-4">by {course.instructor}</p>

      {course.enrolled && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-text-secondary mb-1">
            <span>Progress</span>
            <span className="font-semibold text-text-primary">
              {course.progress}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {renderAction({
        linkClasses:
          "w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 bg-primary hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/30 text-white text-center block",
        buttonClasses:
          "w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 btn-primary",
      })}
    </div>
  );
};

export default CourseCard;
