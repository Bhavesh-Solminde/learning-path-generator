import { render, screen } from "@testing-library/react";
import CourseList from "../CourseList";

jest.mock("../CourseCard", () => ({ course }) => (
  <div data-testid="course-card">{course.name}</div>
));

describe("CourseList", () => {
  const baseCourse = {
    id: 1,
    name: "Advanced React",
    difficulty: "Advanced",
    category: "Development",
    duration: "8h",
    rating: 4.9,
    instructor: "Alex Smith",
    enrolled: false,
  };

  it("renders helper text when no courses are provided", () => {
    render(
      <CourseList
        courses={[]}
        viewMode="grid"
        onAddToPath={jest.fn()}
        getDifficultyBadge={() => "badge"}
      />,
    );

    expect(
      screen.getByText(/no courses available\. try adjusting your filters/i),
    ).toBeInTheDocument();
  });

  it("renders a CourseCard per course when data exists", () => {
    const courses = [baseCourse, { ...baseCourse, id: 2, name: "UI Foundations" }];
    const getDifficultyBadge = jest.fn().mockReturnValue("badge");

    const { container } = render(
      <CourseList
        courses={courses}
        viewMode="grid"
        onAddToPath={jest.fn()}
        getDifficultyBadge={getDifficultyBadge}
      />,
    );

    expect(screen.getAllByTestId("course-card")).toHaveLength(2);
    expect(getDifficultyBadge).toHaveBeenCalledTimes(2);
    expect(container.firstChild).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
    );
  });
});
