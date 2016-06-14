import React, {PropTypes} from 'react';


const DeleteFriendLink = ({onDelete}) => {
  return (
    <div>
      <a href="">
        <label htmlFor="modal_1">
          Delete this friend
        </label>
      </a>

      <div className="modal">
        <input id="modal_1" type="checkbox"/>
        <label htmlFor="modal_1" className="overlay"></label>
        <article>

          <header>
            <h3>Confirm Deletion</h3>
            <label htmlFor="modal_1" className="close">&times;</label>
          </header>

          <section className="content">
            Are you sure want to delete this Friend?
          </section>

          <footer>
            <a className="button" href="" onClick={onDelete}>Delete</a>
            <label htmlFor="modal_1" className="button dangerous">
              Cancel
            </label>
          </footer>

        </article>
      </div>
    </div>
  );
};

DeleteFriendLink.propTypes = {
  onDelete: PropTypes.func.isRequired
};

export default DeleteFriendLink;
