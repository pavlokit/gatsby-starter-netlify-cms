import React from "react";
// import PropTypes from "prop-types";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const CustomForm = ({ data }) => {
  const { heading, fields, submit = "Submit" } = data;
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
          if (field.name && field.type) {
            return (
              <div className="field" key={index}>
                <label className="label" htmlFor={field.name}>
                  {field.name}
                </label>

                <div className="control">
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    placeholder={field.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}

        {fields.length && <button type="submit">{submit}</button>}
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
