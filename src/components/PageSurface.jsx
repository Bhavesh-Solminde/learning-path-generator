const PageSurface = ({ children, className = "", contentClassName = "" }) => {
  return (
    <div className={`page-shell ${className}`}>
      <div className="page-shell__backdrop" aria-hidden="true">
        <div className="page-shell__glow page-shell__glow--left"></div>
        <div className="page-shell__glow page-shell__glow--right"></div>
        <div className="page-shell__noise"></div>
      </div>
      <div className={`page-shell__content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default PageSurface;
