import styles from './input.module.css';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  id: string;
  error?: string;
};

export default function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input className={styles.input} type="text" name={id} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
