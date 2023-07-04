import propTypes from 'prop-types';

export const ContactList = ({ contacts, onDeleteContact }) => {
  //  console.log(contacts);
  //  const pupa = contacts.map(({ number }) => ({ number }));
  // console.log(pupa);
  return (
    <div>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li className="contactItem" key={id}>
            <p className="contact">{name}:</p>
            <p className="contact">{number}</p>
            <button type="submit" onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: propTypes.func.isRequired,
};
