import styles from './ToggleSwitch.module.css';

export default function ToggleSwitch({ isOn, onToggle }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isOn} onChange={() => onToggle(!isOn)} />
      <span className={styles.slider}></span>
    </label>
  );
}