import React, { useState } from 'react';
import './modal.scss';

const Modal = ({ onHideForm, onCreateEvent }) => {
  // fill in the form - submit +++
  // save stateValue in stateModal +++
  // send stateValue to Main +++
  // add task to gateWay/events.js +++
  const [{ id, title, description, date, startTime, endTime }, setFormData] =
    useState({
      id: Math.random(),
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dateFrom = new Date(`${date} ${startTime}`);
    const dateTo = new Date(`${date} ${endTime}`);

    onCreateEvent({ id, title, description, dateFrom, dateTo });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onHideForm}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
              onChange={handleChange}
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// class Modal extends Component {
//   render() {
//     console.log(this.props);
//     return (
//       <div className="modal overlay">
//         <div className="modal__content">
//           <div className="create-event">
//             <button className="create-event__close-btn">+</button>
//             <form className="event-form">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 className="event-form__field"
//               />
//               <div className="event-form__time">
//                 <input type="date" name="date" className="event-form__field" />
//                 <input
//                   type="time"
//                   name="startTime"
//                   className="event-form__field"
//                   onChange={this.handleChange}
//                 />
//                 <span>-</span>
//                 <input
//                   type="time"
//                   name="endTime"
//                   className="event-form__field"
//                 />
//               </div>
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 className="event-form__field"
//               ></textarea>
//               <button type="submit" className="event-form__submit-btn">
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Modal;
