import classNames from "classnames";
function Panel({ children, className, ...rest }) {
  const finalClass = classNames(
    "border rounded bg-white shadow w-full",
    className
  );
  return (
    <div {...rest} className={finalClass}>
      {children}
    </div>
  );
}
export default Panel;
//we are using this panel component cause the UI have the same two components...
