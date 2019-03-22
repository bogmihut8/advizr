import React from 'react'
import PropTypes from 'prop-types';

const Client = ({ name, status, children }) => {
  return (
    <div className="client">
		  <span className="name">{name}</span><span className="status">{status}</span><span className="children">{children.length} children</span>		
    </div>
  );
};
  
Client.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  children: PropTypes.array
}

export default Client;