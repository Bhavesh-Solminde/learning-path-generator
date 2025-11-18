import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import CourseFilters from "../features/course/CourseFilters";
import CourseList from "../features/course/CourseList";
import useCourses from "../features/course/useCourses";

const CoursesContainer = () => {
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
      toast.error(error.message ?? "Failed to load courses");
    }
  }, [error]);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (filters.difficulty !== "all") {
      filtered = filtered.filter(
        (course) => course.difficulty.toLowerCase() === filters.difficulty
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (course) => course.category === filters.category
      );
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
        return "bg-accent/10 text-accent";
      case "intermediate":
        return "bg-gold/10 text-gold";
      case "advanced":
        return "bg-error/10 text-error";
      default:
        return "bg-muted/20 text-muted";
    }
  }, []);

  const handleAddToPath = useCallback(
    (courseId) => {
      toast.success("Course added to your learning path!");
      markCourseEnrolled(courseId);
    },
    [markCourseEnrolled]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <PageHeader title="Courses" showProfileButton={false} />

      <div className="p-8">
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

        {totalPages > 1 && (
          <div className="card p-4 flex items-center justify-end gap-3 mb-6">
            <button
              onClick={prevPage}
              className="btn-secondary px-4 py-2 rounded disabled:opacity-50"
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
              className="btn-primary px-4 py-2 rounded"
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
    </div>
  );
};

export default CoursesContainer;
