import { createContext, useCallback, useContext, useState } from "react";

const LayoutContext = createContext();

const DEFAULT_HEADER_ACTIONS = {
  showProfileButton: true,
  onProfileClick: undefined,
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

export const LayoutProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [headerActions, setHeaderActionsState] = useState(() => ({
    ...DEFAULT_HEADER_ACTIONS,
  }));

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const toggleSidebarCollapsed = () => setIsSidebarCollapsed((prev) => !prev);
  const setHeaderActions = useCallback((actions = {}) => {
    setHeaderActionsState({
      ...DEFAULT_HEADER_ACTIONS,
      ...actions,
    });
  }, []);
  const resetHeaderActions = useCallback(() => {
    setHeaderActionsState({ ...DEFAULT_HEADER_ACTIONS });
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        isSidebarCollapsed,
        toggleSidebarCollapsed,
        headerActions,
        setHeaderActions,
        resetHeaderActions,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
