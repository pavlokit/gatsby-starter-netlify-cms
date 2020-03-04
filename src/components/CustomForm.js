import React from "react";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import remarkHtml from "remark-html";
import { HTMLContent } from "../components/Content";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const CheckboxGroup = ({ options, onChange }) =>
  options && options.length ? (
    <div className="checkbox__group">
      {options.map(({ name }) => (
        <label className="checkbox__container">
          <span className="checkbox__label">{name}</span>
          <input type="checkbox" name={name} onChange={onChange} />
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
  <div className="select is-fullwidth">
    <select id={name} onChange={onChange} name={name}>
      {!!options &&
        options.map(option => <option key={option.name}>{option.name}</option>)}
    </select>
  </div>
);

const Text = ({ content }) => {
  const parsedContent = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(content)
    .toString();

  return <HTMLContent content={parsedContent} />;
};

const renderFormSection = (field, onChange) => {
  switch (field.type) {
    case "checkboxGroup":
      return <CheckboxGroup options={field.options} onChange={onChange} />;
    case "select":
      return <Select {...field} onChange={onChange} />;
    case "text":
      return <Text {...field} />;
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
          if (!field.type) {
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

        {fields.length && (
          <button className="button" type="submit">
            {submit}
          </button>
        )}
      </form>
    </section>
  );
};

export default CustomForm;
