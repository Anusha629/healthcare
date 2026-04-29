type ViewToggleProps = {
  currentView: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
};

export default function ViewToggle({ currentView, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle">
      <button
        type="button"
        className={currentView === "grid" ? "active" : ""}
        onClick={() => onChange("grid")}
      >
        Grid
      </button>
      <button
        type="button"
        className={currentView === "list" ? "active" : ""}
        onClick={() => onChange("list")}
      >
        List
      </button>
    </div>
  );
}
