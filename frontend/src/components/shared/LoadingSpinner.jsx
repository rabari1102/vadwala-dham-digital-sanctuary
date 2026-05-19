import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <span className="material-symbols-outlined">progress_activity</span>
      <span className="loading-spinner__text">Loading</span>
    </div>
  );
}
