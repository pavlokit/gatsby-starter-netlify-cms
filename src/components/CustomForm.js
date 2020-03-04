import React from "react";
// import PropTypes from "prop-types";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const CheckboxGroup = ({ options, onChange }) =>
  options && options.length ? (
    <div className="checkboxGroup">
      {options.map(({ name }) => (
        <label className="checkbox__label">
          {name}
          <input type="checkbox" onChange={onChange} />
        </label>
      ))}
    </div>
  ) : null;

const Input = ({ type, name, onChange }) => (
  <input
    className="input"
    type={type}
    name={name}
    id={name}
    placeholder={name}
    onChange={onChange}
  />
);

const Select = ({ name, onChange, options }) => (
  <div className="select">
    <select id={name} onChange={onChange} name={name}>
      {!!options &&
        options.map(option => <option key={option.name}>{option.name}</option>)}
    </select>
  </div>
);

const renderFormSection = (field, onChange) => {
  switch (field.type) {
    case "checkboxGroup":
      return <CheckboxGroup options={field.options} onChange={onChange} />;
    case "select":
      return <Select {...field} onChange={onChange} />;
    default:
      return <Input {...field} onChange={onChange} />;
  }
};

const CustomForm = ({ data }) => {
  const { heading, fields = [], submit = "Submit" } = data;
  const formData = {};

  const handleChange = e => {
    formData[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...formData
      })
    })
      .then(() => {
        console.log("Works!");
      })
      .catch(error => alert(error));
  };

  return (
    <section>
      <h3>{heading}</h3>

      <form
        name="custom"
        method="post"
        action="/contact/custom/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {fields.map((field, index) => {
          if ((!field.name || !field.type) && field.type !== "checkboxGroup") {
            return null;
          }

          return (
            <div className="field" key={index}>
              <label className="label" htmlFor={field.name}>
                {field.name}
              </label>
              <div className="control">
                {renderFormSection(field, handleChange)}
              </div>
            </div>
          );
        })}

        {fields.length && <button className="button" type="submit">{submit}</button>}
      </form>
    </section>
  );
};

// Pricing.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       plan: PropTypes.string,
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//       description: PropTypes.string,
//       items: PropTypes.array,
//     })
//   ),
// }

export default CustomForm;
