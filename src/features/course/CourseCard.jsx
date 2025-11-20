import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "../../icons";

const CourseCard = ({ course, variant = "grid", difficultyBadgeClass, onAddToPath }) => {
  const renderAction = (options) => {
    if (course.enrolled) {
      return (
        <Link to={`/course/${course.id}`} className={options.linkClasses}>
          Continue Learning →
        </Link>
      );
    }

    return (
      <button onClick={() => onAddToPath(course.id)} className={options.buttonClasses}>
        + Add to {variant === "list" ? "Path" : "Learning Path"}
      </button>
    );
  };

  if (variant === "list") {
    return (
      <div className="card p-6 flex items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-white">{course.name}</h3>
            <span className={`pill ${difficultyBadgeClass}`}>{course.difficulty}</span>
          </div>

          <p className="text-white/60 mb-2">
            {course.category} • {course.duration} •{" "}
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" /> {course.rating}
          </p>
          <p className="text-sm text-white/60">Instructor: {course.instructor}</p>

          {course.enrolled && (
            <div className="mt-3 max-w-xs">
              <div className="flex justify-between text-sm text-white/60 mb-1">
                <span>Progress</span>
                <span className="font-semibold text-white">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {renderAction({
          linkClasses: "btn-primary whitespace-nowrap",
          buttonClasses: "btn-primary whitespace-nowrap",
        })}
      </div>
    );
  }

  return (
    <div className="card p-6 space-y-3">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{course.name}</h3>
        <span className={`pill ${difficultyBadgeClass}`}>{course.difficulty}</span>
      </div>

      <p className="text-sm text-white/60 mb-3">{course.category}</p>

      <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
        <span>
          <FontAwesomeIcon icon={faClock} className="mr-1" /> {course.duration}
        </span>
        <span>•</span>
        <span>
          <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" /> {course.rating}
        </span>
      </div>

      <p className="text-sm text-white/60 mb-4">by {course.instructor}</p>

      {course.enrolled && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-white/60 mb-1">
            <span>Progress</span>
            <span className="font-semibold text-white">{course.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      )}

      {renderAction({
        linkClasses: "btn-primary w-full justify-center",
        buttonClasses: "btn-primary w-full justify-center",
      })}
    </div>
  );
};

export default CourseCard;
