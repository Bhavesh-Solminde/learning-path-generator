import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faRotateRight, faTh } from "../../icons";

const DIFFICULTY_OPTIONS = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "Web Development", label: "Web Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "Backend", label: "Backend" },
  { value: "AI/ML", label: "AI/ML" },
  { value: "DevOps", label: "DevOps" },
  { value: "Mobile Development", label: "Mobile Development" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Courses" },
  { value: "enrolled", label: "Enrolled" },
  { value: "not-enrolled", label: "Not Enrolled" },
  { value: "completed", label: "Completed" },
];

const VIEW_MODES = [
  { value: "grid", label: "Grid", icon: faTh },
  { value: "list", label: "List", icon: faList },
];

const PAGE_SIZE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "6", label: "6 / page" },
  { value: "9", label: "9 / page" },
  { value: "12", label: "12 / page" },
];

const CourseFilters = ({
  filters,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onRefresh,
  viewMode,
  onViewModeChange,
  pageSizePreference,
  onPageSizeChange,
}) => (
  <div className="card p-6 mb-6">
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2">
          Search
        </label>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field"
          placeholder="Search by course, instructor, or topic"
        />
      </div>

      {[
        {
          key: "difficulty",
          label: "Difficulty",
          options: DIFFICULTY_OPTIONS,
        },
        {
          key: "category",
          label: "Category",
          options: CATEGORY_OPTIONS,
        },
        {
          key: "progress",
          label: "Status",
          options: STATUS_OPTIONS,
        },
      ].map((config) => (
        <div key={config.key}>
          <label className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2">
            {config.label}
          </label>
          <select
            value={filters[config.key]}
            onChange={(e) => onFilterChange(config.key, e.target.value)}
            className="input-field"
          >
            {config.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="ml-auto flex items-end gap-2">
        <button onClick={onRefresh} className="btn-secondary px-4 py-2 text-sm gap-2" type="button">
          <FontAwesomeIcon icon={faRotateRight} /> Refresh
        </button>
        <select
          value={pageSizePreference}
          onChange={(e) => onPageSizeChange(e.target.value)}
          className="input-field w-32"
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {VIEW_MODES.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onViewModeChange(mode.value)}
            className={`btn-ghost px-4 py-2 gap-2 text-sm border border-transparent ${
              viewMode === mode.value ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={mode.icon} /> {mode.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default CourseFilters;
