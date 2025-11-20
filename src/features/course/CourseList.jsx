import { useMemo } from "react";
import { List } from "react-window";
import CourseCard from "./CourseCard";

const VirtualCourseRow = ({ index, style, data }) => {
  const { courses, onAddToPath, getDifficultyBadge, variant } = data;
  const course = courses[index];

  return (
    <div style={style} className="px-1" data-testid="virtualized-row">
      <CourseCard
        course={course}
        variant={variant}
        onAddToPath={onAddToPath}
        difficultyBadgeClass={getDifficultyBadge(course.difficulty)}
      />
    </div>
  );
};

const CourseList = ({ courses, viewMode, onAddToPath, getDifficultyBadge }) => {
  if (!courses.length) {
    return (
      <p className="text-center text-text-secondary py-12">
        No courses available. Try adjusting your filters or search.
      </p>
    );
  }

  const shouldVirtualize = courses.length > 50;
  const effectiveView = shouldVirtualize ? "list" : viewMode;
  const containerClass =
    effectiveView === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4";

  const virtualizationMetrics = useMemo(() => {
    const baseHeight = effectiveView === "list" ? 180 : 320;
    const height = Math.min(700, courses.length * baseHeight);
    return { itemSize: baseHeight, height };
  }, [courses.length, effectiveView]);

  if (shouldVirtualize) {
    return (
      <div data-testid="virtualized-course-list">
        <List
          height={virtualizationMetrics.height}
          itemCount={courses.length}
          itemSize={virtualizationMetrics.itemSize}
          width="100%"
          className="space-y-4"
          itemData={{
            courses,
            onAddToPath,
            getDifficultyBadge,
            variant: "list",
          }}
        >
          {VirtualCourseRow}
        </List>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          variant={effectiveView}
          onAddToPath={onAddToPath}
          difficultyBadgeClass={getDifficultyBadge(course.difficulty)}
        />
      ))}
    </div>
  );
};

export default CourseList;
