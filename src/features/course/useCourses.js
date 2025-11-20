import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import mockCourses from "../../data/mockCourses";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const DEFAULT_PAGE_SIZE = 9;

/**
 * Provides reusable course data utilities (fetching, pagination, search, refetch).
 */
const useCourses = ({ pageSize: initialPageSize = DEFAULT_PAGE_SIZE } = {}) => {
  const [courses, setCourses] = useState([]);
  const [workingSet, setWorkingSet] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [isOffline, setIsOffline] = useState(false);

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { data, loading, error, refetch } = useFetch(`${apiBase}/courses`, {
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      setCourses(data);
      setWorkingSet(data);
      setIsOffline(false);
      return;
    }

    if (error && !isOffline) {
      setCourses(mockCourses);
      setWorkingSet(mockCourses);
      setIsOffline(true);
    }
  }, [data, error, isOffline]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, workingSet.length, pageSize]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchedCourses = useMemo(() => {
    if (!normalizedQuery) {
      return workingSet;
    }

    return workingSet.filter((course) => {
      const lookup = `${course.name} ${course.category} ${course.instructor}`.toLowerCase();
      return lookup.includes(normalizedQuery);
    });
  }, [normalizedQuery, workingSet]);

  const totalPages = useMemo(() => {
    const denominator = pageSize || DEFAULT_PAGE_SIZE;
    return Math.max(1, Math.ceil(searchedCourses.length / denominator));
  }, [searchedCourses.length, pageSize]);

  const safePage = clamp(page, 1, totalPages);

  const paginatedCourses = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return searchedCourses.slice(start, start + pageSize);
  }, [safePage, pageSize, searchedCourses]);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  const goToPage = useCallback(
    (target) => {
      setPage((prev) => {
        if (target == null) {
          return prev;
        }
        return clamp(target, 1, totalPages);
      });
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setPage((prev) => clamp(prev + 1, 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => clamp(prev - 1, 1, totalPages));
  }, [totalPages]);

  const updateWorkingSet = useCallback((nextCourses) => {
    setWorkingSet(Array.isArray(nextCourses) ? nextCourses : []);
  }, []);

  const markCourseEnrolled = useCallback((courseId) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseId ? { ...course, enrolled: true } : course)),
    );
    setWorkingSet((prev) =>
      prev.map((course) => (course.id === courseId ? { ...course, enrolled: true } : course)),
    );
  }, []);

  return {
    courses,
    loading,
    error,
    isOffline,
    refetch,
    paginatedCourses,
    totalPages,
    page: safePage,
    pageSize,
    searchQuery,
    setSearchQuery,
    nextPage,
    prevPage,
    goToPage,
    updateWorkingSet,
    markCourseEnrolled,
    totalItems: searchedCourses.length,
    setPageSize,
  };
};

export default useCourses;
