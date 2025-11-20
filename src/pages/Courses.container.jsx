import { useCallback, useEffect, useMemo, useState } from "react";
import { useLayout } from "../context/LayoutContext";
import { notifyError, notifySuccess } from "../utils/notify";
import PageHeader from "../components/PageHeader";
import PageSurface from "../components/PageSurface";
import CourseFilters from "../features/course/CourseFilters";
import CourseList from "../features/course/CourseList";
import useCourses from "../features/course/useCourses";

const CoursesContainer = () => {
  const { setHeaderActions, resetHeaderActions } = useLayout();
  const [filters, setFilters] = useState({
    difficulty: "all",
    category: "all",
    progress: "all",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [pageSizePreference, setPageSizePreference] = useState("all");

  const {
    courses,
    loading,
    error,
    isOffline,
    refetch,
    paginatedCourses,
    totalPages,
    page,
    searchQuery,
    setSearchQuery,
    nextPage,
    prevPage,
    updateWorkingSet,
    markCourseEnrolled,
    totalItems,
    setPageSize,
  } = useCourses({ pageSize: 9 });

  useEffect(() => {
    if (error) {
      notifyError(error.message ?? "Failed to load courses");
    }
  }, [error]);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (filters.difficulty !== "all") {
      filtered = filtered.filter(
        (course) => course.difficulty.toLowerCase() === filters.difficulty,
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((course) => course.category === filters.category);
    }

    if (filters.progress !== "all") {
      filtered = filtered.filter((course) => {
        if (filters.progress === "enrolled") return course.enrolled;
        if (filters.progress === "not-enrolled") return !course.enrolled;
        if (filters.progress === "completed") return course.progress === 100;
        return true;
      });
    }

    return filtered;
  }, [courses, filters]);

  useEffect(() => {
    updateWorkingSet(filteredCourses);
  }, [filteredCourses, updateWorkingSet]);

  useEffect(() => {
    if (pageSizePreference === "all") {
      setPageSize(filteredCourses.length || 9);
    }
  }, [filteredCourses.length, pageSizePreference, setPageSize]);

  useEffect(() => {
    setHeaderActions({ showProfileButton: false });
    return () => resetHeaderActions();
  }, [resetHeaderActions, setHeaderActions]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handlePageSizeChange = (value) => {
    setPageSizePreference(value);
    if (value === "all") {
      setPageSize(filteredCourses.length || 9);
    } else {
      setPageSize(Number(value));
    }
  };

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-primary/10 text-primary-700 border border-primary/20";
      case "intermediate":
        return "bg-gold/10 text-gold border border-gold/30";
      case "advanced":
        return "bg-rose-100 text-rose-600 border border-rose-200";
      default:
        return "bg-surface-muted text-muted border border-border-subtle";
    }
  }, []);

  const handleAddToPath = useCallback(
    (courseId) => {
      notifySuccess("Course added to your learning path!");
      markCourseEnrolled(courseId);
    },
    [markCourseEnrolled],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageSurface className="fade-in">
      <div className="px-4 py-6 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        <PageHeader title="Courses" showActions={false} />

        <CourseFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={refetch}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          pageSizePreference={pageSizePreference}
          onPageSizeChange={handlePageSizeChange}
        />

        {isOffline && (
          <div className="card border border-amber-300/40 bg-white/5 text-white mb-6">
            <p className="text-sm">
              The course service could not be reached, so we loaded a local sample catalog instead.
              Start the mock API with <code>npm run json:dev</code> for live data.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="card p-4 flex items-center justify-end gap-3 mb-6">
            <button
              onClick={prevPage}
              className="btn-secondary px-4 py-2 rounded-xl disabled:opacity-50"
              disabled={page === 1}
              type="button"
            >
              Previous
            </button>
            <span className="text-sm text-text-secondary">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="btn-primary px-4 py-2 rounded-xl"
              type="button"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <div className="mb-4">
          <p className="text-text-secondary">
            Showing <span className="font-semibold">{totalItems}</span> courses
          </p>
        </div>

        <CourseList
          courses={paginatedCourses}
          viewMode={viewMode}
          onAddToPath={handleAddToPath}
          getDifficultyBadge={getDifficultyColor}
        />
      </div>
    </PageSurface>
  );
};

export default CoursesContainer;
