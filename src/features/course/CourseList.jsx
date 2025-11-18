import CourseCard from "./CourseCard";

const CourseList = ({ courses, viewMode, onAddToPath, getDifficultyBadge }) => {
  if (!courses.length) {
    return (
      <p className="text-center text-text-secondary py-12">
        No courses available. Try adjusting your filters or search.
      </p>
    );
  }

  const containerClass =
    viewMode === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "space-y-4";

  return (
    <div className={containerClass}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          variant={viewMode}
          onAddToPath={onAddToPath}
          difficultyBadgeClass={getDifficultyBadge(course.difficulty)}
        />
      ))}
    </div>
  );
};

export default CourseList;
