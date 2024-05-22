import css from "./RadioDif.module.css";

export default function RadioDif({ onChange }) {
  
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.customCheckBoxHolder}>
      <input
        className={css.customCheckBoxInput}
        id="1"
        type="radio"
        name="difficulty"
        value="1"
        onChange={handleChange}
      />
      <label className={css.customCheckBoxWrapper} htmlFor="1">
        <div className={css.customCheckBox}>
          <div className={css.inner}>1</div>
        </div>
      </label>

      <input
        className={css.customCheckBoxInput}
        id="2"
        type="radio"
        name="difficulty"
        value="2"
        onChange={handleChange}
      />
      <label className={css.customCheckBoxWrapper} htmlFor="2">
        <div className={css.customCheckBox}>
          <div className={css.inner}>2</div>
        </div>
      </label>

      <input
        className={css.customCheckBoxInput}
        id="3"
        type="radio"
        name="difficulty"
        value="3"
        onChange={handleChange}
      />
      <label className={css.customCheckBoxWrapper} htmlFor="3">
        <div className={css.customCheckBox}>
          <div className={css.inner}>3</div>
        </div>
      </label>
      <input
        className={css.customCheckBoxInput}
        id="4"
        type="radio"
        name="difficulty"
        value="4"
        onChange={handleChange}
      />
      <label className={css.customCheckBoxWrapper} htmlFor="4">
        <div className={css.customCheckBox}>
          <div className={css.inner}>4</div>
        </div>
      </label>
    </div>
  );
}
