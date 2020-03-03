import React from 'react'
import PropTypes from 'prop-types'

const CustomForm = ({data}) => {
  const { heading, fields } = data;

  console.log('F: ', fields);

  return (
    <section>
      <h3>{heading}</h3>

      <form>
        {
          fields.map(field => {
            if (field.name && field.type) {
              return (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.name}
                />
              )
            } else {
              return null;
            }
          })
        }
      </form>
    </section>
  )
}

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

export default CustomForm
